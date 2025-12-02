import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackAction } from '@/utils/analytics';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'dark',
    label: 'Errët',
    colors: {
      bg: 'from-slate-950 via-purple-950/20 to-slate-950',
      card: 'bg-slate-800/50',
      cardBorder: 'border-slate-700/50',
      text: 'text-white',
      textMuted: 'text-slate-400',
      input: 'bg-slate-800 border-slate-700',
      inputFocus: 'focus:border-purple-500'
    }
  },
  light: {
    name: 'light',
    label: 'Dritë',
    colors: {
      bg: 'from-slate-100 via-purple-100/30 to-slate-100',
      card: 'bg-white/80',
      cardBorder: 'border-slate-200',
      text: 'text-slate-900',
      textMuted: 'text-slate-600',
      input: 'bg-white border-slate-300',
      inputFocus: 'focus:border-purple-500'
    }
  },
  midnight: {
    name: 'midnight',
    label: 'Mesnatë',
    colors: {
      bg: 'from-slate-950 via-blue-950/30 to-slate-950',
      card: 'bg-slate-900/70',
      cardBorder: 'border-blue-900/50',
      text: 'text-blue-50',
      textMuted: 'text-blue-300',
      input: 'bg-slate-900 border-blue-800',
      inputFocus: 'focus:border-blue-400'
    }
  },
  sunset: {
    name: 'sunset',
    label: 'Perëndim',
    colors: {
      bg: 'from-orange-950 via-rose-950/30 to-slate-950',
      card: 'bg-slate-900/70',
      cardBorder: 'border-orange-900/50',
      text: 'text-orange-50',
      textMuted: 'text-orange-200',
      input: 'bg-slate-900 border-orange-800',
      inputFocus: 'focus:border-orange-400'
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved && themes[saved] ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme class to document
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-midnight', 'theme-sunset');
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Set CSS variables for the theme
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--bg-primary', '#f8fafc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--border-color', '#e2e8f0');
    } else if (theme === 'midnight') {
      root.style.setProperty('--bg-primary', '#020617');
      root.style.setProperty('--bg-secondary', '#0f172a');
      root.style.setProperty('--text-primary', '#e0f2fe');
      root.style.setProperty('--text-secondary', '#7dd3fc');
      root.style.setProperty('--border-color', '#1e3a5f');
    } else if (theme === 'sunset') {
      root.style.setProperty('--bg-primary', '#1c1917');
      root.style.setProperty('--bg-secondary', '#292524');
      root.style.setProperty('--text-primary', '#fff7ed');
      root.style.setProperty('--text-secondary', '#fed7aa');
      root.style.setProperty('--border-color', '#7c2d12');
    } else {
      // Dark theme (default)
      root.style.setProperty('--bg-primary', '#020617');
      root.style.setProperty('--bg-secondary', '#1e293b');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--border-color', '#334155');
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      trackAction('themeChanges');
    }
  };

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    changeTheme(themeKeys[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeConfig: themes[theme],
      themes,
      changeTheme, 
      toggleTheme,
      isDark: theme !== 'light'
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

