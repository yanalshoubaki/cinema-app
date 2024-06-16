"use client";

import { useTv } from "@/hooks";
import { MovieResult, SeriesResult } from "@/types";
import React, { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import MovieDetails from "../Movie";
import SliderMovieDetails from "../Movie/SliderMovieDetails";

const NowPlaying = () => {
  const { data, isError, isLoading } = useTv({});
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="overflow-x-hidden relative">
      <div className="h-svh relative">
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          modules={[Navigation, Thumbs]}
          className="h-full"
          onSwiper={setThumbsSwiper}
          noSwipingClass="swiper-no-swiping"
          noSwiping={true}
          draggable={false}
          allowTouchMove={false}
        >
          {data?.results.map((movie: MovieResult) => (
            <SwiperSlide key={movie.id}>
              <SliderMovieDetails movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute top-0 -right-[590px] bottom-0 flex justify-center items-center z-[13]">
        <div className="container">
          <div className="p-6 bg-gray-800 shadow-surface-glass max-laptop:py-4 backdrop-blur will-change-transform [@supports(backdrop-filter:blur(15px))]:bg-secondary-main/[3%] shadow-sm rounded-3xl bg-white/30 dark:bg-brand-dark/30">
            <Swiper
              slidesPerView={4}
              spaceBetween={50}
              slidesPerGroup={1}
              slidesPerGroupSkip={1}
              watchSlidesProgress={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="h-full"
            >
              {data?.results.map((movie: SeriesResult) => (
                <SwiperSlide key={movie.id}>
                  <MovieDetails movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
