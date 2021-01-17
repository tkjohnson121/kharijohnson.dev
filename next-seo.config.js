export const url = 'https://kharijohnson.dev';
export const description =
  'Always thinking, building, and testing ideas. Sharing the progress as we go.';
export const title = 'Dashboard';

export const SEO = {
  title,
  description,

  twitter: {
    handle: '@tkjohnson121',
    site: '@gvempire_dev',
    cardType: 'summary_image_large',
  },
  openGraph: {
    url,
    title,
    description,
    images: [
      {
        url: url + '/assets/logo.png',
        width: 800,
        height: 600,
      },
    ],
    site_name: 'Playground X',
  },
};
