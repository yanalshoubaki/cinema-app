import Link from "next/link";

const tickets = [
  { href: "/movies", label: "Movies", note: "Popular right now, one evening long." },
  { href: "/series", label: "Series", note: "Shows worth starting, with every episode listed." },
];

export default function Home() {
  return (
    <div className="container flex min-h-dvh flex-col justify-center gap-16 pt-28 pb-24">
      <h1 className="max-w-4xl text-balance font-display text-7xl font-black leading-[0.9] tracking-tight sm:text-8xl lg:text-[10rem]">
        What are we watching tonight?
      </h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {tickets.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="ticket group flex items-stretch bg-card transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <div className="flex flex-1 flex-col gap-2 p-8 pl-10">
              <span className="font-display text-6xl font-black leading-none tracking-tight">
                {t.label}
              </span>
              <span className="max-w-[28ch] text-muted-foreground">{t.note}</span>
            </div>
            <div className="flex w-24 items-center justify-center border-l-2 border-dashed border-border bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <span className="font-display text-3xl font-black [writing-mode:vertical-rl]">
                Admit one
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
