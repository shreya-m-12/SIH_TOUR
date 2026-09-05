import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json({ limit: "5mb" }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "LocalRoots",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Local Companion Endpoint
app.post("/api/companion/chat", async (req, res) => {
  try {
    const {
      message,
      destinationId,
      destinationName,
      availableHours,
      budgetAmount,
      dietaryPreference,
      interests,
      popularity,
      allowGeneralSearch,
      verifiedContributions = [],
      verifiedStories = [],
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Filter items relevant to destination
    const destinationContributions = verifiedContributions.filter(
      (c: any) => !destinationId || c.destinationId === destinationId
    );
    const destinationStories = verifiedStories.filter(
      (s: any) => !destinationId || s.destinationId === destinationId
    );

    // Filter by dietary or budget if provided
    let candidateContributions = destinationContributions;
    if (dietaryPreference && dietaryPreference !== "Any") {
      const lowerDiet = dietaryPreference.toLowerCase();
      candidateContributions = candidateContributions.filter((c: any) =>
        c.dietary?.some((d: string) => d.toLowerCase().includes(lowerDiet)) ||
        c.category !== "food"
      );
    }
    if (budgetAmount && Number(budgetAmount) > 0) {
      const numBudget = Number(budgetAmount);
      candidateContributions = candidateContributions.filter((c: any) => {
        if (!c.costInfo?.estimatedAmount) return true;
        return c.costInfo.estimatedAmount <= numBudget;
      });
    }

    // Prepare verified knowledge context
    const knowledgeBaseSummary = candidateContributions.map((item: any, idx: number) => {
      return `[ENTRY #${idx + 1}] ID: "${item.id}"
Title: "${item.title}"
Category: "${item.category}"
Location: "${item.location?.name || ''}, ${item.location?.area || ''}"
Cost: "${item.costInfo?.level || ''} (${item.costInfo?.estimatedAmount ? item.costInfo.currency + item.costInfo.estimatedAmount : ''}) - ${item.costInfo?.note || ''}"
Time Needed: "${item.timeRequiredHours} hours"
Dietary Options: "${(item.dietary || []).join(', ')}"
Popularity: "${item.popularity}"
Local Contributor: "${item.contributorName}" (${item.contributorRole}), Verified on ${item.verificationDate}, Local Confirmations: ${item.confirmationsCount}
Local Secret Tip: "${item.localTip}"
Description: "${item.description}"`;
    }).join("\n\n");

    const storiesSummary = destinationStories.map((s: any) => {
      return `[STORY] ID: "${s.id}"
Title: "${s.title}"
By: "${s.authorName}" (${s.authorTenure})
Summary: "${s.summary}"
Key Recommendations: "${s.content.join(' ')}"`;
    }).join("\n\n");

    // Check if user has explicit allowGeneralSearch
    const isGeneralSearchAllowed = Boolean(allowGeneralSearch);

    // Call Gemini if API Key is configured
    const ai = getGenAI();

    if (ai) {
      const systemInstruction = `You are the LocalRoots AI Companion for "${destinationName || 'the destination'}".
CORE USP: "AI that learns from verified locals, not AI that pretends to know everything."

STRICT OPERATIONAL RULES:
1. DEFAULT RULE: ANSWER ONLY FROM VERIFIED LOCAL INFORMATION PROVIDED IN THE CONTEXT BELOW.
2. NO-HALLUCINATION MANDATE:
   - You MUST NOT invent, assume, or hallucinate facts, places, timings, prices, or local dishes not in the verified database.
   - If the traveler asks about something not present in the verified local knowledge base (or if there are no verified entries matching their query):
     ${
       isGeneralSearchAllowed
         ? `Because the user explicitly requested "SEARCH GENERAL INFORMATION", you may answer using broader general knowledge, BUT you MUST prefix your response with:
"[GENERAL INFORMATION - NOT FROM VERIFIED LOCALS]
Note: This information comes from broader general sources and has not yet been audited by our local resident network."
and clearly distinguish it from verified facts.`
         : `You MUST NOT guess or invent an answer. Instead, your response MUST state:
"I couldn't find verified local information about this in ${destinationName || 'our database'}. Would you like me to search general sources?"
and explain clearly what verified aspects are or are not available.`
     }
3. PERSONALIZATION & FILTERING:
   - When matching traveler constraints:
     - Available time: ${availableHours ? availableHours + ' hours' : 'Flexible'}
     - Budget: ${budgetAmount ? '₹' + budgetAmount : 'Flexible'}
     - Food preference: ${dietaryPreference || 'Any'}
     - Popularity: ${popularity || 'Any'}
   - Rank and combine the available verified local items into a practical plan.
   - For every verified place or recommendation you mention, you MUST explicitly cite the contributor name and local tip.
4. CITATIONS FORMAT:
   At the end of your answer, if you used verified entries, output a JSON block on a new line strictly formatted as:
   ---CITATIONS---
   ["entry_id_1", "entry_id_2"]
   ---END_CITATIONS---
`;

      const prompt = `Traveler Query: "${message}"

=== VERIFIED LOCAL KNOWLEDGE BASE ===
${knowledgeBaseSummary || 'No verified entries found for this destination.'}

=== VERIFIED LOCAL STORIES ===
${storiesSummary || 'No stories available.'}

Traveler Preferences:
- Available Time: ${availableHours || 'Not specified'} hours
- Budget: ${budgetAmount || 'Not specified'}
- Dietary Preference: ${dietaryPreference || 'None'}
- Interests: ${(interests || []).join(', ') || 'General discovery'}
- Popularity: ${popularity || 'All'}
- Allow General Search: ${isGeneralSearchAllowed ? 'YES (User granted permission)' : 'NO (STRICT LOCAL ONLY)'}

Please provide your answer strictly following the LocalRoots rules.`;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.2, // low temperature to prevent hallucination
          },
        });

        const rawText = response.text || "";
        
        // Extract citations
        let citationsIds: string[] = [];
        let cleanText = rawText;
        const citationMatch = rawText.match(/---CITATIONS---([\s\S]*?)---END_CITATIONS---/);
        if (citationMatch && citationMatch[1]) {
          try {
            citationsIds = JSON.parse(citationMatch[1].trim());
          } catch (e) {
            // fallback regex
            const ids = citationMatch[1].match(/[a-z0-9_-]+/gi);
            if (ids) citationsIds = ids;
          }
          cleanText = rawText.replace(/---CITATIONS---[\s\S]*?---END_CITATIONS---/, "").trim();
        }

        // Build structured citation items
        const structuredCitations = destinationContributions
          .filter((c: any) => citationsIds.includes(c.id))
          .map((c: any) => ({
            id: c.id,
            title: c.title,
            category: c.category,
            contributorName: c.contributorName,
            confirmationsCount: c.confirmationsCount,
            localTip: c.localTip,
            locationName: c.location.name,
          }));

        // Detect if fallback prompt needed
        const requiresGeneralSearchChoice =
          !isGeneralSearchAllowed &&
          (cleanText.includes("search general sources") ||
           cleanText.includes("couldn't find verified local information") ||
           structuredCitations.length === 0 && candidateContributions.length === 0);

        return res.json({
          text: cleanText,
          mode: isGeneralSearchAllowed ? "general_information" : "verified_local_only",
          citations: structuredCitations,
          requiresGeneralSearchChoice,
          pendingGeneralQuery: requiresGeneralSearchChoice ? message : undefined,
          isGeneralInfo: isGeneralSearchAllowed,
        });
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to deterministic local knowledge engine:", geminiError);
      }
    }

    // Deterministic fallback engine (Grounding Engine)
    // Ensures 100% reliable functionality adhering strictly to prompt requirements
    const lowerQuery = message.toLowerCase();
    
    // Check if query asks for something completely out of scope or not in knowledge base
    const matchedContributions = candidateContributions.filter((c: any) => {
      const matchText = `${c.title} ${c.description} ${c.category} ${c.localTip} ${c.location.name} ${c.location.area}`.toLowerCase();
      const words = lowerQuery.split(/\s+/).filter((w: string) => w.length > 2);
      return words.some((word: string) => matchText.includes(word));
    });

    if (matchedContributions.length === 0 && !isGeneralSearchAllowed) {
      return res.json({
        text: `I couldn't find verified local information about "${message}" in ${destinationName || 'our database'}.\n\nOur network of verified residents only speaks on authentic places and traditions they have personally validated. Would you like me to search general sources?`,
        mode: "verified_local_only",
        citations: [],
        requiresGeneralSearchChoice: true,
        pendingGeneralQuery: message,
      });
    }

    if (isGeneralSearchAllowed && matchedContributions.length === 0) {
      return res.json({
        text: `[GENERAL INFORMATION - NOT FROM VERIFIED LOCALS]\nNote: This information comes from broader general travel sources and has not yet been audited by our local resident network.\n\nRegarding "${message}": While our verified resident contributors have not yet submitted a direct audit for this specific query, standard regional travel guidelines suggest checking municipal transport schedules or verified tourism boards directly. We encourage you to ask our local contributors to review this spot in the "Submit Local Information" section!`,
        mode: "general_information",
        citations: [],
        requiresGeneralSearchChoice: false,
        isGeneralInfo: true,
      });
    }

    // If matches found, synthesize personalized response from verified records
    let responsePlan = `Here is what our verified locals recommend for ${destinationName || 'your destination'}:\n\n`;
    
    matchedContributions.slice(0, 3).forEach((item: any, i: number) => {
      responsePlan += `📍 **${item.title}** (${item.location.name})\n`;
      responsePlan += `• **Category**: ${item.category.toUpperCase()} | **Time**: ~${item.timeRequiredHours}h | **Cost**: ${item.costInfo.level} (${item.costInfo.estimatedAmount ? item.costInfo.currency + item.costInfo.estimatedAmount : 'Free'})\n`;
      responsePlan += `• **Verified Contributor**: ${item.contributorName} (${item.contributorRole}, verified ${item.verificationDate})\n`;
      responsePlan += `• **Local Insider Tip**: "${item.localTip}"\n`;
      responsePlan += `• **Why it's authentic**: ${item.description}\n\n`;
    });

    responsePlan += `*Every recommendation above has been audited and confirmed by verified residents. No AI guesswork was added.*`;

    return res.json({
      text: responsePlan,
      mode: "verified_local_only",
      citations: matchedContributions.slice(0, 3).map((c: any) => ({
        id: c.id,
        title: c.title,
        category: c.category,
        contributorName: c.contributorName,
        confirmationsCount: c.confirmationsCount,
        localTip: c.localTip,
        locationName: c.location.name,
      })),
      requiresGeneralSearchChoice: false,
    });
  } catch (error: any) {
    console.error("Error in companion endpoint:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`LocalRoots server running on http://${HOST}:${PORT}`);
  });
}

startServer();
