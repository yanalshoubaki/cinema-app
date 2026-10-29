import client from "@/services/client"
import { Response, SeriesResult } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useTv = (filter: Record<string, unknown>) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["tv", filter],
        queryFn: async () => {
            const response = await client().get<Response<SeriesResult[]>>(`/discover/tv`, {
                params: filter,
                headers: {
                    "Cache-Control": "no-store"
                }
            })
            return response.data
        },
        refetchInterval: false,
        retry: 0
    })
    return {
        data,
        isLoading,
        isError,
    }
}

export default useTv;