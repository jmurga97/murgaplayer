import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '@/server/routers/_app';
import superjson from 'superjson';

// Función para obtener la URL base
function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return '';
    }
    // reference for vercel.com
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // // reference for render.com
    if (process.env.RENDER_INTERNAL_HOSTNAME) {
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    }

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    transformer: superjson,
    config() {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/v11/ssr
         */
        return {
            /**
             * @link https://trpc.io/docs/v11/client/links
             */
            links: [
                // logeo en desarrollo
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' && opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    /**
                     * @link https://trpc.io/docs/v11/data-transformers
                     */
                    transformer: superjson,
                }),
            ],
        };
    },
    ssr: false,
});