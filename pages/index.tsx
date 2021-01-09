import { GithubStats } from 'features/dashboard/github-stats';
import { SpotifyStats } from 'features/dashboard/spotify-stats';
import { WakaTimeStats } from 'features/dashboard/wakatime-stats';
import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../common';

export const Dashboard: NextPage = () => {
  return (
    <Layout
      seo={{
        title: 'Dashboard',
        description:
          'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like Unsplash, YouTube, GitHub, and more. Want to build your own? Check out Lee’s Blog Series.',
      }}
    >
      <ul className="flex flex-wrap align-middle justify-evenly">
        <WakaTimeStats />
        <GithubStats />
        <SpotifyStats />
      </ul>
    </Layout>
  );
};

export default Dashboard;
