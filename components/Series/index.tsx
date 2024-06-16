import { SeriesResult } from "@/types";
import { Card, CardBody, Image as NextUIImage } from "@nextui-org/react";
import { format } from "date-fns";
import { filter } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SeriesDetailsProps = {
  series: SeriesResult;
};

const SeriesDetails = ({ series }: SeriesDetailsProps) => {
  const baseImageURL = "https://image.tmdb.org/t/p/original";
  const [isFav, setIsFav] = useState(false);
  const checkIfInFav = () => {
    const fav = localStorage.getItem("fav");
    if (fav) {
      const favSeriess = JSON.parse(fav);
      const check = filter(favSeriess, (row) => row.id == series.id);
      if (check.length > 0) {
        setIsFav(true);
      }
    } else {
      return false;
    }
  };

  const addToFav = () => {
    const fav = localStorage.getItem("fav");
    if (fav) {
      const favSeriess: SeriesResult[] = JSON.parse(fav);
      const check = filter(favSeriess, (row) => row.id == series.id);
      if (check.length > 0) {
        const seriess = filter(favSeriess, (row) => row.id != series.id);
        localStorage.setItem("fav", JSON.stringify(seriess));
        setIsFav(false);
      } else {
        favSeriess.push(series);
        localStorage.setItem("fav", JSON.stringify(favSeriess));
        setIsFav(true);
      }
    } else {
      const seriess = [series];
      localStorage.setItem("fav", JSON.stringify(seriess));
      setIsFav(true);
    }
  };

  useEffect(() => {
    checkIfInFav();
  }, []);

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
