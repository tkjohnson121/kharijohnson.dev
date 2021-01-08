import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export const Layout = ({
  children,
  title = 'Khari Johnson | Software Developer',
}: {
  children?: ReactNode;
  title?: string;
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="flex align-middle justify-end w-screen fixed p-4">
        <nav className="flex align-middle justify-end w-auto border-retro-1 border-pink-100 stroke-2 shadow-retro-glitch bg-transparent rounded-md">
          {['/', 'blog', 'snippets', 'about'].map((link) => (
            <Link href={link} key={link} passHref>
              <a className="ml-4 p-4 block hover:bg-purple-500">
                {link.toUpperCase()}
              </a>
            </Link>
          ))}
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
