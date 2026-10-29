"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type ShowcaseItem = {
  id: number;
  title: string;
  year: string;
  rating: number;
  overview: string;
  backdrop: string;
  poster: string;
  href?: string;
};

const TMDB = "https://image.tmdb.org/t/p";

const Showcase = ({
  items,
  cta = "View details",
}: {
  items: ShowcaseItem[];
  cta?: string;
}) => {
  const [active, setActive] = useState(0);
  const current = items[active];
  if (!current) {
    return (
      <p className="container pt-32 text-muted-foreground">
        Nothing to show right now. Try again in a few minutes.
      </p>
    );
  }

  return (
    <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
      <Image
        key={current.id}
        src={`${TMDB}/original${current.backdrop}`}
        alt=""
        fill
        priority
        className="animate-in fade-in object-cover duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />

      <div className="container relative flex flex-col gap-10 pb-10 pt-32">
        <div className="flex max-w-2xl flex-col items-start gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-sm bg-primary px-2 py-0.5 font-bold text-primary-foreground tabular-nums">
              {current.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground tabular-nums">{current.year}</span>
          </div>
          <h1 className="text-balance font-display text-7xl font-black leading-[0.9] tracking-tight lg:text-9xl">
            {current.title}
          </h1>
          <p className="line-clamp-3 max-w-[60ch] text-lg text-foreground/80">
            {current.overview}
          </p>
          {current.href && (
            <Link
              href={current.href}
              className="mt-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              {cta}
            </Link>
          )}
        </div>

        <ul
          aria-label="Choose a title"
          className="-mx-[15px] flex snap-x gap-3 overflow-x-auto px-[15px] pb-2"
        >
          {items.map((item, i) => (
            <li key={item.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={item.title}
                aria-current={i === active}
                className={cn(
                  "relative block w-24 overflow-hidden rounded-md outline-offset-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary",
                  i === active
                    ? "ring-2 ring-primary"
                    : "opacity-50 hover:opacity-100",
                )}
              >
                <Image
                  src={`${TMDB}/w342${item.poster}`}
                  alt=""
                  width={96}
                  height={144}
                  className="aspect-[2/3] w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Showcase;
