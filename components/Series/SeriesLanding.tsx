"use client";

import { Avatar, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useSeriesById from "@/hooks/use-series-by-id";
import useSeriesSeasonByNumber from "@/hooks/use-series-season-by-number";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

const SeriesLanding = () => {
  const pathname = usePathname();
  const seriesId = pathname.split("/")[2];
  const { data: series, isLoading } = useSeriesById(seriesId);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const { data: season, isLoading: isSeasonLoading } = useSeriesSeasonByNumber(
    series?.id || 0,
    seasonNumber,
  );
  const seasons = useMemo(() => {
    if (isLoading || !series) {
      return [];
    }
    return series.seasons.filter((item) => item.season_number != 0);
  }, [series, isLoading]);
  if (isLoading) {
    return (
      <div className="container flex min-h-dvh flex-col justify-end gap-6 pb-10 pt-32">
        <Skeleton className="h-28 w-full max-w-xl" />
        <Skeleton className="h-16 w-full max-w-lg" />
      </div>
    );
  }
  if (!series) {
    return (
      <div className="container flex min-h-dvh flex-col items-start justify-center gap-4">
        <h1 className="font-display text-6xl font-black">Series not found</h1>
        <Link
          href="/series"
          className="text-primary underline underline-offset-4"
        >
          Back to series
        </Link>
      </div>
    );
  }
  const backdropPath = `https://image.tmdb.org/t/p/original${series.backdrop_path}`;

  return (
    <div>
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
        <Image
          src={backdropPath}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        <div className="container relative grid gap-10 pb-16 pt-32 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <Link
              href="/series"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to series
            </Link>
            <h1 className="text-balance font-display text-7xl font-black leading-[0.9] tracking-tight lg:text-9xl">
              {series.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm tabular-nums">
              <span className="rounded-sm bg-primary px-2 py-0.5 font-bold text-primary-foreground">
                {series.vote_average.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                {series.vote_count.toLocaleString()} votes
              </span>
              <span className="text-muted-foreground">
                {series.number_of_episodes} episodes
              </span>
              <span className="text-muted-foreground">
                {series.first_air_date?.slice(0, 4)}
              </span>
            </div>
            <p className="text-sm font-semibold text-primary">
              {series.genres.map((g) => g.name).join(", ")}
            </p>
            <p className="max-w-[60ch] text-lg text-foreground/80">
              {series.overview}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Cast
            </h2>
            <AvatarGroup>
              {series.credits.cast.slice(0, 12).map((cast) => (
                <Avatar key={cast.id} size="lg" title={cast.name}>
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                    alt={cast.name}
                  />
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        </div>
      </section>

      <section className="container flex flex-col gap-8 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-6xl font-black leading-none">
            Episodes
          </h2>
          <Select
            value={String(seasonNumber)}
            onValueChange={(value) => setSeasonNumber(Number(value))}
            items={seasons.map((s) => ({
              value: String(s.season_number),
              label: s.name,
            }))}
          >
            <SelectTrigger className="min-w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((s) => (
                <SelectItem key={s.id} value={String(s.season_number)}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ol className="flex flex-col divide-y divide-border">
          {isSeasonLoading
            ? Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="flex gap-6 py-6">
                  <Skeleton className="h-24 w-44 shrink-0" />
                  <div className="flex flex-1 flex-col gap-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </li>
              ))
            : season?.episodes.map((episode) => (
                <li
                  key={episode.id}
                  className="flex gap-6 py-6 max-sm:flex-col"
                >
                  <span className="w-10 shrink-0 font-display text-5xl font-black leading-none text-primary tabular-nums max-sm:hidden">
                    {episode.episode_number}
                  </span>
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md bg-secondary sm:w-56">
                    {episode.still_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{episode.name}</h3>
                    <p className="max-w-[65ch] text-muted-foreground">
                      {episode.overview || "No description yet."}
                    </p>
                  </div>
                </li>
              ))}
        </ol>
      </section>
    </div>
  );
};

export default SeriesLanding;
