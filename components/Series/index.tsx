import { SeriesResult } from "@/types";
import { Card, CardBody, Image as NextUIImage } from "@nextui-org/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type SeriesDetailsProps = {
  series: SeriesResult;
};

const SeriesDetails = ({ series }: SeriesDetailsProps) => {
  const baseImageURL = "https://image.tmdb.org/t/p/original";
  return (
    <Link href={`/series/${series.id}`} className="w-full flex-1 h-full">
      <Card className="overflow-visible h-full bg-transparent shadow-none rounded-none p-0">
        <CardBody>
          <div className="flex flex-col gap-4 items-start h-full">
            <div className="relative">
              <NextUIImage
                as={Image}
                src={baseImageURL + series.poster_path}
                width={300}
                height={300}
                removeWrapper
                loading="lazy"
              />
            </div>
            <div className="flex flex-col h-full justify-start gap-2">
              <div className="flex justify-between items-start pr-11">
                <h2 className="text-xl text-white font-bold">{series.name}</h2>
              </div>
              <div>
                <time className="text-sm text-gray-200">
                  {format(series.first_air_date, "yyyy")}
                </time>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
export default SeriesDetails;
