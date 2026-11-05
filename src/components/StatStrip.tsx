import React from 'react';
import { MunicipalStats, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { Activity, Clock, ShieldCheck, Building2 } from 'lucide-react';

interface StatStripProps {
  stats: MunicipalStats;
  language: AppLanguage;
  className?: string;
}

export const StatStrip: React.FC<StatStripProps> = ({ stats, language, className = '' }) => {
  const t = translations[language];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
      {/* Stat 1: Municipal Demos Booked */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <span className="text-xs text-slate-400 block font-medium">
            {t.statsDemosBooked}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.demosBooked}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">
              GVMC & APSDMA Pilot
            </span>
          </div>
        </div>
      </div>

      {/* Stat 2: Ingestion Latency */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <span className="text-xs text-slate-400 block font-medium">
            {t.statsIngestionLatency}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.ingestionLatencyMs}ms
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">
              Target &lt; 30s Met
            </span>
          </div>
        </div>
      </div>

      {/* Stat 3: Platform Uptime */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <span className="text-xs text-slate-400 block font-medium">
            {t.statsUptime}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.uptimePct.toFixed(1)}%
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Cyclone Simulation Spec
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
