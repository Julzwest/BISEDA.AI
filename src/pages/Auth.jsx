import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Lock, User, Phone, Eye, EyeOff, Apple, Sparkles, Globe, MapPin } from 'lucide-react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import { countries, getCitiesForCountry } from '@/config/countries';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: 'AL',
    city: ''
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
        ? { email: formData.email, password: formData.password }
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
          localStorage.setItem('userCity', formData.city || '');
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

  const handleAppleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      // Check if Apple Sign In SDK is available
      if (window.AppleID && window.AppleID.auth) {
        // Try to initialize if not already done
        try {
          window.AppleID.auth.init({
            clientId: 'ai.biseda.web',
            scope: 'name email',
            redirectURI: window.location.origin,
            state: 'biseda_auth',
            usePopup: true
          });
        } catch (initErr) {
          console.log('Apple Sign In already initialized or init error:', initErr);
        }

        const data = await window.AppleID.auth.signIn();
        
        // Send Apple ID token to backend
        const response = await fetch(`${backendUrl}/api/auth/${isLogin ? 'login' : 'register'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appleId: data.user || data.authorization?.id_token,
            email: data.user?.email || `apple_${Date.now()}@privaterelay.appleid.com`,
            username: data.user?.name?.firstName || `AppleUser_${Date.now()}`
          })
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('userId', result.user.userId);
          localStorage.setItem('userEmail', result.user.email);
          localStorage.setItem('userName', result.user.username);
          localStorage.setItem('isAuthenticated', 'true');
          
          if (onAuthSuccess) {
            onAuthSuccess(result.user);
          }
        } else {
          setError(result.error || 'Apple Sign In failed');
        }
      } else {
        // Apple SDK not loaded - needs Apple Developer setup
        setError('Sign in with Apple nuk është konfiguruar ende. Ju lutem përdorni email.');
      }
    } catch (err) {
      console.error('Apple Sign In error:', err);
      // More specific error messages
      if (err.error === 'popup_closed_by_user') {
        setError('Dritarja u mbyll. Provoni përsëri.');
      } else if (err.error === 'invalid_client') {
        setError('Apple Sign In nuk është konfiguruar për këtë website.');
      } else {
        setError('Apple Sign In dështoi. Provoni me email/fjalëkalim.');
      }
    } finally {
      setLoading(false);
    }
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

          {/* Sign in with Apple Button */}
          <Button
            onClick={handleAppleSignIn}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-12 mb-4 flex items-center justify-center gap-2"
          >
            <Apple className="w-5 h-5" fill="currentColor" />
            <span>Vazhdo me Apple</span>
          </Button>

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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="email@shembull.com"
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

            {/* Country Selection (only for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ku jeton? <span className="text-purple-400 text-xs">🌍</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        country: e.target.value,
                        city: '' // Reset city when country changes
                      });
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                    style={{ fontSize: '16px' }}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* City Selection (only for signup) */}
            {!isLogin && formData.country && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Qyteti
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                    style={{ fontSize: '16px' }}
                  >
                    <option value="">Zgjidh qytetin...</option>
                    {getCitiesForCountry(formData.country).map((city) => (
                      <option key={city.nameEn} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
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

