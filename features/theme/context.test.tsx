import React from 'react';
import { fireEvent, render } from '../../utils/setup-tests';
import { useTheme } from './context';

const WithThemeProvider = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div>
      <button
        onClick={() => changeTheme(theme.name === 'light' ? 'dark' : 'light')}
      >
        change theme
      </button>
      <span>{JSON.stringify(theme, null, 2)}</span>
    </div>
  );
};

describe('feat: theme -> useTheme()', () => {
  it('renders the correct theme and can toggle', async () => {
    const { getByText } = render(<WithThemeProvider />);

    // toggle theme button
    const themeToggle = getByText(/change theme/gi);
    expect(themeToggle).toBeTruthy();

    const isDarkTheme = () => !!getByText(/"name": "dark"/gi);
    const isLightTheme = () => !!getByText(/"name": "light"/gi);

    // dark theme is enabled by default
    expect(isDarkTheme()).toBeTruthy();

    fireEvent.click(themeToggle);

    // light theme is enabled after switching
    expect(isLightTheme()).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { container } = render(<WithThemeProvider />);

    expect(container).toMatchSnapshot();
  });
});
