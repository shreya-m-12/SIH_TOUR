import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Share2, 
  ChevronRight, 
  Bookmark, 
  X,
  Sparkles
} from 'lucide-react';
import { Destination, LocalContribution, LocalStory } from '../types';

interface StoriesViewProps {
  destination: Destination;
  stories: LocalStory[];
  verifiedContributions: LocalContribution[];
  onSelectContribution: (item: LocalContribution) => void;
  selectedStory?: LocalStory | null;
  onCloseStory?: () => void;
  onSelectStory: (story: LocalStory) => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  destination,
  stories,
  verifiedContributions,
  onSelectContribution,
  selectedStory,
  onCloseStory,
  onSelectStory
}) => {
  const currentStories = stories.filter(s => s.destinationId === destination.id);
  const [activeStoryModal, setActiveStoryModal] = useState<LocalStory | null>(selectedStory || null);

  const handleOpenStory = (story: LocalStory) => {
    setActiveStoryModal(story);
    onSelectStory(story);
  };

  const handleCloseStory = () => {
    setActiveStoryModal(null);
    if (onCloseStory) onCloseStory();
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          First-Person Experiences
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
          Verified Local Stories in {destination.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Authentic memoirs, twilight walks, and culinary rituals shared by lifetime residents.
        </p>
      </div>

      {/* Grid of stories */}
      {currentStories.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <p className="text-stone-600 font-medium text-sm">No stories published for this destination yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentStories.map((story) => (
            <div
              key={story.id}
              onClick={() => handleOpenStory(story)}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-700 text-white shadow-xs">
                      Resident Memoir
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-stone-300 mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{story.readTime}</span>
                      <span>•</span>
                      <span>{story.confirmationsCount} local vouches</span>
                    </div>
                    <h2 className="text-xl font-bold font-serif leading-snug group-hover:text-amber-300 transition-colors">
                      {story.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {story.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Footer */}
              <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={story.authorAvatar}
                    alt={story.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-stone-300"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">{story.authorName}</span>
                    <span className="text-stone-500 text-[11px]">{story.authorTenure}</span>
                  </div>
                </div>

                <span className="font-semibold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Story →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL STORY MODAL / DRAWER */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 border border-stone-200">
            
            {/* Modal Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeStoryModal.coverImage}
                alt={activeStoryModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <button
                onClick={handleCloseStory}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Local Narrative • {activeStoryModal.readTime}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                  {activeStoryModal.title}
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm">
                  {activeStoryModal.subtitle}
                </p>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Contributor Credential Card */}
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={activeStoryModal.authorAvatar}
                    alt={activeStoryModal.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-stone-300"
                  />
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{activeStoryModal.authorName}</div>
                    <div className="text-stone-500">{activeStoryModal.authorRole} ({activeStoryModal.authorTenure})</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold block text-[11px]">
                    Verified Story
                  </span>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    {activeStoryModal.confirmationsCount} resident confirmations
                  </span>
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed">
                {activeStoryModal.content.map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-2xl first-letter:font-serif first-letter:font-bold">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Linked Verified Spots in this Story */}
              {activeStoryModal.linkedContributionIds && activeStoryModal.linkedContributionIds.length > 0 && (
                <div className="pt-6 border-t border-stone-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    Verified Local Spots Featured in This Story:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStoryModal.linkedContributionIds.map(id => {
                      const place = verifiedContributions.find(c => c.id === id);
                      if (!place) return null;

                      return (
                        <div
                          key={id}
                          onClick={() => {
                            handleCloseStory();
                            onSelectContribution(place);
                          }}
                          className="p-3 bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200/80 rounded-xl cursor-pointer transition-colors text-xs flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-stone-900 block">{place.title}</span>
                            <span className="text-stone-500 text-[11px]">{place.location.name}</span>
                          </div>
                          <span className="text-amber-800 font-semibold">View Details →</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={handleCloseStory}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold"
                >
                  Close Story
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
