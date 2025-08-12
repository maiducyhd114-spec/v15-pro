// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
