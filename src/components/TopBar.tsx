import React, { useState } from 'react';
import { AppScreen, AppLanguage } from '../types';
import { translations } from '../data/translations';
import { Shield, Menu, X, Radio, Languages } from 'lucide-react';

interface TopBarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  language: AppLanguage;
  onToggleLanguage: () => void;
  onTriggerMainAction: () => void;
  isDispatching: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onNavigate,
  language,
  onToggleLanguage,
  onTriggerMainAction,
  isDispatching
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navItems: { id: AppScreen; label: string }[] = [
    { id: 'dashboard', label: t.navDashboard },
    { id: 'risk-panel', label: t.navRiskPanel },
    { id: 'routing', label: t.navRouting },
    { id: 'about', label: t.navAbout }
  ];

  const handleNavClick = (screen: AppScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800">
      {/* 3-Zone Desktop Header Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
                {t.appName}
              </span>
              <span className="hidden lg:inline text-[10px] text-amber-400/90 font-mono tracking-wider uppercase">
                {t.municipalCommandTag}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4 Single-Line Text Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 font-medium ${
                  isActive
                    ? 'text-amber-400 border-amber-400'
                    : 'text-slate-300 hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Toggle & Primary Header Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* English / Telugu Toggle */}
          <button
            onClick={onToggleLanguage}
            aria-label={`Toggle language. Current: ${language === 'en' ? 'English' : 'Telugu'}`}
            className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#131d36] hover:bg-[#1a274a] text-slate-200 border border-slate-700/80 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          {/* Quick Route Dispatch Action */}
          <button
            onClick={onTriggerMainAction}
            disabled={isDispatching}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <Radio className={`w-3.5 h-3.5 ${isDispatching ? 'animate-spin' : ''}`} />
            <span>{isDispatching ? t.dispatching : t.dispatchCorridors}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#080d1a] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onTriggerMainAction();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow"
            >
              <Radio className="w-4 h-4" />
              <span>{t.mainActionButton}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
