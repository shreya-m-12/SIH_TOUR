import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Coins, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  ShieldCheck, 
  Users, 
  Utensils, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { LocalContribution } from '../types';
import { TrustBadge } from './TrustBadge';

interface ContributionDetailModalProps {
  item: LocalContribution | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (item: LocalContribution) => void;
  onConfirmLocal: (id: string) => void;
  hasConfirmed: boolean;
  onOpenCompanionWithPrompt?: (prompt: string) => void;
}

export const ContributionDetailModal: React.FC<ContributionDetailModalProps> = ({
  item,
  onClose,
  isSaved,
  onToggleSave,
  onConfirmLocal,
  hasConfirmed,
  onOpenCompanionWithPrompt
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with Floating Action Buttons */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-100 overflow-hidden">
          <img
            src={item.images[0] || 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80'}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Verified Badge */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-700 text-white shadow-xs">
              {item.category.replace('_', ' ')}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white flex items-center gap-1 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              VERIFIED LOCAL
            </span>
          </div>

          {/* Title & Location in hero banner */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
              {item.title}
            </h2>
            <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm mt-1">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{item.location.name} — {item.location.area}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Trust Verification Card */}
          <TrustBadge
            status={item.verificationStatus}
            confirmationsCount={item.confirmationsCount}
            verificationDate={item.verificationDate}
            contributorName={item.contributorName}
            contributorRole={item.contributorRole}
            sourceLabel={item.sourceLabel}
            onConfirm={() => onConfirmLocal(item.id)}
            hasConfirmed={hasConfirmed}
          />

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-500 shrink-0" />
              <div>
                <span className="text-stone-500 block">Best Timing</span>
                <span className="font-semibold text-stone-800">{item.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-stone-500 shrink-0" />
              <div>
                <span className="text-stone-500 block">Cost / Level</span>
                <span className="font-semibold text-stone-800">
                  {item.costInfo.level} {item.costInfo.estimatedAmount ? `(~${item.costInfo.currency}${item.costInfo.estimatedAmount})` : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-500 shrink-0" />
              <div>
                <span className="text-stone-500 block">Duration</span>
                <span className="font-semibold text-stone-800">~{item.timeRequiredHours} Hours</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-stone-500 block">Experience Type</span>
                <span className="font-semibold capitalize text-stone-800">{item.popularity.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Dietary Tags if applicable */}
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-stone-500 shrink-0" />
              <span className="text-xs text-stone-500 font-medium">Dietary Options:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.dietary.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Local Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-2">
              Authentic Local Context
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* Local Secret Tip Callout (Gold highlight) */}
          <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Verified Local Insider Tip
            </div>
            <p className="text-amber-950 font-medium text-sm mt-1.5 leading-relaxed">
              "{item.localTip}"
            </p>
          </div>

          {/* Direction & Transit Advice */}
          {item.location.directionsTip && (
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-600">
              <span className="font-semibold text-stone-800 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                Local Directions Advice:
              </span>
              {item.location.directionsTip}
            </div>
          )}

          {/* Confirmed by locals list */}
          {item.confirmedByLocals && item.confirmedByLocals.length > 0 && (
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
              <span className="font-medium text-stone-700">Confirmed by local resident community: </span>
              {item.confirmedByLocals.join(' • ')}
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(item)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${
                  isSaved
                    ? 'bg-amber-800 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    Saved to Itinerary
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    Save Place
                  </>
                )}
              </button>

              {onOpenCompanionWithPrompt && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCompanionWithPrompt(`Tell me more verified local details about ${item.title} and how to fit it into my day`);
                  }}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Ask AI Companion
                </button>
              )}
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Place link copied to clipboard!");
              }}
              className="px-3 py-2 rounded-xl text-xs text-stone-600 hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
