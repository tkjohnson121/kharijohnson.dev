import { css } from '@emotion/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { pageTransition } from 'theme';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'Khari Johnson | Software Developer',
}: LayoutProps) => {
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
          variants={pageTransition}
          initial={'initial'}
          animate={'animate'}
          exit={'exit'}
          key={router.route}
          css={css`
            min-height: 100vh;
          `}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
