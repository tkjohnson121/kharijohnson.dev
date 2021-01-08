import { Layout } from '../common';

const IndexPage = () => {
  return (
    <Layout
      seo={{
        title: 'Dashboard',
        description:
          'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like Unsplash, YouTube, GitHub, and more. Want to build your own? Check out Lee’s Blog Series.',
      }}
    ></Layout>
  );
};

export default IndexPage;
