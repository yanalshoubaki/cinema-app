import client from "@/services/client"
import { Response, SeriesResult } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useTv = (filter: Record<string, unknown>) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["tv", filter],
        queryFn: async () => {
            try {
                const response = await client().get<Response<SeriesResult[]>>(`/discover/tv`, {
                    params: filter,
                    headers: {
                        "Cache-Control": "no-store"
                    }
                })
                return response.data
            } catch (error) {
                console.warn(error)
            }
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