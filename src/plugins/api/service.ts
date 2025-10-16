import type { UseFetchOptions } from '#app'

import { useApiFetch } from './api-fetch'

/**
 * API service
 * @param service - service name
 * @returns API service
 */
export class ApiService {
    protected service?: string

    public fetch = useNuxtApp().$apiInstance
    /**
     * Constructor
     * @param service - service name
     */
    constructor(service?: string) {
        this.service = service
    }

    /**
     * Generate URL
     * @param url - url to generate
     * @returns generated URL
     */
    private generateUrl(url: string | (() => string)): string {
        return [this.service, url].filter(Boolean).join('/').replace(/\/\//g, '/')
    }

    /**
     * Sanitize query parameters
     * @param query - query object to sanitize
     * @returns sanitized query object
     */
    private querySanitize(query: Record<string, any> | undefined): Record<string, any> {
        if (!query) return {}
        
        const sanitized: Record<string, any> = {}
        
        for (const [key, value] of Object.entries(query)) {
            if (this.isNotEmpty(value)) {
                if (Array.isArray(value)) {
                    const filteredArray = value.filter(item => this.isNotEmpty(item))
                    if (filteredArray.length > 0) {
                        sanitized[key] = filteredArray
                    }
                } else {
                    sanitized[key] = value
                }
            }
        }
        
        return sanitized
    }

    /**
     * Check if value is not empty
     * @param value - value to check
     * @returns true if value is not empty
     */
    private isNotEmpty(value: any): boolean {
        if (value === undefined || value === null) return false
        
        if (typeof value === 'string' && value.trim() === '') return false
        
        if (Array.isArray(value) && value.length === 0) return false
        
        if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return false
        
        if (typeof value === 'number' && isNaN(value)) return false
        
        return true
    }

    /**
     * Get data
     * @param url - url to get data
     * @param options - options to get data
     * @returns data
     */
    protected async get<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
        return useApiFetch<T>(this.generateUrl(url), {
            method: 'GET',
            ...options,
            query: this.querySanitize(options?.query)
        })
    }

    /**
     * Post data
     * @param url - url to post data
     * @param options - options to post data
     * @returns data
     */
    protected async post<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
        return useApiFetch<T>(this.generateUrl(url), {
            method: 'POST',
            ...options,
            query: this.querySanitize(options?.query)
        })
    }

    /**
     * Put data
     * @param url - url to put data
     * @param options - options to put data
     * @returns data
     */
    protected async put<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
        return useApiFetch<T>(this.generateUrl(url), {
            method: 'PUT',
            ...options,
            query: this.querySanitize(options?.query)
        })
    }

    /**
     * Patch data
     * @param url - url to patch data
     * @param options - options to patch data
     * @returns data
     */
    protected async patch<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
        return useApiFetch<T>(this.generateUrl(url), {
            method: 'PATCH',
            ...options,
            query: this.querySanitize(options?.query)
        })
    }

    /**
     * Delete data
     * @param url - url to delete data
     * @param options - options to delete data
     * @returns data
     */
    protected async delete<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
        return useApiFetch<T>(this.generateUrl(url), {
            method: 'DELETE',
            ...options,
            query: this.querySanitize(options?.query)
        })
    }
}
