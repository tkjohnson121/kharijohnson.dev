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
        <div className="w-screen">
          <h1
            className="text-5xl p-2 font-semibold italic leading-normal tracking-wider"
            style={{
              color: 'white',
              maxWidth: '80%',
              whiteSpace: 'nowrap',
              overflowX: 'scroll',
              textOverflow: 'ellipsis',
            }}
          >
            {seo.title}
          </h1>

          <div className="my-4 h-1 bg-pink-500 w-full " />
          <p className="text-base max-w-prose">{seo.description}</p>
        </div>

        <nav
          className="z-50 fixed top-6 right-6 flex bg-transparent rounded-md shadow-retro-glitch bg-purple-900"
          style={{
            alignSelf: 'flex-start',
          }}
        >
          {['/', 'blog', 'snippets', 'about'].map((link) => (
            <Link href={link} key={link} passHref>
              <a className="p-4 block hover:bg-cyan-500 hover:text-purple-500 tracking-wider italic">
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
