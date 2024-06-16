import server from "@/services/server"

export const revalidate = 0;
export async function GET(request: Request, { params: requestParam }: { params: { type: string } }) {
    try {
        const urlParams = request.url.split("?").length > 0 ? new URLSearchParams(request.url.split("?")[1]) : new URLSearchParams({})

        const paramsObject: Record<string, string> = {}
        for (const [key, value] of urlParams.entries()) {
            paramsObject[key as string] = value
        }

        const res = await server().get(`/discover/${requestParam.type}`, {
            params: {
                ...paramsObject,
                api_key: process.env.API_KEY,
            }
        })
        const data = await res.data
        return Response.json(data, {
            headers: {
                "Cache-Control": "no-store"
            }
        })
    } catch (error) {
        console.log(error);
        return Response.json(error, {
            status: 500
        })
    }
}