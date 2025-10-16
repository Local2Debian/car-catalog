import { ApiService } from "~/plugins/api/service";
import type { Filter, Model } from "~/types/filters.types";

export class FiltersService extends ApiService {
    constructor() {
        super('/filters')
    }

    
    async makes() {
        return this.get<Filter>('/')
    }

    async models(make?: string[]) {
        return this.get<Model[]>('/models', {
            query: {
                make
            }
        })
    }
}