import server from "@/services/server"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const res = await server().get(`/movie/${(await params).id}`, {
            params: {
                api_key: process.env.API_KEY,
                append_to_response: "credits,videos",
            },
        })
        const data = await res.data
        return Response.json(data)
    } catch (error) {
        return Response.json(error, {
            status: 500
        })
    }
}