import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackAction } from '@/utils/analytics';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'dark',
    label: 'Errët',
    colors: {
      bg: '#0f172a',
      bgSecondary: '#1e293b',
      card: '#1e293b',
      cardBorder: '#334155',
      text: '#f8fafc',
      textSecondary: '#94a3b8',
      accent: '#a855f7'
    }
  },
  light: {
    name: 'light',
    label: 'Dritë',
    colors: {
      bg: '#f1f5f9',
      bgSecondary: '#ffffff',
      card: '#ffffff',
      cardBorder: '#e2e8f0',
      text: '#0f172a',
      textSecondary: '#475569',
      accent: '#7c3aed'
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
    
    // Remove old theme classes and add new one
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Set CSS variables
    const root = document.documentElement;
    const themeColors = themes[theme].colors;
    
    root.style.setProperty('--bg-primary', themeColors.bg);
    root.style.setProperty('--bg-secondary', themeColors.bgSecondary);
    root.style.setProperty('--card-bg', themeColors.card);
    root.style.setProperty('--card-border', themeColors.cardBorder);
    root.style.setProperty('--text-primary', themeColors.text);
    root.style.setProperty('--text-secondary', themeColors.textSecondary);
    root.style.setProperty('--accent-primary', themeColors.accent);
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColors.bg);
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      trackAction('themeChanges');
    }
  };

  const toggleTheme = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeConfig: themes[theme],
      themes,
      changeTheme, 
      toggleTheme,
      isDark: theme === 'dark'
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
