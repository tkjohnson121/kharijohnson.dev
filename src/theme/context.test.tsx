import React from 'react';
import { fireEvent, render, wait } from '../../utils/setup-tests';
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

    const themeToggle = getByText(/change theme/gi);
    const isLightTheme = () => !!getByText(/"name": "light"/gi);
    const isDarkTheme = () => !!getByText(/"name": "dark"/gi);

    expect(themeToggle).toBeTruthy();
    expect(isDarkTheme()).toBeTruthy();

    await wait(() => {
      fireEvent.click(themeToggle);
    });

    expect(isLightTheme()).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { container } = render(<WithThemeProvider />);

    expect(container).toMatchSnapshot();
  });
});
