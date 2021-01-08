import '@testing-library/jest-dom/extend-expect';
/**
 * Component Wrapper
 */

// const AllProviders: React.FC = ({ children }) => (
//   <ThemeProvider>{children}</ThemeProvider>
// );

// AllProviders.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const customRender = (ui: any, options?: RenderOptions) =>
//   render(ui, { wrapper: AllProviders, ...options });

/**
 * Custom Error Handling
 */

const originalError = console.error;

beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*overlapping act/.test(args[0])) {
      return;
    }
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    if (/IDB requires a browser environment/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

export * from '@testing-library/react';
// export { customRender as render };
