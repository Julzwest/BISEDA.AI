import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, MapPin, Star, Music, PartyPopper, Globe, ExternalLink, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { countries, getCitiesForCountry, getCountryByCode, getCityNameEn } from '@/config/countries';
import { getBackendUrl } from '@/utils/getBackendUrl';

export default function Events() {
  const backendUrl = getBackendUrl();
  
  // Get user's country from localStorage
  const userCountry = localStorage.getItem('userCountry') || 'AL';
  const currentCountry = getCountryByCode(userCountry);
  const cities = getCitiesForCountry(userCountry).map(c => c.name);
  
  const [selectedCity, setSelectedCity] = useState('');
  const [localEvents, setLocalEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventType, setEventType] = useState('all');

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

  // Search for local events
  const searchLocalEvents = async () => {
    if (!selectedCity) return;
    
    setIsLoadingEvents(true);
    setLocalEvents([]);

    try {
      const cityNameEn = getCityNameEn(userCountry, selectedCity);
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
          category: 'events'
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.source === 'google-places' && data.places && data.places.length > 0) {
          console.log('✅ Found', data.places.length, 'event venues');
          
          const formattedEvents = data.places.map((place, index) => ({
            id: index + 1,
            name: place.name,
            description: place.description,
            location: place.location,
            rating: place.rating,
            googleMapsLink: place.googleMapsLink,
            isOpen: place.isOpen,
            type: 'venue'
          }));
          
          setLocalEvents(formattedEvents);
        }
      }
    } catch (error) {
      console.error('❌ Error searching events:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  // Search when city or event type changes
  useEffect(() => {
    if (selectedCity) {
      searchLocalEvents();
    }
  }, [selectedCity, eventType]);

  return (
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

      {/* Current Country Display */}
      <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-300 text-sm font-medium">
            Vendndodhja: {currentCountry?.flag} {currentCountry?.name}
          </span>
          <a href="#/profile" className="ml-auto text-xs text-yellow-400 hover:text-yellow-300 underline">
            Ndrysho
          </a>
        </div>
      </div>

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

      {/* City Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Zgjidh Qytetin</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
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

          <div className="space-y-3">
            {localEvents.map((venue) => (
              <Card
                key={venue.id}
                className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border-2 border-yellow-500/30 backdrop-blur-sm hover:scale-[1.02] transition-all"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shrink-0">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-white font-bold text-lg">{venue.name}</h3>
                        {venue.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-slate-300">{venue.rating}</span>
                          </div>
                        )}
                        {venue.isOpen !== undefined && (
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            venue.isOpen 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                              : 'bg-red-500/20 text-red-300 border border-red-500/50'
                          }`}>
                            {venue.isOpen ? 'Hapur' : 'Mbyllur'}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{venue.description}</p>
                      {venue.location && (
                        <p className="text-slate-400 text-xs mb-3">📍 {venue.location}</p>
                      )}
                      {venue.googleMapsLink && (
                        <a
                          href={venue.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-sm font-semibold text-yellow-300 transition-all"
                        >
                          <MapPin className="w-4 h-4" />
                          Shiko në Google Maps
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
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
  );
}

