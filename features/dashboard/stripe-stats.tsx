import Card from 'common/card';
import { StripeData, StripeTypes } from 'pages/api/stripe';
import React from 'react';

export const StripeStats = () => {
  const [{ status, data, error }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: StripeData;
    error?: Error;
  }>({ status: 'idle' });

  React.useEffect(() => {
    const fetchData = async (type: StripeTypes) => {
      setState((prev) => ({ ...prev, status: 'pending' }));

      try {
        const response = await fetch(
          process.env.APP_URL + '/api/stripe?type=' + type,
        );

        if (!response.ok) {
          const { error } = await response.json();
          throw error;
        }

        const { data } = (await response.json()) as {
          data: StripeData;
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
      await Promise.all([
        fetchData(StripeTypes.REVENUE),
        fetchData(StripeTypes.PRODUCTS),
      ]);

    if (status === 'idle') {
      fetchAll();
    }
  }, []);

  return (
    <>
      <Card
        title="Sales"
        value={data?.revenue ? '$' + data?.revenue : undefined}
      />
      <Card title="Products" value={data?.products?.length} />
    </>
  );
};
