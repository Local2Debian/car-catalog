/**
 * Define Nuxt schema for API
 */
declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        api: {
            host: string
            baseUrl: string
            requestTimeout: number
            retryCount: number
            retryDelay: number
        }
    }
}

export default {}
