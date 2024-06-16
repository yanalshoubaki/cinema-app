"use client";

import useSeriesById from "@/hooks/use-series-by-id";
import useSeriesSeasonByNumber from "@/hooks/use-series-season-by-number";
import { Avatar, AvatarGroup, Card, Image, Skeleton } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

type SeriesLandingProps = {};

const SeriesLanding = (props: SeriesLandingProps) => {
  const pathname = usePathname();
  const seriesId = pathname.split("/")[2];
  const { data: series, isLoading } = useSeriesById(seriesId);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const { data: season, isLoading: isSeasonLoading } = useSeriesSeasonByNumber(
    series?.id || 0,
    seasonNumber,
  );
  const seasons = useMemo(() => {
    if (isLoading) {
      return [];
    }
    if (!series) {
      return [];
    }
    return series.seasons
      .filter((item) => item.season_number != 0)
      .map((season) => {
        return {
          ...season,
        };
      });
  }, [series?.seasons]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!series) {
    return <div>Series not found</div>;
  }
  const backdropPath = `https://image.tmdb.org/t/p/original${series.backdrop_path}`;

  return (
    <div className="relative min-h-screen">
      <div className="relative h-screen">
        <div className="relative h-screen">
          <Image
            as={NextImage}
            removeWrapper
            src={backdropPath}
            alt={series.name}
            loading="lazy"
            classNames={{
              img: "rounded-none",
            }}
            fill
          />
          <div className="h-full absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent z-[11]" />
        </div>
        <div className="absolute bottom-10 right-0 left-0 h-full z-[13]">
          <div className="container h-full">
            <div className="grid grid-cols-12  h-full justify-between items-end w-full">
              <div className="col-start-1 col-end-6">
                <div className="flex flex-col h-full justify-end  gap-8 items-start">
                  <h1 className="text-6xl text-white font-bold ">
                    {series.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-end gap-2">
                      <span className={`font-normal text-lg text-white`}>
                        {series.vote_average.toFixed(1)}
                      </span>
                      <span className={`font-normal text-lg text-white`}>
                        |
                      </span>
                      <span className={`font-normal text-lg text-white`}>
                        {series.vote_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-300 text-lg">
                        {series.number_of_episodes} episodes
                      </span>
                      <span className="text-slate-300 text-lg">.</span>
                      <span className="text-slate-300 text-lg">
                        {series.first_air_date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    {series.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="text-white after:ml-4 after:content-['.'] last:after:hidden font-bold text-lg"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-white text-xl">{series.overview}</p>
                </div>
              </div>
              <div className="col-start-10 col-span-12">
                <div className="flex flex-col gap-4">
                  <h2 className="text-white text-xl font-bold">Cast :</h2>
                  <div className="flex flex-row flex-wrap gap-10">
                    <AvatarGroup className="flex gap-4 items-center">
                      {series.credits.cast.map((cast) => (
                        <Avatar
                          key={cast.id}
                          src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                        />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bg-slate-900 p-12 rounded-md">
          <div className="flex items-start flex-col gap-10">
            <div>
              <Select
                defaultSelectedKeys={[`${seasons[0].id}`]}
                className="inline-flex min-w-[200px]"
                onChange={(key) => {
                  const seasonNumber = seasons.filter((season) => {
                    return season.id === parseInt(key.target.value);
                  });

                  if (seasonNumber.length > 0) {
                    setSeasonNumber(seasonNumber[0].season_number);
                  }
                }}
              >
                {seasons.map((season) => (
                  <SelectItem key={season.id}>{season.name}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-12 gap-10 w-full">
              {isSeasonLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <Card className="col-span-4 bg-transparent space-y-3" key={index} radius="none">
                      <Skeleton className="rounded-lg">
                        <div className="h-[225px] rounded-lg bg-default-300"></div>
                      </Skeleton>
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-[28px] w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                  ))
                : season?.episodes.map((episode) => (
                    <div key={episode.id} className="col-span-4">
                      <div className="flex flex-col gap-4 items-center">
                        <div className="relative overflow-hidden">
                          <Image
                            as={NextImage}
                            src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                            alt={episode.name}
                            width={400}
                            height={400}
                            loading="lazy"
                            blurDataURL={backdropPath}
                            className="object-cover"
                            removeWrapper
                          />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                          <h3 className="text-white text-xl font-bold">
                            {episode.name}
                          </h3>
                          <p className="text-white font-normal">
                            {episode.overview}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesLanding;
