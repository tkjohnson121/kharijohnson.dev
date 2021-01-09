import { NextSeo, NextSeoProps } from 'next-seo';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export const Layout = ({
  children,
  seo = { title: 'Khari Johnson | Software Developer' },
}: {
  children?: ReactNode;
  seo?: NextSeoProps;
}) => {
  return (
    <>
      <NextSeo
        {...seo}
        title={
          seo.title +
          ' | Khari Johnson | Software Developer and Backyard Mechanic'
        }
      />

      <header className="p-4">
        <div className="w-full ">
          <h1 className="text-5xl text-white font-semibold italic leading-normal tracking-wider whitespace-nowrap overflow-scroll overflow-ellipsis">
            {seo.title}
          </h1>

          <div className="mb-2 h-1 w-full bg-white" />
          <p className="text-base max-w-prose">{seo.description}</p>
        </div>

        <nav className="z-50 fixed bottom-0 md:bottom-auto md:top-6 left-0 md:left-auto right-0 md:right-6 flex bg-transparent bg-purple-900 overflow-x-scroll">
          {['/', 'blog', 'snippets', 'about'].map((link) => (
            <Link href={link} key={link} passHref>
              <a className="p-4 flex-grow text-center block hover:bg-cyan-500 hover:text-purple-500 tracking-wider italic">
                {link.toUpperCase()}
              </a>
            </Link>
          ))}
        </nav>
      </header>

      <main className="min-h-screen p-4">{children}</main>
    </>
  );
};

export default Layout;
