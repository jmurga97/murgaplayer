import Head from "next/head"
import { ReactNode } from "react";
import Navbar from "../app/Navbar";
import Footer from "../app/Footer";
interface Props {
    title: string,
    description: string,
    children: ReactNode
}
const Layout = ({ title, description, children }: Props) => {
    return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar/>
        <main className="p-12 md:px-20 md:py-8 bg-neutral-900 w-full">
            {children}
        </main>
        <Footer/>
    </>);
}

export default Layout;