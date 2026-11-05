import React, { useState } from 'react';
import { MunicipalStats, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { StatStrip } from './StatStrip';
import { 
  Shield, 
  Users, 
  MapPin, 
  Building2, 
  Coins, 
  FileCheck, 
  Trash2, 
  Send, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Waves
} from 'lucide-react';

interface AboutScreenProps {
  stats: MunicipalStats;
  language: AppLanguage;
  onClearData: () => void;
  onBookDemo: (name: string, org: string, email: string) => Promise<boolean>;
  onTriggerMainAction: () => void;
  isDispatching: boolean;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  stats,
  language,
  onClearData,
  onBookDemo,
  onTriggerMainAction,
  isDispatching
}) => {
  const t = translations[language];

  // Demo Booking form state
  const [officerName, setOfficerName] = useState('');
  const [organization, setOrganization] = useState('Greater Visakhapatnam Municipal Corporation (GVMC)');
  const [officerEmail, setOfficerEmail] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Clear data confirm modal
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerName.trim() || !officerEmail.trim()) {
      setBookingError('Please enter the officer name and municipal email address.');
      return;
    }
    setBookingError('');
    setBookingLoading(true);

    try {
      const ok = await onBookDemo(officerName, organization, officerEmail);
      if (ok) {
        setBookingSubmitted(true);
      } else {
        setBookingError('Could not register demo booking. Please try again.');
      }
    } catch {
      setBookingError('Server error while booking demo.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Pitch & Positioning */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
              B2G Spatial Intelligence Platform · Visakhapatnam, Andhra Pradesh, India
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.aboutTitle}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.ourPitch}
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

        {/* Small stats strip required on Result/About screen */}
        <div className="pt-4 border-t border-slate-800">
          <StatStrip stats={stats} language={language} />
        </div>
      </div>

      {/* The Problem, The Solution, The Users & B2G Business Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Problem it solves */}
        <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-red-400 text-sm font-bold uppercase tracking-wider font-mono">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{t.problemTitle}</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {t.problemDesc}
          </p>
          <div className="p-3 bg-[#070c1b] border border-slate-800/80 rounded-xl text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Critical Flashpoints:</span>
            <span>Kothavalasa railway underpass waterlogging, MVP Colony culvert bottlenecks, and Beach Road tidal surges.</span>
          </div>
        </div>

        {/* Card 2: Our Solution */}
        <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold uppercase tracking-wider font-mono">
            <Shield className="w-5 h-5 shrink-0" />
            <span>{t.solutionTitle}</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {t.solutionDesc}
          </p>
          <div className="p-3 bg-[#070c1b] border border-slate-800/80 rounded-xl text-xs text-emerald-400 font-mono">
            Sub-30 second telemetry fusion · Zero static routing bottlenecks
          </div>
        </div>

        {/* Card 3: Users & Beneficiaries */}
        <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-sky-400 text-sm font-bold uppercase tracking-wider font-mono">
            <Users className="w-5 h-5 shrink-0" />
            <span>{t.usersTitle}</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {t.usersDesc}
          </p>
          <div className="text-xs text-slate-400">
            Operations Center: GVMC Disaster Command Room, Asilmetta, Visakhapatnam.
          </div>
        </div>

        {/* Card 4: Who Pays Later & Licensing Model */}
        <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-amber-400 text-sm font-bold uppercase tracking-wider font-mono">
            <Coins className="w-5 h-5 shrink-0" />
            <span>{t.pricingTitle}</span>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-bold text-white block">
              {t.annualFee}
            </span>
            <div className="text-2xl font-extrabold text-amber-400 font-mono">
              {t.priceValue} <span className="text-sm font-normal text-slate-400">{t.perYearPerCity}</span>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            {t.pricingPayerDesc}
          </p>
        </div>
      </div>

      {/* Why It Matters & What Makes Us Different */}
      <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
            Competitive Edge
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {t.whyItMatters}: What Makes Us Different
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mt-2 leading-relaxed">
            "{t.differentiator}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#070c1b] border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-bold text-red-400 font-mono">Cyclone Hudhud Proof</span>
            <p className="text-xs text-slate-300">
              {t.hudhudFact}
            </p>
          </div>
          <div className="p-4 bg-[#070c1b] border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-bold text-amber-400 font-mono">974 km AP Coast</span>
            <p className="text-xs text-slate-300">
              {t.coastlineFact}
            </p>
          </div>
          <div className="p-4 bg-[#070c1b] border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-bold text-sky-400 font-mono">Urban Inundation</span>
            <p className="text-xs text-slate-300">
              {t.flashFloodFact}
            </p>
          </div>
        </div>

        {/* Team NOVIX */}
        <div className="p-5 bg-[#070c1b] border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-black text-lg">
              NX
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400">INNOVATION TEAM</span>
              <h3 className="text-base font-bold text-white">{t.teamTitle}</h3>
              <span className="text-xs text-slate-400">{t.teamLocation}</span>
            </div>
          </div>
          <div className="text-xs text-slate-300 sm:text-right font-mono">
            GovTech · GIS Hydrology · Edge Telemetry
          </div>
        </div>
      </div>

      {/* Book a Municipal Demo Section */}
      <div className="bg-[#0b132b] border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
            City Corporation Pilot
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {t.bookDemoTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Schedule a certified 30-day live deployment test for GVMC, APSDMA, or municipal response bodies.
          </p>
        </div>

        {bookingSubmitted ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-xs text-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Municipal Trial Booked Successfully!</span>
              <span>Our Visakhapatnam engineering desk will issue sandbox credentials within 4 hours. Demo counter incremented.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.officerName}
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                placeholder="e.g., Sri K. Venkat Rao"
                className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.authority}
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="GVMC or APSDMA"
                className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {t.officialEmail}
              </label>
              <input
                type="email"
                value={officerEmail}
                onChange={(e) => setOfficerEmail(e.target.value)}
                placeholder="commissioner@gvmc.gov.in"
                className="w-full bg-[#070c1b] border border-slate-700 rounded-lg p-2.5 text-slate-100"
              />
            </div>

            {bookingError && (
              <div className="sm:col-span-3 text-red-400 text-xs">
                {bookingError}
              </div>
            )}

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                disabled={bookingLoading}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{bookingLoading ? 'Submitting Request...' : t.bookDemo}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Clear My Data Section */}
      <div className="p-5 bg-[#070c1b] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>{t.localDataStorage}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.clearDataDesc}
          </p>
        </div>

        <button
          onClick={() => setShowClearConfirm(true)}
          className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.clearMyData}</span>
        </button>
      </div>

      {/* Clear Data Confirmation Dialog */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-[#0b132b] border border-slate-700 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{t.resetDialogTitle}</h4>
                <p className="text-xs text-slate-400">
                  {t.resetDialogDesc}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  onClearData();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                {t.confirmReset}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
