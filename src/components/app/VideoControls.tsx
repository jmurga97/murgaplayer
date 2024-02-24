import { IoIosPlay, IoIosPause, IoMdEye, IoMdHeart } from "react-icons/io";
import { ReactNode, RefObject } from "react";
interface VideoPlayerButton {
    icon: ReactNode;
    title: string;
    onClick: () => void;
}

const VideoPlayerButton = ({ icon, title, onClick }: VideoPlayerButton) => {
    return (
        <button
            className="text-6xl md:text-7xl uppercase text-white font-thin flex flex-row items-end tracking-wider"
            onClick={onClick}
        >
            {icon}
            <span className="mb-2 font-thin">{title}</span>
        </button>
    );
};

interface Props {
    play: boolean,
    setPlay: React.Dispatch<boolean>,
    videoRef: RefObject<HTMLVideoElement>,
    children: ReactNode
}

const VideoControls = ({ play, setPlay, videoRef, children }: Props) => {
    const playPause = () => {
        const videoPlayer = videoRef.current;
        if (videoPlayer) {
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
            setPlay(!play);
        }
    };
    return (
        <>
            <div className="flex flex-row justify-between mt-3">
                {play ? (
                    <VideoPlayerButton
                        icon={<IoIosPause size="5rem" />}
                        title="Pause"
                        onClick={playPause}
                    />
                ) : (
                    <VideoPlayerButton
                        icon={<IoIosPlay size="5rem" />}
                        title="Play"
                        onClick={playPause}
                    />
                )}
                <div className="flex flex-col justify-around">
                    {children}
                </div>
            </div>
        </>);
}

export default VideoControls;