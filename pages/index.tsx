import { ConvertkitStats } from 'features/dashboard/convertkit-stats';
import { GithubStats } from 'features/dashboard/github-stats';
import { SpotifyStats } from 'features/dashboard/spotify-stats';
import { StripeStats } from 'features/dashboard/stripe-stats';
import { TwitterStats } from 'features/dashboard/twitter-stats';
import { WakaTimeStats } from 'features/dashboard/wakatime-stats';
import { NextPage } from 'next';
import React from 'react';
import { Layout } from '../common';

export const Dashboard: NextPage = () => {
  return (
    <Layout seo={{ title: 'Dashboard' }}>
      <ul className="flex flex-wrap align-middle justify-evenly">
        <TwitterStats />
        <ConvertkitStats />
        <StripeStats />
        <WakaTimeStats />
        <GithubStats />
        <SpotifyStats />
      </ul>
    </Layout>
  );
};

export default Dashboard;
