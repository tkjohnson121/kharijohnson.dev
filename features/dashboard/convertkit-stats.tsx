import Card from 'common/card';
import { ConvertkitData, ConvertkitTypes } from 'pages/api/convertkit';
import React from 'react';

export const ConvertkitStats = () => {
  const [{ status, data, error }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: ConvertkitData;
    error?: Error;
  }>({ status: 'idle' });

  React.useEffect(() => {
    const fetchData = async (type: ConvertkitTypes) => {
      setState((prev) => ({ ...prev, status: 'pending' }));

      try {
        const response = await fetch(
          process.env.APP_URL + '/api/convertkit?type=' + type,
        );

        if (!response.ok) {
          const { error } = await response.json();
          throw error;
        }

        const { data } = (await response.json()) as {
          data: ConvertkitData;
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
      await Promise.all([fetchData(ConvertkitTypes.SUBSCRIBERS)]);

    if (status === 'idle') {
      fetchAll();
    }
  }, []);

  if (status === 'error' && error) {
    return <pre>Convertkit Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return <Card title="Subscribers" value={data?.subscribers} />;
};
