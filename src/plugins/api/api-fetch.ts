import type { UseFetchOptions } from 'nuxt/app'

/**
 * Use API fetch
 * @param url - url to fetch
 * @param options - options to fetch
 * @returns fetch options
 */
export function useApiFetch<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$apiInstance,
    })
}
