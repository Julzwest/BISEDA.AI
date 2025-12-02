import React, { useState, useEffect, useRef } from 'react';
import { Globe, X, Check, MapPin, Sparkles } from 'lucide-react';
import { countries, getCountryByCode } from '@/config/countries';

export default function CountrySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem('userCountry') || 'AL'
  );
  const [animatingOut, setAnimatingOut] = useState(false);
  const [justChanged, setJustChanged] = useState(false);
  const modalRef = useRef(null);

  const currentCountry = getCountryByCode(selectedCountry);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setAnimatingOut(false);
    }, 200);
  };

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    localStorage.setItem('userCountry', countryCode);
    localStorage.removeItem('userCity'); // Reset city when country changes
    setJustChanged(true);
    
    // Trigger a custom event so other components can react
    window.dispatchEvent(new CustomEvent('countryChanged', { 
      detail: { countryCode } 
    }));
    
    setTimeout(() => {
      handleClose();
      setJustChanged(false);
    }, 600);
  };

  return (
    <>
      {/* Modern Dropdown Button - Top Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-20 top-4 z-[9998] group"
        aria-label="Change country"
      >
        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/60 rounded-xl hover:bg-slate-700/90 hover:border-cyan-500/50 transition-all duration-200 shadow-lg">
          <span className="text-lg">{currentCountry?.flag}</span>
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 ${
            animatingOut ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal */}
          <div 
            ref={modalRef}
            className={`relative w-full max-w-md max-h-[80vh] overflow-hidden rounded-3xl ${
              animatingOut ? 'animate-scaleOut' : 'animate-scaleIn'
            }`}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
            
            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Zgjidh Vendin</h2>
                      <p className="text-xs text-slate-400">Ku ndodhesh tani?</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Countries Grid */}
              <div className="p-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country, index) => {
                    const isSelected = selectedCountry === country.code;
                    const wasJustSelected = justChanged && isSelected;
                    
                    return (
                      <button
                        key={country.code}
                        onClick={() => handleSelectCountry(country.code)}
                        className={`relative group p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 scale-[1.02]'
                            : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                        }`}
                        style={{
                          animationDelay: `${index * 30}ms`
                        }}
                      >
                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center ${
                              wasJustSelected ? 'animate-bounceIn' : ''
                            }`}>
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        )}
                        
                        {/* Sparkle effect on selection */}
                        {wasJustSelected && (
                          <div className="absolute inset-0 pointer-events-none">
                            <Sparkles className="absolute top-1 left-1 w-4 h-4 text-yellow-400 animate-ping" />
                            <Sparkles className="absolute bottom-2 right-8 w-3 h-3 text-cyan-400 animate-ping" style={{ animationDelay: '100ms' }} />
                            <Sparkles className="absolute top-1/2 right-2 w-3 h-3 text-purple-400 animate-ping" style={{ animationDelay: '200ms' }} />
                          </div>
                        )}
                        
                        {/* Flag */}
                        <div className={`text-4xl mb-2 transform transition-transform duration-300 ${
                          isSelected ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                          {country.flag}
                        </div>
                        
                        {/* Country name */}
                        <div className="font-semibold text-white text-sm mb-0.5">
                          {country.name}
                        </div>
                        
                        {/* Currency badge */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-400">{country.nameEn}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
                            {country.currencySymbol}
                          </span>
                        </div>
                        
                        {/* Cities count */}
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {country.cities.length} qytete
                        </div>
                        
                        {/* Hover glow */}
                        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                          isSelected 
                            ? 'opacity-100 bg-gradient-to-br from-cyan-500/5 to-purple-500/5' 
                            : 'opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer hint */}
              <div className="sticky bottom-0 p-3 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50">
                <p className="text-center text-xs text-slate-500">
                  <span className="text-cyan-400">💡</span> Vendndodhja ndikon në këshillat dhe çmimet
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes scaleOut {
          from { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-scaleOut {
          animation: scaleOut 0.2s ease-out forwards;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </>
  );
}

