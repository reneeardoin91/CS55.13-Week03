// `pages/_app.js`
// Load styles that should apply to every page in the application.
import '../styles/global.css';
 
// Wrap each page so Next.js can provide its route-specific props.
export default function App({ Component, pageProps }) {
  // Render the active page component with the props collected by Next.js.
  return <Component {...pageProps} />;
}