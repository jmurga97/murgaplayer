import { generateVideoFrame } from "@/utils/generateVideoFrame";
import { useEffect, useState } from "react";


const usePreview = (url: string) => {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    const loadVideoData = () => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      video.src = url;
      video.onloadeddata = () => {
        const frame = generateVideoFrame({canvas,video,ctx})
        setCanvas(frame);
      }
    };
    loadVideoData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvas;
};

export default usePreview
