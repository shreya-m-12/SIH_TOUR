import React from 'react';
import { ShieldCheck, CheckCircle, Users, Calendar, AlertTriangle } from 'lucide-react';

interface TrustBadgeProps {
  status: 'verified' | 'pending' | 'rejected';
  confirmationsCount: number;
  verificationDate?: string;
  contributorName: string;
  contributorRole?: string;
  isGeneralSource?: boolean;
  sourceLabel?: 'VERIFIED LOCAL' | 'GENERAL INFORMATION';
  compact?: boolean;
  onConfirm?: () => void;
  hasConfirmed?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  status,
  confirmationsCount,
  verificationDate,
  contributorName,
  contributorRole,
  isGeneralSource = false,
  sourceLabel = 'VERIFIED LOCAL',
  compact = false,
  onConfirm,
  hasConfirmed = false,
}) => {
  if (isGeneralSource || sourceLabel === 'GENERAL INFORMATION') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>GENERAL INFORMATION (UNVERIFIED)</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Verified Local</span>
        <span className="text-emerald-500">•</span>
        <span className="text-emerald-700">{confirmationsCount} local vouches</span>
      </div>
    );
  }

  return (
    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
            <span>VERIFIED LOCAL KNOWLEDGE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-700 font-normal">Audited</span>
          </div>
          <div className="text-stone-600 flex items-center gap-2 mt-0.5">
            <span>By <strong>{contributorName}</strong></span>
            {contributorRole && <span className="text-stone-400">({contributorRole})</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-stone-600 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto border-emerald-100">
        {verificationDate && (
          <div className="flex items-center gap-1 text-stone-500">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Audited {verificationDate}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium text-emerald-900">{confirmationsCount} locals confirmed</span>
        </div>

        {onConfirm && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              hasConfirmed
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100/60'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {hasConfirmed ? 'Confirmed by you' : 'Confirm as Local'}
          </button>
        )}
      </div>
    </div>
  );
};
