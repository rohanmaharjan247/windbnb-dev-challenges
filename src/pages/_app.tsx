import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Montserrat, Mulish } from 'next/font/google';
import type { AppProps } from 'next/app';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});
const muli = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --primary-font: ${montserrat.style.fontFamily};
            --secondary-font: ${muli.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
