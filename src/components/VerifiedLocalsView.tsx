import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Destination, LocalContributor, LocalContribution } from '../types';

interface VerifiedLocalsViewProps {
  destination: Destination;
  contributors: LocalContributor[];
  verifiedContributions: LocalContribution[];
  onSelectContribution: (item: LocalContribution) => void;
}

export const VerifiedLocalsView: React.FC<VerifiedLocalsViewProps> = ({
  destination,
  contributors,
  verifiedContributions,
  onSelectContribution
}) => {
  const currentContributors = contributors.filter(c => c.destinationId === destination.id);
  const [selectedContributor, setSelectedContributor] = useState<LocalContributor | null>(null);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Trusted Community Network
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
          Verified Locals in {destination.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Meet the certified elders, generational artisans, and native researchers who curate the LocalRoots knowledge base.
        </p>
      </div>

      {/* Contributor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentContributors.map((contr) => {
          const theirContributions = verifiedContributions.filter(c => c.contributorId === contr.id);

          return (
            <div
              key={contr.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Avatar & Verification Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <img
                      src={contr.avatar}
                      alt={contr.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-800/20"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-600 text-white shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-900">
                    {contr.badge}
                  </span>
                </div>

                {/* Name, Role & Tenure */}
                <div className="mt-4">
                  <h3 className="font-bold text-stone-900 text-lg font-serif">
                    {contr.name}
                  </h3>
                  <p className="text-xs text-amber-800 font-semibold mt-0.5">
                    {contr.role}
                  </p>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>Resident for {contr.residentYears} years</span>
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                  {contr.bio}
                </p>

                {/* Expertise Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {contr.expertise.map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributor Trust Metrics & Authored items */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Verified: {contr.verifiedDate}</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {contr.confirmationsReceived} Vouches
                  </span>
                </div>

                {/* Authored spots preview */}
                <div className="bg-stone-50 p-3 rounded-xl space-y-1.5 text-xs">
                  <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider">
                    Audited Contributions ({theirContributions.length}):
                  </span>
                  {theirContributions.slice(0, 2).map(item => (
                    <button
                      key={item.id}
                      onClick={() => onSelectContribution(item)}
                      className="w-full text-left text-amber-900 hover:text-amber-700 font-medium truncate block transition-colors"
                    >
                      • {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
