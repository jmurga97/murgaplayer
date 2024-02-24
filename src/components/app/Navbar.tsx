import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
    return (
        <nav className="bg-neutral-800 shadow-2xl w-full sticky top-0 z-10 flex flex-row flex-nowrap justify-between py-4 px-8">
            <div className="">
                <Link href='/'>
                    <Button className="bg-neutral-900 shadow-md hover:text-rose-600 duration-200">
                        <div className="text-lg font-bold items-center gap-2 flex ">
                            <IoMdHome /> <span>Home</span>
                        </div>
                    </Button>
                </Link>
            </div>
            <div className="flex gap-4 items-center pr-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg text-white">Juan</p>
            </div>
        </nav>

    );
}

export default Navbar;