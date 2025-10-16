import { tv, type VariantProps } from "tailwind-variants";
import type { CalculateSizeInput, SizesList } from "~/modules/responsive/types";

export const useButtonVariants = tv({
    base: 'relative flex justify-center items-center overflow-hidden duration-200 rounded-sm border cursor-pointer',
    variants: {
        icon: {
            true: '!p-0'
        },
        disabled: {
            true: '!bg-slate-600/25 !text-slate-600/100 cursor-auto'
        },
        rounded: {
            true: 'rounded-full'
        },
        schema: {
            primary: 'bg-secondary text-primary-alt hover:bg-slate-800 active:bg-slate-600',
            outline: 'hover:bg-slate-300/25 active:bg-slate-300/50',
            clean: 'size-fit border-transparent hover:bg-slate-300/25 active:bg-slate-300/50'
        },
        status: {
            positive: '',
            negative: '',
            accent: ''
        },
        size: {
            '2xl': 'px-6 py-2 text-xl',
            xl: 'px-5 py-2 text-lg',
            lg: 'px-4 py-1 text-lg',
            md: 'px-3 py-1 text-base',
            sm: 'px-3 py-1 text-base',
            xs: 'px-3 py-0.5 text-sm',
            '2xs': 'px-3 py-0.5 text-sm',
        },
    },
    compoundVariants: [
        // Primary disabled
        {
            schema: 'primary',
            disabled: true,
            class: 'border-slate-600/25'
        },
        // Outline disabled
        {
            schema: 'outline',
            disabled: true,
            class: '!bg-transparent border-slate-600/100'
        },
        // Clean disabled
        {
            schema: 'clean',
            disabled: true,
            class: '!bg-transparent'
        },
        // Clean sizes
        {
            schema: 'clean',
            size: '2xl',
            class: 'px-4 py-0'
        },
        {
            schema: 'clean',
            size: 'xl',
            class: 'px-3 py-0'
        },
        {
            schema: 'clean',
            size: 'lg',
            class: 'px-3 py-0'
        },
        {
            schema: 'clean',
            size: 'md',
            class: 'px-2 py-0'
        },
        {
            schema: 'clean',
            size: 'sm',
            class: 'px-2 py-0'
        },
        {
            schema: 'clean',
            size: 'xs',
            class: 'px-1 py-0'
        },
        {
            schema: 'clean',
            size: '2xs',
            class: 'px-1 py-0'
        },
        // Icon sizes
        {
            icon: true,
            size: '2xl',
            class: 'size-12'
        },
        {
            icon: true,
            size: 'xl',
            class: 'size-10'
        },
        {
            icon: true,
            size: 'lg',
            class: 'size-10'
        },
        {
            icon: true,
            size: 'md',
            class: 'size-8'
        },
        {
            icon: true,
            size: 'sm',
            class: 'size-8'
        },
        {
            icon: true,
            size: 'xs',
            class: 'size-6'
        },
        {
            icon: true,
            size: '2xs',
            class: 'size-4'
        },
    ],
    defaultVariants: {
        schema: 'primary',
    }
})

export const buttonSizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'] as const

export interface ButtonVariants {
    icon?: boolean
    disabled?: boolean
    rounded?: boolean
    schema?: 'primary' | 'outline' | 'clean'
    status?: 'positive' | 'negative' | 'accent'
    size?: CalculateSizeInput<typeof buttonSizes>
};