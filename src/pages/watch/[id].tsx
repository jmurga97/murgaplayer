import VideoPlayer from "@/components/app/VideoPlayer";
import Layout from "@/components/containers/Layout";
import { Video } from "@/types";
import { trpc } from "@/utils/trpc";
import { helpers } from "@/server/helpers";
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import VideosList from "@/components/app/VideosList";

export default function Watch(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    const { id } = props;
    const { data: allVideos } = trpc.getAllVideos.useQuery();
    const { data: video, isError } = trpc.getVideo.useQuery({ id });
    const filteredVideos = allVideos?.filter((video:Video) => video.id !== id)
    const router = useRouter()

    return (
        <Layout
            title={`Murgaplayer - Watching video`}
            description="Watching video Page"
        >
            <div className="flex flex-col md:flex-row justify-between items-start">
                <main className="mb-12 flex-3 md:px-12">
                    {video && <VideoPlayer {...video as Video} key={router.asPath}/>}
                    {isError && <h2 className="text-white text-xl font-thin flex-3">No se ha encontrado el video X.x</h2> }
                </main>
                <aside className="flex flex-col h-[620px] gap-8">
                    {filteredVideos && <VideosList videos={filteredVideos}/>}
                </aside>
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { getAllVideosFromFirebase } = await import("@/firebase/api");
    const videos = await getAllVideosFromFirebase();
    return {
        paths: videos.map((vid) => ({
            params: {
                id: vid.id,
            },
        })),
        // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
        fallback: "blocking",
    };
};

export const getStaticProps = async (
    ctx: GetStaticPropsContext<{ id: string }>
) => {
    const id = ctx.params?.id as string;
    await helpers.getAllVideos.prefetch();
    if (id) {
        await helpers.getVideo.prefetch({ id });
    }

    return {
        props: {
            // very important - use `trpcState` as the key
            trpcState: helpers.dehydrate(),
            id,
        },
        revalidate: 1,
    };
};
