"use client";

// Import Swiper styles
import { useTv } from "@/hooks";
import { SeriesResult } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
// Import Swiper React components
import { EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import SeriesDetails from "../Series";
import SliderSeriesDetails from "../Series/SliderSeriesDetails";

const DiscoverTV = () => {
  const { data, isError, isLoading } = useTv({
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page: 1,
    with_original_language: "en",
    "air_date.gte": format(new Date(), "yyyy-MM-dd"),
    sort_by: "vote_count.desc",
    "vote_average.gte": 7,
    "vote_count.gte": 1000,
  });
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
          {data?.results.map((series: SeriesResult) => (
            <SwiperSlide key={series.id}>
              <SliderSeriesDetails series={series} />
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
              {data?.results.map((series: SeriesResult) => (
                <SwiperSlide key={series.id}>
                  <SeriesDetails series={series} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverTV;
