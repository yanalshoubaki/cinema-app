import server from "@/services/server"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const requestParams = request.url.split("?").length > 0 ? new URLSearchParams(request.url.split("?")[1]) : new URLSearchParams({})
        const res = await server().get(`/tv/${params.id}`, {
            headers: {
                "Cache-Control": "no-store"
            },
            params: {
                api_key: process.env.API_KEY,
                append_to_response: "credits,videos,images,recommendations,episode_groups",
                ...requestParams
            }
        })
        const data = await res.data
        return Response.json(data)
    } catch (error) {
        return Response.json(error, {
            status: 500
        })
    }
}