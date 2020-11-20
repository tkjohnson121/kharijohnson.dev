import { Global } from '@emotion/core';
import { ThemeProvider as EmotionTheming } from 'emotion-theming';
import React from 'react';
import { globalStyles } from './global-styles';
import { Theme } from './theme';
import * as themes from './themes';

export const ThemeContext = React.createContext<{
  theme: Theme;
  changeTheme: (name: 'base' | 'dark' | 'light') => void | undefined;
}>({ theme: themes.dark, changeTheme: () => {} });

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (typeof context === 'undefined') {
    throw new Error('`useTheme` must be used within a `ThemeProvider`');
  }

  return context;
};

/**
 * # useColorScheme
 *
 * React hook designed to watch for a user's color scheme preference and change
 *  the local theme of the site to match.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
const useColorScheme = (
  changeTheme: (name: 'base' | 'dark' | 'light') => void,
) => {
  // set default theme accordingly

  const isPrefersColorSchemeSupported =
    typeof window !== 'undefined' && 'matchMedia' in window;

  // see if user prefers light theme over a dark one
  const isLightThemePreferred =
    isPrefersColorSchemeSupported &&
    window?.matchMedia('(prefers-color-scheme: light)').matches;

  React.useEffect(() => {
    // set the theme accordingly
    if (isPrefersColorSchemeSupported && isLightThemePreferred) {
      changeTheme('light');
    }

    // setup event listener to handle theme preference change
    const onThemePreferenceChange = (evt: MediaQueryListEvent) => {
      if (evt.matches) {
        changeTheme('light');
      } else {
        changeTheme('dark');
      }
    };

    window
      ?.matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', onThemePreferenceChange);

    return () => {
      window
        ?.matchMedia('(prefers-color-scheme: light)')
        .removeEventListener('change', onThemePreferenceChange);
    };
  }, [isPrefersColorSchemeSupported, isLightThemePreferred]);
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState(themes.dark);
  const changeTheme = (name: 'base' | 'dark' | 'light') =>
    setTheme(themes[name]);

  useColorScheme(changeTheme);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <Global styles={() => globalStyles(theme)} />
      <EmotionTheming theme={theme}>{children}</EmotionTheming>
    </ThemeContext.Provider>
  );
};
