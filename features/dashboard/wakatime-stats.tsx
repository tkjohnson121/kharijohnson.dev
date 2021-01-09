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

  React.useEffect(() => {
    fetchData();
  }, []);

  if (errors) {
    return <pre>Wakatime Error: {errors?.join(', ')}</pre>;
  }

  return data ? (
    <ul className="flex flex-wrap align-middle justify-evenly">
      <li
        className="flex flex-col p-12 m-4 text-center "
        style={{ flex: '1 1 30%' }}
      >
        <p className="text-sm uppercase whitespace-nowrap tracking-wider">
          Total
        </p>
        <div className="text-3xl font-bold whitespace-nowrap">
          {data.human_readable_total_including_other_language}
        </div>
      </li>

      <li
        className="flex flex-col p-12 m-4 text-center "
        style={{ flex: '1 1 30%' }}
      >
        <p className="text-sm uppercase whitespace-nowrap tracking-wider">
          Daily Coding Average
        </p>
        <div className="text-3xl font-bold whitespace-nowrap">
          {data.human_readable_daily_average_including_other_language}
        </div>
      </li>

      <li
        className="flex flex-col p-12 m-4 text-center "
        style={{ flex: '1 1 30%' }}
      >
        <p className="text-sm uppercase whitespace-nowrap tracking-wider">
          Best Day
        </p>
        <div className="text-3xl font-bold whitespace-nowrap">
          {data.best_day.text}
        </div>{' '}
      </li>

      <li style={{ flex: '1 1 100%' }}>
        <p
          className="text-sm pb-4 uppercase text-left whitespace-nowrap tracking-wider"
          style={{ flex: '0 0 25%', borderBottom: '1px solid' }}
        >
          Recent Languages
        </p>

        <ul className="ml-auto flex flex-wrap justify-end py-4 text-right">
          {data.languages.slice(0, 10).map((lang) => (
            <li key={lang.name} className="flex flex-col ml-4 mb-4 font-bold">
              {lang.name}
            </li>
          ))}
        </ul>
      </li>

      <li style={{ flex: '1 1 100%' }}>
        <p
          className="text-sm pb-4 uppercase text-left whitespace-nowrap tracking-wider"
          style={{ flex: '0 0 25%', borderBottom: '1px solid' }}
        >
          Recent Projects
        </p>

        <ul className="ml-auto flex flex-wrap justify-end py-4 text-right">
          {data.projects.slice(0, 5).map((proj) => (
            <li key={proj.name} className="flex ml-8 mb-4 font-bold">
              /{proj.name}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  ) : (
    <div>Loading...</div>
  );
};
