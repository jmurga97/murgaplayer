import { db } from "@/firebase/config";
import { updateDoc, doc, increment, collection, getDocs, getDoc } from "firebase/firestore";

type Data = {
    description: string,
    id: string,
    like: number,
    playcount: number,
    title: string,
    video: string
};

export const incrementPlaycountFirebase = async (id: string) => {
    try {
        const videoRef = doc(db, 'videos', id)
        await updateDoc(videoRef, {
            playcount: increment(1)
        })

    } catch (e: any) {
        throw new Error(e)
    }
}
export const getVideo = async (id:string) => {
    try{
        const videoRef = doc(db,'videos',id)
        const videoDoc = await getDoc(videoRef)
        return videoDoc.data()
    }catch(e:any){
        throw new Error(e)
    }
}

export const getAllVideosFromFirebase = async () => {
    try {
        const videosRef = collection(db, 'videos')
        const videosSnapshot = await getDocs(videosRef)
        const videoData = videosSnapshot.docs.map((doc) => doc.data()) as Array<Data>
        return videoData
    } catch (e: any) {
        throw new Error(e)
    }
}
