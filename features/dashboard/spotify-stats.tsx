import { SpotifyArtist, SpotifyTrack, SpotifyTypes } from 'pages/api/spotify';
import React from 'react';

export const SpotifyStats = () => {
  const [{ status, data, error }, setState] = React.useState<{
    status: 'idle' | 'pending' | 'fulfilled' | 'error';
    data?: {
      TRACKS?: Array<SpotifyTrack>;
      ARTISTS?: Array<SpotifyArtist>;
    };
    error?: Error;
  }>({
    status: 'idle',
  });

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

  console.log({ data });

  return data ? (
    <>
      <ul>
        <li className="text-3xl mt-4">Spotify</li>
        <li>
          <p className="text-xl mt-4">Top Tracks</p>
          <ul>
            {data.TRACKS?.map((track) => (
              <li key={track.external_ids.isrc}>
                <img
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  height="200"
                  width="200"
                />
                <a href={track.href} target="_new">
                  {track.name}
                </a>
                <a href={track.uri} target="_new">
                  &gt;
                </a>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <p className="text-xl mt-4">Top Artists</p>
          <ul>
            {data.ARTISTS?.map((artist) => (
              <li key={artist.id}>
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  height="200"
                  width="200"
                />
                <a href={artist.external_urls.spotify} target="_new">
                  {artist.name}
                </a>
                <a href={artist.uri}>&gt;</a>
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
