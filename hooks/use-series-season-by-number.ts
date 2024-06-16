import client from "@/services/client";
import { SeriesSeasonEntity } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useSeriesSeasonByNumber = (id: number, season_number: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["series-season", id, season_number],
        queryFn: async () => {
            try {
                const response = await client().get<SeriesSeasonEntity>(`/series/${id}/season/${season_number}`, {
                    headers: {
                        "Cache-Control": "no-store",
                    },
                });
                return response.data;
            } catch (error) {
                console.warn(error);
            }
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

export default useSeriesSeasonByNumber;
