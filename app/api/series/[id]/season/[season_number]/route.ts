import server from "@/services/server"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { id: string; season_number: string } }) {
    try {
        const requestParams = request.url.split("?").length > 0 ? new URLSearchParams(request.url.split("?")[1]) : new URLSearchParams({})
        const res = await server().get(`/tv/${params.id}/season/${params.season_number}`, {
            headers: {
                "Cache-Control": "no-store"
            },
            params: {
                api_key: process.env.API_KEY,
                append_to_response: "videos,images",
                ...requestParams
            }
        })
        const data = await res.data
        return Response.json(data)
    } catch (error) {
        console.log(error);
        return Response.error(error)
    }
}