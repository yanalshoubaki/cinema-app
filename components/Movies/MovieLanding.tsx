"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovie } from "@/hooks";
import Image from "next/image";
import Link from "next/link";

const money = (n: number) =>
  n > 0
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }).format(n)
    : null;

const MovieLanding = ({ id }: { id: number }) => {
  const { data: movie, isLoading, isError } = useMovie(id);

  if (isLoading) {
    return (
      <div className="container flex min-h-dvh flex-col justify-end gap-6 pb-10 pt-32">
        <Skeleton className="h-28 w-full max-w-xl" />
        <Skeleton className="h-16 w-full max-w-lg" />
      </div>
    );
  }
  if (isError || !movie) {
    return (
      <div className="container flex min-h-dvh flex-col items-start justify-center gap-4">
        <h1 className="font-display text-6xl font-black">Movie not found</h1>
        <Link
          href="/movies"
          className="text-primary underline underline-offset-4"
        >
          Back to movies
        </Link>
      </div>
    );
  }

  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );
  const facts = [
    [
      "Runtime",
      movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : null,
    ],
    ["Budget", money(movie.budget)],
    ["Box office", money(movie.revenue)],
    ["Status", movie.status],
    ["Language", movie.spoken_languages[0]?.english_name],
  ].filter((f): f is [string, string] => Boolean(f[1]));
  const cast = movie.credits?.cast.slice(0, 12) ?? [];

  return (
    <div>
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        <div className="container relative flex flex-col items-start gap-5 pb-16 pt-32">
          <Link
            href="/movies"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to movies
          </Link>
          <h1 className="max-w-4xl text-balance font-display text-7xl font-black leading-[0.9] tracking-tight lg:text-9xl">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-xl italic text-foreground/70">{movie.tagline}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm tabular-nums">
            <span className="rounded-sm bg-primary px-2 py-0.5 font-bold text-primary-foreground">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              {movie.vote_count.toLocaleString()} votes
            </span>
            <span className="text-muted-foreground">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>
          <p className="text-sm font-semibold text-primary">
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p className="max-w-[60ch] text-lg text-foreground/80">
            {movie.overview}
          </p>
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              Watch trailer
            </a>
          )}
        </div>
      </section>

      <section className="container grid gap-16 py-16 lg:grid-cols-12">
        <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-6 lg:col-span-4 lg:grid-cols-1">
          {facts.map(([label, value]) => (
            <div key={label} className="border-t border-border pt-3">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="text-2xl font-bold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
        {cast.length > 0 && (
          <div className="flex flex-col gap-6 lg:col-span-8">
            <h2 className="font-display text-6xl font-black leading-none">
              Cast
            </h2>
            <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {cast.map((c) => (
                <li key={c.credit_id} className="flex items-center gap-4">
                  <Avatar size="lg">
                    {c.profile_path && (
                      <AvatarImage
                        src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                        alt=""
                      />
                    )}
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{c.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {c.character}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieLanding;
