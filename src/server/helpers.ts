import { appRouter } from '@/server/routers/_app';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson'
// export API handler
// @link https://trpc.io/docs/v11/server/adapters

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: {},
  transformer: superjson
});
