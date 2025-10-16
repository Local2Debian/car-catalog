export const genTypes = (breakpoints: Record<string, number>) => {
    const breakpointsList = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]).map(([key]) => key)
    return `
export type { CalculateSizeInput } from './runtime/composables/use-calculated-size';
export const SizesList = ['${breakpointsList.join('\', \'')}'] as const;
    `
}