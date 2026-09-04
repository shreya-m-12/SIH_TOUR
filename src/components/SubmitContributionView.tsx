import React, { useState } from 'react';
import { 
  PlusCircle, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Coins, 
  Clock, 
  Utensils, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { CategoryType, Destination, LocalContribution } from '../types';

interface SubmitContributionViewProps {
  destinations: Destination[];
  selectedDestination: Destination;
  onSubmit: (newContribution: LocalContribution) => void;
  userRole: 'traveler' | 'verified_local' | 'admin';
}

export const SubmitContributionView: React.FC<SubmitContributionViewProps> = ({
  destinations,
  selectedDestination,
  onSubmit,
  userRole
}) => {
  const [destinationId, setDestinationId] = useState(selectedDestination.id);
  const [category, setCategory] = useState<CategoryType>('food');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationArea, setLocationArea] = useState('');
  const [directionsTip, setDirectionsTip] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80');
  const [bestTimeToVisit, setBestTimeToVisit] = useState('');
  const [costLevel, setCostLevel] = useState<'Free' | 'Budget' | 'Moderate' | 'Splurge'>('Budget');
  const [estimatedCost, setEstimatedCost] = useState<number | ''>(100);
  const [localTip, setLocalTip] = useState('');
  const [dietary, setDietary] = useState<string[]>(['Vegetarian']);
  const [timeRequiredHours, setTimeRequiredHours] = useState<number>(1);
  const [popularity, setPopularity] = useState<'popular' | 'less_known' | 'hidden_gem'>('less_known');
  const [contributorName, setContributorName] = useState('Deepa Venkatesh');
  const [contributorRole, setContributorRole] = useState('Lifelong Resident & Heritage Enthusiast');
  const [residentTenureYears, setResidentTenureYears] = useState<number>(25);
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !localTip || !locationName) {
      alert("Please fill in all required fields (Title, Description, Location, and Local Tip).");
      return;
    }

    const currentDest = destinations.find(d => d.id === destinationId) || selectedDestination;

    const newContrib: LocalContribution = {
      id: `contrib-${Date.now()}`,
      destinationId,
      category,
      title,
      description,
      location: {
        name: locationName,
        area: locationArea || currentDest.name,
        lat: currentDest.coords.lat + (Math.random() - 0.5) * 0.02,
        lng: currentDest.coords.lng + (Math.random() - 0.5) * 0.02,
        directionsTip: directionsTip || undefined
      },
      images: [imageUrl || 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'],
      bestTimeToVisit: bestTimeToVisit || 'Morning or late afternoon',
      costInfo: {
        level: costLevel,
        estimatedAmount: estimatedCost === '' ? undefined : Number(estimatedCost),
        currency: currentDest.currencySymbol,
        note: `Estimated ~${currentDest.currencySymbol}${estimatedCost || 0}`
      },
      localTip,
      dietary: dietary.length > 0 ? (dietary as any) : undefined,
      timeRequiredHours: Number(timeRequiredHours) || 1,
      popularity,
      contributorId: `user-local-${Date.now()}`,
      contributorName: contributorName || 'Anonymous Local Contributor',
      contributorRole: `${contributorRole} (${residentTenureYears} yrs resident)`,
      verificationStatus: userRole === 'admin' ? 'verified' : 'pending', // Admin directly approves, others go to review
      verificationDate: new Date().toISOString().split('T')[0],
      confirmationsCount: 1,
      confirmedByLocals: [contributorName || 'Submitter'],
      sourceLabel: 'VERIFIED LOCAL',
      submittedAt: new Date().toISOString()
    };

    onSubmit(newContrib);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Local Contributor Verification Pipeline
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
          Submit Authentic Local Information
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Only approved local residents can submit trusted knowledge. Every submission is audited by our verification committee before entering the AI Companion database.
        </p>
      </div>

      {isSuccess ? (
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-emerald-950 font-serif">
            {userRole === 'admin' ? 'Contribution Published Instantly!' : 'Submission Received for Local Audit!'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            {userRole === 'admin' 
              ? 'As an Administrator, your verified record has been approved directly and is now live in the AI Local Companion knowledge base.'
              : 'Your contribution has been added to the Admin Verification Queue. Once reviewed against resident verification standards, it will become available to all travelers!'}
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setTitle('');
              setDescription('');
              setLocalTip('');
              setLocationName('');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold"
          >
            Submit Another Local Place
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          {/* Section 1: Contributor Credentials */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Your Local Resident Identity
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-medium">Local Status / Role</label>
                <input
                  type="text"
                  value={contributorRole}
                  onChange={(e) => setContributorRole(e.target.value)}
                  placeholder="e.g. 3rd Gen Silk Weaver"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-medium">Years Living Here</label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={residentTenureYears}
                  onChange={(e) => setResidentTenureYears(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Destination & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Destination</label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium"
              >
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium"
              >
                <option value="food">Local Food & Famous Dishes</option>
                <option value="places">Places to Visit</option>
                <option value="heritage">Historical & Cultural Locations</option>
                <option value="markets">Local Markets & Shopping</option>
                <option value="festivals">Festivals & Cultural Events</option>
                <option value="traditions">Local Traditions & Customs</option>
                <option value="hidden_gems">Hidden or Less-Known Places</option>
                <option value="guides">Local Experiences & Guides</option>
                <option value="practical">Practical Travel Information</option>
              </select>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Title of Place / Dish / Experience *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Guru Sweet Mart: Authentic Royal Mysore Pak"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Authentic Local Description & Heritage Background *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain why this place is authentic, its generational history, what makes it special, and why travelers should experience it..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs leading-relaxed"
                required
              />
            </div>
          </div>

          {/* CRITICAL: Local Insider Tip */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 space-y-2 text-xs">
            <label className="block text-amber-950 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Verified Local Insider Tip / Recommendation *
            </label>
            <textarea
              rows={2}
              value={localTip}
              onChange={(e) => setLocalTip(e.target.value)}
              placeholder="What is the unwritten rule? E.g. 'Ask for the warm batch at 4:30 PM' or 'Eat within 48 hours, never refrigerate'..."
              className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs"
              required
            />
          </div>

          {/* Location & Directions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Exact Place Name / Landmark *</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Original Mylari Hotel"
                className="w-full px-3 py-2 rounded-xl border border-stone-300"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Neighborhood / Area</label>
              <input
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder="e.g. Nazarbad Main Road"
                className="w-full px-3 py-2 rounded-xl border border-stone-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-700 font-bold mb-1">Directions & Transit Advice</label>
              <input
                type="text"
                value={directionsTip}
                onChange={(e) => setDirectionsTip(e.target.value)}
                placeholder="e.g. Look for the green tile shop; avoid the modern copycat with air conditioning across the road."
                className="w-full px-3 py-2 rounded-xl border border-stone-300"
              />
            </div>
          </div>

          {/* Timing, Cost, Duration, Style */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Best Timing</label>
              <input
                type="text"
                value={bestTimeToVisit}
                onChange={(e) => setBestTimeToVisit(e.target.value)}
                placeholder="e.g. 7:00 AM - 10:30 AM"
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Cost Level</label>
              <select
                value={costLevel}
                onChange={(e) => setCostLevel(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
              >
                <option value="Free">Free</option>
                <option value="Budget">Budget</option>
                <option value="Moderate">Moderate</option>
                <option value="Splurge">Splurge</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Approx Cost (₹/¥/$/€)</label>
              <input
                type="number"
                min={0}
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Duration (Hours)</label>
              <input
                type="number"
                step={0.5}
                min={0.5}
                max={12}
                value={timeRequiredHours}
                onChange={(e) => setTimeRequiredHours(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="text-xs">
            <label className="block text-stone-700 font-bold mb-1">Photo URL (Optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-stone-300"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              * By submitting, you affirm under local community standards that this information represents firsthand resident knowledge.
            </span>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit for Verification</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
