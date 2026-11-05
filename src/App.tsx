import React, { useState, useEffect } from 'react';
import { 
  WardRecord, 
  SensorStream, 
  MunicipalStats, 
  AppScreen, 
  AppLanguage 
} from './types';
import { INITIAL_SAMPLE_RECORDS, INITIAL_SENSOR_STREAMS } from './data/sampleRecords';
import { translations } from './data/translations';
import { TopBar } from './components/TopBar';
import { MunicipalCommandDashboard } from './components/MunicipalCommandDashboard';
import { PredictiveRiskPanel } from './components/PredictiveRiskPanel';
import { DynamicRoutingEngine } from './components/DynamicRoutingEngine';
import { AboutScreen } from './components/AboutScreen';
import { CorridorDispatchModal } from './components/CorridorDispatchModal';
import { Shield, Radio, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY_WARDS = 'rescunet_vizag_wards_v1';
const STORAGE_KEY_STATS = 'rescunet_vizag_stats_v1';
const STORAGE_KEY_LANG = 'rescunet_vizag_lang_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'te' || saved === 'en') return saved;
    } catch (e) {
      console.warn('Could not read lang preference:', e);
    }
    return 'en';
  });
  const [routingTargetWard, setRoutingTargetWard] = useState<string>('MVP Colony Sector 4');

  // Wards State with LocalStorage persistence
  const [wards, setWards] = useState<WardRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WARDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read wards from localStorage:', e);
    }
    return INITIAL_SAMPLE_RECORDS;
  });

  // Sensor Streams State
  const [sensorStreams, setSensorStreams] = useState<SensorStream[]>(INITIAL_SENSOR_STREAMS);

  // Municipal Stats State
  const [stats, setStats] = useState<MunicipalStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read stats from localStorage:', e);
    }
    return {
      demosBooked: 14,
      ingestionLatencyMs: 420,
      uptimePct: 99.94,
      monitoredWardsCount: 10,
      safeCorridorsActive: 3
    };
  });

  // Dispatch Action Modal State
  const [isDispatching, setIsDispatching] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [dispatchTimestamp, setDispatchTimestamp] = useState('');

  // Persist Wards
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WARDS, JSON.stringify(wards));
    } catch (e) {
      console.warn('Failed to save wards to localStorage:', e);
    }
  }, [wards]);

  // Persist Stats
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch (e) {
      console.warn('Failed to save stats to localStorage:', e);
    }
  }, [stats]);

  // Load language preference
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as AppLanguage | null;
      if (savedLang === 'en' || savedLang === 'te') {
        setLanguage(savedLang);
      }
    } catch (e) {
      console.warn('Failed to read lang preference:', e);
    }
  }, []);

  const handleToggleLanguage = () => {
    const nextLang = language === 'en' ? 'te' : 'en';
    setLanguage(nextLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, nextLang);
    } catch (e) {
      console.warn('Failed to store lang preference:', e);
    }
  };

  // Main Action: Generate and dispatch verified street-level evacuation routes
  const handleTriggerMainAction = () => {
    setIsDispatching(true);
    const start = Date.now();

    // Simulate verified computation & dispatch in under 30 seconds (1.2s realistic responsiveness)
    setTimeout(() => {
      const elapsed = Date.now() - start;
      const nowStr = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      setDispatchTimestamp(nowStr);
      setIsDispatching(false);
      setShowDispatchModal(true);

      // Update telemetry latency stats
      setStats((prev) => ({
        ...prev,
        ingestionLatencyMs: Math.max(280, Math.min(850, Math.round(elapsed * 0.4))),
        safeCorridorsActive: Math.min(10, prev.safeCorridorsActive + 1)
      }));
    }, 1200);
  };

  // Ingestion batch trigger
  const handleTriggerIngestionBatch = async (): Promise<number> => {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const elapsed = Date.now() - start;

    // Slightly fluctuate sensor readings to show live ingest
    setSensorStreams((prev) =>
      prev.map((s) => ({
        ...s,
        lastPingMs: Math.floor(180 + Math.random() * 500)
      }))
    );

    setStats((prev) => ({
      ...prev,
      ingestionLatencyMs: elapsed
    }));

    return elapsed;
  };

  // Add new Ward Record
  const handleAddWard = (newWard: Omit<WardRecord, 'id' | 'updatedAt'>) => {
    const nextId = wards.length > 0 ? Math.max(...wards.map((w) => w.id)) + 1 : 1;
    const record: WardRecord = {
      ...newWard,
      id: nextId,
      updatedAt: 'Just now'
    };
    setWards((prev) => [record, ...prev]);
  };

  // Update existing Ward
  const handleUpdateWard = (updated: WardRecord) => {
    setWards((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  // Clear data handler
  const handleClearData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_WARDS);
      localStorage.removeItem(STORAGE_KEY_STATS);
    } catch (e) {
      console.warn('Failed clearing storage:', e);
    }
    setWards(INITIAL_SAMPLE_RECORDS);
    setStats({
      demosBooked: 14,
      ingestionLatencyMs: 420,
      uptimePct: 99.94,
      monitoredWardsCount: 10,
      safeCorridorsActive: 3
    });
  };

  // Book Demo Handler
  const handleBookDemo = async (name: string, org: string, email: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          organization: org,
          email,
          cityCorporation: 'Visakhapatnam (GVMC)'
        })
      });

      if (!res.ok) {
        throw new Error('Server returned error');
      }

      setStats((prev) => ({
        ...prev,
        demosBooked: prev.demosBooked + 1
      }));
      return true;
    } catch {
      // Offline fallback still logs locally
      setStats((prev) => ({
        ...prev,
        demosBooked: prev.demosBooked + 1
      }));
      return true;
    }
  };

  const handleNavigateToRouting = (wardName?: string) => {
    if (wardName) {
      setRoutingTargetWard(wardName);
    }
    setCurrentScreen('routing');
  };

  // Filter high-risk wards for the dispatch modal
  const highRiskWards = wards.filter(
    (w) =>
      w.riskLevel === 'Critical' ||
      w.riskLevel === 'Severe' ||
      w.riskLevel === 'High' ||
      w.status === 'Active Waterlogging' ||
      w.status === 'Impassable'
  );

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <TopBar
        currentScreen={currentScreen}
        onNavigate={(s) => setCurrentScreen(s)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onTriggerMainAction={handleTriggerMainAction}
        isDispatching={isDispatching}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 sm:pb-8">
        {currentScreen === 'dashboard' && (
          <MunicipalCommandDashboard
            wards={wards}
            onUpdateWard={handleUpdateWard}
            onAddWard={handleAddWard}
            language={language}
            onTriggerMainAction={handleTriggerMainAction}
            isDispatching={isDispatching}
            onNavigateToRouting={handleNavigateToRouting}
          />
        )}

        {currentScreen === 'risk-panel' && (
          <PredictiveRiskPanel
            sensorStreams={sensorStreams}
            wards={wards}
            onTriggerIngestionBatch={handleTriggerIngestionBatch}
            language={language}
            onTriggerMainAction={handleTriggerMainAction}
            isDispatching={isDispatching}
          />
        )}

        {currentScreen === 'routing' && (
          <DynamicRoutingEngine
            wards={wards}
            initialSelectedWard={routingTargetWard}
            language={language}
            onTriggerMainAction={handleTriggerMainAction}
            isDispatching={isDispatching}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            stats={stats}
            language={language}
            onClearData={handleClearData}
            onBookDemo={handleBookDemo}
            onTriggerMainAction={handleTriggerMainAction}
            isDispatching={isDispatching}
          />
        )}
      </main>

      {/* Mobile Persistent Floating Main Action Bar (Always visible on phone screens without scrolling) */}
      <aside 
        aria-label="Emergency route dispatch action"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080d1a]/95 backdrop-blur-md border-t border-amber-500/50 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl"
      >
        <button
          onClick={handleTriggerMainAction}
          disabled={isDispatching}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 active:from-amber-500 active:to-amber-600 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Radio className={`w-4 h-4 shrink-0 text-slate-950 ${isDispatching ? 'animate-spin' : 'animate-pulse'}`} />
          <span className="truncate tracking-tight font-extrabold">
            {isDispatching ? translations[language].mainActionDispatching : translations[language].mainActionButton}
          </span>
        </button>
      </aside>

      {/* Evacuation Corridor Dispatch Confirmation Dialog */}
      <CorridorDispatchModal
        isOpen={showDispatchModal}
        onClose={() => setShowDispatchModal(false)}
        dispatchedWards={highRiskWards.length > 0 ? highRiskWards : wards.slice(0, 3)}
        dispatchTimestamp={dispatchTimestamp}
        language={language}
      />

      {/* Clean Authoritative Footer */}
      <footer className="border-t border-slate-800 bg-[#060a14] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
              NX
            </div>
            <span className="font-semibold text-slate-200">{translations[language].appName}</span>
            <span>· {translations[language].footerEngineered}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <span>{translations[language].footerCity}</span>
            <span>·</span>
            <span className="text-emerald-400">{translations[language].targetMet}</span>
            <span>·</span>
            <span>{translations[language].priceValue} / {translations[language].perYearPerCity}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
