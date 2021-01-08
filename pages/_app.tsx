import { AppProps } from 'next/app';
import * as React from 'react';
import 'tailwindcss/tailwind.css';

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js', {
            scope: '/',
          })
          .then(function(registration) {
            console.info('SW: registered -> ', registration);
          })
          .catch(function(registrationError) {
            console.info('SW: failed -> ', registrationError);
          });
      });
    }
  }, []);

  return <Component {...pageProps} />;
};

export default App;
