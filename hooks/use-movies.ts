import client from "@/services/client"
import { MovieResponse, MovieResult } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useMovies = (filter: Record<string, string>) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["movies", filter],
        queryFn: async () => {
            try {
                const response = await client().get<MovieResponse<MovieResult[]>>(`/discover/movie`, {
                    params: filter
                })
                return response.data
            } catch (error) {
                throw new Error(error)
            }
        },
    })
    return {
        data,
        isLoading,
        isError,
    }
}

export default useMovies;