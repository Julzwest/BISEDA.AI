import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Lightbulb, Home, Calendar, Bot, Flag, User, LogOut } from 'lucide-react';

export default function Layout({ children, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';
  const location = useLocation();
  const currentPageName = location.pathname.split('/')[1]?.charAt(0).toUpperCase() + location.pathname.split('/')[1]?.slice(1) || 'Home';

  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'AI Coach', icon: Bot, page: 'Chat' },
    { name: 'Takime', icon: Calendar, page: 'FirstDates' },
    { name: 'Festive', icon: Flag, page: 'FestiveDates' },
    { name: 'Këshilla', icon: Lightbulb, page: 'Tips' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white" style={{ height: '100vh', overflow: 'hidden' }}>
      <style>{`
        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --gold: #fbbf24;
          --bg-dark: #0f172a;
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        .nav-active {
          color: var(--gold);
        }
      `}</style>
      
      {/* Top Bar with User Menu */}
      <div className="absolute top-0 right-0 z-50 p-4">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <User className="w-5 h-5 text-white" />
          </button>
          
          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute top-12 right-0 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-3 min-w-[200px]">
              <div className="pb-3 mb-3 border-b border-slate-700">
                <p className="text-white font-semibold text-sm">{userName}</p>
                <p className="text-slate-400 text-xs">{localStorage.getItem('userEmail')}</p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  if (onLogout) onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Dil</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content Area - Takes all available space */}
      <main className="flex-1 overflow-hidden" style={{ height: '100%', overflow: 'hidden' }}>
        {children}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="flex-shrink-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 z-50" style={{ height: '70px' }}>
        <div className={`flex ${navItems.length === 4 ? 'justify-between' : 'justify-around'} items-center h-full px-2`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? 'nav-active' : 'text-slate-300'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-semibold leading-tight whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
