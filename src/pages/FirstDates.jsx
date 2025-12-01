import React, { useState, useEffect } from 'react';
import { MapPin, Coffee, UtensilsCrossed, Film, Music, Dumbbell, Palette, TreePine, Sparkles, Heart, Star, Crown, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getBackendUrl } from '@/utils/getBackendUrl';
import { base44 } from '@/api/base44Client';

export default function FirstDates() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const backendUrl = getBackendUrl();

  const cities = [
    'Tiranë', 'Durrës', 'Vlorë', 'Shkodër', 'Korçë', 'Elbasan', 'Fier', 'Gjirokastër', 'Berat', 'Kavajë', 'Lezhë', 'Pogradec', 'Sarandë', 'Himara'
  ];

  const categories = [
    {
      id: 'restaurants',
      name: 'Restorante',
      icon: UtensilsCrossed,
      color: 'from-red-500 to-orange-500',
      description: 'Restorante romantike dhe me atmosferë të mirë'
    },
    {
      id: 'cafes',
      name: 'Kafene',
      icon: Coffee,
      color: 'from-amber-500 to-yellow-500',
      description: 'Kafene të bukura për biseda të rehatshme'
    },
    {
      id: 'bars',
      name: 'Bare & Rooftop',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      description: 'Bare dhe rooftop bars për një mbrëmje të këndshme'
    },
    {
      id: 'cinema',
      name: 'Kinema',
      icon: Film,
      color: 'from-blue-500 to-indigo-500',
      description: 'Filma dhe aktivitete kinematografike'
    },
    {
      id: 'music',
      name: 'Muzikë & Live',
      icon: Music,
      color: 'from-pink-500 to-rose-500',
      description: 'Koncerte dhe evente muzikore'
    },
    {
      id: 'activities',
      name: 'Aktivitetet',
      icon: Dumbbell,
      color: 'from-green-500 to-emerald-500',
      description: 'Bowling, escape rooms, dhe aktivitete të tjera'
    },
    {
      id: 'culture',
      name: 'Kulturë & Art',
      icon: Palette,
      color: 'from-violet-500 to-purple-500',
      description: 'Muzee, galeri, dhe evente kulturore'
    },
    {
      id: 'nature',
      name: 'Natyra & Parqe',
      icon: TreePine,
      color: 'from-green-600 to-teal-500',
      description: 'Parqe, shëtitje, dhe aktivitete në natyrë'
    }
  ];

  const businessSuggestions = {
    tiranë: {
      restaurants: [
        { name: 'Mulliri i Vjetër', description: 'Restorant tradicionale me atmosferë shqiptare', rating: '4.5', price: '$$', featured: true, sponsored: true },
        { name: 'Oda', description: 'Restorant modern me kuzhinë mediterane', rating: '4.7', price: '$$$', featured: true },
        { name: 'Padam Boutique Hotel Restaurant', description: 'Restorant elegant me pamje të bukur', rating: '4.6', price: '$$$', featured: true, sponsored: true },
        { name: 'Artigiano', description: 'Pizzeria italiane autentike', rating: '4.4', price: '$$' },
        { name: 'Salt', description: 'Restorant me kuzhinë fusion', rating: '4.5', price: '$$' }
      ],
      cafes: [
        { name: 'Komiteti Kafe-Muzeum', description: 'Kafene unike me atmosferë vintage', rating: '4.6', price: '$', featured: true, sponsored: true },
        { name: 'Mulliri i Vjetër', description: 'Kafene e madhe me ambiente të ndryshme', rating: '4.5', price: '$', featured: true },
        { name: 'Sofra e Ariut', description: 'Kafene me design modern dhe kafe të shkëlqyer', rating: '4.4', price: '$$' },
        { name: 'Bunker 1944', description: 'Kafene tematike me historikë unike', rating: '4.3', price: '$' },
        { name: 'Colonial Café', description: 'Kafene elegante në qendër', rating: '4.5', price: '$$', featured: true }
      ],
      bars: [
        { name: 'Radio Bar', description: 'Rooftop bar me pamje të qytetit', rating: '4.6', price: '$$', featured: true, sponsored: true },
        { name: 'Nouvelle Vague', description: 'Bar me cocktail kreative', rating: '4.5', price: '$$', featured: true },
        { name: 'Colonial Café Rooftop', description: 'Rooftop me atmosferë romantike', rating: '4.7', price: '$$', featured: true },
        { name: 'Bunker Bar', description: 'Bar tematike në bunker', rating: '4.4', price: '$$' },
        { name: 'Sky Club', description: 'Rooftop bar me muzikë live', rating: '4.5', price: '$$$', featured: true }
      ],
      cinema: [
        { name: 'Cineplexx', description: 'Kinema moderne me shumë salla', rating: '4.5', price: '$$' },
        { name: 'Kinema Millennium', description: 'Kinema në qendër të qytetit', rating: '4.3', price: '$$' }
      ],
      music: [
        { name: 'Tirana Jazz Club', description: 'Jazz live dhe atmosferë intime', rating: '4.6', price: '$$' },
        { name: 'Folie Terrace', description: 'Live music dhe dj sets', rating: '4.4', price: '$$' }
      ],
      activities: [
        { name: 'Escape Room Albania', description: 'Escape rooms me tema të ndryshme', rating: '4.7', price: '$$' },
        { name: 'Bowling Center', description: 'Bowling dhe lojëra të tjera', rating: '4.3', price: '$$' },
        { name: 'Paint & Sip Studio', description: 'Pikturë dhe verë për çiftet', rating: '4.5', price: '$$' }
      ],
      culture: [
        { name: 'Muzeu Historik Kombëtar', description: 'Muzeu më i madh në Shqipëri', rating: '4.6', price: '$' },
        { name: 'Bunk\'Art', description: 'Muzeu në bunker me art bashkëkohor', rating: '4.7', price: '$' },
        { name: 'Galeria Kombëtare e Arteve', description: 'Ekspozita arti bashkëkohor', rating: '4.5', price: '$' }
      ],
      nature: [
        { name: 'Parku i Madh', description: 'Shëtitje dhe piknik në natyrë', rating: '4.4', price: 'Gratis' },
        { name: 'Dajti', description: 'Teleferik dhe pamje panoramike', rating: '4.6', price: '$$' },
        { name: 'Lacit', description: 'Liqen artificial për shëtitje', rating: '4.3', price: 'Gratis' }
      ]
    },
    durrës: {
      restaurants: [
        { name: 'Restorant Rozafa', description: 'Restorant me det dhe kuzhinë deti', rating: '4.5', price: '$$' },
        { name: 'Restorant Taverna', description: 'Kuzhinë tradicionale shqiptare', rating: '4.4', price: '$$' }
      ],
      cafes: [
        { name: 'Café de Paris', description: 'Kafene me pamje deti', rating: '4.5', price: '$$' }
      ],
      bars: [
        { name: 'Beach Bar', description: 'Bar në plazh me atmosferë relaksuese', rating: '4.4', price: '$$' }
      ],
      nature: [
        { name: 'Plazhi i Durrësit', description: 'Shëtitje në plazh dhe promenadë', rating: '4.5', price: 'Gratis' }
      ]
    },
    vlorë: {
      restaurants: [
        { name: 'Restorant Tradita', description: 'Kuzhinë tradicionale me det', rating: '4.6', price: '$$' }
      ],
      nature: [
        { name: 'Plazhi i Vlorës', description: 'Plazh i bukur për shëtitje', rating: '4.5', price: 'Gratis' },
        { name: 'Llogara Pass', description: 'Shëtitje në mal me pamje të bukura', rating: '4.7', price: 'Gratis' }
      ]
    }
  };

  const getSuggestions = (city, category) => {
    const cityData = businessSuggestions[city.toLowerCase()];
    if (!cityData || !cityData[category]) {
      return getGenericSuggestions(category);
    }
    const suggestions = cityData[category];
    
    // Sort: Featured/Sponsored first, then by rating
    return suggestions.sort((a, b) => {
      // Sponsored businesses first
      if (a.sponsored && !b.sponsored) return -1;
      if (!a.sponsored && b.sponsored) return 1;
      // Featured businesses next
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by rating
      return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
    });
  };

  const getGenericSuggestions = (category) => {
    const generic = {
      restaurants: [
        { name: 'Restorant Tradicional', description: 'Shkoni në një restorant me kuzhinë tradicionale shqiptare', rating: '4.5', price: '$$' },
        { name: 'Restorant Italian', description: 'Pizzeria ose restorant italian për një darkë romantike', rating: '4.4', price: '$$' },
        { name: 'Restorant Me Pamje', description: 'Restorant me pamje të bukur për atmosferë romantike', rating: '4.6', price: '$$$' }
      ],
      cafes: [
        { name: 'Kafene Tradicionale', description: 'Kafene me atmosferë shqiptare për biseda', rating: '4.4', price: '$' },
        { name: 'Kafene Moderne', description: 'Kafene me design modern dhe kafe të shkëlqyer', rating: '4.5', price: '$$' }
      ],
      bars: [
        { name: 'Rooftop Bar', description: 'Rooftop bar me pamje për një mbrëmje romantike', rating: '4.6', price: '$$' },
        { name: 'Cocktail Bar', description: 'Bar me cocktail kreative dhe atmosferë intime', rating: '4.5', price: '$$' }
      ],
      cinema: [
        { name: 'Kinema Lokale', description: 'Shkoni në kinema për një film bashkë', rating: '4.3', price: '$$' }
      ],
      music: [
        { name: 'Live Music Venue', description: 'Vend me muzikë live për një mbrëmje muzikore', rating: '4.5', price: '$$' }
      ],
      activities: [
        { name: 'Escape Room', description: 'Escape room për një sfidë bashkë', rating: '4.7', price: '$$' },
        { name: 'Bowling', description: 'Bowling për lojë dhe argëtim', rating: '4.3', price: '$$' }
      ],
      culture: [
        { name: 'Muzeu Lokal', description: 'Shkoni në muzeu për të mësuar dhe diskutuar', rating: '4.5', price: '$' },
        { name: 'Galeri Arti', description: 'Galeri arti për ekspozita interesante', rating: '4.4', price: '$' }
      ],
      nature: [
        { name: 'Parku Lokal', description: 'Shëtitje në park për biseda dhe relaksim', rating: '4.4', price: 'Gratis' },
        { name: 'Shëtitje në Natyrë', description: 'Shëtitje në natyrë për një takim aktiv', rating: '4.6', price: 'Gratis' }
      ]
    };
    return generic[category] || [];
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleSearch = async () => {
    if (!selectedCity || !selectedCategory) {
      alert('Ju lutem zgjidhni qytetin dhe kategorinë!');
      return;
    }
    await generateAISuggestions(selectedCity, selectedCategory);
  };

  const generateAISuggestions = async (city, category) => {
    setLoading(true);
    setSuggestions([]);

    try {
      // Create the prompt for OpenAI to generate REAL local businesses
      const categoryNames = {
        restaurants: 'restorante romantike',
        cafes: 'kafene të bukura',
        bars: 'bare dhe rooftop bar',
        cinema: 'kinema dhe aktivitete kinematografike',
        music: 'vende me muzikë live',
        activities: 'aktivitete si bowling, escape room',
        culture: 'muzee, galeri arti',
        nature: 'parqe dhe vende në natyrë'
      };

      const prompt = `Biznese REALE në ${city}, Shqipëri për takime të para: ${categoryNames[category.id] || category.name}

Listoni 5-7 vende që ekzistojnë realisht. Ktheni VETËM JSON array:
[{"name":"Emri","description":"Përshkrim","location":"Adresa","rating":"4.5","price":"$$"}]

Mos shtoni tekst tjetër, VETËM JSON.`;

      // Call the AI API
      const response = await base44.integrations.Core.InvokeLLM({ 
        prompt,
        conversationHistory: [],
        systemPrompt: `Ti njeh ${city}, Shqipëri shumë mirë. Return ONLY a JSON array of REAL businesses that exist in ${city}. No explanations, no markdown, just the JSON array.`
      });

      // Parse the response
      let aiSuggestions = [];
      try {
        // Try to find JSON in the response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          aiSuggestions = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON found, try parsing the whole response
          aiSuggestions = JSON.parse(response);
        }
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON, using fallback:', parseError);
        // Fallback to hardcoded suggestions if parsing fails
        const fallback = getSuggestions(city, category.id);
        setSuggestions(fallback);
        setLoading(false);
        return;
      }

      // Format the suggestions
      const formattedSuggestions = aiSuggestions.map((suggestion, index) => ({
        name: suggestion.name || 'Biznes Lokal',
        description: suggestion.description || 'Vend i mirë për takim të parë',
        location: suggestion.location || city,
        rating: suggestion.rating || '4.5',
        price: suggestion.price || '$$',
        featured: index === 0, // Mark first as featured
        sponsored: false
      }));

      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      // Fallback to hardcoded suggestions on error
      const fallbackSuggestions = getSuggestions(city, category.id);
      setSuggestions(fallbackSuggestions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-6 pt-20 pb-20 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}>
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-block mb-3">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/50 animate-pulse">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3 h-3 text-slate-900" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent mb-2">
          Takime të Para 💕
        </h1>
        <p className="text-slate-400 text-sm">Gjej ide perfekte për takimin e parë</p>
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
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Zgjidh Kategorinë
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory?.id === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? `bg-gradient-to-br ${category.color} border-transparent shadow-lg scale-105`
                    : 'bg-slate-800/50 border-slate-700 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-700/50'}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {category.name}
                    </h3>
                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Button */}
      <div className="mb-6">
        <Button
          onClick={handleSearch}
          disabled={!selectedCity || !selectedCategory || loading}
          className={`w-full py-6 rounded-2xl font-bold text-lg transition-all ${
            selectedCity && selectedCategory && !loading
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-2xl shadow-pink-500/50 hover:scale-[1.02] active:scale-95'
              : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Duke gjeneruar...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Gjenero Sugjerime</span>
            </div>
          )}
        </Button>
        {!selectedCity && !selectedCategory && (
          <p className="text-center text-slate-400 text-sm mt-3">
            👆 Zgjidhni qytetin dhe kategorinë më sipër
          </p>
        )}
        {selectedCity && !selectedCategory && (
          <p className="text-center text-pink-400 text-sm mt-3 animate-pulse">
            ✨ Tani zgjidhni një kategori!
          </p>
        )}
        {!selectedCity && selectedCategory && (
          <p className="text-center text-pink-400 text-sm mt-3 animate-pulse">
            📍 Tani zgjidhni një qytet!
          </p>
        )}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                Sugjerime
              </span>
              <span className="text-2xl">✨</span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => {
              const isFeatured = suggestion.featured;
              const isSponsored = suggestion.sponsored;
              
              return (
                <Card
                  key={index}
                  className={`group border-2 backdrop-blur-sm transition-all hover:scale-[1.02] ${
                    isSponsored
                      ? 'bg-gradient-to-br from-yellow-500/30 via-amber-500/30 to-orange-500/30 border-yellow-400/50 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-500/40'
                      : isFeatured
                      ? 'bg-gradient-to-br from-pink-500/25 via-rose-500/25 to-red-500/25 border-pink-400/40 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-500/30'
                      : 'bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-red-500/20 border-pink-500/30 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm ${
                        isSponsored
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50'
                          : isFeatured
                          ? 'bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/50'
                          : 'bg-gradient-to-br from-pink-500 to-rose-500'
                      }`}>
                        {isSponsored ? <Crown className="w-5 h-5" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-white font-bold text-lg">{suggestion.name}</h3>
                          {isSponsored && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg text-xs font-bold text-slate-900">
                              <TrendingUp className="w-3 h-3" />
                              Sponsorizuar
                            </span>
                          )}
                          {isFeatured && !isSponsored && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg text-xs font-bold text-white">
                              <Star className="w-3 h-3 fill-white" />
                              Featured
                            </span>
                          )}
                          {suggestion.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-slate-300">{suggestion.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{suggestion.description}</p>
                        {suggestion.price && (
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              suggestion.price === 'Gratis' 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                : suggestion.price === '$'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                                : suggestion.price === '$$'
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                            }`}>
                              {suggestion.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Business Partnership Info */}
      {suggestions.length > 0 && (
        <div className="mt-6 mb-4">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-purple-500/30 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm mb-1">Biznesi Yt Këtu?</h3>
                  <p className="text-slate-300 text-xs mb-2">
                    Dëshiron që biznesi yt të shfaqet si <span className="text-yellow-400 font-semibold">sponsorizuar</span> dhe të marrë më shumë klientë? Kontakto për partneritet!
                  </p>
                  <a 
                    href="mailto:partnerships@biseda.ai?subject=Partneritet Biznesi" 
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-xs font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <Sparkles className="w-3 h-3" />
                    Bëhu Partner
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {suggestions.length === 0 && selectedCategory && (
        <div className="text-center py-12">
          <div className="text-6xl mb-3 animate-bounce">💕</div>
          <p className="text-slate-400">Zgjidh një qytet për të parë sugjerime specifike</p>
        </div>
      )}

      {!selectedCategory && (
        <div className="text-center py-12">
          <div className="text-6xl mb-3 animate-pulse">💭</div>
          <p className="text-slate-400">Zgjidh një kategori për të filluar</p>
        </div>
      )}
    </div>
  );
}

