import React, { useState, useEffect, useRef } from 'react';
import { Globe, X, Check, MapPin } from 'lucide-react';
import { countries, getCountryByCode } from '@/config/countries';

export default function CountrySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem('userCountry') || 'AL'
  );
  const modalRef = useRef(null);

  const currentCountry = getCountryByCode(selectedCountry);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
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

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    localStorage.setItem('userCountry', countryCode);
    localStorage.removeItem('userCity');
    
    window.dispatchEvent(new CustomEvent('countryChanged', { 
      detail: { countryCode } 
    }));
    
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group"
        aria-label="Change country"
      >
        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/90 border border-slate-700/60 rounded-xl hover:bg-slate-700/90 hover:border-purple-500/50 transition-all duration-200">
          <span className="text-lg">{currentCountry?.flag}</span>
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-sm bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Zgjidh Vendin</h2>
                  <p className="text-xs text-slate-400">Ku ndodhesh?</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Countries List */}
            <div className="p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
              <div className="grid grid-cols-2 gap-2">
                {countries.map((country) => {
                  const isSelected = selectedCountry === country.code;
                  
                  return (
                    <button
                      key={country.code}
                      onClick={() => handleSelectCountry(country.code)}
                      className={`relative p-3 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-purple-500/20 border-purple-500/50'
                          : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {/* Selection check */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      
                      {/* Flag */}
                      <div className="text-3xl mb-1">{country.flag}</div>
                      
                      {/* Name */}
                      <div className="font-semibold text-white text-sm">{country.name}</div>
                      
                      {/* Details */}
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] text-slate-500">{country.cities.length} qytete</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700/50 bg-slate-900/50">
              <p className="text-center text-xs text-slate-500">
                💡 Vendndodhja ndikon në këshillat
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
