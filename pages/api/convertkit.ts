import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export enum ConvertkitTypes {
  SUBSCRIBERS = 'SUBSCRIBERS',
}

export enum ConvertkitEndpoints {
  BASE = 'https://api.convertkit.com/v1',
  SUBSCRIBERS = 'https://api.convertkit.com/v3/subscribers?api_secret=',
}

export type ConvertkitData = {
  subscribers?: number;
};
export type ConvertkitError = { error: Error & { status?: number } };

export type ConvertkitSubscriptions = {
  total_subscribers: number;
  page: number;
  total_pages: number;
  subscribers: Array<{
    id: number;
    first_name: string | null;
    email_address: string;
    state: string;
    created_at: string;
    fields: { [key: string]: any };
  }>;
};

/**
 * # Convertkit Stats
 *
 * @return { data }
 * @return { errors }
 */
export const convertkit = async (_: NextApiRequest, res: NextApiResponse) => {
  const { type } = _.query;
  const { CONVERTKIT_API_SECRET: api_key } = process.env;

  const setCache = () =>
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600',
    );

  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let data: ConvertkitData | ConvertkitError | null = null;

    switch (type) {
      case ConvertkitTypes.SUBSCRIBERS: {
        const result = await fetch(ConvertkitEndpoints[type] + api_key, {
          headers,
        });

        if (!result.ok) {
          data = (await result.json()) as ConvertkitError;
          break;
        }

        const sub = (await result.json()) as ConvertkitSubscriptions;

        data = { subscribers: sub.total_subscribers };
        break;
      }
      default: {
        return res
          .status(500)
          .json({ error: { message: 'Invalid Convertkit Type' } });
      }
    }

    if (data && 'error' in data && data?.error) {
      return res.status(data.error.status || 500).json({ error: data.error });
    }

    setCache();
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(error?.status || 500).json({ error });
  }
};

export default convertkit;
