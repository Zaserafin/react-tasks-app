import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

const STORAGE_KEY = '@theme';
const ALLOWED_THEMES = ['dark', 'light'];
const DEFAULT_THEME = 'dark';

interface ThemeContextProps {
  theme: string;
  isDark: boolean;
  isLight: boolean;
  changeTheme: (newTheme: string) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    changeTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const changeTheme = (newTheme: string) => {
    if (!ALLOWED_THEMES.includes(newTheme)) return;
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    switch (theme) {
      case 'dark':
        changeTheme('light');
        break;
      case 'light':
        changeTheme('dark');
        break;
      default:
        changeTheme(DEFAULT_THEME);
        break;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, isLight, changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeStore = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeStore must be used within a ThemeProvider');
  }
  return context;
};
