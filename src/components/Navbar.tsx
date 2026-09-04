import React from 'react';
import { 
  Compass, 
  Bot, 
  BookOpen, 
  MapPin, 
  Bookmark, 
  CalendarDays, 
  ShieldCheck, 
  PlusCircle, 
  Users, 
  Layers, 
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { ActiveTab, Destination } from '../types';

interface NavbarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  destinations: Destination[];
  selectedDestination: Destination;
  onSelectDestination: (dest: Destination) => void;
  savedCount: number;
  userRole: 'traveler' | 'verified_local' | 'admin';
  onChangeRole: (role: 'traveler' | 'verified_local' | 'admin') => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  destinations,
  selectedDestination,
  onSelectDestination,
  savedCount,
  userRole,
  onChangeRole,
  pendingCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Bar: Brand, Destination Switcher, Role Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-700 text-amber-50 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-amber-800 transition-colors">
                LR
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-stone-900 block leading-tight font-serif">
                  LocalRoots
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold block">
                  Verified Local Discovery
                </span>
              </div>
            </button>

            {/* Destination Selector Pill */}
            <div className="relative ml-2 sm:ml-4">
              <div className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200/80 rounded-full px-3 py-1.5 transition-colors border border-stone-200">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <select
                  value={selectedDestination.id}
                  onChange={(e) => {
                    const found = destinations.find(d => d.id === e.target.value);
                    if (found) onSelectDestination(found);
                  }}
                  className="bg-transparent text-xs font-semibold text-stone-900 pr-5 appearance-none focus:outline-none cursor-pointer"
                  title="Select destination"
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}, {d.country} ({d.currencySymbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Header Controls: Role Selector & Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
              <span className="px-2 py-0.5 text-[11px] font-medium text-stone-500">Role:</span>
              <button
                onClick={() => onChangeRole('traveler')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  userRole === 'traveler'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Traveler
              </button>
              <button
                onClick={() => onChangeRole('verified_local')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                  userRole === 'verified_local'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                Verified Local
              </button>
              <button
                onClick={() => onChangeRole('admin')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 relative ${
                  userRole === 'admin'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                Admin
                {pendingCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>

            {/* Saved Places button */}
            <button
              onClick={() => onSelectTab('saved')}
              className={`p-2 rounded-lg text-stone-700 hover:bg-stone-100 relative transition-colors ${
                currentTab === 'saved' ? 'bg-stone-100 text-amber-800' : ''
              }`}
              title="Saved Places"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Submit Info Button */}
            <button
              onClick={() => onSelectTab('submit')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Contribute as Local</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="border-t border-stone-200 bg-stone-50/70 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 py-2 min-w-max">
            
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Home
            </button>

            <button
              onClick={() => onSelectTab('explore')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'explore'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Explore Destination
            </button>

            <button
              onClick={() => onSelectTab('categories')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'categories'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Categories
            </button>

            <button
              onClick={() => onSelectTab('ai_companion')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'ai_companion'
                  ? 'bg-amber-800 text-white shadow-xs ring-2 ring-amber-300'
                  : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/80 border border-amber-300'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-700" />
              <span>AI Local Companion</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-600 text-white font-bold tracking-wider">
                NO-HALLUCINATION
              </span>
            </button>

            <button
              onClick={() => onSelectTab('local_stories')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'local_stories'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Local Stories
            </button>

            <button
              onClick={() => onSelectTab('nearby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'nearby'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Nearby Radar
            </button>

            <button
              onClick={() => onSelectTab('verified_locals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'verified_locals'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Verified Locals
            </button>

            <button
              onClick={() => onSelectTab('trip_plan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'trip_plan'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              Personalized Plan
            </button>

            <button
              onClick={() => onSelectTab('submit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 md:hidden ${
                currentTab === 'submit'
                  ? 'bg-emerald-800 text-white'
                  : 'text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Submit
            </button>

            {userRole === 'admin' && (
              <button
                onClick={() => onSelectTab('admin_dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  currentTab === 'admin_dashboard'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-900 bg-stone-200/80 hover:bg-stone-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                Admin Audit ({pendingCount})
              </button>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
};
