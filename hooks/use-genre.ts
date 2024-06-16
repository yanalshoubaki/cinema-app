import client from "@/services/client"
import { useQuery } from "@tanstack/react-query"

const useGenre = (type: "movie" | "tv") => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["genre", type],
        queryFn: async () => {
            try {
                const response = await client().get<{
                    genres: {
                        id: number
                        name: string
                    }[]
                }>(`/genre/${type}/list`)
                return response.data
            } catch (error) {
                console.warn(error)
            }
        },
    })
    return {
        data,
        isLoading,
        isError,
    }
}

export default useGenre