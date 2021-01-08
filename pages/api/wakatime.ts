import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export type WakatimeData = {
  best_day: {
    created_at: string;
    date: string;
    id: string;
    modified_at: null;
    text: string;
    total_seconds: number;
  };
  categories: Array<{
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  created_at: string;
  daily_average: number;
  daily_average_including_other_language: number;
  days_including_holidays: number;
  days_minus_holidays: number;
  dependencies: [];
  editors: Array<{
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  end: string;
  holidays: number;
  human_readable_daily_average: string;
  human_readable_daily_average_including_other_language: string;
  human_readable_total: string;
  human_readable_total_including_other_language: string;
  id: string;
  is_already_updating: boolean;
  is_coding_activity_visible: boolean;
  is_including_today: boolean;
  is_other_usage_visible: boolean;
  is_stuck: boolean;
  is_up_to_date: boolean;
  languages: Array<{
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  machines: Array<{
    digital: string;
    hours: number;
    machine: {
      created_at: string;
      id: string;
      ip: string;
      last_seen_at: string;
      name: string;
      value: string;
    };
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  modified_at: string;
  operating_systems: Array<{
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  percent_calculated: number;
  project: null;
  projects: Array<{
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  range: string;
  start: string;
  status: string;
  timeout: number;
  timezone: string;
  total_seconds: number;
  total_seconds_including_other_language: number;
  user_id: string;
  username: string;
  writes_only: boolean;
};

export enum WakatimeErrors {
  Ok = 'Ok',
  Created = 'Created',
  Accepted = 'Accepted',
  'Bad Request' = 'Bad Request',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  'Not Found' = 'Not Found',
  'Too Many Resuests' = 'Too Many Resuests',
  'Server Error' = 'Server Error',
}

/**
 * # Wakatime Stats
 * Fetches a list of account stats within the last 30 days.
 *
 * @see https://wakatime.com/developers
 * @see https://wakatime.com/developers#stats
 *
 * @return { stats }: {stats: WakatimeStats}
 * @return { errors }: {errors: WakatimeErrors[]} -  Array of auth codes from Wakatime
 */
export default async (_: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.WAKATIME_API_KEY || '';
  const url = `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`;
  const result = await fetch(url);
  const { data } = await result.json();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );

  return res.status(200).json({ data });
};
