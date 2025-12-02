import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, MapPin, ArrowLeft, KeyRound, Clock, UserX } from 'lucide-react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import countries from '@/config/countries';
import { Capacitor } from '@capacitor/core';

// Guest mode utilities
export const initGuestSession = () => {
  const guestSession = {
    isGuest: true,
    startTime: Date.now(),
    expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes
    screenshotCredits: 2,
    usedCredits: 0
  };
  localStorage.setItem('guestSession', JSON.stringify(guestSession));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('isGuest', 'true');
  return guestSession;
};

export const getGuestSession = () => {
  try {
    const session = localStorage.getItem('guestSession');
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

export const isGuestSessionValid = () => {
  const session = getGuestSession();
  if (!session) return false;
  return Date.now() < session.expiresAt;
};

export const getGuestTimeRemaining = () => {
  const session = getGuestSession();
  if (!session) return 0;
  const remaining = session.expiresAt - Date.now();
  return Math.max(0, remaining);
};

export const getGuestCreditsRemaining = () => {
  const session = getGuestSession();
  if (!session) return 0;
  return Math.max(0, session.screenshotCredits - session.usedCredits);
};

export const useGuestCredit = () => {
  const session = getGuestSession();
  if (!session) return false;
  if (session.usedCredits >= session.screenshotCredits) return false;
  
  session.usedCredits += 1;
  localStorage.setItem('guestSession', JSON.stringify(session));
  return true;
};

export const clearGuestSession = () => {
  localStorage.removeItem('guestSession');
  localStorage.removeItem('isGuest');
  localStorage.removeItem('isAuthenticated');
};

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: 'AL'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Forgot password state
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: enter email, 2: enter code, 3: new password
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const backendUrl = getBackendUrl();

  const sanitizeFormData = () => {
    const trimmedUsername = formData.username?.trim() || '';
    const trimmedEmail = formData.email?.trim() || '';
    const trimmedPhone = formData.phoneNumber?.trim() || '';

    return {
      username: trimmedUsername,
      email: trimmedEmail,
      phoneNumber: trimmedPhone,
      password: formData.password,
      country: formData.country
    };
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const sanitized = sanitizeFormData();
    if (isLogin && !sanitized.email) {
      setError('Shkruaj email ose username.');
      setLoading(false);
      return;
    }

    if (!isLogin && (!sanitized.username || !sanitized.email || !sanitized.password)) {
      setError('Plotëso të gjitha fushat e detyrueshme.');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email: sanitized.email, password: sanitized.password }
        : {
            username: sanitized.username,
            email: sanitized.email,
            phoneNumber: sanitized.phoneNumber || undefined,
            password: sanitized.password,
            country: sanitized.country
          };

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data
        localStorage.setItem('userId', data.user.userId);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.username);
        localStorage.setItem('isAuthenticated', 'true');
        
        const countryFromResponse = data.user?.country;
        if (!isLogin && sanitized.country) {
          localStorage.setItem('userCountry', sanitized.country);
        } else if (countryFromResponse) {
          localStorage.setItem('userCountry', countryFromResponse);
        }
        
        // Call success callback
        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handlers
  const handleRequestResetCode = async () => {
    if (!resetEmail.trim()) {
      setError('Shkruaj email-in tënd.');
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
        setSuccessMessage(data.message);
        setResetStep(2);
        // For development, show the code if returned
        if (data._devCode) {
          console.log('DEV: Reset code is', data._devCode);
        }
      } else {
        setError(data.error || 'Gabim. Provoni përsëri.');
      }
    } catch (err) {
      setError('Gabim në lidhje. Provoni përsëri.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!resetCode.trim() || resetCode.length !== 6) {
      setError('Shkruaj kodin 6-shifror.');
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
        setSuccessMessage('Kodi u verifikua!');
        setResetStep(3);
      } else {
        setError(data.error || 'Kodi i gabuar.');
      }
    } catch (err) {
      setError('Gabim në lidhje. Provoni përsëri.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError('Fjalëkalimi duhet të ketë së paku 6 karaktere.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Fjalëkalimet nuk përputhen.');
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
        setSuccessMessage(data.message);
        // Reset all forgot password state and go back to login
        setTimeout(() => {
          setForgotPasswordMode(false);
          setResetStep(1);
          setResetEmail('');
          setResetCode('');
          setNewPassword('');
          setConfirmPassword('');
          setSuccessMessage('');
        }, 2000);
      } else {
        setError(data.error || 'Gabim. Provoni përsëri.');
      }
    } catch (err) {
      setError('Gabim në lidhje. Provoni përsëri.');
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
    setConfirmPassword('');
    setError('');
    setSuccessMessage('');
  };

  // Check if running in Capacitor (native iOS app)
  const isNativeApp = Capacitor.isNativePlatform();
  const [SignInWithApple, setSignInWithApple] = useState(null);

  // Load the Apple Sign In plugin on mount (for native app)
  useEffect(() => {
    const loadAppleSignIn = async () => {
      if (isNativeApp) {
        try {
          const { SignInWithApple } = await import('@capacitor-community/apple-sign-in');
          setSignInWithApple(() => SignInWithApple);
          console.log('✅ Apple Sign In plugin loaded');
        } catch (err) {
          console.log('Apple Sign In plugin not available:', err);
        }
      }
    };
    loadAppleSignIn();
  }, [isNativeApp]);

  const handleAppleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      // For native iOS app - use Capacitor Sign In with Apple
      if (isNativeApp && SignInWithApple) {
        try {
          console.log('🍎 Starting native Apple Sign In...');
          
          const result = await SignInWithApple.authorize({
            clientId: 'ai.biseda.app',
            redirectURI: 'https://bisedaai.com',
            scopes: 'email name'
          });
          
          console.log('✅ Apple Sign In result:', result);
          
          // Send to backend
          const response = await fetch(`${backendUrl}/api/auth/apple`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identityToken: result.response?.identityToken,
              email: result.response?.email,
              givenName: result.response?.givenName,
              familyName: result.response?.familyName
            })
          });

          const data = await response.json();
          
          if (response.ok) {
            localStorage.setItem('userId', data.user.userId);
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('userName', data.user.username);
            localStorage.setItem('isAuthenticated', 'true');
            
            // Save location if set
            if (formData.country) {
              localStorage.setItem('userCountry', formData.country);
            }
            
            if (onAuthSuccess) onAuthSuccess(data.user);
          } else {
            setError(data.error || 'Apple Sign In dështoi');
          }
        } catch (nativeErr) {
          console.error('Native Apple Sign In error:', nativeErr);
          if (nativeErr.message?.includes('canceled') || nativeErr.message?.includes('1001')) {
            setError('Sign In u anulua.');
          } else {
            setError(`Apple Sign In dështoi: ${nativeErr.message || 'Provoni me email'}`);
          }
        }
      } 
      // For web - Apple Sign In requires Apple Developer setup
      else if (!isNativeApp && window.AppleID && window.AppleID.auth) {
        try {
          window.AppleID.auth.init({
            clientId: 'ai.biseda.web',
            scope: 'name email',
            redirectURI: window.location.origin,
            state: 'biseda_auth',
            usePopup: true
          });
          
          const data = await window.AppleID.auth.signIn();
          
          const response = await fetch(`${backendUrl}/api/auth/apple`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identityToken: data.authorization?.id_token,
              email: data.user?.email,
              givenName: data.user?.name?.firstName,
              familyName: data.user?.name?.familyName
            })
          });

          const result = await response.json();

          if (response.ok) {
            localStorage.setItem('userId', result.user.userId);
            localStorage.setItem('userEmail', result.user.email);
            localStorage.setItem('userName', result.user.username);
            localStorage.setItem('isAuthenticated', 'true');
            if (onAuthSuccess) onAuthSuccess(result.user);
          } else {
            setError(result.error || 'Apple Sign In dështoi');
          }
        } catch (webErr) {
          console.error('Web Apple Sign In error:', webErr);
          if (webErr.error === 'popup_closed_by_user') {
            setError('Dritarja u mbyll. Provoni përsëri.');
          } else {
            setError('Apple Sign In nuk është konfiguruar për web. Përdorni email.');
          }
        }
      } 
      // Apple SDK not available
      else if (isNativeApp && !SignInWithApple) {
        setError('Duke ngarkuar Apple Sign In... Provoni përsëri.');
      }
      else {
        setError('🍎 Apple Sign In vetëm në iOS app. Përdorni email më poshtë.');
      }
    } catch (err) {
      console.error('Apple Sign In error:', err);
      setError('Apple Sign In dështoi. Provoni me email/fjalëkalim.');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = () => {
    setError('🔵 Google Sign In kërkon konfigurim. Përdorni email më poshtë.');
  };

  // Facebook Sign In Handler
  const handleFacebookSignIn = () => {
    setError('📘 Facebook Sign In kërkon konfigurim. Përdorni email më poshtë.');
  };

  // Forgot Password UI
  if (forgotPasswordMode) {
    return (
      <div className="p-6 py-12 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 min-h-screen">
        <div className="w-full max-w-md mx-auto">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <KeyRound className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
                Rivendos Fjalëkalimin
              </span>
            </h1>
            <p className="text-slate-400 text-sm">
              {resetStep === 1 && 'Shkruaj email-in për të marrë kodin'}
              {resetStep === 2 && 'Shkruaj kodin që morët në email'}
              {resetStep === 3 && 'Krijo fjalëkalimin e ri'}
            </p>
          </div>

          <Card className="bg-slate-800/80 border-purple-500/50 backdrop-blur-sm p-8">
            {/* Back button */}
            <button
              onClick={exitForgotPassword}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Kthehu te kyçja</span>
            </button>

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    resetStep >= step
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1: Enter Email */}
            {resetStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => { setResetEmail(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      placeholder="email@shembull.com"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleRequestResetCode}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold h-12"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Duke dërguar...</span>
                    </div>
                  ) : (
                    'Dërgo Kodin'
                  )}
                </Button>
              </div>
            )}

            {/* Step 2: Enter Code */}
            {resetStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kodi 6-shifror
                  </label>
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => { 
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setResetCode(val); 
                      setError(''); 
                    }}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-center text-2xl tracking-[0.5em] placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    placeholder="000000"
                    maxLength={6}
                    style={{ fontSize: '24px' }}
                  />
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Kontrolloni email-in tuaj për kodin
                  </p>
                </div>
                
                <Button
                  onClick={handleVerifyCode}
                  disabled={loading || resetCode.length !== 6}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold h-12"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Duke verifikuar...</span>
                    </div>
                  ) : (
                    'Verifiko Kodin'
                  )}
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
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Fjalëkalimi i ri
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      placeholder="Së paku 6 karaktere"
                      style={{ fontSize: '16px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Konfirmo fjalëkalimin
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      placeholder="Shkruaj përsëri fjalëkalimin"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold h-12"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Duke ndryshuar...</span>
                    </div>
                  ) : (
                    'Ndrysho Fjalëkalimin'
                  )}
                </Button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-sm text-center">{successMessage}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 py-12 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <div className="w-full max-w-md mx-auto">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <MessageSquare className="w-10 h-10 text-white" fill="currentColor" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
              Biseda.ai
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Mirë se erdhe përsëri!' : 'Krijo llogarinë tënde'}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-slate-800/80 border-purple-500/50 backdrop-blur-sm p-8">
          {/* Toggle Login/Signup */}
          <div className="flex gap-2 mb-6 bg-slate-900/50 p-1 rounded-xl">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kyçu
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Regjistrohu
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username (only for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Emri i përdoruesit
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    placeholder="emri_yt"
                    required={!isLogin}
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {/* Email or Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {isLogin ? 'Email ose Username' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={isLogin ? "text" : "email"}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder={isLogin ? "email ose username" : "email@shembull.com"}
                  required
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>

            {/* Phone Number (only for signup, optional) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Numri i telefonit <span className="text-slate-500 text-xs">(opsionale)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    placeholder="+355 XX XXX XXXX"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {/* Country (only for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Shteti 🌍
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none z-10" />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 cursor-pointer appearance-none"
                    style={{ fontSize: '16px' }}
                  >
                    {countries.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">
                  Fjalëkalimi
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                  >
                    Harrove fjalëkalimin?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                  required
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold h-12"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Duke procesuar...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {isLogin ? 'Kyçu' : 'Krijo Llogari'}
                </span>
              )}
            </Button>
          </form>

          {/* Terms */}
          {!isLogin && (
            <p className="text-xs text-slate-500 text-center mt-4">
              Duke u regjistruar, pranon{' '}
              <a href="#" className="text-purple-400 hover:underline">Termat e Shërbimit</a>
              {' '}dhe{' '}
              <a href="#" className="text-purple-400 hover:underline">Politikën e Privatësisë</a>
            </p>
          )}
        </Card>

        {/* Guest Mode Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          <span className="text-slate-500 text-sm">ose</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        </div>

        {/* Guest Mode Button */}
        <button
          onClick={() => {
            initGuestSession();
            if (onAuthSuccess) {
              onAuthSuccess({ 
                isGuest: true, 
                username: 'Vizitor',
                expiresIn: '5 minuta'
              });
            }
          }}
          className="w-full group relative overflow-hidden px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 border-2 border-dashed border-slate-600 hover:border-cyan-500/50 rounded-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center group-hover:from-cyan-600 group-hover:to-blue-600 transition-all">
              <UserX className="w-5 h-5 text-slate-300 group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Vazhdo si Vizitor</p>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                5 minuta akses • 2 kredite screenshot
              </p>
            </div>
          </div>
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        </button>

        {/* Guest Mode Info */}
        <p className="text-xs text-slate-500 text-center mt-3">
          Si vizitor ke akses të limituar. Regjistrohu për akses të plotë.
        </p>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            AI Coach për Dating dhe Biseda
          </p>
        </div>
      </div>
    </div>
  );
}

