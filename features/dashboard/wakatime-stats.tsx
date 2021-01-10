import React from 'react';
import Card from '../../common/card';
import List from '../../common/list';
import { WakatimeData, WakatimeErrors } from '../../pages/api/wakatime';

export const WakaTimeStats = () => {
  const [{ status, data }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: WakatimeData;
    errors?: WakatimeErrors[];
  }>({
    status: 'idle',
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (status !== 'pending') {
        setState({ status: 'pending' });

        const result = await fetch(process.env.APP_URL + '/api/wakatime');

        const { data: fetchData, errors } = await result.json();

        if (errors) {
          return setState((prev) => ({ ...prev, status: 'error', errors }));
        }

        return setState((prev) => ({
          ...prev,
          status: 'fulfilled',
          data: fetchData,
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card
        title="Total"
        value={data?.human_readable_total_including_other_language}
      />

      <Card
        title="Daily Coding Average"
        value={data?.human_readable_daily_average_including_other_language}
      />

      <Card title="Best Day" value={data?.best_day.text} />

      <div style={{ flex: '1 1 100%' }} className="mb-4" />

      <List
        title="Recent Languages"
        values={data?.languages}
        renderValue={(lang) => (
          <li key={lang.name} className="flex flex-col mr-4 mb-4 font-bold">
            {lang.name}
          </li>
        )}
      />
    </>
  );
};
