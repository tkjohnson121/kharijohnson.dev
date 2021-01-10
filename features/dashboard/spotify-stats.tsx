import { SpotifyArtist, SpotifyTrack, SpotifyTypes } from 'pages/api/spotify';
import React from 'react';
import List from '../../common/list';

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

  return (
    <>
      <List
        title="Top Tracks"
        values={data?.TRACKS}
        renderValue={(track: SpotifyTrack) => (
          <li key={track.id} className="flex mr-4 mb-4 items-center">
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
        )}
      />

      <List
        title="Top Artists"
        values={data?.ARTISTS}
        renderValue={(artist: SpotifyArtist) => (
          <li key={artist.id} className="flex mr-4 mb-4 items-center">
            <img
              src={artist.images[0].url}
              alt={artist.name}
              className="rounded-full mr-2 h-8 w-8"
            />
            <a href={artist.uri} target="_new" className="font-bold">
              {artist.name}
            </a>
          </li>
        )}
      />
    </>
  );
};
