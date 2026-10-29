"use client";

import { useTv } from "@/hooks";
import { format } from "date-fns";
import Showcase from "./Showcase";
import ShowcaseState from "./ShowcaseState";

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
  if (isLoading) return <ShowcaseState loading />;
  if (isError) return <ShowcaseState />;
  return (
    <Showcase
      cta="View episodes"
      items={(data?.results ?? []).map((s) => ({
        id: s.id,
        title: s.name,
        year: s.first_air_date?.slice(0, 4) ?? "",
        rating: s.vote_average,
        overview: s.overview,
        backdrop: s.backdrop_path,
        poster: s.poster_path,
        href: `/series/${s.id}`,
      }))}
    />
  );
};

export default DiscoverTV;
