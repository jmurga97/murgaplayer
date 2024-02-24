import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs'
import path from "path";

const CHUNK_SIZE_IN_BYTES = 1000000; // 1mb

function getVideoStream(req: NextApiRequest,
    res: NextApiResponse) {
    const range = req.headers.range

    if (!range) {
        return res.status(400).send("Range must be provided")
    }
    const videoId = req.query.videoId
    const videoPath = path.join(process.cwd(), 'public', 'videos', `${videoId}.mp4`)
    // Verificar si el archivo de video existe
    if (!fs.existsSync(videoPath)) {
        return res.status(404).send("Video not found");
    }

    const videoSizeInBytes = fs.statSync(videoPath).size;
    const chunkStart = Number(range?.replace(/\D/g, ""))
    const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, videoSizeInBytes - 1)
    const contentLength = chunkEnd - chunkStart + 1

    const headers = {
        "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(videoPath, {
        start: chunkStart,
        end: chunkEnd
    })
    videoStream.pipe(res)
}

const handler = (
    req: NextApiRequest,
    res: NextApiResponse) => {

    if (req.method === 'GET') {
        return getVideoStream(req, res)
    } else {
        res.status(400).json({ message: 'Bad Request' })
    }

}

export default handler