import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Heart, Zap, Star, Crown, ArrowLeft, KeyRound } from 'lucide-react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import { Capacitor } from '@capacitor/core';

// Free trial constants (exported for use elsewhere)
export const FREE_TRIAL_DAYS = 3;
export const FREE_TRIAL_MESSAGES_PER_DAY = 10;

// Clear ALL session data (for logout functionality)
export const clearGuestSession = () => {
  localStorage.removeItem('guestSession');
  localStorage.removeItem('isGuest');
  localStorage.removeItem('guestId');
};

// Complete logout - clears everything
export const clearAllUserData = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('userCountry');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('isGuest');
  localStorage.removeItem('guestSession');
  localStorage.removeItem('guestId');
  localStorage.removeItem('conversationHistory');
  localStorage.removeItem('onboardingCompleted');
  console.log('🔓 User logged out - all data cleared');
};

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(false); // Start on signup by default
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  
  // Forgot password state
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: code, 3: new password
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const backendUrl = getBackendUrl();

  // Fun rotating taglines
  const taglines = [
    { text: "Fillo të flirtosh si pro 😎", emoji: "🔥" },
    { text: "Gjej dashurinë sonte 💕", emoji: "✨" },
    { text: "Loja e dating ndryshon tani 🚀", emoji: "💫" },
    { text: "Bëhu irresistible 💪", emoji: "⚡" }
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !username.trim()) {
      setError('Krijo nji username 👤');
      return;
    }

    if (!email.trim()) {
      setError('Shkruaj email-in tënd 📧');
      return;
    }

    if (!password || password.length < 6) {
      setError('Fjalëkalimi duhet 6+ karaktere 🔐');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      const body = isLogin 
        ? { email: email.trim(), password }
        : { 
            username: username.trim(),
            email: email.trim(), 
            password,
            country: 'AL' // Default, can change in settings
          };

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        // Clear ALL previous session data first to prevent profile confusion
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userCountry');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isGuest');
        localStorage.removeItem('guestSession');
        localStorage.removeItem('guestId');
        localStorage.removeItem('conversationHistory');
        
        // Now set the NEW user's data
        const userId = data.user.odId || data.user.userId;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userCountry', data.user.country || 'AL');
        
        console.log('✅ Logged in as:', data.user.username, '(', userId, ')');
        
        if (onAuthSuccess) onAuthSuccess({ ...data.user, userId });
      } else {
        setError(data.error || 'Diçka shkoi keq 😅');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Gabim lidhje. Provo përsëri! 🔄');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handlers
  const handleRequestResetCode = async () => {
    if (!resetEmail.trim()) {
      setError('Shkruaj email-in tënd 📧');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${backendUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim() })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('📧 Kodi u dërgua në email!');
        setResetStep(2);
      } else {
        setError(data.error || 'Gabim. Provo përsëri.');
      }
    } catch (err) {
      setError('Gabim lidhje. Provo përsëri! 🔄');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!resetCode.trim() || resetCode.length !== 6) {
      setError('Shkruaj kodin 6-shifror');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${backendUrl}/api/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim(), code: resetCode.trim() })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('✅ Kodi u verifikua!');
        setResetStep(3);
      } else {
        setError(data.error || 'Kodi i gabuar.');
      }
    } catch (err) {
      setError('Gabim lidhje. Provo përsëri! 🔄');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError('Fjalëkalimi duhet 6+ karaktere 🔐');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${backendUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetEmail.trim(), 
          code: resetCode.trim(),
          newPassword 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('🎉 Fjalëkalimi u ndryshua!');
        setTimeout(() => {
          setForgotPasswordMode(false);
          setResetStep(1);
          setResetEmail('');
          setResetCode('');
          setNewPassword('');
          setSuccessMessage('');
          setIsLogin(true);
        }, 2000);
      } else {
        setError(data.error || 'Gabim. Provo përsëri.');
      }
    } catch (err) {
      setError('Gabim lidhje. Provo përsëri! 🔄');
    } finally {
      setLoading(false);
    }
  };

  const exitForgotPassword = () => {
    setForgotPasswordMode(false);
    setResetStep(1);
    setResetEmail('');
    setResetCode('');
    setNewPassword('');
    setError('');
    setSuccessMessage('');
  };

  // ============ FORGOT PASSWORD UI ============
  if (forgotPasswordMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-purple-500/40">
                <KeyRound className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-black mb-2">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Rivendos Fjalëkalimin
              </span>
            </h1>
            <p className="text-slate-400 text-sm">
              {resetStep === 1 && '📧 Shkruaj email-in tënd'}
              {resetStep === 2 && '🔢 Shkruaj kodin 6-shifror'}
              {resetStep === 3 && '🔐 Krijo fjalëkalim të ri'}
            </p>
          </div>

          <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-xl p-6 rounded-3xl shadow-2xl">
            {/* Back button */}
            <button
              onClick={exitForgotPassword}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Kthehu te kyçja</span>
            </button>

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    resetStep >= step
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1: Enter Email */}
            {resetStep === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => { setResetEmail(e.target.value); setError(''); }}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Email yt 📧"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                
                <Button
                  onClick={handleRequestResetCode}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold h-14 rounded-2xl text-lg"
                >
                  {loading ? '⏳ Duke dërguar...' : '📧 Dërgo Kodin'}
                </Button>
              </div>
            )}

            {/* Step 2: Enter Code */}
            {resetStep === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => { 
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setResetCode(val); 
                    setError(''); 
                  }}
                  className="w-full px-4 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl text-white text-center text-3xl tracking-[0.5em] placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                  placeholder="000000"
                  maxLength={6}
                  style={{ fontSize: '24px' }}
                />
                <p className="text-xs text-slate-500 text-center">
                  Kontrolloni email-in tuaj për kodin
                </p>
                
                <Button
                  onClick={handleVerifyCode}
                  disabled={loading || resetCode.length !== 6}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold h-14 rounded-2xl text-lg"
                >
                  {loading ? '⏳ Duke verifikuar...' : '✅ Verifiko Kodin'}
                </Button>

                <button
                  onClick={() => { setResetStep(1); setResetCode(''); setError(''); }}
                  className="w-full text-sm text-purple-400 hover:text-purple-300"
                >
                  Nuk e morët kodin? Provo përsëri
                </button>
              </div>
            )}

            {/* Step 3: New Password */}
            {resetStep === 3 && (
              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                    placeholder="Fjalëkalimi i ri 🔐"
                    style={{ fontSize: '16px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                <Button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold h-14 rounded-2xl text-lg"
                >
                  {loading ? '⏳ Duke ndryshuar...' : '🔐 Ndrysho Fjalëkalimin'}
                </Button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-400 text-sm text-center">{successMessage}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // ============ MAIN AUTH UI ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo & Header - Official Biseda.ai Branding */}
        <div className="text-center mb-8">
          {/* Official Logo */}
          <div className="relative inline-block mb-6">
            {/* Main Logo Container */}
            <div className="w-28 h-28 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-400 rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-bounce-slow">
              {/* White Speech Bubble */}
              <div className="w-14 h-12 bg-white rounded-xl rounded-bl-sm flex items-center justify-center">
                {/* Empty inside - just the bubble shape */}
              </div>
            </div>
            
            {/* Yellow Sparkles - Top Right */}
            <div className="absolute top-0 right-0 flex flex-col items-end">
              <div className="text-yellow-400 text-sm font-bold" style={{ marginTop: '-2px', marginRight: '-4px' }}>✦</div>
              <div className="text-yellow-400 text-[10px] font-bold" style={{ marginTop: '-6px', marginRight: '2px' }}>✦</div>
            </div>
            
            {/* Blue Circle - Bottom Right */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/50">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-4xl font-black mb-3">
            <span className="text-white">Biseda</span>
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">.ai</span>
          </h1>
          
          {/* Rotating tagline */}
          <div className="h-8 flex items-center justify-center">
            <p className="text-slate-300 text-lg font-medium animate-fade-in" key={taglineIndex}>
              {taglines[taglineIndex].emoji} {taglines[taglineIndex].text}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-xl p-6 rounded-3xl shadow-2xl shadow-purple-500/20">
          {/* Quick Toggle */}
          <div className="flex gap-2 mb-6 bg-slate-800/50 p-1.5 rounded-2xl">
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🚀 Fillo Tani
            </button>
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👋 Kyçu
            </button>
          </div>

          {/* Simple Form - 3 fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username - Only for signup */}
            {!isLogin && (
              <div className={`relative transition-all duration-300 ${focusedField === 'username' ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-opacity ${focusedField === 'username' ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">👤</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 text-base transition-all"
                    placeholder="Krijo nji username"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-opacity ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-purple-400' : 'text-slate-500'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 text-base transition-all"
                  placeholder="Email yt 📧"
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>

            {/* Password */}
            <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-opacity ${focusedField === 'password' ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔐</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-800/80 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 text-base transition-all"
                  placeholder={isLogin ? "Fjalëkalimi yt" : "Krijo fjalëkalim sekret"}
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl animate-shake">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-bold h-14 rounded-2xl text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Duke shkuar...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? '🔓 Hyr Brenda' : '🎉 Fillo Falas'}
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Quick Benefits */}
          {!isLogin && (
            <div className="mt-6 flex justify-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>3 ditë falas</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                <span>Pa kartë</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Star className="w-3.5 h-3.5 text-purple-400" />
                <span>10 msg/ditë</span>
              </div>
            </div>
          )}

          {/* Forgot Password Link */}
          {isLogin && (
            <p className="text-center mt-4">
              <button 
                onClick={() => setForgotPasswordMode(true)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Harrove fjalëkalimin? 🤔
              </button>
            </p>
          )}
        </Card>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-xs">
            Duke vazhduar, pranon 
            <span className="text-purple-400"> Termat</span> dhe 
            <span className="text-purple-400"> Privatësinë</span>
          </p>
          <p className="text-slate-600 text-xs mt-2 flex items-center justify-center gap-1">
            <Crown className="w-3 h-3 text-amber-400" />
            Planet fillojnë nga €6.99/muaj
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
