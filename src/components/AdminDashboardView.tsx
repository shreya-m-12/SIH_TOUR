import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  MapPin, 
  Sparkles, 
  Coins, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import { Destination, LocalContribution } from '../types';

interface AdminDashboardViewProps {
  destinations: Destination[];
  allContributions: LocalContribution[];
  onApproveContribution: (id: string) => void;
  onRejectContribution: (id: string) => void;
  onSelectContribution: (item: LocalContribution) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  destinations,
  allContributions,
  onApproveContribution,
  onRejectContribution,
  onSelectContribution
}) => {
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'pending' | 'verified' | 'all'>('pending');

  const pendingContributions = allContributions.filter(c => c.verificationStatus === 'pending');
  const verifiedContributions = allContributions.filter(c => c.verificationStatus === 'verified');

  const filteredItems = allContributions.filter(item => {
    if (selectedDestinationFilter !== 'all' && item.destinationId !== selectedDestinationFilter) {
      return false;
    }
    if (statusFilter !== 'all' && item.verificationStatus !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header with Admin Privilege Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-900 text-purple-100 uppercase tracking-wider">
              Verification Committee Console
            </span>
            <span className="text-xs text-stone-500">
              Admin & Local Council Authority
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            LocalRoots Knowledge Base Audit
          </h1>
        </div>

        {/* Quick Trust Metrics Counters */}
        <div className="flex items-center gap-3 text-xs">
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-900">
            <span className="font-bold text-sm block">{pendingContributions.length}</span>
            <span className="text-[10px] text-amber-700">Pending Review</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-900">
            <span className="font-bold text-sm block">{verifiedContributions.length}</span>
            <span className="text-[10px] text-emerald-700">Live & Grounded</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-600">Review Queue:</span>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              statusFilter === 'pending'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            Pending Audit ({pendingContributions.length})
          </button>
          <button
            onClick={() => setStatusFilter('verified')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              statusFilter === 'verified'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            Verified Archive ({verifiedContributions.length})
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            All Submissions
          </button>
        </div>

        {/* Destination selector */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 font-medium">Destination:</span>
          <select
            value={selectedDestinationFilter}
            onChange={(e) => setSelectedDestinationFilter(e.target.value)}
            className="px-3 py-1 rounded-lg border border-stone-300 bg-white font-medium"
          >
            <option value="all">All Destinations</option>
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Review Queue Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-3xl border border-stone-200 space-y-2">
          <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">Verification Queue is Clear</h3>
          <p className="text-xs text-stone-500">
            No submissions are currently awaiting review in this section.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const dest = destinations.find(d => d.id === item.destinationId);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col md:flex-row gap-5 items-start justify-between"
              >
                {/* Image & Category */}
                <div className="w-full md:w-48 h-36 rounded-xl bg-stone-100 overflow-hidden shrink-0 relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-stone-900/80 text-white">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      item.verificationStatus === 'verified'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}>
                      {item.verificationStatus}
                    </span>
                  </div>
                </div>

                {/* Main Content Details */}
                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md">
                      {dest?.name || item.destinationId}
                    </span>
                    <span className="text-stone-500">
                      Submitted: {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    {item.title}
                  </h3>

                  <p className="text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{item.location.name} — {item.location.area}</span>
                  </p>

                  <p className="text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Local Tip Box */}
                  <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-amber-950 font-medium">
                    <span className="font-bold text-amber-900">Submitted Local Tip: </span>
                    "{item.localTip}"
                  </div>

                  {/* Submitter Credentials */}
                  <div className="flex items-center gap-2 pt-1 text-stone-500">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Submitted by: <strong>{item.contributorName}</strong> ({item.contributorRole})</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 shrink-0 justify-end md:justify-start pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                  <button
                    onClick={() => onSelectContribution(item)}
                    className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details
                  </button>

                  {item.verificationStatus === 'pending' ? (
                    <>
                      <button
                        onClick={() => onApproveContribution(item.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve & Publish
                      </button>

                      <button
                        onClick={() => onRejectContribution(item.id)}
                        className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Live in AI Vault
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
