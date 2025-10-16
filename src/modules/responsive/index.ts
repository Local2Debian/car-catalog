import fs from 'fs';

import { addImports, createResolver, defineNuxtModule, installModules } from "nuxt/kit";
import { BREAKPOINTS, DEFAULT_BREAKPOINTS, type Devices } from "./breakpoints";
import type { ModuleOptions as ViewportModuleOptions } from "nuxt-viewport";
import { genCssContainer } from "./utils/gen-css-container";
import { genTypes } from './utils/gen-types';

export interface ModuleOptions extends Omit<ViewportModuleOptions, 'breakpoints' | 'defaultBreakpoints' | 'fallbackBreakpoint'> {
    breakpoints: Record<string, number>;
    defaultBreakpoints: Partial<Record<Devices, keyof this['breakpoints']>>;
    fallbackBreakpoint?: Devices | 'viewport';
}

export default defineNuxtModule({
    meta: {
        name: 'viewportResponsive',
        configKey: 'viewportResponsive',
        compatibilityVersion: 3,
    },
    async setup(options: ModuleOptions, nuxt) {
        const resolver = createResolver(import.meta.url)

        options.breakpoints ||= BREAKPOINTS;
        options.defaultBreakpoints ||= DEFAULT_BREAKPOINTS;


        fs.writeFileSync(resolver.resolve('runtime/container.css'), genCssContainer(options.breakpoints))
        fs.writeFileSync(resolver.resolve('types.ts'), genTypes(options.breakpoints))

        nuxt.options.css.unshift(resolver.resolve('runtime/container.css'))

        await installModules(
            new Map([
                ['nuxt-viewport', { ...options }]
            ]),
            new Set(),
            nuxt
        )

        addImports({
            name: 'useCalculatedSize',
            as: 'useCalculatedSize',
            from: resolver.resolve('runtime/composables/use-calculated-size'),
        })
    }
})