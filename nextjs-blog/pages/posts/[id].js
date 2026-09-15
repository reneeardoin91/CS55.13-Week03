// Import the shared layout component.
import Layout from '../../components/layout';
// Import helpers for finding and loading posts.
import { getAllPostIds, getPostData } from '../../lib/posts';
// Import Next.js document head support.
import Head from 'next/head';
// Import the reusable date component.
import Date from '../../components/date';
// Import shared utility styles.
import utilStyles from '../../styles/utils.module.css';

// Render a post detail page.
export default function Post({ postData }) {
  // Return the shared layout and post content.
  return (
    <Layout>
      {/* Set the browser title from the post title. */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      {/* Group the post content semantically. */}
      <article>
        {/* Display the post title. */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {/* Display the post date. */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* Render the converted markdown content. */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// Generate static routes for all posts.
export async function getStaticPaths() {
  // Read every post route parameter.
  const paths = getAllPostIds();
  // Return the routes and disable runtime fallbacks.
  return {
    paths,
    fallback: false,
  };
}

// Load post data while generating a static route.
export async function getStaticProps({ params }) {
  // Read the post selected by the route id.
  const postData = await getPostData(params.id);
  // Pass the loaded post data to the page component.
  return {
    props: {
      postData,
    },
  };
}
