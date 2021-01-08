import { SpotifyTypes } from 'pages/api/spotify';
import React from 'react';

export const SpotifyStats = () => {
  const [{ status, data, error }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: { [key in SpotifyTypes]?: any };
    error?: Error;
  }>({
    status: 'idle',
  });

  const fetchData = async (type: SpotifyTypes) => {
    if (status !== 'pending') {
      setState({ status: 'pending' });

      try {
        const response = await fetch(
          process.env.APP_URL + '/api/spotify?type=' + type,
        );

        const spotify = await response.json();

        if (spotify.error) {
          throw spotify.error;
        }

        return setState((prev) => ({
          ...prev,
          status: 'fulfilled',
          data: { ...data, [type]: spotify },
        }));
      } catch (error) {
        return setState((prev) => ({
          ...prev,
          status: 'error',
          error,
        }));
      }
    }
  };

  React.useEffect(() => {
    (async () =>
      await Promise.all([
        fetchData(SpotifyTypes.CURRENT),
        fetchData(SpotifyTypes.RECENT),
      ]))();
  }, []);

  if (error) {
    return <pre>Spotify Error: {error.message}</pre>;
  }

  return data ? (
    <>
      <ul>
        <li className="text-3xl mt-4">Spotify</li>
        <li>
          <p className="text-xl mt-4">Total</p>

          <div>{JSON.stringify(data, null, 2)}</div>
        </li>
      </ul>
    </>
  ) : (
    <div>Loading...</div>
  );
};
