import { Repository } from "redis-om"
import { getConnection } from "../../scripts/redis"
import { TrimSchema } from "../../scripts/schems"

export default defineEventHandler(async (event) => {
    const client = await getConnection()
    const query = getQuery(event)

    const page = parseInt(query.page as string)
    const limit = parseInt(query.limit as string)
    const search = (query.search as string ?? '').trim()
    const make = query.make as string | string[]
    const model = query.model as string | string[]

    const makeArray = Array.isArray(make) ? make : (make ? [make] : [])
    const validMakes = makeArray.filter(m => m && m.trim())
    
    const modelArray = Array.isArray(model) ? model : (model ? [model] : [])
    const validModels = modelArray.filter(m => m && m.trim())

    const trimRepository = new Repository(TrimSchema, client)
    const trims = trimRepository.search()
    if (search) {
        trims.where((trimQuery) => {
            trimQuery
                .where('model_name').match(`*${search}*`)
                .or('model_make_id').match(`*${search}*`)
                .or('make_display').match(`*${search}*`)
                .or('make_country').match(`*${search}*`)
            return trimQuery
        })
    }
    if (validMakes.length) {
        trims.and((makeQuery) => {
            makeQuery.where('model_make_id').match(validMakes[0])
            for (let i = 1; i < validMakes.length; i++) {
                makeQuery.or('model_make_id').match(validMakes[i])
            }
            return makeQuery
        })
    }
    
    if (validModels.length) {
        trims.and((modelQuery) => {
            modelQuery.where('model_name').match(validModels[0])
            for (let i = 1; i < validModels.length; i++) {
                modelQuery.or('model_name').match(validModels[i])
            }
            return modelQuery
        })
    }
    
    return await trims.return.page(page * limit, limit)
})