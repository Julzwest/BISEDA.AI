import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, Mail, Phone, Crown, Zap, TrendingUp, Bookmark, 
  Heart, Gift, Lightbulb, Calendar, Trash2, ExternalLink,
  CreditCard, LogOut, Shield, Star, MapPin
} from 'lucide-react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import UpgradeModal from '@/components/UpgradeModal';

export default function UserProfile({ onLogout }) {
  const [userInfo, setUserInfo] = useState(null);
  const [usage, setUsage] = useState(null);
  const [savedItems, setSavedItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const backendUrl = getBackendUrl();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch usage stats
      const usageRes = await fetch(`${backendUrl}/api/usage`, {
        headers: { 'x-user-id': userId }
      });
      if (usageRes.ok) {
        const usageData = await usageRes.json();
        setUsage(usageData);
      }

      // Fetch saved items
      const savedRes = await fetch(`${backendUrl}/api/user/saved`, {
        headers: { 'x-user-id': userId }
      });
      if (savedRes.ok) {
        const savedData = await savedRes.json();
        setSavedItems(savedData.savedItems);
      }

      setUserInfo({ userName, userEmail });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSaved = async (savedId) => {
    try {
      const res = await fetch(`${backendUrl}/api/user/saved/${savedId}`, {
        method: 'DELETE',
        headers: { 'x-user-id': userId }
      });

      if (res.ok) {
        // Refresh saved items
        fetchData();
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const getTierBadge = (tier) => {
    const badges = {
      free: { label: 'Falas', color: 'bg-slate-500/20 text-slate-300', icon: Shield },
      starter: { label: 'Starter', color: 'bg-blue-500/20 text-blue-300', icon: Zap },
      pro: { label: 'Pro', color: 'bg-purple-500/20 text-purple-300', icon: Crown },
      premium: { label: 'Premium', color: 'bg-amber-500/20 text-amber-300', icon: Star }
    };
    return badges[tier] || badges.free;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Duke ngarkuar profilin...</p>
        </div>
      </div>
    );
  }

  const tierBadge = usage ? getTierBadge(usage.tier) : getTierBadge('free');
  const TierIcon = tierBadge.icon;

  return (
    <div className="h-full overflow-y-auto px-6 pt-20 pb-24 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/50">
          <User className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">{userName}</h1>
        <p className="text-slate-400 text-sm">{userEmail}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-900/50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Përmbledhje
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'saved'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Bookmark className="w-4 h-4" />
            <span>Të Ruajtura</span>
            {savedItems && (savedItems.dates.length + savedItems.gifts.length + savedItems.tips.length) > 0 && (
              <span className="px-1.5 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                {savedItems.dates.length + savedItems.gifts.length + savedItems.tips.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Membership Card */}
          {usage && (
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/50 backdrop-blur-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${tierBadge.color} rounded-xl flex items-center justify-center`}>
                    <TierIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Plani: {tierBadge.label}</h2>
                    <p className="text-slate-400 text-sm">Anëtarësia aktuale</p>
                  </div>
                </div>
                {usage.tier !== 'premium' && (
                  <Button
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Përmirëso
                  </Button>
                )}
              </div>

              {/* Usage Stats */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Mesazhe Sot</span>
                    <span className="text-white font-semibold">
                      {usage.dailyUsage.messages} / {usage.dailyUsage.messagesLimit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${Math.min(100, (usage.dailyUsage.messages / usage.dailyUsage.messagesLimit) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {usage.credits > 0 && (
                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Kredite
                      </span>
                      <span className="text-purple-300 font-bold">{usage.credits}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Account Info */}
          <Card className="bg-slate-800/80 border-slate-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Informacioni i Llogarisë
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <User className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Përdoruesi</p>
                  <p className="text-white font-medium">{userName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-white font-medium">{userEmail}</p>
                </div>
              </div>
              {localStorage.getItem('userPhone') && (
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Telefoni</p>
                    <p className="text-white font-medium">{localStorage.getItem('userPhone')}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Logout Button */}
          <Button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Dil nga Llogaria
          </Button>
        </>
      )}

      {/* Saved Items Tab */}
      {activeTab === 'saved' && savedItems && (
        <div className="space-y-6">
          {/* Saved Dates */}
          {savedItems.dates.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                Takime të Ruajtura ({savedItems.dates.length})
              </h2>
              <div className="space-y-3">
                {savedItems.dates.map((item) => (
                  <Card key={item.savedId} className="bg-slate-800/80 border-pink-500/30 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold mb-1">{item.name}</h3>
                        <p className="text-slate-300 text-sm mb-2">{item.description}</p>
                        {item.location && (
                          <p className="text-slate-400 text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </p>
                        )}
                        <p className="text-slate-500 text-xs mt-2">
                          Ruajtur: {new Date(item.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveSaved(item.savedId)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Saved Gifts */}
          {savedItems.gifts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-400" />
                Dhurata të Ruajtura ({savedItems.gifts.length})
              </h2>
              <div className="space-y-3">
                {savedItems.gifts.map((item) => (
                  <Card key={item.savedId} className="bg-slate-800/80 border-rose-500/30 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold mb-1">{item.name}</h3>
                        <p className="text-slate-300 text-sm mb-2">{item.description}</p>
                        {item.price && (
                          <p className="text-rose-400 font-semibold text-sm">{item.price}</p>
                        )}
                        <p className="text-slate-500 text-xs mt-2">
                          Ruajtur: {new Date(item.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveSaved(item.savedId)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Saved Tips */}
          {savedItems.tips.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Këshilla të Ruajtura ({savedItems.tips.length})
              </h2>
              <div className="space-y-3">
                {savedItems.tips.map((item) => (
                  <Card key={item.savedId} className="bg-slate-800/80 border-amber-500/30 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold mb-1">{item.title}</h3>
                        <p className="text-slate-300 text-sm">{item.content}</p>
                        <p className="text-slate-500 text-xs mt-2">
                          Ruajtur: {new Date(item.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveSaved(item.savedId)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {savedItems.dates.length === 0 && savedItems.gifts.length === 0 && savedItems.tips.length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Asnjë element i ruajtur</h3>
              <p className="text-slate-400">Fillo të ruash takime, dhurata dhe këshilla!</p>
            </div>
          )}
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        onSelectPlan={() => setShowUpgradeModal(false)}
      />
    </div>
  );
}

