export const BREAKPOINTS = {
    '2xs': 375,
    xs: 425,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 2560,
    '4xl': 3840,
} as const

export const DEFAULT_BREAKPOINTS = {
    mobile: '2xs',
    tablet: 'md',
    desktop: 'xl',
} as const

export enum Devices {
    bot = 'bot',
    desktop = 'desktop',
    mobile = 'mobile',
    tablet = 'tablet',
    tv = 'tv',
}