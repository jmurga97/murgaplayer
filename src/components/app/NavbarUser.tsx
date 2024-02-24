import { User } from "firebase/auth";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Dropdown from "./Dropdown"
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { GrGithub } from "react-icons/gr";
import { loginWithGithub, onLogout } from "@/utils/auth";
import { NavLoader } from "./Loader";
import { useToast } from "@/components/ui/use-toast"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/firebase/config";


const NavbarUser = () => {
    const { toast } = useToast()
    const [user, loading] = useAuthState(auth)

    if (loading) {
        return <NavLoader />
    }
    return (
        user ? (
            <>
                <Avatar>
                    <AvatarImage src={user.photoURL || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Dropdown name={user.displayName} email={user.email}>
                    <DropdownMenuItem onClick={() => onLogout(toast)}>
                        Sign out
                    </DropdownMenuItem>
                </Dropdown>
            </>
        ) : (
            <Button onClick={() => loginWithGithub(toast)} variant='outline' className="bg-transparent shadow-md text-white hover:text-rose-600 duration-200">
                <div className="text-lg font-bold items-center gap-2 flex ">
                    <GrGithub /> <span>Log In</span>
                </div>
            </Button>
        )
    )
}

export default NavbarUser;