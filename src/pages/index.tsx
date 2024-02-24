import VideoCard from "@/components/app/VideoCard";
import Layout from "@/components/containers/Layout";
import { Video } from "@/types";
import { trpc } from "@/utils/trpc";
import { HomeLoader } from "@/components/app/Loader";

export default function Home() {
  const { data, isLoading, isError, error } = trpc.getAllVideos.useQuery();

  return (
    <Layout title="Home - All Videos" description="All videos of MurgaPlayer">
      {isLoading ? (
        isError ? <p className="text-white">{error}</p> : <HomeLoader />
      ) : (
        <>
          <h1 className="text-rose-600 mb-12 text-4xl font-bold tracking-wider">
            All videos
          </h1>
          <main className="flex flex-row flex-wrap gap-12 items-center justify-center">
            {Array.isArray(data) &&
              data.map((video: Video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  video={video.video}
                  description={video.description}
                />
              ))}
          </main>
        </>
      )}
    </Layout>
  );
}
