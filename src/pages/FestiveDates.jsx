import React, { useState } from 'react';
import { Calendar, Sparkles, Flag, Heart, Star, Gift, Cake } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function FestiveDates() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
  ];

  const festiveDates = {
    0: [ // January
      { date: 1, name: 'Dita e Vitit të Ri', type: 'national', icon: Sparkles, color: 'from-blue-500 to-cyan-500' },
      { date: 11, name: 'Dita e Republikës', type: 'national', icon: Flag, color: 'from-red-500 to-orange-500' }
    ],
    1: [ // February
      { date: 14, name: 'Dita e Dashurisë', type: 'international', icon: Heart, color: 'from-pink-500 to-rose-500' }
    ],
    2: [ // March
      { date: 7, name: 'Dita e Mësuesit', type: 'national', icon: Star, color: 'from-yellow-500 to-amber-500' },
      { date: 14, name: 'Dita e Verës', type: 'national', icon: Sparkles, color: 'from-green-500 to-emerald-500' },
      { date: 22, name: 'Dita e Nevruzit', type: 'cultural', icon: Sparkles, color: 'from-purple-500 to-pink-500' }
    ],
    3: [ // April
      { date: 7, name: 'Dita e Shqiponjës', type: 'national', icon: Flag, color: 'from-red-500 to-orange-500' }
    ],
    4: [ // May
      { date: 1, name: 'Dita Ndërkombëtare e Punëtorëve', type: 'international', icon: Star, color: 'from-red-500 to-orange-500' },
      { date: 5, name: 'Dita e Nënës', type: 'national', icon: Heart, color: 'from-pink-500 to-rose-500' }
    ],
    5: [ // June
      { date: 1, name: 'Dita Ndërkombëtare e Fëmijëve', type: 'international', icon: Gift, color: 'from-yellow-500 to-orange-500' }
    ],
    6: [ // July
      { date: 28, name: 'Dita e Pavarësisë', type: 'national', icon: Flag, color: 'from-red-500 to-orange-500' }
    ],
    8: [ // September
      { date: 5, name: 'Dita e Beqarit', type: 'cultural', icon: Heart, color: 'from-purple-500 to-pink-500' }
    ],
    10: [ // November
      { date: 28, name: 'Dita e Flamurit', type: 'national', icon: Flag, color: 'from-red-500 to-orange-500' },
      { date: 29, name: 'Dita e Çlirimit', type: 'national', icon: Flag, color: 'from-red-500 to-orange-500' }
    ],
    11: [ // December
      { date: 25, name: 'Krishtlindjet', type: 'international', icon: Gift, color: 'from-green-500 to-emerald-500' },
      { date: 31, name: 'Viti i Ri', type: 'international', icon: Sparkles, color: 'from-blue-500 to-cyan-500' }
    ]
  };

  const getCurrentMonthDates = () => {
    return festiveDates[selectedMonth] || [];
  };

  const getDateTypeLabel = (type) => {
    const labels = {
      national: 'Kombëtare',
      international: 'Ndërkombëtare',
      cultural: 'Kulturore'
    };
    return labels[type] || type;
  };

  const getDateTypeColor = (type) => {
    const colors = {
      national: 'from-red-500/20 to-orange-500/20 border-red-500/50',
      international: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50',
      cultural: 'from-purple-500/20 to-pink-500/20 border-purple-500/50'
    };
    return colors[type] || 'from-slate-500/20 to-slate-600/20 border-slate-500/50';
  };

  return (
    <div className="px-6 pt-20 pb-32 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-block mb-3">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/50 animate-pulse">
              <Calendar className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3 h-3 text-slate-900" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent mb-2">
          Datat Festive Kombëtare 🇦🇱
        </h1>
        <p className="text-slate-400 text-sm">Gjej datat e rëndësishme për takime speciale</p>
      </div>

      {/* Month Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Zgjidh Muajin</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {months.map((month, index) => (
            <button
              key={index}
              onClick={() => setSelectedMonth(index)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedMonth === index
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Festive Dates List */}
      {getCurrentMonthDates().length > 0 ? (
        <div className="space-y-4">
          {getCurrentMonthDates().map((festive, index) => {
            const Icon = festive.icon;
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${getDateTypeColor(festive.type)} border-2 backdrop-blur-sm hover:scale-[1.02] transition-all`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${festive.color} flex items-center justify-center shrink-0 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">{festive.name}</h3>
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                          festive.type === 'national' 
                            ? 'bg-red-500/30 text-red-300 border border-red-500/50'
                            : festive.type === 'international'
                            ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                            : 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                        }`}>
                          {getDateTypeLabel(festive.type)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 text-sm">
                          {festive.date} {months[selectedMonth]} {new Date().getFullYear()}
                        </span>
                      </div>
                      {festive.type === 'national' && (
                        <p className="text-slate-400 text-xs mt-2">
                          Datë e rëndësishme kombëtare - Perfekt për takime me temë patriotike
                        </p>
                      )}
                      {festive.type === 'cultural' && (
                        <p className="text-slate-400 text-xs mt-2">
                          Festim kulturore - Shkëlqyer për takime me temë tradicionale
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-3">📅</div>
          <p className="text-slate-400">Nuk ka data festive për këtë muaj</p>
        </div>
      )}

      {/* Info Card */}
      <Card className="mt-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-purple-500/30 backdrop-blur-sm">
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Këshilla për Takime në Datat Festive
          </h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Datat kombëtare janë perfekte për takime me temë patriotike</li>
            <li>• Festimet kulturore ofrojnë mundësi për eksperienca unike</li>
            <li>• Planifikoni paraprakisht për restorante dhe aktivitete</li>
            <li>• Shfrytëzoni atmosferën festive për takime të veçanta</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

