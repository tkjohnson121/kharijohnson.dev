import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export enum TwitterTypes {
  FOLLOWERS = 'FOLLOWERS',
}

export enum TwitterEndpoints {
  BASE = 'https://api.twitter.com/2',
  FOLLOWERS = ' https://api.twitter.com/1.1/users/show.json?screen_name=tkjohnson121',
}

export type TwitterResponse = {
  users?: Array<TwitterUser>;
  next_cursor: number;
  next_cursor_str: string;
  previous_cursor: number;
  previous_cursor_str: string;
};

export type TwitterData = {
  followers?: number;
};
export type TwitterError = { code: number; message: string };

/** @see https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-show  */
export type TwitterUser = {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  profile_location: string | null;
  derived: {
    locations: Array<{
      country: string;
      country_code: string;
      locality: string;
    }>;
  };
  url: string;
  description: string;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  profile_banner_url: string;
  profile_image_url_https: string;
  default_profile: boolean;
  default_profile_image: boolean;
  withheld_in_countries: string[];
  withheld_scope: string;
  status: {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;

    source: string;

    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive: boolean;
    lang: string;
  };
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string | null;
  profile_background_image_url_https: string | null;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  following: string | null;
  follow_request_sent: string | null;
  notifications: string | null;
  translator_type: string;
};

/**
 * # Twitter Stats
 *
 * @return { data }
 * @return { errors }
 */
export const twitter = async (_: NextApiRequest, res: NextApiResponse) => {
  const { type } = _.query;
  const { TWITTER_API_BEARER: api_bearer } = process.env;

  const setCache = () =>
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600',
    );

  try {
    const headers = {
      Authorization: `Bearer ${api_bearer}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let data: TwitterData | { error: TwitterError } | null = null;

    switch (type) {
      case TwitterTypes.FOLLOWERS: {
        const result = await fetch(TwitterEndpoints[type], {
          headers,
        });

        if (!result.ok) {
          const { errors } = await result.json();
          const error = errors[0] as TwitterError;
          data = { error };
          break;
        }

        const user = (await result.json()) as TwitterUser;

        console.log({ user });

        data = { followers: user.followers_count };
        break;
      }
      default: {
        return res
          .status(500)
          .json({ error: { message: 'Invalid Twitter Type' } });
      }
    }

    if (data && 'error' in data && data?.error) {
      return res.status(500).json({ error: data.error });
    }

    setCache();
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export default twitter;
