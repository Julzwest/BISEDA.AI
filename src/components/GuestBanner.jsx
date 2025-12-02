import React, { useState } from 'react';
import { UserX, X, Sparkles } from 'lucide-react';
import { clearGuestSession } from '@/pages/Auth';

export default function GuestBanner({ onSignUp }) {
  const [dismissed, setDismissed] = useState(false);

  // Don't show if not a guest
  const isGuest = localStorage.getItem('isGuest') === 'true';
  if (!isGuest) return null;

  // Dismissed state - show minimal indicator
  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        className="fixed top-20 left-4 z-[9998] px-3 py-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-700/90 transition-all"
      >
        <UserX className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-medium text-white">Vizitor</span>
      </button>
    );
  }

  // Simple guest banner
  return (
    <div className="fixed top-16 left-0 right-0 z-[9998] px-4 py-2 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Guest indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
            <UserX className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Mënyra</p>
            <p className="text-sm font-bold text-white">Vizitor</p>
          </div>
        </div>

        {/* Sign up button */}
        <button
          onClick={() => {
            clearGuestSession();
            if (onSignUp) onSignUp();
          }}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
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
