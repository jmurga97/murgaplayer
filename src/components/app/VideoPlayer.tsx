import VideoControls from "./VideoControls";
import { PlayerLoader } from "./Loader";
import { IoMdEye, IoMdHeart } from "react-icons/io";
import useVideoPlayer from "@/hooks/useVideoPlayer";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  description: string;
  video: string | null;
  playcount: number;
  like: number;
  title: string;
  id: string;
}

const VideoMetrics = ({ icon, value }: { icon: React.ReactNode, value: number }) => (
  <p className="text-lg text-white font-medium tracking-wider text-right flex flex-row flex-nowrap items-center gap-5">
    {icon}
    <span>{value}</span>
  </p>
)

const VideoPlayer = ({
  video,
  description,
  playcount,
  title,
  like,
  id,
}: Props) => {
  const [user] = useAuthState(auth)
  const uid = user ? user.uid : null
  const {
    play,
    playcountClient,
    loading,
    error,
    videoRef,
    handleLoadedData,
    handleError,
    setPlay
  } = useVideoPlayer({ id, playcount, uid });

  const isError = error ? <h2 className="text-white text-xl font-thin">{error}</h2> : <PlayerLoader />

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
          <VideoMetrics icon={<IoMdEye className="text-slate-300 text-2xl"  />} value={playcountClient} />
          {/* Por razones de tiempo no implementé la funcionalidad de like, pues requerirá que esté loggeado, crear la mutacion, verificar
              que el usuario que haya dado like anteriormente si lo vuelve a presionar lo reste, etc.
            <VideoMetrics icon={<IoMdHeart className="text-slate-300 text-2xl" />} value={like} />
          */}
        </VideoControls>
      ) : isError
      }
    </div>
  );
};

export default VideoPlayer;
