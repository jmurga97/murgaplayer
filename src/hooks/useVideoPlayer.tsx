/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
interface Props {
    id: string,
    playcount: number,
}

const useVideoPlayer = ({ id, playcount }: Props) => {
    const [user] = useAuthState(auth)
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
                //Verifico si el usuario está logeado para permitir el incremento en el playcount
                if (user?.uid) {
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
    }, [id,user]);

    useEffect(() => {
        //Para asegurarnos que el estado se mantiene actualizado entre páginas si el dato playcount desde el servidor cambia
        setPlaycountClient(playcount)
    },[playcount])

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