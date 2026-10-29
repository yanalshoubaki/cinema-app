import client from "@/services/client"
import { MovieEntity } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useMovie = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["movie", id],
        queryFn: async () => {
            const response = await client().get<MovieEntity>(`/movie/${id}`)
            return response.data
        },
    })
    return {
        data,
        isLoading,
        isError,
    }
}

export default useMovie;