import { Skeleton } from "@/components/ui/skeleton";

const ShowcaseState = ({ loading }: { loading?: boolean }) =>
  loading ? (
    <div className="container flex min-h-dvh flex-col justify-end gap-6 pb-10 pt-32">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-28 w-full max-w-xl" />
      <Skeleton className="h-16 w-full max-w-lg" />
      <div className="flex gap-3">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-24 shrink-0" />
        ))}
      </div>
    </div>
  ) : (
    <div className="container flex min-h-dvh flex-col items-start justify-center gap-4">
      <h1 className="font-display text-6xl font-black">Couldn&apos;t load titles</h1>
      <p className="max-w-[50ch] text-muted-foreground">
        The request to TMDB failed. Check that API_KEY and BACKEND_API_URL are set in
        .env.local, then restart the dev server.
      </p>
    </div>
  );

export default ShowcaseState;
