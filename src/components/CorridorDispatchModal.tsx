import React from 'react';
import { WardRecord, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { CheckCircle2, ShieldAlert, Radio, ArrowRight, Share2, Printer, X, Download } from 'lucide-react';

interface CorridorDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dispatchedWards: WardRecord[];
  dispatchTimestamp: string;
  language: AppLanguage;
}

export const CorridorDispatchModal: React.FC<CorridorDispatchModalProps> = ({
  isOpen,
  onClose,
  dispatchedWards,
  dispatchTimestamp,
  language
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dispatch-dialog-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0b132b] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950/40 via-red-950/30 to-[#0b132b] border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-wider text-amber-400 uppercase">
                {t.protocolAlpha}
              </span>
              <h3 id="dispatch-dialog-title" className="text-lg font-bold text-white">
                {t.corridorGenerated}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-300">
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-medium">{t.dispatchedToTeams}</span>
            </div>
            <span className="font-mono text-emerald-400 text-[11px]">{dispatchTimestamp}</span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm">
            Evacuation corridors have been dynamically verified against live telemetry (IMD radar, ultrasonic drainage depth, and railway underpass chokepoints). Safe routing commands have been transmitted to GVMC Zone Commissioners and NDRF Team 4.
          </p>

          {/* List of High-Risk Wards dispatched */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              {t.activeCorridorsList} ({dispatchedWards.length})
            </h4>
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-[#070c1b]">
              {dispatchedWards.map((ward) => (
                <div key={ward.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Ward {ward.id}: {ward.name}</span>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {ward.hazardType}: {ward.hazardValue}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{ward.evacuationRouteName || 'Corridor Alfa via Hill-No.3 bypass'}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block">Est. Inundation</span>
                    <span className="font-mono font-bold text-amber-300 text-xs">{ward.currentWaterDepthM}m / 85mm rain</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs space-y-1">
            <span className="font-semibold text-amber-300 block">Civic Alert Broadcast:</span>
            <p className="text-slate-300">
              Loudhailer teams and SMS cell-broadcasts deployed for MVP Colony Sector 4, Jodugulla Palem, and Pamarru coastal communities instructing all citizen traffic to avoid Kothavalasa underpass.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#080d1a] border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 font-mono">
            ID: GVMC-EVAC-{Date.now().toString().slice(-6)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow cursor-pointer"
            >
              {t.acknowledgedClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
