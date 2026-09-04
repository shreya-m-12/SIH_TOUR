export type CategoryType = 
  | 'places'
  | 'heritage'
  | 'food'
  | 'markets'
  | 'festivals'
  | 'traditions'
  | 'hidden_gems'
  | 'guides'
  | 'practical';

export interface LocationCoords {
  lat: number;
  lng: number;
  address?: string;
  neighborhood?: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  country: string;
  tagLine: string;
  heroImage: string;
  description: string;
  coords: LocationCoords;
  currency: string;
  currencySymbol: string;
  verifiedLocalsCount: number;
  contributionsCount: number;
  popularHighlights: string[];
}

export interface LocalContributor {
  id: string;
  name: string;
  avatar: string;
  destinationId: string;
  residentYears: number;
  role: string;
  badge: 'Heritage Guide' | 'Native Resident' | 'Culinary Elder' | 'Artisan Specialist' | 'Cultural Historian';
  bio: string;
  joinedDate: string;
  verifiedDate: string;
  confirmationsReceived: number;
  status: 'verified' | 'pending' | 'rejected';
  expertise: string[];
  contactEmail?: string;
}

export interface LocalContribution {
  id: string;
  destinationId: string;
  category: CategoryType;
  title: string;
  description: string;
  location: {
    name: string;
    area: string;
    lat: number;
    lng: number;
    directionsTip?: string;
  };
  images: string[];
  bestTimeToVisit: string;
  costInfo: {
    level: 'Free' | 'Budget' | 'Moderate' | 'Splurge';
    estimatedAmount?: number;
    currency: string;
    note?: string;
  };
  localTip: string;
  dietary?: ('Vegetarian' | 'Vegan' | 'Non-Vegetarian' | 'Halal' | 'Jain' | 'Gluten-Free')[];
  timeRequiredHours: number;
  popularity: 'popular' | 'famous' | 'less_known' | 'hidden_gem';
  contributorId: string;
  contributorName: string;
  contributorRole: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  verificationDate: string;
  confirmationsCount: number;
  confirmedByLocals: string[];
  isGeneralSource?: boolean;
  sourceLabel: 'VERIFIED LOCAL' | 'GENERAL INFORMATION';
  rejectionReason?: string;
  submittedAt: string;
}

export interface LocalStory {
  id: string;
  destinationId: string;
  title: string;
  subtitle: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorTenure: string;
  authorAvatar: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string[];
  linkedContributionIds: string[];
  verificationDate: string;
  confirmationsCount: number;
  tags: string[];
}

export interface CitationItem {
  id: string;
  title: string;
  category: CategoryType;
  contributorName: string;
  confirmationsCount: number;
  localTip: string;
  locationName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  mode: 'verified_local_only' | 'general_information';
  citations?: CitationItem[];
  requiresGeneralSearchChoice?: boolean;
  pendingGeneralQuery?: string;
  isGeneralInfo?: boolean;
  itineraryPlan?: {
    totalTimeHours: number;
    estimatedCost: string;
    stops: {
      order: number;
      contributionId: string;
      title: string;
      timeAllocation: string;
      localReason: string;
    }[];
  };
}

export type UserRole = 'traveler' | 'verified_local' | 'admin';

export interface TravelerFilters {
  availableHours?: number;
  budgetAmount?: number;
  dietaryPreference?: string;
  interests?: string[];
  popularity?: 'all' | 'popular' | 'famous' | 'less_known' | 'hidden_gem';
}

export interface SavedItem {
  id: string;
  contributionId: string;
  savedAt: string;
  personalNotes?: string;
}

export type ActiveTab = 
  | 'home'
  | 'explore'
  | 'categories'
  | 'ai_companion'
  | 'local_stories'
  | 'nearby'
  | 'verified_locals'
  | 'submit_info'
  | 'saved_places'
  | 'trip_plan'
  | 'admin'
  | 'submit'
  | 'saved'
  | 'profile'
  | 'admin_dashboard';
