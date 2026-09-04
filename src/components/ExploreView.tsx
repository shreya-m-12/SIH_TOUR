import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Coins, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  CheckCircle2, 
  Utensils, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { CategoryType, Destination, LocalContribution } from '../types';
import { TrustBadge } from './TrustBadge';

interface ExploreViewProps {
  destination: Destination;
  verifiedContributions: LocalContribution[];
  savedIds: string[];
  confirmedIds: string[];
  onToggleSave: (item: LocalContribution) => void;
  onConfirmLocal: (id: string) => void;
  onSelectContribution: (item: LocalContribution) => void;
  onAskCompanion: (itemTitle: string) => void;
  initialCategory?: CategoryType | 'all';
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  destination,
  verifiedContributions,
  savedIds,
  confirmedIds,
  onToggleSave,
  onConfirmLocal,
  onSelectContribution,
  onAskCompanion,
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedPopularity, setSelectedPopularity] = useState<string>('all');
  const [selectedCost, setSelectedCost] = useState<string>('all');

  // Filter logic
  const filteredItems = useMemo(() => {
    return verifiedContributions.filter(item => {
      // Must match current destination
      if (item.destinationId !== destination.id) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullText = `${item.title} ${item.description} ${item.localTip} ${item.location.name} ${item.location.area} ${item.contributorName}`.toLowerCase();
        if (!fullText.includes(q)) return false;
      }

      // Dietary filter
      if (selectedDiet !== 'all') {
        if (!item.dietary?.includes(selectedDiet as any) && item.category === 'food') {
          return false;
        }
      }

      // Popularity filter
      if (selectedPopularity !== 'all' && item.popularity !== selectedPopularity) {
        return false;
      }

      // Cost level filter
      if (selectedCost !== 'all' && item.costInfo.level.toLowerCase() !== selectedCost.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [verifiedContributions, destination.id, selectedCategory, searchQuery, selectedDiet, selectedPopularity, selectedCost]);

  const categories: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Verified Items' },
    { id: 'places', label: 'Places to Visit' },
    { id: 'heritage', label: 'Historical & Cultural' },
    { id: 'food', label: 'Local Food & Sweets' },
    { id: 'markets', label: 'Markets & Crafts' },
    { id: 'festivals', label: 'Festivals & Events' },
    { id: 'traditions', label: 'Traditions & Customs' },
    { id: 'hidden_gems', label: 'Hidden Places' },
    { id: 'guides', label: 'Experiences & Guides' },
    { id: 'practical', label: 'Practical Travel' },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header section with destination info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Verified Local Knowledge Base
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Explore {destination.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Showing {filteredItems.length} verified spots audited by {destination.verifiedLocalsCount} local residents
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish, tip, area..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="overflow-x-auto scrollbar-none pb-1">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Filter Controls (Dietary, Popularity, Cost) */}
      <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex flex-wrap items-center gap-3 text-xs">
        <span className="text-stone-500 font-medium flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          Filters:
        </span>

        {/* Dietary */}
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
          <Utensils className="w-3 h-3 text-stone-400" />
          <span className="text-stone-500">Diet:</span>
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Diets</option>
            <option value="Vegetarian">Pure Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Jain">Jain</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        {/* Popularity */}
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
          <Sparkles className="w-3 h-3 text-stone-400" />
          <span className="text-stone-500">Style:</span>
          <select
            value={selectedPopularity}
            onChange={(e) => setSelectedPopularity(e.target.value)}
            className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Experiences</option>
            <option value="famous">Classic Famous</option>
            <option value="less_known">Less-Known</option>
            <option value="hidden_gem">Hidden Gems Only</option>
          </select>
        </div>

        {/* Cost */}
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
          <Coins className="w-3 h-3 text-stone-400" />
          <span className="text-stone-500">Cost:</span>
          <select
            value={selectedCost}
            onChange={(e) => setSelectedCost(e.target.value)}
            className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
          >
            <option value="all">Any Price</option>
            <option value="free">Free Only</option>
            <option value="budget">Budget Friendly</option>
            <option value="moderate">Moderate</option>
          </select>
        </div>

        {/* Reset button if filters active */}
        {(selectedCategory !== 'all' || searchQuery || selectedDiet !== 'all' || selectedPopularity !== 'all' || selectedCost !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedDiet('all');
              setSelectedPopularity('all');
              setSelectedCost('all');
            }}
            className="ml-auto text-amber-800 hover:text-amber-900 font-semibold underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Verified Contributions */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 border border-dashed border-stone-300 rounded-3xl p-8 space-y-3">
          <ShieldCheck className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-700">No verified entries matched your filter</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            In accordance with LocalRoots rules, we never invent answers or fake places when filters don't match verified local knowledge. Try relaxing filters or ask our AI Companion!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isSaved = savedIds.includes(item.id);
            const hasConfirmed = confirmedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onSelectContribution(item)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & badges */}
                  <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-xs">
                        {item.category.replace('_', ' ')}
                      </span>
                      {item.popularity === 'hidden_gem' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                          Hidden Gem
                        </span>
                      )}
                    </div>

                    {/* Bookmark quick button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(item);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-sm transition-colors"
                      title={isSaved ? "Saved" : "Save place"}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-700 fill-amber-700" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    <div className="absolute bottom-3 left-3 right-3">
                      <TrustBadge
                        status={item.verificationStatus}
                        confirmationsCount={item.confirmationsCount}
                        contributorName={item.contributorName}
                        compact
                      />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-stone-900 text-base font-serif group-hover:text-amber-800 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{item.location.name} — {item.location.area}</span>
                      </p>
                      <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Key Metrics Chips */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-stone-500 pt-1">
                      <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-stone-400" />
                        ~{item.timeRequiredHours}h
                      </span>
                      <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md">
                        <Coins className="w-3 h-3 text-stone-400" />
                        {item.costInfo.level} {item.costInfo.estimatedAmount ? `(${item.costInfo.currency}${item.costInfo.estimatedAmount})` : ''}
                      </span>
                      {item.dietary && item.dietary.length > 0 && (
                        <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md text-emerald-800 font-medium">
                          {item.dietary[0]}
                        </span>
                      )}
                    </div>

                    {/* Local Tip Box */}
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/50 text-xs">
                      <span className="font-bold text-amber-900 block mb-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Verified Local Insider Tip:
                      </span>
                      <p className="text-amber-950 line-clamp-2 italic">
                        "{item.localTip}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400">
                    By {item.contributorName}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskCompanion(`Tell me more about ${item.title}`);
                    }}
                    className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
                  >
                    <span>Ask AI</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
