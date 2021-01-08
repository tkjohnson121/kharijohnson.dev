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

      <header>
        <nav className="flex align-middle justify-end w-screen p-4 border-pink-500">
          {['/', 'blog', 'snippets', 'about'].map((link) => (
            <Link href={link} key={link} passHref>
              <a className="ml-4">{link.toUpperCase()}</a>
            </Link>
          ))}
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
