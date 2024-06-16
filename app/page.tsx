import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-10">
      <div className="container">
        <div className="grid grid-cols-12 w-full gap-10">
          <Link
            href={"/movies"}
            className="bg-slate-600 p-10 col-span-6 border-slate-900 border"
          >
            <h2 className="text-3xl text-white">Movies</h2>
          </Link>
          <Link
            href={"/series"}
            className="bg-slate-600 p-10 col-span-6 border-slate-900 border"
          >
            <h2 className="text-3xl text-white">Series</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
