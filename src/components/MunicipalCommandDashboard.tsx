import React, { useState, useMemo } from 'react';
import { WardRecord, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { GisMapVizag } from './GisMapVizag';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Droplets, 
  Waves, 
  Search, 
  Filter, 
  Radio, 
  MapPin, 
  Plus, 
  RefreshCw, 
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

interface MunicipalCommandDashboardProps {
  wards: WardRecord[];
  onUpdateWard: (updated: WardRecord) => void;
  onAddWard: (newWard: Omit<WardRecord, 'id' | 'updatedAt'>) => void;
  language: AppLanguage;
  onTriggerMainAction: () => void;
  isDispatching: boolean;
  onNavigateToRouting: (wardName?: string) => void;
}

export const MunicipalCommandDashboard: React.FC<MunicipalCommandDashboardProps> = ({
  wards,
  onUpdateWard,
  onAddWard,
  language,
  onTriggerMainAction,
  isDispatching,
  onNavigateToRouting
}) => {
  const t = translations[language];
  const [selectedWard, setSelectedWard] = useState<WardRecord | null>(wards[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CRITICAL' | 'IMPASSABLE'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Ward Form State
  const [newWardName, setNewWardName] = useState('');
  const [newHazardType, setNewHazardType] = useState<WardRecord['hazardType']>('Flood Risk');
  const [newHazardValue, setNewHazardValue] = useState('High');
  const [newStatus, setNewStatus] = useState<WardRecord['status']>('Active Waterlogging');
  const [newWaterDepth, setNewWaterDepth] = useState('0.4');
  const [newRainfall, setNewRainfall] = useState('75');
  const [formError, setFormError] = useState('');

  // Filtered wards by name or risk level
  const filteredWards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return wards.filter((w) => {
      const matchesSearch = !q ||
        w.name.toLowerCase().includes(q) ||
        w.riskLevel.toLowerCase().includes(q) ||
        w.status.toLowerCase().includes(q) ||
        w.hazardType.toLowerCase().includes(q) ||
        `ward ${w.id}`.includes(q) ||
        `${w.id}` === q;

      if (!matchesSearch) return false;

      if (statusFilter === 'CRITICAL') {
        return w.riskLevel === 'Critical' || w.riskLevel === 'Severe' || w.riskLevel === 'High';
      }
      if (statusFilter === 'IMPASSABLE') {
        return w.status === 'Impassable' || w.status === 'Active Waterlogging';
      }
      return true;
    });
  }, [wards, searchQuery, statusFilter]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWardName.trim()) {
      setFormError('Please enter a valid Visakhapatnam ward or road name.');
      return;
    }
    setFormError('');

    onAddWard({
      name: newWardName.trim(),
      hazardType: newHazardType,
      hazardValue: newHazardValue,
      riskLevel: newStatus === 'Impassable' ? 'Critical' : 'High',
      status: newStatus,
      isSample: false,
      latitude: 17.73 + (Math.random() - 0.5) * 0.08,
      longitude: 83.31 + (Math.random() - 0.5) * 0.08,
      populationEstimate: 12000,
      currentWaterDepthM: parseFloat(newWaterDepth) || 0.3,
      rainfallMmHr: parseInt(newRainfall, 10) || 60,
      drainageCapacityPct: 85,
      elevationMeters: 10,
      evacuationRouteName: 'Dynamic High-Ground Bypass Link',
      notes: 'Field incident logged via Municipal Incident Desk.'
    });

    setNewWardName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Headline & One-Line Promise */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Visakhapatnam Metropolitan Region Development Authority & GVMC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance leading-tight">
              {t.oneLinePromise}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.ourPitch}
            </p>
          </div>

          {/* Main Action Big Button on Screen 1 */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-stretch lg:items-end gap-2.5">
            <button
              onClick={onTriggerMainAction}
              disabled={isDispatching}
              className="w-full lg:max-w-md px-6 sm:px-8 py-5 sm:py-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 active:from-amber-500 active:to-amber-600 text-slate-950 font-black text-sm sm:text-base lg:text-lg shadow-2xl shadow-amber-500/40 border-2 border-amber-300/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3.5 disabled:opacity-50 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950/15 flex items-center justify-center shrink-0">
                <Radio className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-950 ${isDispatching ? 'animate-spin' : 'animate-pulse'}`} />
              </div>
              <span className="text-left font-black tracking-tight leading-snug">
                {isDispatching ? t.mainActionDispatching : t.mainActionButton}
              </span>
            </button>
            <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] text-slate-300 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Live Dispatch Ready
              </span>
              <span className="text-slate-400">Update latency &lt; 30s</span>
            </div>
          </div>
        </div>

        {/* 3 Mandatory Stat Cards on Home Screen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
          {/* Stat 1 */}
          <div className="bg-[#070c1b] border border-slate-800/90 rounded-xl p-4.5">
            <div className="flex items-center gap-2 text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.hudhudBenchmark}</span>
            </div>
            <p className="text-white font-bold text-sm sm:text-base leading-snug">
              {t.hudhudFact}
            </p>
            <span className="text-xs text-slate-400 mt-2 block font-mono">
              {t.sourceNDMA}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#070c1b] border border-slate-800/90 rounded-xl p-4.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Waves className="w-4 h-4 shrink-0" />
              <span>{t.coastalExposure}</span>
            </div>
            <p className="text-white font-bold text-sm sm:text-base leading-snug">
              {t.coastlineFact}
            </p>
            <span className="text-xs text-slate-400 mt-2 block font-mono">
              {t.sourceAPSDMA}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="bg-[#070c1b] border border-slate-800/90 rounded-xl p-4.5">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Droplets className="w-4 h-4 shrink-0" />
              <span>{t.urbanChokepoints}</span>
            </div>
            <p className="text-white font-bold text-sm sm:text-base leading-snug">
              {t.flashFloodFact}
            </p>
            <span className="text-xs text-slate-400 mt-2 block font-mono">
              {t.sourceHindu}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Workspace Grid: Real-time GIS Map + Ward Status Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Real-Time GIS Map */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{t.gisTitle}</span>
              </h2>
              <span className="text-xs text-slate-400">
                {t.gisSubtitle}
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
              LIVE GIS 30s
            </span>
          </div>

          {/* Map Canvas */}
          <GisMapVizag
            wards={wards}
            selectedWard={selectedWard}
            onSelectWard={(w) => setSelectedWard(w)}
            activeCorridorHighlight={selectedWard?.evacuationRouteName}
            language={language}
          />
        </div>

        {/* Right Column (5 cols): Ward Status Panels */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>{t.wardStatusRegistry}</span>
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-[#131d36] hover:bg-[#1c2a4f] text-amber-300 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.logHazard}</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-[#0b132b] border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="ward-search-input"
                  className="block text-xs font-semibold text-slate-200"
                >
                  {t.quickSearchLabel}
                </label>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                  >
                    {t.clearSearch}
                  </button>
                )}
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="ward-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchQuery('');
                  }}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-[#070c1b] border border-slate-700/80 rounded-lg pl-9 pr-8 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-all"
                  aria-label="Search wards by name or risk level"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter by Risk Level Chips */}
            <div className="space-y-1.5 pt-0.5">
              <span className="text-[11px] text-slate-400 block font-medium">
                {t.filterByRisk}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                {['Critical', 'Severe', 'High', 'Moderate', 'Clear', 'MVP Colony', 'Underpass'].map((chip) => {
                  const isChipActive = searchQuery.toLowerCase() === chip.toLowerCase();
                  return (
                    <button
                      key={chip}
                      onClick={() => setSearchQuery(isChipActive ? '' : chip)}
                      className={`px-2 py-0.5 rounded font-mono font-medium transition-colors cursor-pointer ${
                        isChipActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-[#101b38] hover:bg-[#182852] text-slate-300 border border-slate-700/80'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Counter & Status Filter Tabs */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                {t.showingWards} <strong className="text-slate-200">{filteredWards.length}</strong> {t.ofWards} {wards.length} {t.wardsCount}
              </span>

              {/* Segmented Filter Control */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    statusFilter === 'ALL'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-[#101b38] text-slate-300 hover:bg-[#16254c]'
                  }`}
                >
                  {t.allWards}
                </button>
                <button
                  onClick={() => setStatusFilter('CRITICAL')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    statusFilter === 'CRITICAL'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-[#101b38] text-slate-300 hover:bg-[#16254c]'
                  }`}
                >
                  {t.highRiskOnly}
                </button>
                <button
                  onClick={() => setStatusFilter('IMPASSABLE')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    statusFilter === 'IMPASSABLE'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-[#101b38] text-slate-300 hover:bg-[#16254c]'
                  }`}
                >
                  {t.impassableOnly}
                </button>
              </div>
            </div>
          </div>

          {/* Ward List Feed with Empty State */}
          <div className="bg-[#0b132b] border border-slate-800 rounded-xl overflow-hidden max-h-[460px] overflow-y-auto divide-y divide-slate-800/80">
            {filteredWards.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">No wards match current filter</h4>
                <p className="text-xs text-slate-400">
                  Try clearing your search query or reset the filter to view all 10 Visakhapatnam wards.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('ALL');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredWards.map((w) => {
                const isSelected = selectedWard?.id === w.id;
                const isImpassable = w.status === 'Impassable' || w.status === 'Mandatory Evacuation';
                const isWarning = w.status === 'Active Waterlogging' || w.status === 'Evacuation Advised';

                return (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWard(w)}
                    className={`p-3.5 transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#132247] border-l-2 border-amber-400'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white truncate">
                            #{w.id} {w.name}
                          </span>
                          {w.isSample && (
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                              {t.sampleBadge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          <span>{w.hazardType}: </span>
                          <span className="font-semibold text-amber-400">{w.hazardValue}</span>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${
                          isImpassable
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : isWarning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {w.status}
                      </span>
                    </div>

                    {/* Compact Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
                      <div>
                        <span>{t.depthLabel} </span>
                        <span className="text-slate-200 font-bold">{w.currentWaterDepthM}m</span>
                      </div>
                      <div>
                        <span>{t.rainRateLabel} </span>
                        <span className="text-slate-200">{w.rainfallMmHr}mm</span>
                      </div>
                      <div className="text-right">
                        <span>{t.elevationLabel} </span>
                        <span className="text-emerald-400">{w.elevationMeters}m</span>
                      </div>
                    </div>

                    {/* Quick Pathfinder Trigger */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 truncate max-w-[200px]">
                          {t.corridorLabel} {w.evacuationRouteName || 'Auto-Compute via AI'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToRouting(w.name);
                          }}
                          className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <span>{t.simulateAiRoute}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Add Hazard Incident Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-[#0b132b] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>Log New Street Hazard Observation</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-lg text-xs text-red-300">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Location / Ward Name *
                </label>
                <input
                  type="text"
                  value={newWardName}
                  onChange={(e) => setNewWardName(e.target.value)}
                  placeholder="e.g., Jagadamba Junction, MVP Sector-8, or RK Beach Drive"
                  className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Hazard Classification
                  </label>
                  <select
                    value={newHazardType}
                    onChange={(e) => setNewHazardType(e.target.value as WardRecord['hazardType'])}
                    className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100"
                  >
                    <option value="Flood Risk">Flood Risk</option>
                    <option value="Surge Risk">Surge Risk</option>
                    <option value="Obstruction">Obstruction (Submerged/Debris)</option>
                    <option value="Waterlogging">Waterlogging</option>
                    <option value="Wind Hazard">Wind Hazard</option>
                    <option value="Traffic">Traffic Chokepoint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Operational Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as WardRecord['status'])}
                    className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100"
                  >
                    <option value="Active Waterlogging">Active Waterlogging</option>
                    <option value="Evacuation Advised">Evacuation Advised</option>
                    <option value="Impassable">Impassable</option>
                    <option value="Caution">Caution</option>
                    <option value="Monitored">Monitored</option>
                    <option value="Clear">Clear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Waterlogging Depth (Meters)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={newWaterDepth}
                    onChange={(e) => setNewWaterDepth(e.target.value)}
                    className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Rainfall Rate (mm/hr)
                  </label>
                  <input
                    type="number"
                    value={newRainfall}
                    onChange={(e) => setNewRainfall(e.target.value)}
                    className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold cursor-pointer"
                >
                  {t.logHazard}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
