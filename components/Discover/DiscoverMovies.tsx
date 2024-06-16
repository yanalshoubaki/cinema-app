"use client";

import { useMovies } from "@/hooks";
import { MovieResult } from "@/types";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import MovieDetails from "../Movies/Movie";
import SliderMovieDetails from "../Movies/Movie/SliderMovieDetails";

const DiscoverMovies = () => {
  const { data, isError, isLoading } = useMovies({});
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="overflow-x-hidden relative">
      <div className="h-svh relative">
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          effect={"fade"}
          speed={300}
          fadeEffect={{
            crossFade: true,
          }}
          modules={[Navigation, EffectFade, Thumbs]}
          className="h-full"
          onSwiper={setThumbsSwiper}
          noSwipingClass="swiper-no-swiping"
          noSwiping={true}
          draggable={false}
          allowTouchMove={false}
          lazyPreloadPrevNext={2}
          lazyPreloaderClass="swiper-lazy-preloader"
        >
          {data?.results.map((movie: MovieResult) => (
            <SwiperSlide key={movie.id}>
              <SliderMovieDetails movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute top-0 -right-[500px] bottom-0 flex justify-center items-center z-[13]">
        <div className="container">
          <div className="p-6 w-2/3 bg-gray-800 shadow-surface-glass max-laptop:py-4 backdrop-blur will-change-transform [@supports(backdrop-filter:blur(15px))]:bg-secondary-main/[3%] shadow-sm rounded-3xl bg-white/30 dark:bg-brand-dark/30">
            <Swiper
              slidesPerView={3}
              slidesPerGroup={1}
              slidesPerGroupSkip={1}
              loop={true}
              watchSlidesProgress={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="h-full"
            >
              {data?.results.map((movie: MovieResult) => (
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

export default DiscoverMovies;
