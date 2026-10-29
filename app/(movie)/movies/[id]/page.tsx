import MovieLanding from "@/components/Movies/MovieLanding";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <MovieLanding id={Number(id)} />;
};

export default page;
