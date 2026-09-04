import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Coins, 
  Utensils, 
  CheckCircle2, 
  RotateCcw, 
  SlidersHorizontal,
  Info,
  ExternalLink
} from 'lucide-react';
import { ChatMessage, Destination, LocalContribution, LocalStory } from '../types';
import { TrustBadge } from './TrustBadge';

interface CompanionViewProps {
  destination: Destination;
  verifiedContributions: LocalContribution[];
  stories: LocalStory[];
  onSelectContribution: (item: LocalContribution) => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const CompanionView: React.FC<CompanionViewProps> = ({
  destination,
  verifiedContributions,
  stories,
  onSelectContribution,
  initialPrompt,
  onClearInitialPrompt
}) => {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! I am your LocalRoots AI Companion for ${destination.name}.\n\nMy strict operating rule is:\n**"ANSWER ONLY FROM VERIFIED LOCAL INFORMATION AVAILABLE IN THE APPLICATION."**\n\nI will never hallucinate or invent fake places or timings. If our verified local residents have not personally vetted something, I will inform you directly before offering general sources.\n\nTell me your available time, budget, dietary needs, or what kind of authentic experience you are seeking!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'verified_local_only'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Preference Filters drawer state
  const [showPreferences, setShowPreferences] = useState(false);
  const [availableHours, setAvailableHours] = useState<number | ''>(5);
  const [budgetAmount, setBudgetAmount] = useState<number | ''>(800);
  const [dietaryPreference, setDietaryPreference] = useState<string>('Vegetarian');
  const [popularity, setPopularity] = useState<'all' | 'popular' | 'less_known' | 'hidden_gem'>('less_known');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initialPrompt if provided from other views
  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt, false);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Core Send Handler
  const handleSend = async (queryText: string, allowGeneralSearch: boolean = false) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: allowGeneralSearch ? 'general_information' : 'verified_local_only'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          destinationId: destination.id,
          destinationName: destination.name,
          availableHours: availableHours === '' ? undefined : Number(availableHours),
          budgetAmount: budgetAmount === '' ? undefined : Number(budgetAmount),
          dietaryPreference: dietaryPreference === 'Any' ? undefined : dietaryPreference,
          popularity,
          allowGeneralSearch,
          verifiedContributions,
          verifiedStories: stories,
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text || "I couldn't process this verified inquiry right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: data.mode || (allowGeneralSearch ? 'general_information' : 'verified_local_only'),
        citations: data.citations || [],
        requiresGeneralSearchChoice: Boolean(data.requiresGeneralSearchChoice),
        pendingGeneralQuery: data.pendingGeneralQuery || queryText,
        isGeneralInfo: Boolean(data.isGeneralInfo)
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("AI companion error:", err);
      // Resilience fallback
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `I ran into a connection glitch, but following our strict LocalRoots rule: I will never invent answers. Our verified local repository for ${destination.name} contains ${verifiedContributions.length} audited recommendations. Please try asking again!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'verified_local_only',
        citations: []
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Preset Prompts tailored to destination
  const samplePrompts = [
    `I have 5 hours, ${destination.currencySymbol}${budgetAmount || 800}, I am ${dietaryPreference.toLowerCase()} and I want to experience local culture rather than only visiting famous tourist attractions.`,
    `Where do real verified locals go for morning food, and what are the unwritten rules?`,
    `Tell me about hidden artisan traditions or workshops that tourists usually miss.`,
    `What are the most authentic local customs or etiquette rules I should respect here?`
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 flex flex-col h-[calc(100vh-8.5rem)]">
      
      {/* Header & Core USP Banner */}
      <div className="bg-stone-900 text-stone-100 p-3 sm:p-4 rounded-2xl shadow-sm mb-3 flex flex-wrap items-center justify-between gap-3 border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold font-serif leading-tight">
                LocalRoots AI Companion
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-800 text-emerald-100 border border-emerald-600">
                AUDITED KNOWLEDGE BASE
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Grounded exclusively in {destination.name}’s {verifiedContributions.length} verified local contributions
            </p>
          </div>
        </div>

        {/* Preference drawer toggle & reset */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
              showPreferences
                ? 'bg-amber-700 border-amber-600 text-white'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Constraints & Preferences</span>
          </button>

          <button
            onClick={() => {
              setMessages([
                {
                  id: 'welcome-reset',
                  sender: 'assistant',
                  text: `Conversation reset. Grounded strictly in ${destination.name}'s verified local database. How can I assist your journey?`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  mode: 'verified_local_only'
                }
              ]);
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapsible Traveler Preferences Drawer */}
      {showPreferences && (
        <div className="bg-white border border-stone-200 rounded-xl p-4 mb-3 shadow-sm animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              Personalized Recommendation Filters
            </span>
            <span className="text-[11px] text-stone-400">
              The AI ranks verified records matching these exact inputs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-stone-500 mb-1 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> Available Time (Hours)
              </label>
              <input
                type="number"
                min={1}
                max={48}
                value={availableHours}
                onChange={(e) => setAvailableHours(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 5"
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1 font-medium flex items-center gap-1">
                <Coins className="w-3 h-3" /> Budget ({destination.currencySymbol})
              </label>
              <input
                type="number"
                min={0}
                step={50}
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 800"
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1 font-medium flex items-center gap-1">
                <Utensils className="w-3 h-3" /> Food Preference
              </label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600 bg-white"
              >
                <option value="Any">Any / All</option>
                <option value="Vegetarian">Pure Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Jain">Jain Friendly</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-500 mb-1 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Experience Focus
              </label>
              <select
                value={popularity}
                onChange={(e) => setPopularity(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600 bg-white"
              >
                <option value="less_known">Less-Known & Authentic</option>
                <option value="hidden_gem">Secret Hidden Gems</option>
                <option value="popular">Classic Famous Spots</option>
                <option value="all">Mix of Everything</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-stone-50/70 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-3xl rounded-2xl p-4 sm:p-5 text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-amber-800 text-white rounded-br-xs'
                  : msg.isGeneralInfo
                  ? 'bg-amber-50/90 border-2 border-amber-300 text-stone-900 rounded-bl-xs'
                  : 'bg-white border border-stone-200 text-stone-900 rounded-bl-xs'
              }`}
            >
              {/* Header inside assistant message */}
              {msg.sender === 'assistant' && (
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-100 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {msg.isGeneralInfo ? (
                      <span className="flex items-center gap-1 text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded-md">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        GENERAL INFORMATION (UNVERIFIED)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        VERIFIED LOCAL KNOWLEDGE
                      </span>
                    )}
                  </div>
                  <span className="text-stone-400 text-[11px]">{msg.timestamp}</span>
                </div>
              )}

              {/* Message text with whitespace support */}
              <div className="whitespace-pre-line">
                {msg.text}
              </div>

              {/* Citations Box (Verified Local items cited) */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                  <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Local Citations in this response:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.citations.map((cite) => {
                      const fullItem = verifiedContributions.find(c => c.id === cite.id);
                      return (
                        <div
                          key={cite.id}
                          onClick={() => fullItem && onSelectContribution(fullItem)}
                          className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 hover:bg-emerald-100/60 transition-colors cursor-pointer text-xs group"
                        >
                          <div className="flex items-center justify-between font-semibold text-emerald-950">
                            <span className="truncate group-hover:text-amber-900 transition-colors">
                              {cite.title}
                            </span>
                            <ExternalLink className="w-3 h-3 text-emerald-600 shrink-0 ml-1 opacity-60 group-hover:opacity-100" />
                          </div>
                          <div className="text-stone-500 text-[11px] mt-0.5">
                            By {cite.contributorName} • {cite.confirmationsCount} local vouches
                          </div>
                          <div className="text-emerald-800 text-[11px] italic mt-1 line-clamp-1">
                            "{cite.localTip}"
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NO-HALLUCINATION DECISION PROMPT: Choice 1 (Local Only) vs Choice 2 (Search General) */}
              {msg.requiresGeneralSearchChoice && (
                <div className="mt-4 p-3.5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-700" />
                    How would you like the AI Companion to proceed?
                  </div>
                  <p className="text-amber-900">
                    Our verified residents haven't audited this specific question yet. In accordance with the LocalRoots No-Hallucination Policy, please choose:
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        const localOnlyMsg: ChatMessage = {
                          id: `assistant-${Date.now()}`,
                          sender: 'assistant',
                          text: `[STRICT LOCAL ONLY MODE ENFORCED]\n\nI will strictly remain within our verified local database. Because no local resident has audited this specific detail yet, I will not make any assumptions or invent facts.\n\nYou can explore our other verified categories or submit this place for resident review in the "Submit Local Information" section.`,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          mode: 'verified_local_only',
                          citations: []
                        };
                        setMessages(prev => [...prev, localOnlyMsg]);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold shadow-xs transition-colors"
                    >
                      1. LOCAL ONLY (Keep strict verified boundaries)
                    </button>

                    <button
                      onClick={() => {
                        handleSend(msg.pendingGeneralQuery || "Search general sources", true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold shadow-xs transition-colors"
                    >
                      2. SEARCH GENERAL INFORMATION (With unverified label)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs p-4 text-xs text-stone-600 shadow-xs flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Auditing verified local knowledge base for {destination.name}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Quick Chips */}
      <div className="pt-2 pb-1 overflow-x-auto scrollbar-none flex gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt, false)}
            disabled={isLoading}
            className="px-3 py-1 rounded-full text-xs bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 shrink-0 whitespace-nowrap transition-colors max-w-sm truncate"
            title={prompt}
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputQuery, false);
        }}
        className="pt-2 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`Ask anything about ${destination.name} (Answers strictly drawn from verified locals)...`}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent text-sm bg-white shadow-xs"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:bg-stone-300 text-white text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Companion</span>
        </button>
      </form>

    </div>
  );
};
