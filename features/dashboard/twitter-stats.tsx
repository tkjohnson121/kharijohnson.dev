import Card from 'common/card';
import { TwitterData, TwitterError, TwitterTypes } from 'pages/api/twitter';
import React from 'react';

export const TwitterStats = () => {
  const [{ status, data }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: TwitterData;
    error?: TwitterError;
  }>({ status: 'idle' });

  React.useEffect(() => {
    const fetchData = async (type: TwitterTypes) => {
      setState((prev) => ({ ...prev, status: 'pending' }));

      try {
        const response = await fetch(
          process.env.APP_URL + '/api/twitter?type=' + type,
        );

        if (!response.ok) {
          const { error } = await response.json();
          throw error;
        }

        const { data } = (await response.json()) as {
          data: TwitterData;
        };

        return setState((prev) => ({
          ...prev,
          status: 'fulfilled',
          data: { ...prev.data, ...data },
        }));
      } catch (error) {
        console.error(error);

        return setState((prev) => ({
          ...prev,
          status: 'error',
          error,
        }));
      }
    };

    const fetchAll = async () =>
      await Promise.all([fetchData(TwitterTypes.FOLLOWERS)]);

    if (status === 'idle') {
      fetchAll();
    }
  }, []);

  return <Card title={'Followers'} value={data?.followers} />;
};
