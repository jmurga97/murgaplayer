import VideoControls from "./VideoControls";
import { PlayerLoader } from "./Loader";
import { IoMdEye, IoMdHeart } from "react-icons/io";
import useVideoPlayer from "@/hooks/useVideoPlayer";

interface Props {
  description: string;
  video: string | null;
  playcount: number;
  like: number;
  title: string;
  id: string;
}

const VideoPlayer = ({
  video,
  description,
  playcount,
  title,
  like,
  id,
}: Props) => {
  const {
    play,
    playcountClient,
    loading,
    error,
    videoRef,
    handleLoadedData,
    handleError,
    setPlay
  } = useVideoPlayer({ id, playcount });

  return (
    <div className={`w-full`}>
      <h1 className="text-rose-600 mb-1 text-4xl font-bold tracking-wider">
        {title}
      </h1>
      <p className="text-md font-thin text-slate-300 mb-3">{description}</p>
      <video
        className={`rounded-lg shadow-slate-300 shadow w-full h-auto ${loading ? "hidden" : null}`}
        ref={videoRef}
        onLoadedData={handleLoadedData}
        onError={handleError}
      >
        <source src={`/api/getStreamingVideo?videoId=${video}`} type="video/mp4" />
      </video>
      {!loading ? (
        <VideoControls
          play={play}
          setPlay={setPlay}
          videoRef={videoRef}
        >
          <p className="text-lg text-white font-medium tracking-wider text-right flex flex-row flex-nowrap items-center gap-5">
            <IoMdEye className="text-slate-300" size="1.5rem" />{" "}
            <span>{playcountClient}</span>
          </p>
          <p className="text-lg text-white font-medium tracking-wider text-right flex flex-row flex-nowrap items-center gap-5">
            <IoMdHeart className="text-slate-300" size="1.5rem" />{" "}
            <span>{like}</span>
          </p>
        </VideoControls>
      ) : error ? <h2 className="text-white text-xl font-thin">{error}</h2> : <PlayerLoader />
      }
    </div>
  );
};

export default VideoPlayer;
