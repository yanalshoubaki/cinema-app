"use client";

import { useMovies } from "@/hooks";
import Showcase from "./Showcase";
import ShowcaseState from "./ShowcaseState";

const DiscoverMovies = () => {
  const { data, isError, isLoading } = useMovies({});
  if (isLoading) return <ShowcaseState loading />;
  if (isError) return <ShowcaseState />;
  return (
    <Showcase
      items={(data?.results ?? []).map((m) => ({
        id: m.id,
        title: m.title,
        year: m.release_date?.slice(0, 4) ?? "",
        rating: m.vote_average,
        overview: m.overview,
        backdrop: m.backdrop_path,
        poster: m.poster_path,
        href: `/movies/${m.id}`,
      }))}
    />
  );
};

export default DiscoverMovies;
