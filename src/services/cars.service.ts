import { ApiService } from "~/plugins/api/service"
import type { Trim } from "~/types/cars.types"

export class CarsService extends ApiService {
    constructor() {
        super('')
    }

    async image(query: string, perPage: number = 1) {
        return this.get<{
            hits: {
                largeImageURL: string
            }[]
        }>('/image', {
            query: {
                query,
                per_page: perPage
            }
        })
    }

    async byId(id: string) {
        return this.get<Trim>(`/${id}`)
    }

    async search(page: number = 0, limit: number = 9, search?: string, make?: string[], model?: string[]) {
        return this.get<Trim[]>('/search', {
            query: {
                page,
                limit,
                search,
                make,
                model
            }
        })
    }
}