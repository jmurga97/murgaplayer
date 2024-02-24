import "@/styles/globals.css";
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { IBM_Plex_Mono } from 'next/font/google';
//Agregar trpc a next
//trpc.withTRPC(App)
const ibmPlex = IBM_Plex_Mono({
  weight: ['100', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})
const App: AppType = ({ Component, pageProps }) => {
  return (
    <main className={ibmPlex.className}>
      <Component {...pageProps} />
    </main>
  )
};

export default trpc.withTRPC(App);