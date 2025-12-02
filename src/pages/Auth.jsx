import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Lock, User, Phone, Eye, EyeOff, Apple, Sparkles } from 'lucide-react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import { countries } from '@/config/countries';
import { Capacitor } from '@capacitor/core';

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

  const backendUrl = getBackendUrl();

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

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { identifier: formData.email, password: formData.password }
        : formData;

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
        
        // Store location data (for new users or update existing)
        if (!isLogin || formData.country) {
          localStorage.setItem('userCountry', formData.country || 'AL');
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

          {/* Social Sign-in Buttons */}
          <div className="space-y-3 mb-4">
            {/* Sign in with Apple */}
            <button
              type="button"
              onClick={handleAppleSignIn}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-12 flex items-center justify-center gap-2 rounded-lg"
            >
              <Apple className="w-5 h-5" fill="currentColor" />
              <span>Vazhdo me Apple</span>
            </button>

            {/* Sign in with Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold h-12 flex items-center justify-center gap-2 border border-gray-300 rounded-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Vazhdo me Google</span>
            </button>

            {/* Sign in with Facebook */}
            <button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={loading}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold h-12 flex items-center justify-center gap-2 rounded-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Vazhdo me Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-500 text-xs">OSE</span>
            <div className="flex-1 h-px bg-slate-700"></div>
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fjalëkalimi
              </label>
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

