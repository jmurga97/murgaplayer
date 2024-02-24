import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';
import { createServerSideHelpers } from '@trpc/react-query/server';
// export API handler
// @link https://trpc.io/docs/v11/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: ({req,res}) => {
    return {
      req,
      res
    }
  },
  onError({error}) {
    console.error('Something went wrong:', error);
  }
});
