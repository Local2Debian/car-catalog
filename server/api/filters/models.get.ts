import { Repository } from "redis-om"
import { getConnection } from "../../../scripts/redis"
import { ModelSchema } from "../../../scripts/schems"

export default defineEventHandler(async (event) => {
    const client = await getConnection()
    const query = getQuery(event)
    const make = query.make as string | string[]

    const modelRepository = new Repository(ModelSchema, client)
    let models = modelRepository.search()

    if (make) {
        const makeArray = Array.isArray(make) ? make : [make]
        const validMakes = makeArray.filter(m => m && m.trim())
        
        if (validMakes.length > 0) {
            models.where('make').match(validMakes[0])
            for (let i = 1; i < validMakes.length; i++) {
                models.or('make').match(validMakes[i])
            }
        }
    }

    return await models.return.all()
})