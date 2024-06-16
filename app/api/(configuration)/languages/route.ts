import server from "@/services/server"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
    try {
        const res = await server().get(`/configuration/languages`)
        const data = await res.data
        return Response.json(data)
    } catch (error) {
        return Response.json(error, {
            status: 500
        })
    }
}