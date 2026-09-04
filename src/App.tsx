import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { CategoriesView } from './components/CategoriesView';
import { CompanionView } from './components/CompanionView';
import { NearbyView } from './components/NearbyView';
import { StoriesView } from './components/StoriesView';
import { VerifiedLocalsView } from './components/VerifiedLocalsView';
import { SubmitContributionView } from './components/SubmitContributionView';
import { SavedPlacesView } from './components/SavedPlacesView';
import { TripPlanView } from './components/TripPlanView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { ContributionDetailModal } from './components/ContributionDetailModal';

import { 
  Destination, 
  LocalContribution, 
  LocalStory, 
  LocalContributor, 
  ActiveTab, 
  UserRole, 
  CategoryType 
} from './types';
import { 
  destinations as initialDestinations, 
  mockContributions as initialContributions, 
  mockStories as initialStories, 
  mockContributors as initialContributors 
} from './data/mockData';
import { ShieldCheck, Heart, Sparkles, Bot, Compass, Bookmark } from 'lucide-react';

export function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('traveler');
  
  // Destination State
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [selectedDestination, setSelectedDestination] = useState<Destination>(initialDestinations[0]);

  // Data Collections State
  const [contributions, setContributions] = useState<LocalContribution[]>(() => {
    const saved = localStorage.getItem('localroots_contributions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialContributions;
  });

  const [stories, setStories] = useState<LocalStory[]>(initialStories);
  const [contributors, setContributors] = useState<LocalContributor[]>(initialContributors);

  // Saved / Bookmarked Places
  const [savedPlaces, setSavedPlaces] = useState<{ contribution: LocalContribution; note?: string }[]>(() => {
    const saved = localStorage.getItem('localroots_saved_places');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Local resident vouches confirmed by user in this session
  const [confirmedIds, setConfirmedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('localroots_confirmed_ids');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Modals & Prompts
  const [inspectingItem, setInspectingItem] = useState<LocalContribution | null>(null);
  const [selectedStory, setSelectedStory] = useState<LocalStory | null>(null);
  const [companionInitialPrompt, setCompanionInitialPrompt] = useState<string | undefined>(undefined);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryType | 'all'>('all');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('localroots_contributions', JSON.stringify(contributions));
  }, [contributions]);

  useEffect(() => {
    localStorage.setItem('localroots_saved_places', JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  useEffect(() => {
    localStorage.setItem('localroots_confirmed_ids', JSON.stringify(confirmedIds));
  }, [confirmedIds]);

  // Handlers
  const handleToggleSave = (item: LocalContribution) => {
    setSavedPlaces(prev => {
      const exists = prev.find(p => p.contribution.id === item.id);
      if (exists) {
        return prev.filter(p => p.contribution.id !== item.id);
      } else {
        return [...prev, { contribution: item, note: '' }];
      }
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedPlaces(prev => prev.filter(p => p.contribution.id !== id));
  };

  const handleUpdateNote = (id: string, note: string) => {
    setSavedPlaces(prev => prev.map(p => {
      if (p.contribution.id === id) {
        return { ...p, note };
      }
      return p;
    }));
  };

  const handleConfirmLocalVouch = (id: string) => {
    if (confirmedIds.includes(id)) return;
    setConfirmedIds(prev => [...prev, id]);

    // Increment confirmation count on item
    setContributions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          confirmationsCount: item.confirmationsCount + 1,
          confirmedByLocals: [...(item.confirmedByLocals || []), userRole === 'verified_local' ? 'You (Verified Resident)' : 'Resident Visitor']
        };
      }
      return item;
    }));

    if (inspectingItem && inspectingItem.id === id) {
      setInspectingItem(prev => prev ? {
        ...prev,
        confirmationsCount: prev.confirmationsCount + 1
      } : null);
    }
  };

  const handleSubmitNewContribution = (newContribution: LocalContribution) => {
    setContributions(prev => [newContribution, ...prev]);
  };

  const handleApproveContribution = (id: string) => {
    setContributions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          verificationStatus: 'verified',
          verificationDate: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const handleRejectContribution = (id: string) => {
    setContributions(prev => prev.filter(item => item.id !== id));
  };

  const handleAskCompanion = (prompt: string) => {
    setCompanionInitialPrompt(prompt);
    setActiveTab('ai_companion');
  };

  const handleSelectCategoryFromGrid = (cat: CategoryType) => {
    setSelectedCategoryFilter(cat);
    setActiveTab('explore');
  };

  const pendingCount = contributions.filter(c => c.verificationStatus === 'pending').length;
  const verifiedOnlyContributions = contributions.filter(c => c.verificationStatus === 'verified');
  const savedIds = savedPlaces.map(p => p.contribution.id);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedDestination={selectedDestination}
        destinations={destinations}
        onSelectDestination={setSelectedDestination}
        userRole={userRole}
        onSelectRole={setUserRole}
        savedCount={savedPlaces.length}
        pendingVerificationCount={pendingCount}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomeView
            destination={selectedDestination}
            destinations={destinations}
            onSelectDestination={setSelectedDestination}
            verifiedContributions={verifiedOnlyContributions}
            stories={stories}
            onSelectTab={setActiveTab}
            onSelectContribution={(item) => setInspectingItem(item)}
            onSelectStory={(story) => {
              setSelectedStory(story);
              setActiveTab('local_stories');
            }}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            destination={selectedDestination}
            verifiedContributions={verifiedOnlyContributions}
            savedIds={savedIds}
            confirmedIds={confirmedIds}
            onToggleSave={handleToggleSave}
            onConfirmLocal={handleConfirmLocalVouch}
            onSelectContribution={(item) => setInspectingItem(item)}
            onAskCompanion={handleAskCompanion}
            initialCategory={selectedCategoryFilter}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            destination={selectedDestination}
            verifiedContributions={verifiedOnlyContributions}
            onSelectCategory={handleSelectCategoryFromGrid}
          />
        )}

        {activeTab === 'ai_companion' && (
          <CompanionView
            destination={selectedDestination}
            verifiedContributions={verifiedOnlyContributions}
            stories={stories}
            onSelectContribution={(item) => setInspectingItem(item)}
            initialPrompt={companionInitialPrompt}
            onClearInitialPrompt={() => setCompanionInitialPrompt(undefined)}
          />
        )}

        {activeTab === 'nearby' && (
          <NearbyView
            destination={selectedDestination}
            verifiedContributions={verifiedOnlyContributions}
            onSelectContribution={(item) => setInspectingItem(item)}
          />
        )}

        {activeTab === 'local_stories' && (
          <StoriesView
            destination={selectedDestination}
            stories={stories}
            verifiedContributions={verifiedOnlyContributions}
            onSelectContribution={(item) => setInspectingItem(item)}
            selectedStory={selectedStory}
            onCloseStory={() => setSelectedStory(null)}
            onSelectStory={(s) => setSelectedStory(s)}
          />
        )}

        {activeTab === 'verified_locals' && (
          <VerifiedLocalsView
            destination={selectedDestination}
            contributors={contributors}
            verifiedContributions={verifiedOnlyContributions}
            onSelectContribution={(item) => setInspectingItem(item)}
          />
        )}

        {activeTab === 'submit_info' && (
          <SubmitContributionView
            destinations={destinations}
            selectedDestination={selectedDestination}
            onSubmit={handleSubmitNewContribution}
            userRole={userRole}
          />
        )}

        {activeTab === 'saved_places' && (
          <SavedPlacesView
            savedItems={savedPlaces}
            onRemoveSaved={handleRemoveSaved}
            onUpdateNote={handleUpdateNote}
            onSelectContribution={(item) => setInspectingItem(item)}
            onAskCompanion={handleAskCompanion}
          />
        )}

        {activeTab === 'trip_plan' && (
          <TripPlanView
            destination={selectedDestination}
            verifiedContributions={verifiedOnlyContributions}
            onSelectContribution={(item) => setInspectingItem(item)}
            onAskCompanion={handleAskCompanion}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardView
            destinations={destinations}
            allContributions={contributions}
            onApproveContribution={handleApproveContribution}
            onRejectContribution={handleRejectContribution}
            onSelectContribution={(item) => setInspectingItem(item)}
          />
        )}
      </main>

      {/* Global Detail Modal */}
      <ContributionDetailModal
        item={inspectingItem}
        onClose={() => setInspectingItem(null)}
        isSaved={inspectingItem ? savedIds.includes(inspectingItem.id) : false}
        onToggleSave={handleToggleSave}
        onConfirmLocal={handleConfirmLocalVouch}
        hasConfirmed={inspectingItem ? confirmedIds.includes(inspectingItem.id) : false}
        onOpenCompanionWithPrompt={handleAskCompanion}
      />

      {/* Trust & Transparency Footer */}
      <footer className="border-t border-stone-200 bg-white/70 py-8 text-xs text-stone-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 text-sm">LocalRoots</span>
            <span>•</span>
            <span className="text-stone-600 font-medium">Authentic Knowledge Grounded by Verified Residents</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Strict No-Hallucination AI Standard
            </span>
            <span>•</span>
            <span>Role active: <strong className="capitalize text-stone-800">{userRole.replace('_', ' ')}</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default App;
