import { GithubStats } from 'features/dashboard/github-stats';
import { SpotifyStats } from 'features/dashboard/spotify-stats';
import { WakaTimeStats } from 'features/dashboard/wakatime-stats';
import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../common';

export const Dashboard: NextPage = () => {
  return (
    <Layout seo={{ title: 'Dashboard' }}>
      <ul className="flex flex-wrap align-middle justify-evenly">
        <WakaTimeStats />
        <GithubStats />
        <SpotifyStats />
      </ul>
    </Layout>
  );
};

export default Dashboard;
