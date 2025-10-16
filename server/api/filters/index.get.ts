import { Repository } from "redis-om"
import { getConnection } from "../../../scripts/redis"
import { FilterSchema } from "../../../scripts/schems"

export default defineEventHandler(async (event) => {
    const client = await getConnection()
    const filterRepository = new Repository(FilterSchema, client)
    const filters = await filterRepository.search().return.all()
    return filters[0]
})