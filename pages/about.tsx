import Layout from 'common/layout';
import Link from 'next/link';

const AboutPage = () => (
  <Layout title="About | Khari Johnson | Contract Software Developer">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage;
