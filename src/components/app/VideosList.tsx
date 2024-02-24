import { Video } from "@/types";
import VideoCard from "./VideoCard";
interface Props {
  videos: Array<Video>;
}
const VideosList = ({ videos }: Props) => {
  return (
    <>
      <h1 className="text-white mb-3 text-4xl font-bold tracking-wider">
        More videos
      </h1>
      <div className="w-full overflow-y-scroll space-y-8 md:px-6">
        {videos.map((video: Video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            video={video.video}
            description={video.description}
          />
        ))}
      </div>
    </>
  );
};

export default VideosList;
