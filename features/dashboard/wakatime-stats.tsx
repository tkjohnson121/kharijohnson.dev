import React from 'react';
import { WakatimeData, WakatimeErrors } from '../../pages/api/wakatime';

export const WakaTimeStats = () => {
  const [{ status, data, errors }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: WakatimeData;
    errors?: WakatimeErrors[];
  }>({
    status: 'idle',
  });

  const fetchData = async () => {
    if (status !== 'pending') {
      setState({ status: 'pending' });

      const result = await fetch(process.env.APP_URL + '/api/wakatime');

      const { data, errors } = await result.json();

      if (errors) {
        return setState((prev) => ({ ...prev, status: 'error', errors }));
      }

      return setState((prev) => ({ ...prev, status: 'fulfilled', data }));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (errors) {
    return <pre>Wakatime Error: {errors?.join(', ')}</pre>;
  }

  return data ? (
    <>
      <ul>
        <li>Total: {data.human_readable_total_including_other_language}</li>
        <li>
          Daily Coding Average:{' '}
          {data.human_readable_daily_average_including_other_language}
        </li>
        <li>Best Day: {data.best_day.text}</li>
      </ul>

      <ul>
        <li>
          Top Languages:{' '}
          {data.languages
            .slice(0, 3)
            .map((lang) => `${lang.name} (${lang.percent}%)`)
            .join(', ')}
        </li>
        <li>
          Recent Projects:{' '}
          {data.projects
            .slice(0, 3)
            .map((proj) => `${proj.name} (${proj.percent}%)`)
            .join(', ')}
        </li>
      </ul>
    </>
  ) : (
    <div>Loading...</div>
  );
};
