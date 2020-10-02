import { Theme } from '../theme';
import theme from './base';

const dark: Theme = {
  ...theme,
  name: 'dark',
  colors: {
    ...theme.colors,
    text: 'hsl(275, 90%, 100%)',
    background: 'hsl(275, 0%, 10%)',
    primary: '#b526fb',
    secondary: 'hsl(275, 100%, 80%)',
    highlight: 'hsl(275, 40%, 75%)',
    muted: 'hsla(275, 20%, 0%, 20%)',
    error: '#ff0000',
    success: '#50e3c2',
    info: '#DD9CFC',
    warning: '#f5a623',
  },
  fonts: {
    ...theme.fonts,
    heading: `-apple-system-headline, -apple-system, BlinkMacSystemFont, system-ui, "SF Pro Display", sans-serif, "Segoe UI", "Apple Color Emoji"`,
    body: `-apple-system-body, -apple-system, BlinkMacSystemFont, system-ui, "SF Pro Display", sans-serif, "Segoe UI", "Apple Color Emoji"`,
  },
};

export default dark;
