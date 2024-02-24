import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import usePreview from "@/hooks/usePreview";
import { IoIosPlay } from "react-icons/io";
interface Props {
  title: string;
  video: string;
  id: string;
  description:string,
}

const blurData = "data:image/jpeg;base64,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ek+1+9IDeNz7003PvWH9s96abz3pAbhufemm596wzd+9MN370gNtrn3qNrn3rGN371G1370gNh7n3qF7n3rIa796he796QGs9z71Wkufest7v3qvJd+9IRpyXHvVSW496zpLv3qnLd+9AGhNce9UZrn3qhNd+9UZ7z3oAuz3PXms24uevNU7i8681l3V715qkK5cubrrzWPd3gAPNUr3UAAfmrmNU1lVyFOTVxRLkaepakqAksK5LUdRadiFOFqpdXUlwxLHj0qCtOdR2BJvcCc0UUVm23qywooopAFFFFABRRRQAUUUUASxTyRHKMa0rXWHTAesiiplBMpTaOuttZQ4+atOHVFP8VefAkdDUiTyJ0Y1jKi+jNFOL3PSY9SX+9VhdRX+9XmyahMv8RqZdWmHes3SqIpcj6no41Bf71H9oL6156NZkpf7ZkqeSr2C0e59Xfbfej7b71zv2v3o+1e9egZHRfbPej7Z71zn2r3o+1+9AWOiN57003nvXPG7PrQbr3qRWOgN570w3nvWAbv3ppuvekBvG896Y1571gtde9Rtde9SButee9Qvee9Yb3R9aie696lsRtPee9V5Lz3rGe696rSXfvSuI2JLz3qpLee9ZEt571RmvOvNLmEa81771n3F971kXF9jPNY97qYUHmlzpEt2Nq61AAH5qwdQ1hUB+asG/wBVZiQprHlleQ5Y5rSN2SryNC+1WSckIcCsxiWOScmiitC1FIKKKKCgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD6N8w0eYaKKs0DzDR5hoopABkNN8w0UVLEIZDTTIaKKlgMaQ1G0hooqWIjaQ1C8hooqGIrySGqskhooqWIpzSmqFxMaKKzkxMx7y4YA81z99cMc80UUUVd3Zi9ZJGaTk5NFFFdpuFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q=="

const VideoCard = ({ title, video = "", id, description}: Props) => {
  const canvas = usePreview(`/videos/${video}.mp4`);

  return (
    <Card className="w-full md:w-[420px] h-[200px] bg-transparent shadow-slate-300 shadow-md flex flex-row flex-nowrap">
      <CardHeader className="py-4 px-3 w-1/4">
        <CardTitle className="text-white font-bold text-lg">{title}</CardTitle>
        <CardDescription className="text-sm font-thin text-slate-300 truncate ">{description}</CardDescription>
      </CardHeader>
      <div className="relative w-3/4">
        <CardContent className="p-0 rounded-lg overflow-hidden relative h-full">
          {canvas ? (
            <Image
              className="rounded-r-xl hover:scale-105 hover:grayscale duration-500"
              src={canvas}
              alt="PRUEBA"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <Image src={blurData} alt='PlaceHolder' fill/>
          )}
        </CardContent>
        <CardFooter className="p-0 absolute bottom-3 right-3">
          <Link href={`/watch/${id}`}>
            <Button className="bg-white text-black font-medium tracking-wider uppercase shadow-xl hover:bg-slate-300">
              <IoIosPlay size="1.25rem" />
              <span className="ml-1">Watch</span>
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default VideoCard;
