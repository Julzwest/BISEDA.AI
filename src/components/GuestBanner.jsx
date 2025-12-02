import React, { useState, useEffect } from 'react';
import { Clock, Camera, AlertTriangle, X, Sparkles } from 'lucide-react';
import { getGuestTimeRemaining, getGuestCreditsRemaining, clearGuestSession, isGuestSessionValid } from '@/pages/Auth';

export default function GuestBanner({ onExpired, onSignUp }) {
  const [timeRemaining, setTimeRemaining] = useState(getGuestTimeRemaining());
  const [creditsRemaining, setCreditsRemaining] = useState(getGuestCreditsRemaining());
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      const remaining = getGuestTimeRemaining();
      setTimeRemaining(remaining);
      setCreditsRemaining(getGuestCreditsRemaining());

      // Check if session expired
      if (remaining <= 0 && !showExpiredModal) {
        setShowExpiredModal(true);
        if (onExpired) onExpired();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpired, showExpiredModal]);

  // Format time as MM:SS
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Don't show if not a guest
  const isGuest = localStorage.getItem('isGuest') === 'true';
  if (!isGuest) return null;

  // Expired modal
  if (showExpiredModal) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-red-500/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl shadow-red-500/20 animate-scaleIn">
          <div className="text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-2">
              Koha e Vizitorit Përfundoi!
            </h2>
            
            {/* Message */}
            <p className="text-slate-400 text-sm mb-6">
              Sesioni yt 5-minutësh ka përfunduar. Regjistrohu për akses të pakufizuar dhe të gjitha veçoritë premium!
            </p>
            
            {/* Benefits */}
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 text-left">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Me llogari të plotë:</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Akses i pakufizuar
                </li>
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  Screenshot pa limit
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  Ruaj historinë e bisedave
                </li>
              </ul>
            </div>
            
            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  clearGuestSession();
                  if (onSignUp) onSignUp();
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-xl transition-all"
              >
                Regjistrohu Tani
              </button>
              <button
                onClick={() => {
                  clearGuestSession();
                  if (onSignUp) onSignUp();
                }}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-xl transition-all"
              >
                Kyçu me llogari ekzistuese
              </button>
            </div>
          </div>
        </div>
        
        {/* Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
          .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        `}</style>
      </div>
    );
  }

  // Dismissed state - show minimal indicator
  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        className="fixed top-20 left-4 z-[9998] px-3 py-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-700/90 transition-all"
      >
        <Clock className={`w-4 h-4 ${timeRemaining < 60000 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
        <span className={`text-sm font-mono font-bold ${timeRemaining < 60000 ? 'text-red-400' : 'text-white'}`}>
          {formatTime(timeRemaining)}
        </span>
      </button>
    );
  }

  // Full banner
  return (
    <div className={`fixed top-16 left-0 right-0 z-[9998] px-4 py-2 ${
      timeRemaining < 60000 
        ? 'bg-gradient-to-r from-red-900/95 to-orange-900/95' 
        : 'bg-gradient-to-r from-slate-900/95 to-slate-800/95'
    } backdrop-blur-xl border-b ${
      timeRemaining < 60000 ? 'border-red-500/50' : 'border-cyan-500/30'
    } shadow-lg`}>
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Timer */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${
            timeRemaining < 60000 
              ? 'bg-red-500/20 border border-red-500/50' 
              : 'bg-cyan-500/20 border border-cyan-500/50'
          } flex items-center justify-center`}>
            <Clock className={`w-4 h-4 ${timeRemaining < 60000 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
          </div>
          <div>
            <p className={`text-xs ${timeRemaining < 60000 ? 'text-red-300' : 'text-slate-400'}`}>
              Koha e mbetur
            </p>
            <p className={`text-lg font-mono font-bold ${timeRemaining < 60000 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeRemaining)}
            </p>
          </div>
        </div>

        {/* Credits */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded-lg">
            <Camera className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-slate-300">{creditsRemaining}/2</span>
          </div>
        </div>

        {/* Sign up button */}
        <button
          onClick={() => {
            clearGuestSession();
            if (onSignUp) onSignUp();
          }}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xs font-bold rounded-lg transition-all"
        >
          Regjistrohu
        </button>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

