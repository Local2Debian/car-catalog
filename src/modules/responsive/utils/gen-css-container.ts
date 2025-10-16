export const genCssContainer = (breakpoints: Record<string, number>) => {
    return `
@theme {
    --container-*: initial;
\t${Object.entries(breakpoints).map(([key, value]) => `--container-${key}: ${value}px;`).join('\n\t')}
}`
}