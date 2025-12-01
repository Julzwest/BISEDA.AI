import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Lightbulb, Home, Calendar, Bot, Flag, User } from 'lucide-react';

export default function Layout({ children, onLogout }) {
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
    <>
      <style>{`
        body {
          background: linear-gradient(to bottom right, #020617, #0f172a, #1e1b4b);
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        .nav-active {
          color: #fbbf24;
        }
      `}</style>
      
      {/* Top Bar with User Profile Link */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 9999 }}>
        <Link to="/profile">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <User className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>
      
      {/* Main Content - Normal flow, no restrictions */}
      <div style={{ paddingBottom: '100px', minHeight: '100vh' }}>
        {children}
      </div>

      {/* Fixed Bottom Navigation */}
      <nav style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '80px',
        backgroundColor: 'rgba(15, 23, 42, 0.98)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        zIndex: 9999,
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)'
      }}>
        <div className={`flex ${navItems.length === 4 ? 'justify-between' : 'justify-around'} items-center h-full px-3`}>
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
                <Icon className={`w-7 h-7 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-sm font-bold leading-tight whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
