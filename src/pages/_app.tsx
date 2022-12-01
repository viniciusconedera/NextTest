import type { AppProps } from 'next/app';
import ProgressBar from 'nextjs-progressbar';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  )
}
