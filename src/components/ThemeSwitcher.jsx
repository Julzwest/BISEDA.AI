import React, { useState } from 'react';
import { Sun, Moon, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, changeTheme, isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const ThemeIcon = isDark ? Moon : Sun;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 hover:bg-slate-700/90 hover:border-purple-500/50 text-slate-400 hover:text-white transition-all group"
        title="Ndrysho temën"
      >
        <ThemeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-xs bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <h3 className="text-base font-bold text-white">Zgjidh Temën</h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Theme Options */}
            <div className="p-4 space-y-3">
              {/* Dark Theme */}
              <button
                onClick={() => {
                  changeTheme('dark');
                  setShowModal(false);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  theme === 'dark' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-slate-600">
                  <Moon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white">Errët</p>
                  <p className="text-xs text-slate-400">Më e lehtë për sytë natën</p>
                </div>
                {theme === 'dark' && (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Light Theme */}
              <button
                onClick={() => {
                  changeTheme('light');
                  setShowModal(false);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  theme === 'light' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center border border-amber-300">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white">Dritë</p>
                  <p className="text-xs text-slate-400">Më e qartë ditën</p>
                </div>
                {theme === 'light' && (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            {/* Preview */}
            <div className="px-4 pb-4">
              <div className={`p-3 rounded-xl border ${
                theme === 'light' 
                  ? 'bg-white border-slate-200' 
                  : 'bg-slate-800 border-slate-700'
              }`}>
                <p className={`text-xs font-medium ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  Pamje paraprake
                </p>
                <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>
                  Kështu do duket aplikacioni
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
