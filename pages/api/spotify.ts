import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';

export enum SpotifyTypes {
  CURRENT = 'CURRENT',
  TRACKS = 'TRACKS',
  ARTISTS = 'ARTISTS',
}

export enum SpotifyEndpoints {
  BASE = 'https://api.spotify.com/v1',
  TOKEN = `https://accounts.spotify.com/api/token`,
  CURRENT = `https://api.spotify.com/v1/me/player/currently-playing`,
  TRACKS = `https://api.spotify.com/v1/me/top/tracks?limit=5`,
  ARTISTS = `https://api.spotify.com/v1/me/top/artists?limit=5`,
}

export type SpotifyResponse<T = {}> = {
  items: Array<T>;
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: null | string;
  next: string | null;
};

export type SpotifyArtistResponse = SpotifyResponse<SpotifyArtist[]>;
export type SpotifyTrackResponse = SpotifyResponse<SpotifyTrack[]>;

export type SpotifyAlbum = {
  album_type: string;
  artists: Array<{
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Array<{
    height: number;
    width: number;
    url: string;
  }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  followers: { href: null | string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: Array<{
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: true;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: false;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

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

  const setCache = () =>
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600',
    );

  const getAccessToken = async () => {
    const response = await fetch(SpotifyEndpoints.TOKEN, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    return response.json();
  };

  try {
    const { access_token } = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let data: any;

    switch (type) {
      case SpotifyTypes.CURRENT: {
        const result = await fetch(SpotifyEndpoints[type], { headers });
        data = await result.json();
        break;
      }
      case SpotifyTypes.TRACKS: {
        const result = await fetch(SpotifyEndpoints[type], { headers });
        const tracks = (await result.json()) as SpotifyTrackResponse;
        data = tracks.items;
        break;
      }
      case SpotifyTypes.ARTISTS: {
        const result = await fetch(SpotifyEndpoints[type], { headers });
        const artists = (await result.json()) as SpotifyArtistResponse;
        data = artists.items;
        break;
      }
      default: {
        return res
          .status(500)
          .json({ error: { message: 'Invalid Spotify Type' } });
      }
    }

    if (data.error) {
      return res.status(data.error.status || 500).json({ error: data.error });
    }

    setCache();
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(error?.status || 500).json({ error });
  }
};

export default spotify;
