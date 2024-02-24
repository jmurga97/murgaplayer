import { Skeleton } from "@/components/ui/skeleton"

export const PlayerLoader = () => (
    <div className="flex flex-col gap-3">
        <Skeleton className="h-[250px] w-[400px] bg-gray-700" />
        <div className="flex flex-row w-[400px] justify-between items-center">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
            <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
        </div>
    </div>
)

export const HomeLoader = () => (
    <div className="flex flex-wrap items-center justify-center h-[75dvh] w-full gap-12">
        <Skeleton className="h-24 w-48 rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48  rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48  rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48  rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48 rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48  rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48  rounded-lg bg-gray-700" />
        <Skeleton className="h-24 w-48  rounded-lg bg-gray-700" />
    </div>
)