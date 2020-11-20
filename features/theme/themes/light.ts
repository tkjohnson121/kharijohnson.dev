import { Theme } from '../theme';
import theme from './base';

const light: Theme = {
  ...theme,
  name: 'light',
  colors: {
    ...theme.colors,
    text: '#111111',
    background: '#fafaff',
    primary: '#7928CA',
    secondary: '#F81CE5',
    highlight: '#ff0080',
    muted: theme.colors.blackAlpha['300'],
    error: '#ff3333',
    success: '#37be37',
    info: '#3291ff',
    warning: '#f7b955',
  },
  fonts: {
    ...theme.fonts,
    heading: `'Open Sans', -apple-system-headline, -apple-system, BlinkMacSystemFont, system-ui,  sans-serif, "Segoe UI", "Apple Color Emoji"`,
    body: `'Source Sans Pro', -apple-system-body, -apple-system, BlinkMacSystemFont, system-ui,  sans-serif, "Segoe UI", "Apple Color Emoji"`,
  },
};

export default light;
