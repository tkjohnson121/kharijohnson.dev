import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export enum SpotifyTypes {
  CURRENT = 'CURRENT',
  RECENT = 'RECENT',
}

/**
 * # Spotify Stats
 *
 * @return { data }
 * @return { errors }
 */
export const spotify = async (_: NextApiRequest, res: NextApiResponse) => {
  const { type } = _.query;
  const {
    SPOTIFY_CLIENT_ID: client_id,
    SPOTIFY_CLIENT_SECRET: client_secret,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  } = process.env;
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
  const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  const setCache = () =>
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600',
    );

  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    return response.json();
  };

  const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const getTopTracks = async () => {
    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  try {
    switch (type) {
      case SpotifyTypes.CURRENT: {
        const currentlyPlayingResult = await getNowPlaying();
        const currentlyPlaying = await currentlyPlayingResult.json();

        if (currentlyPlaying.error) {
          return res
            .status(currentlyPlaying.error.status || 500)
            .json({ error: currentlyPlaying.error });
        }

        setCache();
        return res.status(200).json({ data: { currentlyPlaying } });
      }
      case SpotifyTypes.RECENT: {
        const recentlyPlayedResult = await getTopTracks();

        const recentlyPlayed = await recentlyPlayedResult.json();

        if (recentlyPlayed.error) {
          return res
            .status(recentlyPlayed.error.status || 500)
            .json({ error: recentlyPlayed.error });
        }

        setCache();
        return res.status(200).json({ data: { recentlyPlayed } });
      }
      default: {
        return res
          .status(500)
          .json({ error: { message: 'Invalid Spotify Type' } });
      }
    }
  } catch (error) {
    return res.status(error.status || 500).json({ error });
  }
};

export default spotify;
