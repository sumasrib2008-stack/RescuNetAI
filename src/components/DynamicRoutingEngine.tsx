import React, { useState } from 'react';
import { WardRecord, AIPredictionResult, AICard, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { 
  Navigation, 
  Sparkles, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  RefreshCw, 
  Volume2, 
  Car, 
  Clock, 
  MapPin, 
  Droplets, 
  Radio, 
  Layers,
  FileText
} from 'lucide-react';

interface DynamicRoutingEngineProps {
  wards: WardRecord[];
  initialSelectedWard?: string;
  language: AppLanguage;
  onTriggerMainAction: () => void;
  isDispatching: boolean;
}

export const DynamicRoutingEngine: React.FC<DynamicRoutingEngineProps> = ({
  wards,
  initialSelectedWard,
  language,
  onTriggerMainAction,
  isDispatching
}) => {
  const t = translations[language];

  // User input states (matching example: Rainfall intensity: 85mm/hr, MVP Colony drainage level: critical, Wind speed: 90 km/h)
  const [selectedWardName, setSelectedWardName] = useState(
    initialSelectedWard || 'MVP Colony Sector 4'
  );
  const [rainfallIntensity, setRainfallIntensity] = useState(85);
  const [drainageLevel, setDrainageLevel] = useState('critical');
  const [windSpeed, setWindSpeed] = useState(90);
  const [coastalSurge, setCoastalSurge] = useState(1.8);
  const [blockedUnderpass, setBlockedUnderpass] = useState(true);

  // AI Generation State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<AIPredictionResult>({
    floodPredictionSummary: 'Predicted 0.5m waterlogging at Sector-4 junction; re-routing emergency corridor via Hill-No.3 bypass.',
    waterloggingDepthMeters: 0.5,
    impactedLocation: 'MVP Colony Sector 4 Junction',
    riskSeverity: 'critical',
    inundationEstimateMinutes: 20,
    recommendedCorridor: {
      corridorName: 'Corridor Alfa-Vizag North High-Ground Route',
      safeWaypoints: [
        'MVP Sector-4 Elevated Gate',
        'Waltair Uplands Ring Road',
        'Hill-No.3 Bypass Expressway',
        'Andhra University Safe Relief Staging Hub'
      ],
      avoidedHazards: [
        'Kothavalasa Railway Underpass (1.25m submerged)',
        'Sector-4 low culvert bottleneck',
        'Coastal Beach Road gale surge'
      ],
      estimatedEvacuationMinutes: 18,
      capacityVehiclesPerHour: 850
    },
    tacticalAction: 'Dispatch GVMC Quick Response Rescue Squad 4 with 2 heavy de-watering pumps to Sector-4; barricade underpass access immediately.',
    teluguSummary: 'సెక్టార్-4 జంక్షన్ వద్ద 0.5 మీటర్ల వరద నీరు నిల్వ ఉంది. హిల్ నెం-3 బైపాస్ ద్వారా అత్యవసర తరలింపు చేపట్టండి.',
    cards: [
      {
        title: 'Street-Level Flood Inundation Forecast',
        summary: 'Predicted 0.5m waterlogging at Sector-4 junction; re-routing emergency corridor via Hill-No.3 bypass.',
        bullets: [
          'Peak Waterlogging: 0.5m depth standing water accumulating at Sector-4 culvert basin.',
          'Critical Window: 20 minutes before low-lying roadway becomes completely impassable.',
          'Atmospheric Driver: 85 mm/hr cloudburst precipitation with critical drainage saturation.'
        ]
      },
      {
        title: 'Dynamic Safe Evacuation Corridor',
        summary: 'Corridor Alfa-Vizag North high-ground route bypassing submerged underpasses.',
        bullets: [
          'Safe Waypoints: MVP Sector-4 Elevated Gate → Waltair Uplands → Hill-No.3 Bypass → AU Relief Hub.',
          'Avoided Chokepoints: Kothavalasa Railway Underpass (1.25m submerged), culvert bottlenecks, and surge zone.',
          'Corridor Throughput: 18 minutes transit duration with 850 vehicles/hour throughput capacity.'
        ]
      },
      {
        title: 'GVMC Field Action & Citizen Advisory',
        summary: 'Tactical de-watering squad mobilization and multilingual loudspeaker broadcast directives.',
        bullets: [
          'Frontline Command: Dispatch GVMC Quick Response Rescue Squad 4 with 2 heavy de-watering pumps to Sector-4.',
          'Telugu Loudhailer Alert: సెక్టార్-4 జంక్షన్ వద్ద 0.5 మీటర్ల వరద నీరు నిల్వ ఉంది. హిల్ నెం-3 బైపాస్ ద్వారా అత్యవసర తరలింపు చేపట్టండి.',
          'Traffic Diversion: Deploy ward volunteers to guide citizen traffic away from low culverts toward hill ridges.'
        ]
      }
    ]
  });

  const handleComputeAIPath = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const obstructions = [
      blockedUnderpass ? 'Kothavalasa Railway Underpass submerged (1.2m)' : '',
      'MVP Colony Sector-4 culvert low point',
      'Beach Road coastal debris'
    ].filter(Boolean);

    try {
      const response = await fetch('/api/predict-corridor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rainfallIntensity,
          drainageLevel,
          windSpeed,
          coastalSurge,
          wardLocation: selectedWardName,
          knownObstructions: obstructions,
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setPredictionResult(result.data);
      } else {
        throw new Error(result.error || 'Failed to parse AI corridor response');
      }
    } catch (err: any) {
      console.error('Pathfinder error:', err);
      setErrorMessage(
        'Unable to query the real-time AI corridor service. Please check network connectivity or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (preset: 'MVP' | 'JODUGULLA' | 'KOTHAVALASA') => {
    if (preset === 'MVP') {
      setSelectedWardName('MVP Colony Sector 4');
      setRainfallIntensity(85);
      setDrainageLevel('critical');
      setWindSpeed(90);
      setCoastalSurge(1.8);
      setBlockedUnderpass(true);
    } else if (preset === 'JODUGULLA') {
      setSelectedWardName('Jodugulla Palem Coast');
      setRainfallIntensity(105);
      setDrainageLevel('critical');
      setWindSpeed(96);
      setCoastalSurge(2.4);
      setBlockedUnderpass(false);
    } else {
      setSelectedWardName('Kothavalasa Railway Underpass');
      setRainfallIntensity(75);
      setDrainageLevel('critical');
      setWindSpeed(65);
      setCoastalSurge(0.5);
      setBlockedUnderpass(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Intro */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.geminiPathfinder}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {t.navRouting} — {t.automatedSafeEvacuation}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {t.routingSubtitle}
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            <button
              onClick={onTriggerMainAction}
              disabled={isDispatching}
              className="w-full lg:max-w-md px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 border border-amber-300/80 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <Radio className={`w-5 h-5 shrink-0 ${isDispatching ? 'animate-spin' : 'animate-pulse'}`} />
              <span className="text-left font-extrabold">{isDispatching ? t.mainActionDispatching : t.mainActionButton}</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">{t.quickPresets}</span>
          <button
            onClick={() => loadPreset('MVP')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
              selectedWardName === 'MVP Colony Sector 4'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-[#101b38] text-slate-300 border-slate-700 hover:bg-[#182852]'
            }`}
          >
            MVP Colony Crisis (85mm/hr, 90km/h)
          </button>
          <button
            onClick={() => loadPreset('JODUGULLA')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
              selectedWardName === 'Jodugulla Palem Coast'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-[#101b38] text-slate-300 border-slate-700 hover:bg-[#182852]'
            }`}
          >
            Jodugulla Palem Surge (2.4m Surge)
          </button>
          <button
            onClick={() => loadPreset('KOTHAVALASA')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
              selectedWardName === 'Kothavalasa Railway Underpass'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-[#101b38] text-slate-300 border-slate-700 hover:bg-[#182852]'
            }`}
          >
            Kothavalasa Underpass Submerged
          </button>
        </div>
      </div>

      {/* Main Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Parameter Inputs */}
        <div className="lg:col-span-5 bg-[#0b132b] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>{t.incidentParameters}</span>
            </h2>
            <span className="text-xs text-slate-400">
              {t.fedDirectlyToAI}
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Target Ward Location */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.targetWard}
              </label>
              <select
                value={selectedWardName}
                onChange={(e) => setSelectedWardName(e.target.value)}
                className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100 font-medium focus:outline-none focus:border-amber-400"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.name}>
                    Ward {w.id}: {w.name} ({w.hazardType}: {w.hazardValue})
                  </option>
                ))}
              </select>
            </div>

            {/* Rainfall Intensity */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.rainfall} (mm/hr):</span>
                </label>
                <span className="font-mono font-bold text-amber-300">{rainfallIntensity} mm/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="140"
                value={rainfallIntensity}
                onChange={(e) => setRainfallIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 font-mono">Example: 85 mm/hr</span>
            </div>

            {/* Drainage Saturation */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.wardDrainageFreeboard}
              </label>
              <select
                value={drainageLevel}
                onChange={(e) => setDrainageLevel(e.target.value)}
                className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100 font-medium"
              >
                <option value="normal">{t.drainageNormal}</option>
                <option value="elevated">{t.drainageElevated}</option>
                <option value="critical">{t.drainageCritical}</option>
              </select>
            </div>

            {/* Wind Speed */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">
                  {t.windSpeedLabel}
                </label>
                <span className="font-mono font-bold text-slate-200">{windSpeed} km/h</span>
              </div>
              <input
                type="range"
                min="30"
                max="140"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseInt(e.target.value, 10))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Coastal Storm Surge */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-slate-300 font-semibold">
                  {t.coastalSurgeMsl}
                </label>
                <span className="font-mono font-bold text-blue-300">{coastalSurge}m</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.5"
                step="0.1"
                value={coastalSurge}
                onChange={(e) => setCoastalSurge(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Obstruction Toggle */}
            <div className="p-3 bg-[#070c1b] border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-slate-200 font-semibold block">{t.avoidKothavalasa}</span>
                <span className="text-[11px] text-slate-400">{t.avoidUnderpassDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={blockedUnderpass}
                onChange={(e) => setBlockedUnderpass(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleComputeAIPath}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? t.computingPathfinder : t.runGeminiPathfinder}</span>
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): AI Structured Results Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.aiGuidanceCards}</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
              STRUCTURED JSON
            </span>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-[#0b132b] border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <RefreshCw className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Synthesizing Multi-Source Sensor Feeds with Gemini 3.8 Flash...
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Correlating IMD radar (85mm/hr), ultrasonic culvert saturation, and elevation contours.
                </p>
              </div>
              <div className="h-2 bg-slate-800 rounded-full max-w-sm mx-auto overflow-hidden">
                <div className="h-full bg-amber-500 animate-pulse w-2/3" />
              </div>
            </div>
          )}

          {/* Error State with Try Again Button */}
          {errorMessage && !isLoading && (
            <div className="bg-[#0b132b] border border-red-500/40 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-400 text-sm font-bold">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Pathfinder Service Alert</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {errorMessage}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleComputeAIPath}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.tryAgain}</span>
                </button>
              </div>
            </div>
          )}

          {/* Populated Structured Cards Layout (Title, One-Line Summary, 3 Bullet Points) */}
          {!isLoading && predictionResult && (() => {
            const displayCards: AICard[] =
              predictionResult.cards && predictionResult.cards.length >= 3
                ? predictionResult.cards
                : [
                    {
                      title: 'Street-Level Flood Inundation Forecast',
                      summary: predictionResult.floodPredictionSummary,
                      bullets: [
                        `Peak Waterlogging: Estimated ${predictionResult.waterloggingDepthMeters}m depth accumulating at ${predictionResult.impactedLocation}.`,
                        `Critical Window: ${predictionResult.inundationEstimateMinutes} minutes estimated before low-lying roadway becomes impassable.`,
                        `Hazard Severity: ${predictionResult.riskSeverity.toUpperCase()} risk triggered by severe ${rainfallIntensity} mm/hr cloudburst.`
                      ]
                    },
                    {
                      title: 'Dynamic Safe Evacuation Corridor',
                      summary: `Automated corridor via ${predictionResult.recommendedCorridor.corridorName} bypassing submerged chokepoints.`,
                      bullets: [
                        `Safe Waypoint Chain: ${predictionResult.recommendedCorridor.safeWaypoints.join(' → ')}.`,
                        `Avoided Chokepoints: Automatically steers around ${predictionResult.recommendedCorridor.avoidedHazards.join(', ')}.`,
                        `Transit Capacity: ${predictionResult.recommendedCorridor.estimatedEvacuationMinutes} min transit duration with ${predictionResult.recommendedCorridor.capacityVehiclesPerHour} vehicles/hr throughput.`
                      ]
                    },
                    {
                      title: 'GVMC Field Action & Citizen Advisory',
                      summary: 'Tactical de-watering squad mobilization and multilingual loudspeaker broadcast directives.',
                      bullets: [
                        `Frontline Directive: ${predictionResult.tacticalAction}`,
                        `Telugu Loudhailer Alert: ${predictionResult.teluguSummary}`,
                        'Traffic Control: Deploy ward sachivalayam marshals to divert residential vehicles away from low-lying culverts.'
                      ]
                    }
                  ];

            return (
              <div className="space-y-4">
                {displayCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0b132b] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 transition-all hover:border-amber-500/50"
                  >
                    {/* 1. Card Title */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs font-mono">
                          0{idx + 1}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {card.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#101b38] text-slate-300 border border-slate-700">
                        Card {idx + 1} of 3
                      </span>
                    </div>

                    {/* 2. One-Line Summary */}
                    <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-red-950/20 to-[#070c1b] border border-amber-500/40 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        {t.oneLineSummaryLabel}
                      </span>
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">
                        "{card.summary}"
                      </p>
                    </div>

                    {/* 3. 3 Bullet Points */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        {t.keyFindingsLabel}
                      </span>
                      <ul className="space-y-2">
                        {card.bullets.slice(0, 3).map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#070c1b] p-3 rounded-lg border border-slate-800/80"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                            <span className="font-medium text-slate-100">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* Supplementary Quick Telemetry Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-1 font-mono">
                  <div className="bg-[#070c1b] border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Waterlogging</span>
                    <span className="text-sm font-bold text-amber-300">{predictionResult.waterloggingDepthMeters}m</span>
                  </div>
                  <div className="bg-[#070c1b] border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Inundation Window</span>
                    <span className="text-sm font-bold text-red-400">{predictionResult.inundationEstimateMinutes} min</span>
                  </div>
                  <div className="bg-[#070c1b] border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Transit Duration</span>
                    <span className="text-sm font-bold text-emerald-400">{predictionResult.recommendedCorridor.estimatedEvacuationMinutes} min</span>
                  </div>
                  <div className="bg-[#070c1b] border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Throughput</span>
                    <span className="text-sm font-bold text-sky-400">{predictionResult.recommendedCorridor.capacityVehiclesPerHour} veh/hr</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
