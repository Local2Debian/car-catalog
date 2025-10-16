import { getConnection } from "~~/scripts/redis"
import { Repository } from "redis-om"
import { TrimSchema } from "~~/scripts/schems"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id') as string
    if (!id) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found'
        })
    }
    const client = await getConnection()
    const trimRepository = new Repository(TrimSchema, client)
    const trim = await trimRepository.search().where('model_id').eq(id).return.first()
    return trim
})