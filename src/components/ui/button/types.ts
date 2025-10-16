import type { ButtonVariants } from "./variants"


export interface ButtonProps<T> extends ButtonVariants {
    is?: T | Component<T> | string
    loading?: boolean
};
