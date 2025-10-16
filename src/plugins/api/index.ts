import { BASE_URL, REQUEST_TIMEOUT, RETRY_COUNT, RETRY_DELAY } from '~/plugins/api/constants'

/**
 * Define Nuxt plugin for API
 * @param nuxtApp - Nuxt app instance
 * @returns Nuxt plugin with API instance
 */
export default defineNuxtPlugin((nuxtApp) => {
    const runtimeApiConfig = nuxtApp.$config.public.api

    const apiInstance = $fetch.create({
        baseURL: runtimeApiConfig?.baseUrl || BASE_URL,
        timeout: runtimeApiConfig?.requestTimeout || REQUEST_TIMEOUT,
        retry: runtimeApiConfig?.retryCount || RETRY_COUNT,
        retryDelay: runtimeApiConfig?.retryDelay || RETRY_DELAY,
    })

    return {
        provide: {
            apiInstance,
        },
    }
})
