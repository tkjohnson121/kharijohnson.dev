import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export enum StripeTypes {
  REVENUE = 'REVENUE',
  PRODUCTS = 'PRODUCTS',
}

export enum StripeEndpoints {
  BASE = 'https://api.stripe.com/v1',
  REVENUE = 'https://api.stripe.com/v1/balance_transactions',
  PRODUCTS = 'https://api.stripe.com/v1/products',
}

export type StripeResponse<T = []> = {
  object: 'list' | 'product';
  data: T;
  has_more: boolean;
  url: string;
};

export type StripeData = {
  revenue?: number;
  products?: Array<StripeProduct>;
};
export type StripeError = { error: Error & { status?: number } };

/** @see https://stripe.com/docs/api/balance_transactions/object?lang=curl */
export type StripeTransaction = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  fee: number;
  fee_details: string[];
  net: string;
  source: unknown;
  status: string;
  type: string;
};

/** @see https://stripe.com/docs/api/products/object?lang=curl */
export type StripeProduct = {
  id: string;
  active: boolean;
  description: string;
  metadata: string;
  name: string;
  object: 'product';
  attributes: string[];
  caption: string;
  created: string;
  deactivate_on: string[];
  images: string[];
  livemode: boolean;
  package_dimensions: string;
  shippable: boolean;
  statement_descriptor: string;
  unit_label: string;
  updated: string;
  url: string;
};

/**
 * # Stripe Stats
 *
 * @return { data }
 * @return { errors }
 */
export const stripe = async (_: NextApiRequest, res: NextApiResponse) => {
  const { type } = _.query;
  const { STRIPE_API_KEY: api_key } = process.env;

  const setCache = () =>
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600',
    );

  try {
    const headers = {
      Authorization: `Bearer ${api_key}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let data: StripeData | StripeError | null = null;

    switch (type) {
      case StripeTypes.REVENUE: {
        const result = await fetch(StripeEndpoints[type], { headers });
        if (!result.ok) {
          data = (await result.json()) as StripeError;
          break;
        }

        const transactions = (await result.json()) as StripeResponse<
          Array<StripeTransaction>
        >;

        const revenue =
          transactions.data.length > 0
            ? transactions.data
                .filter(
                  (transaction) =>
                    transaction.type === 'charge' ||
                    transaction.type === 'payment',
                )
                .reduce((prev, curr) => prev + +curr.net, 0) / 100
            : 0;

        data = { revenue };
        break;
      }
      case StripeTypes.PRODUCTS: {
        const result = await fetch(StripeEndpoints[type], { headers });
        if (!result.ok) {
          data = (await result.json()) as StripeError;
          break;
        }

        const { data: products } = (await result.json()) as StripeResponse<
          Array<StripeProduct>
        >;

        data = {
          products: products.filter((product) => product.active === true),
        };

        break;
      }
      default: {
        return res
          .status(500)
          .json({ error: { message: 'Invalid Stripe Type' } });
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

export default stripe;
