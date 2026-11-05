import React, { useState } from 'react';
import { WardRecord, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { AlertTriangle, ShieldCheck, MapPin, Navigation, Layers, Compass, Wind, Droplets } from 'lucide-react';

interface GisMapVizagProps {
  wards: WardRecord[];
  selectedWard: WardRecord | null;
  onSelectWard: (ward: WardRecord) => void;
  activeCorridorHighlight?: string | null;
  language?: AppLanguage;
}

export const GisMapVizag: React.FC<GisMapVizagProps> = ({
  wards,
  selectedWard,
  onSelectWard,
  activeCorridorHighlight,
  language = 'en'
}) => {
  const t = translations[language];
  const [showInundationLayer, setShowInundationLayer] = useState(true);
  const [showEvacCorridors, setShowEvacCorridors] = useState(true);
  const [showContourElevations, setShowContourElevations] = useState(true);

  // Geographic bounds conversion for Visakhapatnam viewport:
  // Lat: 17.63 (South, Yarada) to 17.84 (North, Madhuravada)
  // Lng: 83.20 (West, NAD/Airport) to 83.40 (East, Rushikonda coastline)
  const getCoordinates = (lat: number, lng: number) => {
    const minLat = 17.63;
    const maxLat = 17.84;
    const minLng = 83.20;
    const maxLng = 83.40;

    // Flip Y because SVG 0 is top
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const getStatusColor = (status: string, riskLevel: string) => {
    if (status === 'Impassable' || riskLevel === 'Critical') return '#EF4444'; // Red
    if (status === 'Active Waterlogging' || riskLevel === 'Severe' || riskLevel === 'High') return '#F59E0B'; // Amber
    if (status === 'Caution' || status === 'Monitored') return '#EAB308'; // Yellow
    return '#10B981'; // Emerald
  };

  return (
    <div className="relative w-full h-[460px] md:h-[580px] bg-[#060a14] rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Map HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0b132b]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 pointer-events-auto">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
          <span className="text-xs font-semibold tracking-wide text-slate-200">
            GIS SPATIAL PROJECTION: GVMC WARD GRID 2026
          </span>
          <span className="text-[11px] text-slate-400 font-mono">17.7°N 83.3°E</span>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex items-center gap-1.5 bg-[#0b132b]/90 backdrop-blur-md p-1 rounded-lg border border-slate-700/80 pointer-events-auto">
          <button
            onClick={() => setShowInundationLayer(!showInundationLayer)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              showInundationLayer ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Hydro Flood Inundation Heatmaps"
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{t.floodHeatmap}</span>
          </button>

          <button
            onClick={() => setShowEvacCorridors(!showEvacCorridors)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              showEvacCorridors ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Verified High-Ground Corridors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t.corridors}</span>
          </button>

          <button
            onClick={() => setShowContourElevations(!showContourElevations)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              showContourElevations ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Ridge & Coastal Topography"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.elevationToggle}</span>
          </button>
        </div>
      </div>

      {/* SVG GIS Map Engine */}
      <div className="relative flex-1 w-full h-full cursor-crosshair">
        <svg
          viewBox="0 0 1000 680"
          className="w-full h-full preserve-3d"
          style={{ background: 'radial-gradient(circle at 75% 45%, #0d1e3d 0%, #060a14 70%)' }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="gis-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>

            {/* Inundation Gradients */}
            <radialGradient id="inundation-mvp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="inundation-surge" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="inundation-underpass" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            {/* Glowing Corridors Filter */}
            <filter id="corridor-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Coordinates Grid */}
          <rect width="1000" height="680" fill="url(#gis-grid)" />

          {/* Bay of Bengal Ocean Area */}
          <path
            d="M 680 0 Q 720 180 760 320 T 710 520 Q 640 600 580 680 L 1000 680 L 1000 0 Z"
            fill="#08182d"
            stroke="#1d4ed8"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />

          {/* Coastal Wave Swell Lines */}
          <path d="M 720 80 Q 770 180 790 280" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="6,8" strokeOpacity="0.3" />
          <path d="M 750 160 Q 800 260 760 380" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="5,10" strokeOpacity="0.25" />
          <path d="M 770 240 Q 820 340 780 460" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,8" strokeOpacity="0.2" />

          {/* Ocean Label */}
          <text x="860" y="380" fill="#3b82f6" fontSize="13" letterSpacing="4" opacity="0.4" fontFamily="JetBrains Mono" transform="rotate(75, 860, 380)">
            BAY OF BENGAL · 100M ISOBATH
          </text>

          {/* Topographic Elevation Contours (Kailasagiri, Simhachalam, Yarada) */}
          {showContourElevations && (
            <g id="topography" opacity="0.6">
              {/* Kailasagiri Ridge (High Ground: 130m MSL) */}
              <path
                d="M 640 220 C 660 190, 690 190, 700 230 C 710 270, 680 300, 640 280 C 620 260, 620 230, 640 220 Z"
                fill="#13271d"
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="3,3"
                strokeOpacity="0.6"
              />
              <text x="645" y="250" fill="#34d399" fontSize="10" fontFamily="JetBrains Mono" opacity="0.8">
                KAILASAGIRI RIDGE (130m MSL)
              </text>

              {/* Simhachalam Hills (West High Ground) */}
              <path
                d="M 280 180 C 330 140, 420 160, 430 230 C 440 290, 360 340, 290 310 C 240 280, 240 210, 280 180 Z"
                fill="#0f241a"
                stroke="#059669"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <text x="290" y="240" fill="#10b981" fontSize="10" fontFamily="JetBrains Mono" opacity="0.6">
                SIMHACHALAM ESCARPMENT (210m)
              </text>

              {/* Yarada Mountain / Dolphin's Nose (South) */}
              <path
                d="M 460 520 C 520 480, 620 500, 630 570 C 630 630, 520 660, 440 630 C 400 600, 420 550, 460 520 Z"
                fill="#16291e"
                stroke="#10b981"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
              <text x="480" y="580" fill="#34d399" fontSize="9" fontFamily="JetBrains Mono" opacity="0.7">
                DOLPHIN'S NOSE / YARADA (170m)
              </text>
            </g>
          )}

          {/* Primary Arterial Roadways Network */}
          <g id="roadways">
            {/* NH16 National Highway Corridor (West to North bypass) */}
            <path
              d="M 120 460 Q 240 400 320 310 T 520 180 Q 640 100 780 40"
              fill="none"
              stroke="#334155"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Arterial Beach Road Highway along coast */}
            <path
              d="M 640 500 Q 660 410 680 340 T 730 180 Q 770 120 830 50"
              fill="none"
              stroke="#475569"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Inner Ring Links */}
            <path d="M 320 310 L 540 330 L 680 340" fill="none" stroke="#1e293b" strokeWidth="2.5" />
            <path d="M 520 180 L 640 220" fill="none" stroke="#1e293b" strokeWidth="2" />
          </g>

          {/* Railway Tracks & Bottlenecks */}
          <g id="railway">
            <path
              d="M 100 480 Q 280 420 380 360 T 560 260 L 680 200"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="5,6"
            />
          </g>

          {/* Simulated Flood Inundation Heatmaps */}
          {showInundationLayer && (
            <g id="inundation-layer">
              {/* MVP Colony Basin Inundation Zone */}
              <circle cx="685" cy="245" r="54" fill="url(#inundation-mvp)" />
              {/* Kothavalasa Railway Underpass Impassable Chokepoint */}
              <circle cx="475" cy="330" r="38" fill="url(#inundation-underpass)" />
              {/* Jodugulla Palem Tidal Surge Zone */}
              <ellipse cx="765" cy="175" rx="60" ry="35" fill="url(#inundation-surge)" transform="rotate(-30, 765, 175)" />
              {/* Pamarru Coastal Pocket Low Basin */}
              <ellipse cx="585" cy="590" rx="48" ry="30" fill="url(#inundation-surge)" />
            </g>
          )}

          {/* Evacuation Corridors (High Ground Vector Highway) */}
          {showEvacCorridors && (
            <g id="evacuation-corridors" filter="url(#corridor-glow)">
              {/* Primary Active Safe Corridor: MVP to Kailasagiri Foothill / AU Relief Ground */}
              <path
                d="M 685 245 Q 670 215 650 210 T 590 230 L 530 250"
                fill="none"
                stroke="#10b981"
                strokeWidth={activeCorridorHighlight ? '4.5' : '3.5'}
                strokeDasharray="6,4"
                className="animate-pulse"
              />

              {/* Secondary Corridor: Jodugulla Palem to Endada Ridge */}
              <path
                d="M 765 175 Q 730 160 690 150 L 620 150"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />

              {/* South Corridor: Pamarru to Yarada Elevated Military Highway */}
              <path
                d="M 585 590 Q 550 560 510 540 L 460 520"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />

              {/* Hazard Avoidance Bypass Marker */}
              <circle cx="475" cy="330" r="16" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <line x1="465" y1="320" x2="485" y2="340" stroke="#ef4444" strokeWidth="2" />
              <line x1="485" y1="320" x2="465" y2="340" stroke="#ef4444" strokeWidth="2" />
            </g>
          )}

          {/* Interactive Ward Pins */}
          {wards.map((ward) => {
            const { x, y } = getCoordinates(ward.latitude, ward.longitude);
            // Map percentages to SVG coordinate system (1000 x 680)
            const cx = (x / 100) * 1000;
            const cy = (y / 100) * 680;
            const isSelected = selectedWard?.id === ward.id;
            const statusColor = getStatusColor(ward.status, ward.riskLevel);
            const isCritical = ward.status === 'Impassable' || ward.riskLevel === 'Critical' || ward.status === 'Active Waterlogging';

            return (
              <g
                key={ward.id}
                tabIndex={0}
                role="button"
                aria-label={`Ward ${ward.name}, Status ${ward.status}, Risk ${ward.riskLevel}`}
                onClick={() => onSelectWard(ward)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectWard(ward);
                  }
                }}
                className="cursor-pointer group focus:outline-none"
              >
                {/* Radar Ring for Critical/Active Wards */}
                {isCritical && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="none"
                    stroke={statusColor}
                    strokeWidth="1.5"
                    className="radar-ring"
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  />
                )}

                {/* Selection Halos */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="22"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="4,2"
                  />
                )}

                {/* Pin Core Base */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 9 : 7}
                  fill={statusColor}
                  stroke="#0f172a"
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:scale-125"
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />

                {/* Ward ID badge inside pin */}
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                >
                  {ward.id}
                </text>

                {/* Floating Ward Label */}
                <g className="transition-opacity duration-150">
                  <rect
                    x={cx + 12}
                    y={cy - 12}
                    width={ward.name.length * 6.5 + 24}
                    height="20"
                    rx="4"
                    fill="#0b132bcc"
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth="1"
                  />
                  <text
                    x={cx + 18}
                    y={cy + 2}
                    fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                    fontSize="10"
                    fontWeight={isSelected ? '700' : '500'}
                    fontFamily="Plus Jakarta Sans"
                  >
                    {ward.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Bottom Map Legend */}
        <div className="absolute bottom-3 left-3 z-20 flex flex-wrap items-center gap-3 bg-[#0b132b]/95 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/80 text-xs">
          <span className="font-semibold text-slate-300">{t.hazardCode}</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>{t.impassableLegend}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>{t.activeWaterloggingLegend}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
            <span>{t.cautionLegend}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>{t.clearLegend}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-mono pl-2 border-l border-slate-700">
            <span className="w-4 h-0.5 bg-emerald-400 inline-block border-dashed" />
            <span>{t.safeCorridorLegend}</span>
          </div>
        </div>

        {/* Selected Ward Quick Peek overlay card */}
        {selectedWard && (
          <div className="absolute bottom-3 right-3 z-20 w-80 max-w-[calc(100vw-2rem)] bg-[#0f172a]/95 backdrop-blur-md border border-slate-700 rounded-lg p-3 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono text-slate-400">WARD #{selectedWard.id}</span>
                <h4 className="text-sm font-bold text-slate-100">{selectedWard.name}</h4>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  selectedWard.status === 'Impassable' || selectedWard.riskLevel === 'Critical'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : selectedWard.status === 'Active Waterlogging'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {selectedWard.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">{t.waterDepth}</span>
                <span className="font-mono font-semibold text-amber-300">{selectedWard.currentWaterDepthM}m</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{t.rainfall}</span>
                <span className="font-mono font-semibold text-slate-200">{selectedWard.rainfallMmHr} mm/h</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{t.elevation}</span>
                <span className="font-mono text-emerald-400">{selectedWard.elevationMeters}m MSL</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{t.drainSaturation}</span>
                <span className="font-mono text-slate-300">{selectedWard.drainageCapacityPct}%</span>
              </div>
            </div>

            {selectedWard.evacuationRouteName && (
              <div className="mt-2 pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400 block">{t.assignedCorridor}</span>
                <span className="text-emerald-400 font-medium">{selectedWard.evacuationRouteName}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
