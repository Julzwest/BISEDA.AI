import React, { useState } from 'react';
import { Gift, Heart, Sparkles, ShoppingBag, Star, TrendingUp, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GiftSuggestions() {
  const [partnerInterests, setPartnerInterests] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const occasions = [
    { id: 'birthday', name: 'Ditëlindje', icon: '🎂' },
    { id: 'anniversary', name: 'Përvjetor', icon: '💕' },
    { id: 'valentine', name: 'Dita e Dashurisë', icon: '💖' },
    { id: 'christmas', name: 'Krishtlindje', icon: '🎄' },
    { id: 'newyear', name: 'Viti i Ri', icon: '🎉' },
    { id: 'justbecause', name: 'Thjesht sepse', icon: '💝' }
  ];

  const budgets = [
    { id: 'low', name: '€10-30', value: 'low' },
    { id: 'medium', name: '€30-100', value: 'medium' },
    { id: 'high', name: '€100-300', value: 'high' },
    { id: 'premium', name: '€300+', value: 'premium' }
  ];

  const generateGiftSuggestions = async () => {
    if (!partnerInterests.trim()) {
      alert('Ju lutem shkruani interesat e partnerit');
      return;
    }

    setIsLoading(true);
    setSuggestions([]);

    try {
      // Simulate AI-generated gift suggestions
      // In production, this would call your AI API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockSuggestions = generateMockSuggestions(partnerInterests, occasion, budget);
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setSuggestions([{
        id: 1,
        name: 'Gabim',
        description: 'Na vjen keq, ka ndodhur një gabim. Provo përsëri.',
        price: '',
        category: '',
        affiliateLink: '',
        image: ''
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockSuggestions = (interests, occasion, budget) => {
    const lowBudgetGifts = [
      { name: 'Libër Personalizuar', description: 'Libër me foto dhe kujtime të veçanta', price: '€15-25', category: 'Personal', affiliateLink: 'https://example.com/gift1' },
      { name: 'Kuti Çokollatash Premium', description: 'Çokollata artizanale me shije të ndryshme', price: '€20-30', category: 'Food', affiliateLink: 'https://example.com/gift2' },
      { name: 'Kuti Surprizë me Produkte Kujdesi', description: 'Produkte kujdesi dhe relaksimi', price: '€25-35', category: 'Wellness', affiliateLink: 'https://example.com/gift3' }
    ];

    const mediumBudgetGifts = [
      { name: 'Orë Elegante', description: 'Orë me stil modern dhe elegant', price: '€50-80', category: 'Accessories', affiliateLink: 'https://example.com/gift4' },
      { name: 'Parfum Premium', description: 'Parfum me erë të veçantë dhe elegante', price: '€60-100', category: 'Fragrance', affiliateLink: 'https://example.com/gift5' },
      { name: 'Voucher Spa & Relaksim', description: 'Ditë relaksimi në spa lokale', price: '€70-100', category: 'Experience', affiliateLink: 'https://example.com/gift6' }
    ];

    const highBudgetGifts = [
      { name: 'Bijuteri Elegante', description: 'Bijuteri me diamant ose ari', price: '€150-250', category: 'Jewelry', affiliateLink: 'https://example.com/gift7' },
      { name: 'Voucher Udhëtim Romantik', description: 'Weekend romantik në destinacion të bukur', price: '€200-300', category: 'Experience', affiliateLink: 'https://example.com/gift8' },
      { name: 'Teknologji Premium', description: 'Apple Watch, AirPods Pro, ose tablet', price: '€250-350', category: 'Electronics', affiliateLink: 'https://example.com/gift9' }
    ];

    const premiumGifts = [
      { name: 'Bijuteri Luksoze', description: 'Bijuteri me diamant ose ari 18k', price: '€400+', category: 'Jewelry', affiliateLink: 'https://example.com/gift10' },
      { name: 'Udhëtim Luksoz', description: 'Udhëtim në destinacion luksoz për 2-3 ditë', price: '€500+', category: 'Experience', affiliateLink: 'https://example.com/gift11' },
      { name: 'Produkt Luksoz Personalizuar', description: 'Produkt luksoz i personalizuar me emër/initiale', price: '€300+', category: 'Luxury', affiliateLink: 'https://example.com/gift12' }
    ];

    let giftPool = [];
    if (budget === 'low') giftPool = lowBudgetGifts;
    else if (budget === 'medium') giftPool = mediumBudgetGifts;
    else if (budget === 'high') giftPool = highBudgetGifts;
    else if (budget === 'premium') giftPool = premiumGifts;
    else giftPool = [...lowBudgetGifts, ...mediumBudgetGifts];

    // Select 5 random gifts
    const selected = [];
    const pool = [...giftPool];
    for (let i = 0; i < Math.min(5, pool.length); i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      selected.push({
        id: i + 1,
        ...pool[randomIndex],
        rating: (4.0 + Math.random() * 1.0).toFixed(1)
      });
      pool.splice(randomIndex, 1);
    }

    return selected;
  };

  const handleAffiliateClick = (link, giftName) => {
    // Track affiliate click
    console.log(`Affiliate click: ${giftName} - ${link}`);
    // Open affiliate link in new tab
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full overflow-y-auto px-6 pt-20 pb-24 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-block mb-3">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/50 animate-pulse">
              <Gift className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3 h-3 text-slate-900" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent mb-2">
          Sugjerime Dhuratash 🎁
        </h1>
        <p className="text-slate-400 text-sm">Gjej dhuratën perfekte bazuar në interesat e partnerit</p>
      </div>

      {/* Partner Interests Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Çfarë i pëlqen partnerit tënd? (interesat, hobby-t, etj.)
        </label>
        <textarea
          value={partnerInterests}
          onChange={(e) => setPartnerInterests(e.target.value)}
          placeholder="P.sh: I pëlqen muzika, futbolli, libra, teknologjia, moda..."
          className="w-full p-4 bg-slate-800/80 border-2 border-purple-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
          rows={3}
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Occasion Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-3">
          Rast special
        </label>
        <div className="grid grid-cols-3 gap-2">
          {occasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setOccasion(occ.id)}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                occasion === occ.id
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="text-2xl mb-1">{occ.icon}</div>
              <div className="text-xs">{occ.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Budget Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-3">
          Buxheti
        </label>
        <div className="grid grid-cols-4 gap-2">
          {budgets.map((bud) => (
            <button
              key={bud.id}
              onClick={() => setBudget(bud.value)}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                budget === bud.value
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {bud.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <Button
          onClick={generateGiftSuggestions}
          disabled={isLoading || !partnerInterests.trim()}
          className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white font-bold py-3 text-base disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Duke gjeneruar sugjerime...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Gjenero Sugjerime</span>
            </span>
          )}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 mt-4 text-sm">Duke gjeneruar sugjerime dhuratash...</p>
        </div>
      )}

      {/* Gift Suggestions */}
      {!isLoading && suggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            <h2 className="text-base font-bold text-white">Sugjerime Dhuratash</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          </div>

          <div className="space-y-4">
            {suggestions.map((gift) => (
              <Card
                key={gift.id}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-pink-500/30 backdrop-blur-sm hover:scale-[1.02] transition-all"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0 shadow-lg">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{gift.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            {gift.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs text-slate-300">{gift.rating}</span>
                              </div>
                            )}
                            {gift.category && (
                              <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded-lg text-xs font-semibold">
                                {gift.category}
                              </span>
                            )}
                          </div>
                        </div>
                        {gift.price && (
                          <span className="text-sm font-bold text-pink-400 shrink-0">
                            {gift.price}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{gift.description}</p>
                      <Button
                        onClick={() => handleAffiliateClick(gift.affiliateLink, gift.name)}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span>Shiko dhe Blij</span>
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && suggestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-3">🎁</div>
          <p className="text-slate-400 text-sm mb-2">Shkruani interesat e partnerit dhe zgjidhni rastin</p>
          <p className="text-slate-500 text-xs">AI do të gjenerojë sugjerime perfekte për dhuratë</p>
        </div>
      )}

      {/* Affiliate Info */}
      {suggestions.length > 0 && (
        <Card className="mt-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-purple-500/30 backdrop-blur-sm">
          <div className="p-4">
            <p className="text-xs text-slate-400 text-center">
              💡 Klikoni "Shiko dhe Blij" për të hapur lidhjen e partnerit. Biseda.ai merr komision të vogël për blerjet që bëni përmes lidhjeve tona.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

