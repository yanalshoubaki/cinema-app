import { MovieResult } from "@/types";
import { Image } from "@nextui-org/react";
import React from "react";
import NextImage from "next/image";
type SliderMovieDetailsProps = {
  movie: MovieResult;
};

const SliderMovieDetails = ({ movie }: SliderMovieDetailsProps) => {
  const backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  return (
    <div className="relative h-full">
      <div className="relative h-full">
        <Image
          as={NextImage}
          removeWrapper
          src={backdropPath}
          alt={movie.title}
          classNames={{
            img: "rounded-none",
          }}
          fill
        />
        <div className="h-full absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent z-[11]" />
      </div>
      <div className="absolute inset-0 h-full z-[13]">
        <div className="container h-full">
          <div className="flex flex-col h-full justify-center w-1/3  gap-2 items-start">
            <h1 className="text-6xl text-white font-bold ">{movie.title}</h1>
            <time className="text-gray-200 text-lg">{movie.release_date}</time>
            <div className="flex items-end gap-1">
              <span className={`font-bold text-4xl text-white`}>
                {movie.vote_average.toFixed(1)}
              </span>
              <span className={`font-normal text-lg text-white`}>/</span>
              <span className={`font-normal text-lg text-white`}>10</span>
            </div>
            <p className="text-white">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderMovieDetails;
