import { css } from '@emotion/core';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { pageTransition, Theme } from '../features/theme';

export const Layout = ({
  children,
  title = 'Khari Johnson | Software Developer',
}: {
  children?: ReactNode;
  title?: string;
}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AnimatePresence exitBeforeEnter>
        <motion.main
          key={router.route}
          variants={pageTransition}
          initial={'initial'}
          animate={'animate'}
          exit={'exit'}
          css={(theme: Theme) => css`
            min-height: 100vh;
            max-width: 100vw;
            overflow: hidden;

            background-color: ${theme.colors.background};
          `}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
