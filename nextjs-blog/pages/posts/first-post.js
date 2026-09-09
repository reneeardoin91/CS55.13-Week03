// Import the page tools used for metadata, navigation, and the external SDK.
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Layout from '../../components/layout';
 
// Render the first blog post page.
export default function FirstPost() {
  return (
    <>
      {/* Set a page-specific title for the browser tab. */}
      <Head>
        <title>First Post</title>
      </Head>
      {/* Load Facebook's SDK after the page becomes idle. */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        // Confirm that the SDK finished loading in the browser.
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      {/* Provide the post heading and a link back to the home page. */}
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </>
  );
}