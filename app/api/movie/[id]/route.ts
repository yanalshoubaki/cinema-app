import server from "@/services/server"
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const res = await server().get(`/movie/${params.id}`)
        const data = await res.data
        return Response.json(data)
    } catch (error) {
        console.log(error);
        return Response.error(error)
    }
}