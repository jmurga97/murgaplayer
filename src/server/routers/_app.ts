import { z } from "zod";
import { procedure, router } from "../trpc";
import {
  incrementPlaycountFirebase,
  getAllVideosFromFirebase,
  getVideo,
} from "@/firebase/api";

export const appRouter = router({
  incrementPlaycount: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      await incrementPlaycountFirebase(opts.input.id)
      return {
        status: "ok",
      };
    }),
  getAllVideos: procedure.query(async () => {
    const videos = await getAllVideosFromFirebase();
    return videos;
  }),
  getVideo: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const video = await getVideo(opts.input.id);
      return video
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
