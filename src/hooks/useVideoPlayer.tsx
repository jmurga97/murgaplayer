import { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";

interface Props {
    id: string,
    playcount: number,
    uid: any
}

const useVideoPlayer = ({ id, playcount, uid }: Props) => {
    const [play, setPlay] = useState(false);
    const [playcountClient, setPlaycountClient] = useState(playcount)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);
    const mutation = trpc.incrementPlaycount.useMutation()
    //Tracking de cuando el video finaliza.
    //Si finaliza, reiniciamos el estado de play e incrementamos el playCount una unidad
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleVideoEnded = async () => {
                setPlay(false);
                if (uid) {
                    setPlaycountClient(prevState => prevState + 1)
                    mutation.mutate({ id })

                    //Optimistic update in case of error
                    if (mutation.isError) {
                        setPlaycountClient(prev => prev - 1)
                    }
                }
            };
            videoElement.addEventListener("ended", handleVideoEnded);
            return () => {
                videoElement.removeEventListener("ended", handleVideoEnded);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleLoadedData = () => {
        setLoading(false);
    };

    const handleError = () => {
        setError("Oops... algo ha pasado X_X. Mira otro video mientras.");
    };


    return {
        play,
        playcountClient,
        loading,
        error,
        videoRef,
        handleLoadedData,
        handleError,
        setPlay
    };
};

export default useVideoPlayer;