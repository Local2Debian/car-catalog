import { computed, readonly, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { LocationQueryValue } from 'vue-router'

/**
 * Use query
 * @param paramName - name of the query parameter
 * @returns query value, query string, set value, add value, remove value, toggle value
 */
export const useQuery = (paramName: string) => {
    const route = useRoute()
    const router = useRouter()

    const normalizeQueryToArray = () => (route.query[paramName] ? (Array.isArray(route.query[paramName]) ? route.query[paramName] : route.query[paramName]?.toString().split(',')) : [])

    const queryValue = ref<LocationQueryValue[]>(normalizeQueryToArray())

    const stringifiedQueryValue = computed(() => queryValue.value.join(','))

    watch(
        () => route.query,
        () => {
            queryValue.value = normalizeQueryToArray()
        },
    )

    const updateQuery = useDebounceFn(() => {
        const query = { ...route.query }
        const paramValue = queryValue.value.join(',')

        if (!paramValue) delete query[paramName]
        else query[paramName] = paramValue

        router.replace({ query })
    })

    const setValue = (value: LocationQueryValue[], safe = false) => {
        if (!safe) queryValue.value = value
        else if (!queryValue.value.some((query) => value.includes(query))) {
            queryValue.value = value
        }
        updateQuery()
    }

    const addValue = (value: LocationQueryValue) => {
        if (!queryValue.value.includes(value)) {
            queryValue.value.push(value)
            updateQuery()
        }
    }

    const removeValue = (value: string) => {
        queryValue.value = queryValue.value.filter((item) => item !== value)
        updateQuery()
    }

    const toggleValue = (value: string) => {
        if (queryValue.value.includes(value)) removeValue(value)
        else addValue(value)
    }

    return {
        queryValue: readonly(queryValue),
        queryString: readonly(stringifiedQueryValue),
        setValue,
        addValue,
        removeValue,
        toggleValue,
    }
}
