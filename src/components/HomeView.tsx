import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Bot, 
  Compass, 
  BookOpen, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import { Destination, LocalContribution, LocalStory, ActiveTab } from '../types';
import { TrustBadge } from './TrustBadge';

interface HomeViewProps {
  destination: Destination;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  verifiedContributions: LocalContribution[];
  stories: LocalStory[];
  onSelectTab: (tab: ActiveTab) => void;
  onSelectContribution: (item: LocalContribution) => void;
  onSelectStory: (story: LocalStory) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  destination,
  destinations,
  onSelectDestination,
  verifiedContributions,
  stories,
  onSelectTab,
  onSelectContribution,
  onSelectStory
}) => {
  const currentContributions = verifiedContributions.filter(c => c.destinationId === destination.id);
  const currentStories = stories.filter(s => s.destinationId === destination.id);

  // Group highlights
  const topSpots = currentContributions.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner with Destination Atmosphere */}
      <section className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[460px] flex items-end shadow-xl border border-stone-800">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-105 transition-transform duration-700 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/20" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-4xl space-y-4">
          
          {/* Tag & Verification pill */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-600/90 text-white backdrop-blur-xs">
              {destination.region}, {destination.country}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 flex items-center gap-1.5 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {destination.verifiedLocalsCount} Verified Resident Contributors
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight">
            {destination.name}
          </h1>

          <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {destination.description}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => onSelectTab('ai_companion')}
              className="px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Bot className="w-4 h-4" />
              Ask AI Companion (Local Knowledge Only)
            </button>

            <button
              onClick={() => onSelectTab('explore')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              Explore All {currentContributions.length} Verified Spots
            </button>
          </div>

          {/* Quick Destination Switcher Pills */}
          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Switch Prototype Destination:</span>
            {destinations.map(d => (
              <button
                key={d.id}
                onClick={() => onSelectDestination(d)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  d.id === destination.id
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-white/15 hover:bg-white/25 text-stone-200'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* CORE USP & TRUST ARCHITECTURE BANNER */}
      <section className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
            LocalRoots Fundamental Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            “AI that learns from verified locals, not AI that pretends to know everything.”
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Most travel apps rely on scrapers and hallucinating general chatbots. LocalRoots builds a verified resident knowledge vault. If an experience or timing isn't validated by someone who belongs to the place, the AI refuses to guess.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Verified Resident Network</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Every recommendation originates from residents with proof of tenure, ancestral artisans, or certified heritage guides.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">No-Hallucination AI Companion</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Rule: <em>No verified local information = No local answer.</em> If missing, it halts and asks permission before searching general sources.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">Community Peer Confirmation</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Submissions undergo peer confirmation by other local residents with transparent audit timestamps and source attribution.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED VERIFIED LOCAL HIGHLIGHTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Resident Selected
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Verified Highlights in {destination.name}
            </h2>
          </div>

          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            <span>View all spots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSpots.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectContribution(item)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <TrustBadge
                    status={item.verificationStatus}
                    confirmationsCount={item.confirmationsCount}
                    contributorName={item.contributorName}
                    compact
                  />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-base font-serif group-hover:text-amber-800 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    {item.location.name}
                  </p>
                  <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="bg-amber-50/70 p-2.5 rounded-xl text-xs text-amber-950 font-medium line-clamp-2">
                    <span className="font-bold text-amber-900">Local Tip: </span>
                    "{item.localTip}"
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VERIFIED LOCAL STORIES SPOTLIGHT */}
      {currentStories.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Personal Narratives
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                Local Stories & Essays
              </h2>
            </div>

            <button
              onClick={() => onSelectTab('local_stories')}
              className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
            >
              <span>Read all stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="bg-stone-900 text-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between p-6 sm:p-8 relative group"
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-600 text-white">
                      Verified Story
                    </span>
                    <span className="text-xs text-stone-300">{story.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={story.authorAvatar}
                      alt={story.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-white/30"
                    />
                    <div>
                      <span className="font-semibold block text-white">{story.authorName}</span>
                      <span className="text-stone-400 text-[11px]">{story.authorTenure}</span>
                    </div>
                  </div>

                  <span className="text-amber-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Story & Route →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* QUICK CATEGORY ENTRY GRID */}
      <section className="bg-amber-950/5 border border-amber-900/10 rounded-3xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-2xl font-bold font-serif text-stone-900">
            Explore {destination.name} by Verified Categories
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Carefully cataloged with local etiquette, timings, and dietary flags
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Places to Visit', cat: 'places', desc: 'Monuments, viewpoints & temples' },
            { label: 'Local Food & Sweets', cat: 'food', desc: 'Vegetarian, secret stalls & cafés' },
            { label: 'Markets & Crafts', cat: 'markets', desc: 'Bazaars, jasmine & silk weaving' },
            { label: 'Traditions & Customs', cat: 'traditions', desc: 'Morning rituals & festivals' },
            { label: 'Hidden Gems', cat: 'hidden_gems', desc: 'Quiet courtyards & uncrowded spots' },
            { label: 'Local Guides', cat: 'guides', desc: 'Master artisans & resident hosts' },
            { label: 'Heritage Walk', cat: 'heritage', desc: 'Agrahara alleys & clock towers' },
            { label: 'Practical Travel', cat: 'practical', desc: 'Tonga etiquette, fares & timings' },
          ].map((c) => (
            <button
              key={c.cat}
              onClick={() => onSelectTab('explore')}
              className="p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-700/50 hover:shadow-xs text-left transition-all group"
            >
              <span className="font-bold text-sm text-stone-900 group-hover:text-amber-800 block">
                {c.label}
              </span>
              <span className="text-[11px] text-stone-500 mt-1 block">
                {c.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
