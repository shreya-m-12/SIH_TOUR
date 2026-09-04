import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  MapPin, 
  Clock, 
  Coins, 
  Share2, 
  Printer, 
  Edit3, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LocalContribution } from '../types';
import { TrustBadge } from './TrustBadge';

interface SavedPlacesViewProps {
  savedItems: { contribution: LocalContribution; note?: string }[];
  onRemoveSaved: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onSelectContribution: (item: LocalContribution) => void;
  onAskCompanion: (prompt: string) => void;
}

export const SavedPlacesView: React.FC<SavedPlacesViewProps> = ({
  savedItems,
  onRemoveSaved,
  onUpdateNote,
  onSelectContribution,
  onAskCompanion
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState<string>('');

  const handleStartEdit = (id: string, currentNote?: string) => {
    setEditingId(id);
    setTempNote(currentNote || '');
  };

  const handleSaveNote = (id: string) => {
    onUpdateNote(id, tempNote);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Traveler’s Personal Collection
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Saved Places & Custom Notes
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {savedItems.length} verified spots bookmarked for your trip.
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Itinerary Checklist
            </button>
          </div>
        )}
      </div>

      {savedItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 border border-dashed border-stone-300 rounded-3xl p-8 space-y-3">
          <Bookmark className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-700">No saved places yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Click the bookmark icon on any verified local place in the Explore tab or AI Companion to assemble your itinerary.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedItems.map(({ contribution: item, note }) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-xs">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveSaved(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-red-50 text-stone-600 hover:text-red-700 shadow-sm transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
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

                <div className="p-5 space-y-3">
                  <div 
                    onClick={() => onSelectContribution(item)}
                    className="cursor-pointer group"
                  >
                    <h3 className="font-bold text-stone-900 text-base font-serif group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{item.location.name} — {item.location.area}</span>
                    </p>
                  </div>

                  {/* Local Tip */}
                  <div className="bg-amber-50/70 p-2.5 rounded-xl text-xs text-amber-950 font-medium">
                    <span className="font-bold text-amber-900">Local Tip: </span>
                    "{item.localTip}"
                  </div>

                  {/* Custom Personal Note Box */}
                  <div className="pt-2 border-t border-stone-100 text-xs">
                    {editingId === item.id ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add your personal notes, e.g. visit on Tuesday morning..."
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2 py-1 text-stone-500 hover:text-stone-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(item.id)}
                            className="px-3 py-1 bg-amber-800 text-white rounded-md font-semibold"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <div>
                          <span className="font-semibold text-stone-700 block text-[11px]">Your Note:</span>
                          <p className="text-stone-600 text-xs mt-0.5 italic">
                            {note || "No notes added yet."}
                          </p>
                        </div>
                        <button
                          onClick={() => handleStartEdit(item.id, note)}
                          className="text-stone-400 hover:text-stone-700 p-1"
                          title="Edit note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectContribution(item)}
                  className="text-amber-800 hover:text-amber-950 font-semibold"
                >
                  View Full Details →
                </button>

                <button
                  onClick={() => onAskCompanion(`Give me an itinerary that includes ${item.title}`)}
                  className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Route in AI
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
