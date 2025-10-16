<template>
    <label :class="[label()]">
        <slot name="before" v-bind="{ model, clear }"></slot>
        <input v-model="model" :placeholder :class="[input()]" @input="emit('input', $event)"
            @change="emit('change', $event)" @blur="emit('blur', $event)" @focus="emit('focus', $event)" />
        <slot name="after" v-bind="{ model, clear }"></slot>
    </label>
</template>

<script lang="ts" setup>
import type { InputProps, InputEmits } from './types';
import { useInputVariants } from './variants';

const props = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()

const model = computed({
    get() { return props.modelValue },
    set(value: string) { emit('update:modelValue', value) }
})

const clear = () => { model.value = '' }

const { label, input } = useInputVariants(props)
</script>

<style scoped>

/* Базовые стили для всех состояний автозаполнения */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active,
input:-webkit-autofill:focus-visible,
input:-webkit-autofill:focus-within {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: var(--color-text-primary) !important;
    caret-color: var(--color-text-primary) !important;
    transition: background-color 5000s ease-in-out 0s !important;
    font-family: var(--font-regular) !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 1000px transparent inset !important;
}

/* Для Firefox */
input:-moz-autofill,
input:-moz-autofill:hover,
input:-moz-autofill:focus,
input:-moz-autofill:active {
    background-color: transparent !important;
    color: var(--color-text-primary) !important;
    font-family: var(--font-regular) !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
}

/* Для других браузеров */
input:autofill,
input:autofill:hover,
input:autofill:focus,
input:autofill:active {
    background-color: transparent !important;
    color: var(--color-text-primary) !important;
    font-family: var(--font-regular) !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
}
</style>