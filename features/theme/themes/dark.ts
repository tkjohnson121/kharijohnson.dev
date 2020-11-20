import { Theme } from '../theme';
import theme from './base';

const dark: Theme = {
  ...theme,
  name: 'dark',
  colors: {
    ...theme.colors,
    text: '#FAFAFF',
    background: '#111111',
    primary: '#7928CA',
    secondary: '#F81CE5',
    highlight: '#79FFE1',
    muted: theme.colors.whiteAlpha['300'],
    error: '#FF3333',
    success: '#37BE37',
    info: '#3291FF',
    warning: '#F7B955',
  },
  fonts: {
    ...theme.fonts,
    heading: `'Open Sans', -apple-system-headline, -apple-system, BlinkMacSystemFont, system-ui,  sans-serif, "Segoe UI", "Apple Color Emoji"`,
    body: `'Source Sans Pro', -apple-system-body, -apple-system, BlinkMacSystemFont, system-ui,  sans-serif, "Segoe UI", "Apple Color Emoji"`,
  },
};

export default dark;
