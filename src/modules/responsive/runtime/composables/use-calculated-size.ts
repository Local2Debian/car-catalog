import { SizesList } from "~/modules/responsive/types"

type Sizes<T extends readonly string[]> = T[number]
type SizesArray<T extends readonly string[]> = readonly Sizes<T>[]
type BreakpointSizes<T extends readonly string[]> = Partial<Record<typeof SizesList[number], Sizes<T>>> & { default: Sizes<T> }

export type CalculateSizeInput<T extends readonly typeof SizesList[number][]> = Sizes<T> | SizesArray<T> | BreakpointSizes<T>

/**
 * Calculate the size of the element based on the screen size
 * @param size - Size of the element, if not provided, the default size will be used
 * @returns {ComputedRef<Sizes>} The calculated size of the element
 */
export const useCalculatedSize = <T extends readonly typeof SizesList[number][]>(componentSizes: T, size?: CalculateSizeInput<T>): ComputedRef<Sizes<T>> => {
    const viewport = useViewport()

    /**
     * Calculate the size of the button based on the screen size
     * @param sizes - Array of button sizes, if not provided, the default size will be used
     * @returns {Sizes} The calculated size of the button
     */
    const calculatedSize = computed(() => {
        if (typeof size === 'string' && componentSizes.includes(size)) return size as Sizes<T>
        if (Array.isArray(size)) return viewportSize(size)
        if (typeof size === 'object' && 'default' in size) {
            // Sort keys by componentSizes order to ensure proper breakpoint matching
            const sortedKeys = Object.keys(size).filter(key => key !== 'default').sort((a, b) => {
                const aIndex = componentSizes.indexOf(a as any)
                const bIndex = componentSizes.indexOf(b as any)
                return aIndex - bIndex
            })
            
            const keySize = sortedKeys.find((key) => viewport.isGreaterOrEquals(key))
            return (keySize && size[keySize as keyof typeof size] ? size[keySize as keyof typeof size] : size.default) as Sizes<T>
        }
        return viewportSize()
    })

    /**
     * Calculate the size of the button based on the screen size
     * @param sizes - Array of button sizes, if not provided, the default size will be used
     * @returns {Sizes} The calculated size of the button
     */
    const viewportSize = (sizes: SizesArray<T> = componentSizes): Sizes<T> => {
        for (const size of sizes) {
            if (viewport.breakpoint.value === size && sizes.includes(size)) return size
        }
        return sizes[sizes.length - 1]
    }

    return calculatedSize
}
