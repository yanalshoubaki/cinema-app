import client from "@/services/client"
import { Response, MovieResult } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useLanguages = (filter: Record<string, string>) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["movies", filter],
        queryFn: async () => {
            const response = await client().get<Response>(`/languages`)
            return response.data
        },
    })
    return {
        data,
        isLoading,
        isError,
    }
}

export default useLanguages;