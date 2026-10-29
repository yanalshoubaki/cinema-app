import client from "@/services/client";
import { SeriesEntity } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useSeriesById = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["series", id],
    queryFn: async () => {
      const response = await client().get<SeriesEntity>(`/series/${id}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return response.data;
    },
    refetchInterval: false,
    retry: 0,
  });
  return {
    data,
    isLoading,
    isError,
  };
};

export default useSeriesById;
