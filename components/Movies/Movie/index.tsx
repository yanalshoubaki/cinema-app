import { MovieResult } from "@/types";
import { Card, CardBody, Image as NextUIImage } from "@nextui-org/react";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type MovieDetailsProps = {
  movie: MovieResult;
};

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const baseImageURL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="w-full flex-1 h-full">
      <Card className="overflow-visible h-full bg-transparent shadow-none rounded-none p-0">
        <CardBody>
          <div className="flex flex-col gap-4 items-start h-full">
            <div className="relative">
              <NextUIImage
                as={Image}
                src={baseImageURL + movie.poster_path}
                width={384}
                height={384}
                removeWrapper
              />
            </div>
            <div className="flex flex-col h-full justify-start gap-2">
              <div className="flex justify-between items-start pr-11">
                <h2 className="text-xl text-white font-bold">{movie.title}</h2>
              </div>
              <div>
                <time className="text-sm text-gray-200">
                  {format(movie.release_date, "yyyy")}
                </time>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default MovieDetails;
