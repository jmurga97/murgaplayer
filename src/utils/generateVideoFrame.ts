interface Props {
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
    ctx: CanvasRenderingContext2D | null

}
export const generateVideoFrame = ({ canvas, video, ctx }: Props) => {
    const scaleFactor = 0.2; // Factor de escala (ajustable según tus necesidades)
    canvas.width = video.videoWidth * scaleFactor;
    canvas.height = video.videoHeight * scaleFactor;
    video.currentTime = 1;
    // Agregar opciones de escalado para reducir el tamaño de la imagen generada
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.4)
}