import client from "@/services/client"
import { MovieEntity, MovieResponse, MovieResult } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useMovie = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["movie", id],
        queryFn: async () => {
            try {
                const response = await client().get<MovieEntity>(`/movie/${id}`)
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

export default useMovie;