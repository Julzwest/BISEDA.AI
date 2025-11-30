import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Lightbulb, Home, Calendar, Bot, Flag } from 'lucide-react';

export default function Layout({ children }) {
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
      
      {/* Main Content Area - Takes all available space */}
      <main className="flex-1 overflow-hidden" style={{ height: '100%', overflow: 'hidden' }}>
        {children}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="flex-shrink-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 z-50" style={{ height: '64px' }}>
        <div className={`flex ${navItems.length === 4 ? 'justify-between' : 'justify-around'} items-center h-full px-2`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? 'nav-active' : 'text-slate-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${navItems.length >= 4 ? 'mb-0.5' : 'mb-1'} ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className={`${navItems.length >= 4 ? 'text-[10px]' : 'text-xs'} font-medium leading-tight`}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
