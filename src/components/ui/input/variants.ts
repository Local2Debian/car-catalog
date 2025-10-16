import { tv } from "tailwind-variants";

export const useInputVariants = tv({
    slots: {
        input: 'outline-none peer transition-all text-primary w-full',
        label: 'relative flex gap-2 text-secondary placeholder:!text-placeholder rounded-sm bg-accent/20 items-center border border-accent/50 py-1 px-2 w-full'
    }
})