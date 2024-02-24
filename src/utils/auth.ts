import { auth, provider, } from "@/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";

export const loginWithGithub = async (toast: any) => {
    try {
        const { user } = await signInWithPopup(auth, provider)
        toast({
            title: 'Welcome :)',
            description: user.displayName
        })
    } catch (error: any) {
        const { message } = error
        toast({
            title: 'Something happened...',
            description: message,
            variant: "destructive"
        })
    }
}

export const onLogout = async (toast: any) => {
    try {
        await signOut(auth)
        toast({
            description: 'See you later!'
        })
    } catch (error: any) {
        const { message } = error
        toast({
            title: 'Something happened...',
            description: message,
            variant: "destructive"
        })
    }
}