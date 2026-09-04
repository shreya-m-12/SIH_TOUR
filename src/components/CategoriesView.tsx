import React from 'react';
import { 
  Compass, 
  Landmark, 
  Utensils, 
  ShoppingBag, 
  PartyPopper, 
  Sparkles, 
  EyeOff, 
  UserCheck, 
  Info 
} from 'lucide-react';
import { CategoryType, Destination, LocalContribution } from '../types';

interface CategoriesViewProps {
  destination: Destination;
  verifiedContributions: LocalContribution[];
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  destination,
  verifiedContributions,
  onSelectCategory
}) => {
  const currentItems = verifiedContributions.filter(c => c.destinationId === destination.id);

  const categoryMeta: {
    id: CategoryType;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'places',
      title: 'Places to Visit',
      description: 'Iconic vantage points, scenic landmarks, and viewpoints vetted by residents for optimal light and low crowds.',
      icon: <Compass className="w-6 h-6 text-amber-700" />,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      id: 'heritage',
      title: 'Historical & Cultural Locations',
      description: 'Royal kingdoms, centuries-old agraharas, ancient stone monuments, and sacred temple architecture.',
      icon: <Landmark className="w-6 h-6 text-orange-700" />,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'food',
      title: 'Local Food & Famous Dishes',
      description: 'Generational recipes, pure vegetarian spots, original cloud dosas, melting ghee sweets, and market grill stalls.',
      icon: <Utensils className="w-6 h-6 text-emerald-700" />,
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      id: 'markets',
      title: 'Local Markets & Shopping',
      description: 'Historic flower weaving alleys, GI-certified pure silk looms, traditional spices, and fragrance ateliers.',
      icon: <ShoppingBag className="w-6 h-6 text-blue-700" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'festivals',
      title: 'Festivals & Cultural Events',
      description: 'Dasara royal processions, seasonal temple chariot rathotsavas, and indigenous ceremonial protocols.',
      icon: <PartyPopper className="w-6 h-6 text-purple-700" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'traditions',
      title: 'Local Traditions & Customs',
      description: 'Dawn hill climbs, river seating customs, etiquette for holy shrines, and respectful community rules.',
      icon: <Sparkles className="w-6 h-6 text-rose-700" />,
      color: 'bg-rose-50 border-rose-200'
    },
    {
      id: 'hidden_gems',
      title: 'Hidden or Less-Known Places',
      description: 'Uncrowded mansions, lakeside bird sanctuaries, 1,200 moss sculptures, and tucked-away courtyards.',
      icon: <EyeOff className="w-6 h-6 text-teal-700" />,
      color: 'bg-teal-50 border-teal-200'
    },
    {
      id: 'guides',
      title: 'Local Experiences & Master Guides',
      description: 'Workshops with third-generation silk weavers, tea masters, stone sculptors, and heritage storytellers.',
      icon: <UserCheck className="w-6 h-6 text-indigo-700" />,
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 'practical',
      title: 'Practical Travel Information',
      description: 'Traditional tonga ride pricing, morning step climb hours, local bus tips, and seasonal attire advice.',
      icon: <Info className="w-6 h-6 text-stone-700" />,
      color: 'bg-stone-50 border-stone-200'
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Curated Thematic Discovery
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
          Categories in {destination.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Explore authentic resident knowledge organized across nine core destination dimensions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryMeta.map((cat) => {
          const count = currentItems.filter(i => i.category === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md hover:border-amber-600/60 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700">
                    {count} {count === 1 ? 'place' : 'places'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-amber-800 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800 group-hover:translate-x-1 transition-transform">
                <span>Browse {cat.title}</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
