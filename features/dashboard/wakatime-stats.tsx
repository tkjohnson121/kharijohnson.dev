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
        <li className="text-3xl mt-4">Wakatime</li>
        <li>
          <p className="text-xl mt-4">Total</p>

          <div>{data.human_readable_total_including_other_language}</div>
        </li>

        <li>
          <p className="text-xl mt-4">Daily Coding Average</p>
          <div>
            {data.human_readable_daily_average_including_other_language}
          </div>
        </li>

        <li>
          <p className="text-xl mt-4">Best Day</p>
          <div>{data.best_day.text}</div>
        </li>

        <li>
          <p className="text-xl mt-4">Recent Languages</p>
          <ul>
            {data.languages.slice(0, 5).map((lang) => (
              <li key={lang.name}>
                {lang.name} ({lang.percent}%)
              </li>
            ))}
          </ul>
        </li>

        <li>
          <p className="text-xl mt-4">Recent Projects</p>
          <ul>
            {data.projects.slice(0, 3).map((proj) => (
              <li key={proj.name}>
                {proj.name} ({proj.percent}%)
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  ) : (
    <div>Loading...</div>
  );
};
