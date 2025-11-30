import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onContinue }) {
  const [name, setName] = useState('');
  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => {
    return localStorage.getItem('hasSeenWelcome') === 'true';
  });

  // If user has already seen welcome, don't show it
  if (hasSeenWelcome) {
    return null;
  }

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
    }
    localStorage.setItem('hasSeenWelcome', 'true');
    setHasSeenWelcome(true);
    if (onContinue) {
      onContinue(name.trim() || null);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setHasSeenWelcome(true);
    if (onContinue) {
      onContinue(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 z-50 flex items-center justify-center p-6">
      <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-purple-500/50 backdrop-blur-sm p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <MessageSquare className="w-10 h-10 text-white relative z-10" fill="currentColor" strokeWidth={1.5} />
              <Sparkles className="w-4 h-4 text-yellow-300 absolute top-2 right-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
            Mirësevini në Biseda.ai!
          </span>
        </h1>
        
        <p className="text-slate-300 mb-6 text-sm">
          AI Coach-i yt për dating dhe biseda
        </p>

        {/* Name Input */}
        <div className="mb-6">
          <label htmlFor="userName" className="block text-sm text-slate-300 mb-2">
            Shkruaj emrin tënd
          </label>
          <p className="text-xs text-slate-500 mb-3">(Opsionale)</p>
          <Input
            id="userName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Emri yt"
            className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 text-center text-lg h-12"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleContinue();
              }
            }}
            autoFocus
          />
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold h-12"
          >
            Vazhdo
          </Button>
          
          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white h-12"
          >
            Anashkalo
          </Button>
        </div>
      </Card>
    </div>
  );
}

