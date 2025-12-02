import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, MapPin, Star, Music, PartyPopper, Globe, ExternalLink, Search, Heart, Gift, Flag, ChevronRight, Clock, Bookmark, BookmarkCheck, Share2, Ticket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { countries, getCitiesForCountry, getCountryByCode, getCityNameEn } from '@/config/countries';
import { getBackendUrl } from '@/utils/getBackendUrl';
import ShareButton from '@/components/ShareButton';
import PullToRefresh from '@/components/PullToRefresh';
import { toggleVenueFavorite, isVenueFavorited } from '@/utils/favorites';
import { trackFeatureUse } from '@/utils/analytics';

// Festive dates data by country
const festiveDatesByCountry = {
  AL: [
    { month: 0, date: 1, name: 'Dita e Vitit të Ri', icon: Sparkles, color: 'from-blue-500 to-cyan-500', emoji: '🎆' },
    { month: 0, date: 11, name: 'Dita e Republikës', icon: Flag, color: 'from-red-500 to-orange-500', emoji: '🇦🇱' },
    { month: 1, date: 14, name: 'Dita e Dashurisë', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💕' },
    { month: 2, date: 7, name: 'Dita e Mësuesit', icon: Star, color: 'from-yellow-500 to-amber-500', emoji: '📚' },
    { month: 2, date: 14, name: 'Dita e Verës', icon: Sparkles, color: 'from-green-500 to-emerald-500', emoji: '🌸' },
    { month: 2, date: 22, name: 'Dita e Nevruzit', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🌷' },
    { month: 4, date: 1, name: 'Dita e Punëtorëve', icon: Star, color: 'from-red-500 to-orange-500', emoji: '✊' },
    { month: 4, date: 5, name: 'Dita e Nënës', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💐' },
    { month: 5, date: 1, name: 'Dita e Fëmijëve', icon: Gift, color: 'from-yellow-500 to-orange-500', emoji: '🎈' },
    { month: 10, date: 28, name: 'Dita e Flamurit', icon: Flag, color: 'from-red-500 to-black-500', emoji: '🇦🇱' },
    { month: 10, date: 29, name: 'Dita e Çlirimit', icon: Flag, color: 'from-red-500 to-orange-500', emoji: '🎖️' },
    { month: 11, date: 25, name: 'Krishtlindjet', icon: Gift, color: 'from-green-500 to-red-500', emoji: '🎄' },
    { month: 11, date: 31, name: 'Nata e Vitit të Ri', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🎉' }
  ],
  XK: [
    { month: 0, date: 1, name: 'Dita e Vitit të Ri', icon: Sparkles, color: 'from-blue-500 to-cyan-500', emoji: '🎆' },
    { month: 1, date: 14, name: 'Dita e Dashurisë', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💕' },
    { month: 1, date: 17, name: 'Dita e Pavarësisë', icon: Flag, color: 'from-blue-500 to-yellow-500', emoji: '🇽🇰' },
    { month: 11, date: 25, name: 'Krishtlindjet', icon: Gift, color: 'from-green-500 to-red-500', emoji: '🎄' },
    { month: 11, date: 31, name: 'Nata e Vitit të Ri', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🎉' }
  ],
  GB: [
    { month: 0, date: 1, name: 'New Year\'s Day', icon: Sparkles, color: 'from-blue-500 to-cyan-500', emoji: '🎆' },
    { month: 1, date: 14, name: 'Valentine\'s Day', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💕' },
    { month: 10, date: 5, name: 'Bonfire Night', icon: Sparkles, color: 'from-orange-500 to-red-500', emoji: '🎆' },
    { month: 11, date: 25, name: 'Christmas', icon: Gift, color: 'from-green-500 to-red-500', emoji: '🎄' },
    { month: 11, date: 31, name: 'New Year\'s Eve', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🎉' }
  ],
  DE: [
    { month: 0, date: 1, name: 'Neujahr', icon: Sparkles, color: 'from-blue-500 to-cyan-500', emoji: '🎆' },
    { month: 1, date: 14, name: 'Valentinstag', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💕' },
    { month: 9, date: 3, name: 'Tag der Deutschen Einheit', icon: Flag, color: 'from-black-500 to-yellow-500', emoji: '🇩🇪' },
    { month: 11, date: 25, name: 'Weihnachten', icon: Gift, color: 'from-green-500 to-red-500', emoji: '🎄' },
    { month: 11, date: 31, name: 'Silvester', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🎉' }
  ],
  US: [
    { month: 0, date: 1, name: 'New Year\'s Day', icon: Sparkles, color: 'from-blue-500 to-cyan-500', emoji: '🎆' },
    { month: 1, date: 14, name: 'Valentine\'s Day', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💕' },
    { month: 6, date: 4, name: 'Independence Day', icon: Flag, color: 'from-red-500 to-blue-500', emoji: '🇺🇸' },
    { month: 9, date: 31, name: 'Halloween', icon: Sparkles, color: 'from-orange-500 to-purple-500', emoji: '🎃' },
    { month: 10, date: 28, name: 'Thanksgiving', icon: Gift, color: 'from-orange-500 to-amber-500', emoji: '🦃' },
    { month: 11, date: 25, name: 'Christmas', icon: Gift, color: 'from-green-500 to-red-500', emoji: '🎄' },
    { month: 11, date: 31, name: 'New Year\'s Eve', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🎉' }
  ]
};

// Default festive dates for countries not specifically defined
const defaultFestiveDates = [
  { month: 0, date: 1, name: 'Dita e Vitit të Ri', icon: Sparkles, color: 'from-blue-500 to-cyan-500', emoji: '🎆' },
  { month: 1, date: 14, name: 'Dita e Dashurisë', icon: Heart, color: 'from-pink-500 to-rose-500', emoji: '💕' },
  { month: 11, date: 25, name: 'Krishtlindjet', icon: Gift, color: 'from-green-500 to-red-500', emoji: '🎄' },
  { month: 11, date: 31, name: 'Nata e Vitit të Ri', icon: Sparkles, color: 'from-purple-500 to-pink-500', emoji: '🎉' }
];

export default function Events() {
  const backendUrl = getBackendUrl();
  
  // Get user's country from localStorage with state for reactivity
  const [userCountry, setUserCountry] = useState(localStorage.getItem('userCountry') || 'AL');
  const currentCountry = getCountryByCode(userCountry);
  const cities = getCitiesForCountry(userCountry).map(c => c.name);
  
  const [selectedCity, setSelectedCity] = useState('');
  const [localEvents, setLocalEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventType, setEventType] = useState('all');
  const [showAllFestive, setShowAllFestive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 initially
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // Listen for country changes from the global CountrySwitcher
  useEffect(() => {
    const handleCountryChange = (event) => {
      const newCountry = event.detail?.countryCode || localStorage.getItem('userCountry') || 'AL';
      setUserCountry(newCountry);
      setSelectedCity(''); // Reset city when country changes
      setLocalEvents([]); // Clear events
    };

    window.addEventListener('countryChanged', handleCountryChange);
    
    // Also check localStorage on mount in case it changed
    const storedCountry = localStorage.getItem('userCountry') || 'AL';
    if (storedCountry !== userCountry) {
      setUserCountry(storedCountry);
    }

    return () => {
      window.removeEventListener('countryChanged', handleCountryChange);
    };
  }, []);

  // Get upcoming festive dates
  const getUpcomingFestiveDates = () => {
    const festiveDates = festiveDatesByCountry[userCountry] || defaultFestiveDates;
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Calculate days until each festive date
    const upcomingDates = festiveDates.map(festive => {
      let festiveDate = new Date(currentYear, festive.month, festive.date);
      
      // If the date has passed this year, use next year
      if (festiveDate < today) {
        festiveDate = new Date(currentYear + 1, festive.month, festive.date);
      }
      
      const diffTime = festiveDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        ...festive,
        daysUntil: diffDays,
        fullDate: festiveDate
      };
    });
    
    // Sort by days until
    return upcomingDates.sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const upcomingFestiveDates = getUpcomingFestiveDates();
  const nextFestive = upcomingFestiveDates[0];
  const months = ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'];

  const eventTypes = [
    { id: 'all', name: 'Të gjitha', icon: PartyPopper },
    { id: 'music', name: 'Muzikë', icon: Music },
    { id: 'nightlife', name: 'Jetë Nate', icon: Sparkles },
    { id: 'culture', name: 'Kulturë', icon: Calendar }
  ];

  // Search queries for different event types
  const getSearchQuery = (type) => {
    switch (type) {
      case 'music':
        return 'live music concerts music venues bands';
      case 'nightlife':
        return 'nightclubs bars pubs night entertainment';
      case 'culture':
        return 'theaters museums art galleries cultural centers';
      default:
        return 'events venues concert halls theaters nightclubs live music entertainment';
    }
  };

  // Generate ticket search URL
  const getTicketSearchUrl = (cityName) => {
    const cityNameEn = getCityNameEn(userCountry, cityName) || cityName;
    const countryNameEn = currentCountry?.nameEn || 'Albania';
    return `https://www.google.com/search?q=events+tickets+${encodeURIComponent(cityNameEn)}+${encodeURIComponent(countryNameEn)}+2024`;
  };

  // Search for local events
  const searchLocalEvents = async () => {
    if (!selectedCity) return;
    
    setIsLoadingEvents(true);
    setLocalEvents([]);
    setVisibleCount(10); // Show more results initially

    try {
      // Use the city name directly - works for both predefined and custom cities
      const cityNameEn = getCityNameEn(userCountry, selectedCity) || selectedCity;
      const countryNameEn = currentCountry?.nameEn || 'Albania';
      
      console.log('🎉 Searching for events in', cityNameEn, countryNameEn);
      
      const response = await fetch(`${backendUrl}/api/places/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getSearchQuery(eventType),
          location: `${cityNameEn}, ${countryNameEn}`,
          category: 'events',
          maxResults: 20 // Request more results
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.source === 'google-places' && data.places && data.places.length > 0) {
          console.log('✅ Found', data.places.length, 'event venues from Google Places');
          
          const formattedEvents = data.places.map((place, index) => ({
            id: index + 1,
            name: place.name,
            description: place.description,
            location: place.location,
            rating: place.rating,
            googleMapsLink: place.googleMapsLink,
            isOpen: place.isOpen,
            type: 'venue',
            reviewCount: place.reviewCount,
            // Add ticket search link
            ticketSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(place.name)}+tickets+events+${encodeURIComponent(cityNameEn)}`
          }));
          
          setLocalEvents(formattedEvents);
        } else if (data.source === 'fallback') {
          // API not configured - show empty state with message
          console.log('⚠️ Google Places API not configured');
          setLocalEvents([]);
        } else {
          // No results found
          setLocalEvents([]);
        }
      }
    } catch (error) {
      console.error('❌ Error searching events:', error);
      setLocalEvents([]);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  // Search when city or event type changes
  useEffect(() => {
    if (selectedCity) {
      searchLocalEvents();
      trackFeatureUse('events', 'search');
    }
  }, [selectedCity, eventType]);

  // Handle favorite toggle
  const handleFavoriteToggle = (venue) => {
    const isFavorited = toggleVenueFavorite(venue);
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (isFavorited) {
        newSet.add(venue.id || venue.name);
      } else {
        newSet.delete(venue.id || venue.name);
      }
      return newSet;
    });
    trackFeatureUse('events', 'venueClick');
  };

  // Check if venue is favorited
  const checkFavorite = (venue) => {
    return favoriteIds.has(venue.id || venue.name) || isVenueFavorited(venue.id, venue.name);
  };

  // Handle refresh
  const handleRefresh = async () => {
    if (selectedCity) {
      await searchLocalEvents();
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div className="px-6 pt-20 pb-32 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-block mb-3">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-yellow-500/50 animate-pulse">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-bounce">
              <Music className="w-3 h-3 text-slate-900" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-2">
          Evente Lokale 🎉
        </h1>
        <p className="text-slate-400 text-sm">Gjej vende eventesh dhe argëtimi në qytetin tënd</p>
      </div>

      {/* 🎯 GENIUS INTEGRATION: Upcoming Festive Dates Countdown */}
      {nextFestive && (
        <div className="mb-6">
          {/* Main Countdown Card */}
          <div 
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${nextFestive.color} p-[2px] cursor-pointer group`}
            onClick={() => setShowAllFestive(!showAllFestive)}
          >
            <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse rounded-2xl" />
              
              <div className="relative flex items-center gap-4">
                {/* Emoji with pulse */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${nextFestive.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{nextFestive.emoji}</span>
                  </div>
                  {nextFestive.daysUntil <= 7 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-[10px] text-white font-bold">!</span>
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Festa e ardhshme</span>
                    {nextFestive.daysUntil <= 3 && (
                      <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded-full text-[10px] text-red-300 font-semibold animate-pulse">
                        Shumë afër!
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg truncate">{nextFestive.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{nextFestive.date} {months[nextFestive.month]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Countdown */}
                <div className="text-right">
                  <div className={`text-3xl font-black bg-gradient-to-r ${nextFestive.color} bg-clip-text text-transparent`}>
                    {nextFestive.daysUntil}
                  </div>
                  <div className="text-xs text-slate-400">
                    {nextFestive.daysUntil === 1 ? 'ditë' : 'ditë'}
                  </div>
                </div>
                
                {/* Expand indicator */}
                <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${showAllFestive ? 'rotate-90' : ''}`} />
              </div>
              
              {/* Suggestion text */}
              <div className="mt-3 pt-3 border-t border-slate-800/50">
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  Planifiko një takim special për {nextFestive.name}! Kliko për më shumë data.
                </p>
              </div>
            </div>
          </div>
          
          {/* Expandable list of upcoming dates */}
          {showAllFestive && (
            <div className="mt-3 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-white">Datat e ardhshme festive</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {upcomingFestiveDates.slice(1, 7).map((festive, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all`}
                  >
                    <span className="text-xl">{festive.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{festive.name}</p>
                      <p className="text-slate-400 text-xs">{festive.date} {months[festive.month]}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${festive.color} bg-opacity-20`}>
                      <span className="text-xs font-bold text-white">{festive.daysUntil}d</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Event Type Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-bold text-white">Tipi i Eventit</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setEventType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  eventType === type.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30 scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* City Selection - Modern Design */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Zgjidh Qytetin</h2>
          <span className="text-xs text-slate-500 ml-auto">{currentCountry?.flag} {currentCountry?.name}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.slice(0, 15).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/40'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 border border-slate-700/50 hover:border-yellow-500/50'
              }`}
            >
              {city}
            </button>
          ))}
          {/* Can't find your city button */}
          <button
            onClick={() => {
              const cityName = prompt('Shkruaj emrin e qytetit tënd:');
              if (cityName && cityName.trim()) {
                setSelectedCity(cityName.trim());
              }
            }}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/30 flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Tjetër qytet</span>
          </button>
        </div>
      </div>

      {/* Search Button */}
      {selectedCity && (
        <Button
          onClick={searchLocalEvents}
          disabled={isLoadingEvents}
          className="w-full mb-6 py-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-2xl shadow-orange-500/50 hover:scale-[1.02] active:scale-95"
        >
          {isLoadingEvents ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Duke kërkuar...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              <span>Kërko Evente në {selectedCity}</span>
            </div>
          )}
        </Button>
      )}

      {/* Loading Local Events */}
      {isLoadingEvents && selectedCity && (
        <div className="text-center py-6 mb-6">
          <div className="inline-block w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 mt-3 text-sm">Duke kërkuar vende eventesh në {selectedCity}...</p>
        </div>
      )}

      {/* Local Events/Venues Section */}
      {selectedCity && !isLoadingEvents && localEvents.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Music className="w-5 h-5 text-yellow-400" />
              {localEvents.length} Vende në {selectedCity}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          </div>

          <div className="space-y-4">
            {localEvents.slice(0, visibleCount).map((venue, index) => (
              <Card
                key={venue.id}
                className="group overflow-hidden transition-all duration-300 hover:scale-[1.01] bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-yellow-900/30 border border-yellow-500/30 shadow-lg shadow-yellow-500/5"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.3s ease-out forwards'
                }}
              >
                <div className="p-4">
                  {/* Top badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {venue.isOpen !== undefined && (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          venue.isOpen 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}>
                          {venue.isOpen ? '● Hapur' : '○ Mbyllur'}
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-xs font-semibold text-yellow-300">
                        ✓ Verified
                      </span>
                    </div>
                    {venue.rating && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-white">{venue.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Main content */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shrink-0 text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg mb-1 truncate">{venue.name}</h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{venue.description}</p>
                      
                      {venue.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{venue.location}</span>
                        </div>
                      )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {venue.googleMapsLink && (
                            <a
                              href={venue.googleMapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 rounded-xl text-xs font-bold text-yellow-300 transition-all hover:scale-105"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              Maps
                            </a>
                          )}
                          
                          {/* Ticket Search Button */}
                          {venue.ticketSearchUrl && (
                            <a
                              href={venue.ticketSearchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-xl text-xs font-bold text-purple-300 transition-all hover:scale-105"
                            >
                              <Ticket className="w-3.5 h-3.5" />
                              Bileta
                            </a>
                          )}
                        
                        {/* Favorite Button */}
                        <button
                          onClick={() => handleFavoriteToggle(venue)}
                          className={`p-2.5 rounded-xl transition-all ${
                            checkFavorite(venue)
                              ? 'bg-pink-500/30 border border-pink-500/50 text-pink-300'
                              : 'bg-slate-700/50 border border-slate-600/50 text-slate-400 hover:text-pink-300 hover:bg-pink-500/20'
                          }`}
                          title={checkFavorite(venue) ? 'Hiq nga të preferuarat' : 'Shto në të preferuara'}
                        >
                          {checkFavorite(venue) ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                        
                        {/* Share Button */}
                        <ShareButton
                          variant="mini"
                          title={venue.name}
                          text={`Shiko ${venue.name} në ${selectedCity}! 🎉`}
                          url={venue.googleMapsLink || window.location.href}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {localEvents.length > visibleCount && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLoadingMore(true);
                  setTimeout(() => {
                    setVisibleCount(prev => prev + 5);
                    setIsLoadingMore(false);
                  }, 300);
                }}
                disabled={isLoadingMore}
                className="group relative px-8 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border-2 border-yellow-500/50 hover:border-yellow-400 rounded-2xl text-yellow-300 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isLoadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-yellow-300 border-t-transparent rounded-full animate-spin" />
                      Duke ngarkuar...
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Shiko më shumë ({localEvents.length - visibleCount} të tjera)
                    </>
                  )}
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}

          {/* Show count indicator */}
          {localEvents.length > 0 && (
            <p className="text-center text-slate-500 text-sm mt-4">
              Duke shfaqur {Math.min(visibleCount, localEvents.length)} nga {localEvents.length} vende
            </p>
          )}

          {/* Search Tickets Online Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-purple-900/30 border border-purple-500/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Kërko Bileta Online</h3>
                <p className="text-slate-400 text-xs">Gjej bileta për evente në {selectedCity}</p>
              </div>
            </div>
            <a
              href={getTicketSearchUrl(selectedCity)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-bold transition-all hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" />
              Kërko Bileta për {selectedCity}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Empty state for events */}
      {selectedCity && !isLoadingEvents && localEvents.length === 0 && (
        <div className="text-center py-12 mb-6">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-white font-bold text-lg mb-2">Nuk u gjetën vende eventesh</h3>
          <p className="text-slate-400">Nuk u gjetën vende eventesh në {selectedCity}</p>
          <p className="text-slate-500 text-sm mt-1">Provo një qytet tjetër ose tip tjetër eventi</p>
        </div>
      )}

      {/* No city selected state */}
      {!selectedCity && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-white font-bold text-lg mb-2">Zgjidh një qytet</h3>
          <p className="text-slate-400">Zgjidh qytetin tënd për të parë evente dhe vende argëtimi</p>
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-yellow-500/30 backdrop-blur-sm">
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Këshilla për Evente
          </h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Kontrollo oraret e hapjes para se të shkosh</li>
            <li>• Rezervo paraprakisht për evente të mëdha</li>
            <li>• Evente muzikore janë perfekte për takime</li>
            <li>• Eksploro vende të reja kulturore në qytetin tënd</li>
          </ul>
        </div>
      </Card>
    </div>
    </PullToRefresh>
  );
}

