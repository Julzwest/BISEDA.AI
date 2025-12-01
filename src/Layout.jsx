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
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white mobile-layout" style={{ overflow: 'hidden' }}>
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
        
        /* Ensure layout uses dynamic viewport on mobile */
        .mobile-layout {
          height: 100vh;
          height: 100dvh; /* Dynamic viewport height for mobile browsers */
        }
        
        /* Force bottom navigation to stay at bottom */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding-bottom: max(env(safe-area-inset-bottom, 0px), 10px);
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
      
      {/* Top Bar with User Profile Link */}
      <div className="absolute top-0 right-0 z-50 p-4">
        <Link to="/profile">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <User className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>
      
      {/* Main Content Area - Takes all available space */}
      <main className="flex-1 overflow-hidden" style={{ height: '100%', overflow: 'hidden', paddingBottom: '80px', marginBottom: '-80px' }}>
        {children}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="bottom-nav flex-shrink-0 bg-slate-900/98 backdrop-blur-lg border-t border-slate-800" style={{ height: '80px', minHeight: '80px', zIndex: 9999 }}>
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
