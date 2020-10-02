import { Global } from '@emotion/core';
import { ThemeProvider as EmotionTheming } from 'emotion-theming';
import React from 'react';
import { globalStyles } from './global-styles';
import { Theme } from './theme';
import * as themes from './themes';

export const ThemeContext = React.createContext<{
  theme: Theme;
  changeTheme: (name: 'base' | 'dark' | 'light') => void | undefined;
}>({ theme: themes.base, changeTheme: () => {} });

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (typeof context === 'undefined') {
    throw new Error('`useTheme` must be used within a `ThemeProvider`');
  }

  return context;
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState(themes.dark);

  const changeTheme = (name: 'base' | 'dark' | 'light') => {
    typeof window !== 'undefined' &&
      localStorage.setItem('tilt-preferred-theme', JSON.stringify(name));

    return setTheme(themes[name]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <Global styles={() => globalStyles(theme)} />
      <EmotionTheming theme={theme}>{children}</EmotionTheming>
    </ThemeContext.Provider>
  );
};
