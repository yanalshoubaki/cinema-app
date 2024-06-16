import React from "react";
import { useState, useEffect } from "react";
import { filter } from "lodash";
import { MovieResult } from "@/types";
import { Card, CardBody, Image as NextUIImage } from "@nextui-org/react";
import Image from "next/image";
import { format } from "date-fns";

type MovieDetailsProps = {
  movie: MovieResult;
};

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const baseImageURL = "https://image.tmdb.org/t/p/original";
  const [isFav, setIsFav] = useState(false);
  const checkIfInFav = () => {
    const fav = localStorage.getItem("fav");
    if (fav) {
      const favMovies = JSON.parse(fav);
      const check = filter(favMovies, (row) => row.id == movie.id);
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
      const favMovies: MovieResult[] = JSON.parse(fav);
      const check = filter(favMovies, (row) => row.id == movie.id);
      if (check.length > 0) {
        const movies = filter(favMovies, (row) => row.id != movie.id);
        localStorage.setItem("fav", JSON.stringify(movies));
        setIsFav(false);
      } else {
        favMovies.push(movie);
        localStorage.setItem("fav", JSON.stringify(favMovies));
        setIsFav(true);
      }
    } else {
      const movies = [movie];
      localStorage.setItem("fav", JSON.stringify(movies));
      setIsFav(true);
    }
  };

  useEffect(() => {
    checkIfInFav();
  }, []);

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
