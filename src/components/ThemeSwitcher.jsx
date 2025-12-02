import React, { useState } from 'react';
import { Sun, Moon, Palette, Check, X, Sparkles } from 'lucide-react';
import { useTheme, themes } from '@/contexts/ThemeContext';

export default function ThemeSwitcher({ variant = 'icon' }) {
  const { theme, changeTheme, toggleTheme, isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const themeIcons = {
    dark: Moon,
    light: Sun,
    midnight: Sparkles,
    sunset: Palette
  };

  const themeColors = {
    dark: 'from-slate-600 to-purple-600',
    light: 'from-amber-400 to-orange-400',
    midnight: 'from-blue-600 to-indigo-600',
    sunset: 'from-orange-500 to-rose-500'
  };

  const ThemeIcon = themeIcons[theme] || Moon;

  if (variant === 'quick') {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all"
        title={`Tema: ${themes[theme]?.label}`}
      >
        <ThemeIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all group"
        title="Ndrysho temën"
      >
        <div className="relative">
          <ThemeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </div>
      </button>

      {/* Theme Selection Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl p-6 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                Zgjidh Temën
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Options */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(themes).map(([key, themeConfig]) => {
                const Icon = themeIcons[key];
                const isSelected = theme === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => {
                      changeTheme(key);
                      setShowModal(false);
                    }}
                    className={`relative p-4 rounded-2xl border-2 transition-all ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}

                    {/* Theme preview */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${themeColors[key]} flex items-center justify-center mx-auto mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <p className={`text-sm font-semibold text-center ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {themeConfig.label}
                    </p>

                    {/* Mini color preview */}
                    <div className="flex justify-center gap-1 mt-2">
                      <div className={`w-3 h-3 rounded-full ${key === 'light' ? 'bg-slate-200' : 'bg-slate-700'}`} />
                      <div className={`w-3 h-3 rounded-full ${
                        key === 'light' ? 'bg-purple-400' : 
                        key === 'midnight' ? 'bg-blue-500' :
                        key === 'sunset' ? 'bg-orange-500' : 'bg-purple-500'
                      }`} />
                      <div className={`w-3 h-3 rounded-full ${key === 'light' ? 'bg-slate-900' : 'bg-slate-300'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current theme indicator */}
            <div className="mt-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
              <span className="text-sm text-slate-500">
                Tema aktuale: <span className="text-purple-400 font-semibold">{themes[theme]?.label}</span>
              </span>
            </div>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
            .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
          `}</style>
        </div>
      )}
    </>
  );
}

