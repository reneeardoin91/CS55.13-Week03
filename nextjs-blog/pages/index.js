// Import Next.js helpers, the shared page layout, and reusable styles.
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
 
// Render the site's home page.
export default function Home() {
  return (
    // Use the layout's home mode to show the larger profile header.
    <Layout home>
      {/* Set the browser tab title from the shared site configuration. */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* Introduce the site and link visitors to the Next.js tutorial. */}
      <section className={utilStyles.headingMd}>
        <p>Hello My Name is Renee! I am a student of Web Development at the Santa Rosa Junior College</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}