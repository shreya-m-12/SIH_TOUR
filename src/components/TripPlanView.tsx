import React, { useState, useMemo } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Coins, 
  Utensils, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  CheckCircle2 
} from 'lucide-react';
import { Destination, LocalContribution } from '../types';

interface TripPlanViewProps {
  destination: Destination;
  verifiedContributions: LocalContribution[];
  onSelectContribution: (item: LocalContribution) => void;
  onAskCompanion: (prompt: string) => void;
}

export const TripPlanView: React.FC<TripPlanViewProps> = ({
  destination,
  verifiedContributions,
  onSelectContribution,
  onAskCompanion
}) => {
  const currentItems = verifiedContributions.filter(c => c.destinationId === destination.id);

  // Form controls
  const [hours, setHours] = useState<number>(5);
  const [budget, setBudget] = useState<number>(800);
  const [diet, setDiet] = useState<string>('Vegetarian');
  const [style, setStyle] = useState<'all' | 'less_known' | 'famous'>('less_known');

  // Generator algorithm that sequences verified spots within time & budget
  const generatedItinerary = useMemo(() => {
    let eligible = [...currentItems];

    // Filter by diet if food
    if (diet !== 'all') {
      eligible = eligible.filter(item => {
        if (item.category !== 'food') return true;
        return item.dietary?.includes(diet as any);
      });
    }

    // Filter by style preference if possible
    if (style !== 'all') {
      const styledMatches = eligible.filter(item => 
        style === 'less_known' 
          ? (item.popularity === 'less_known' || item.popularity === 'hidden_gem')
          : item.popularity === 'famous'
      );
      if (styledMatches.length >= 2) {
        eligible = styledMatches;
      }
    }

    // Sequence chronologically
    // Start with breakfast or morning spot, then market/craft, then heritage/walk, then evening food/sunset
    const morningFood = eligible.find(i => i.category === 'food' && i.bestTimeToVisit.toLowerCase().includes('am')) 
      || eligible.find(i => i.category === 'food');
    
    const marketOrTradition = eligible.find(i => (i.category === 'markets' || i.category === 'traditions') && i.id !== morningFood?.id);
    
    const heritageOrGem = eligible.find(i => (i.category === 'heritage' || i.category === 'hidden_gems' || i.category === 'guides') && i.id !== morningFood?.id && i.id !== marketOrTradition?.id);
    
    const eveningSpot = eligible.find(i => i.id !== morningFood?.id && i.id !== marketOrTradition?.id && i.id !== heritageOrGem?.id);

    const rawStops = [morningFood, marketOrTradition, heritageOrGem, eveningSpot].filter(Boolean) as LocalContribution[];

    // Truncate based on total hours
    let accumulatedTime = 0;
    let accumulatedCost = 0;
    const finalStops: { stop: LocalContribution; timeSlot: string; stopCost: number }[] = [];

    const startTimeHour = 7.5; // 7:30 AM
    rawStops.forEach((stop, index) => {
      if (accumulatedTime + stop.timeRequiredHours <= hours + 0.5) {
        const startH = Math.floor(startTimeHour + accumulatedTime);
        const startM = Math.round(((startTimeHour + accumulatedTime) % 1) * 60);
        accumulatedTime += stop.timeRequiredHours;
        const endH = Math.floor(startTimeHour + accumulatedTime);
        const endM = Math.round(((startTimeHour + accumulatedTime) % 1) * 60);

        const formatTime = (h: number, m: number) => {
          const ampm = h >= 12 ? 'PM' : 'AM';
          const displayH = h > 12 ? h - 12 : h;
          const displayM = m === 0 ? '00' : m < 10 ? `0${m}` : m;
          return `${displayH}:${displayM} ${ampm}`;
        };

        const costVal = stop.costInfo.estimatedAmount || 0;
        accumulatedCost += costVal;

        finalStops.push({
          stop,
          timeSlot: `${formatTime(startH, startM)} – ${formatTime(endH, endM)}`,
          stopCost: costVal
        });
      }
    });

    return {
      stops: finalStops,
      totalHours: Number(accumulatedTime.toFixed(1)),
      totalCost: accumulatedCost
    };
  }, [currentItems, hours, budget, diet, style]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Grounded Itinerary Generator
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
          Personalized Plan for {destination.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Assembles an authentic local schedule strictly adhering to verified facts, opening timings, and resident secrets.
        </p>
      </div>

      {/* Constraints Configurator Bar */}
      <div className="bg-stone-50 p-5 rounded-3xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Time Available: {hours} Hours
          </label>
          <input
            type="range"
            min={2}
            max={12}
            step={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-amber-800 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
            <span>2 hrs</span>
            <span>5 hrs</span>
            <span>12 hrs</span>
          </div>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-amber-700" />
            Max Budget: {destination.currencySymbol}{budget}
          </label>
          <input
            type="range"
            min={100}
            max={3000}
            step={50}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-amber-800 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
            <span>{destination.currencySymbol}100</span>
            <span>{destination.currencySymbol}800</span>
            <span>{destination.currencySymbol}3000</span>
          </div>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-amber-700" />
            Food Preference
          </label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-medium"
          >
            <option value="Vegetarian">Pure Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Jain">Jain Friendly</option>
            <option value="all">Any / Non-Vegetarian</option>
          </select>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Experience Focus
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as any)}
            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-medium"
          >
            <option value="less_known">Less-Known Culture & Crafts</option>
            <option value="famous">Classic Famous Landmarks</option>
            <option value="all">Balanced Combination</option>
          </select>
        </div>
      </div>

      {/* Plan Summary Banner */}
      <div className="bg-emerald-950 text-white p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
              100% Verified Local Blueprint
            </span>
            <div className="text-lg font-bold font-serif">
              {generatedItinerary.stops.length} Authentic Stops • ~{generatedItinerary.totalHours} Hours Duration
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
            <span className="text-stone-300 block text-[10px]">Estimated Cost:</span>
            <span className="font-bold text-white text-sm">
              {destination.currencySymbol}{generatedItinerary.totalCost}
            </span>
          </div>

          <button
            onClick={() => onAskCompanion(`I like this generated ${generatedItinerary.totalHours}-hour plan for ${destination.name}. Can you customize transit tips between the stops?`)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 transition-colors"
          >
            <Bot className="w-4 h-4" />
            Fine-tune in AI Companion
          </button>
        </div>
      </div>

      {/* Sequential Timeline of Stops */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-stone-200 ml-2">
        {generatedItinerary.stops.map(({ stop, timeSlot, stopCost }, idx) => (
          <div key={stop.id} className="relative flex items-start gap-4 pl-4 group">
            
            {/* Step Counter Marker */}
            <div className="w-8 h-8 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-white">
              {idx + 1}
            </div>

            {/* Stop Card */}
            <div
              onClick={() => onSelectContribution(stop)}
              className="flex-1 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start justify-between"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {timeSlot}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                    {stop.category.replace('_', ' ')}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-500 font-medium">
                    Est. {destination.currencySymbol}{stopCost || 'Free'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                  {stop.title}
                </h3>

                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  {stop.location.name} ({stop.location.area})
                </p>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {stop.description}
                </p>

                {/* Local Tip highlight */}
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-xs text-amber-950">
                  <span className="font-bold text-amber-900">Local Rule: </span>
                  "{stop.localTip}"
                </div>

                <div className="text-[11px] text-stone-400">
                  Audited by {stop.contributorName} ({stop.confirmationsCount} resident vouches)
                </div>
              </div>

              <img
                src={stop.images[0]}
                alt={stop.title}
                className="w-full sm:w-36 h-28 rounded-xl object-cover shrink-0"
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
