import { SpotifyArtist, SpotifyTrack, SpotifyTypes } from 'pages/api/spotify';
import React from 'react';

export const SpotifyStats = () => {
  const [{ status, data, error }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: { TRACKS?: Array<SpotifyTrack>; ARTISTS?: Array<SpotifyArtist> };
    error?: Error;
  }>({ status: 'idle' });

  React.useEffect(() => {
    const fetchData = async (type: SpotifyTypes) => {
      setState((prev) => ({ ...prev, status: 'pending' }));

      try {
        const response = await fetch(
          process.env.APP_URL + '/api/spotify?type=' + type,
        );

        if (!response.ok) {
          const { error } = await response.json();
          throw error;
        }

        const { data } = (await response.json()) as {
          data: SpotifyTrack[] | SpotifyArtist[];
        };

        return setState((prev) => ({
          ...prev,
          status: 'fulfilled',
          data: { ...prev.data, [type]: data },
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
        fetchData(SpotifyTypes.TRACKS),
        fetchData(SpotifyTypes.ARTISTS),
      ]);

    if (status === 'idle') {
      fetchAll();
    }
  }, []);

  if (status === 'error' && error) {
    return <pre>Spotify Error: {JSON.stringify(error, null, 2)}</pre>;
  }

  return data ? (
    <>
      <ul>
        <li>
          <p
            className="text-sm pb-4 uppercase text-left whitespace-nowrap tracking-wider"
            style={{ flex: '0 0 25%', borderBottom: '1px solid' }}
          >
            Top Tracks
          </p>

          <ul className="ml-auto flex flex-wrap justify-end py-4 text-right">
            {data.TRACKS?.map((track) => (
              <li
                key={track.id}
                className="flex ml-8 mb-4"
                style={{ alignItems: 'center' }}
              >
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  height="25"
                  width="25"
                  className="rounded-full mr-2 h-8 w-8"
                />
                <a href={track.uri} target="_new" className="font-bold">
                  {track.name}
                </a>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <p
            className="text-sm pb-4 uppercase text-left whitespace-nowrap tracking-wider"
            style={{ flex: '0 0 25%', borderBottom: '1px solid' }}
          >
            Top Artists
          </p>

          <ul className="ml-auto flex flex-wrap justify-end py-4 text-right">
            {data.ARTISTS?.map((artist) => (
              <li
                key={artist.id}
                className="flex ml-8 mb-4"
                style={{ alignItems: 'center' }}
              >
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="rounded-full mr-2 h-8 w-8"
                />
                <a href={artist.uri} target="_new" className="font-bold">
                  {artist.name}
                </a>
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
