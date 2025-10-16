<template>
    <UiInput v-bind="props" :model-value="modelValue" @input="onInput" @change="emit('change', $event)"
        @blur="onBlur" @update:model-value="emit('update:modelValue', $event)">
        <slot></slot>
        <template #before="ctx">
            <slot name="before" v-bind="ctx"></slot>
        </template>
        <template #after="ctx">
            <slot name="after" v-bind="ctx"></slot>
        </template>
    </UiInput>
</template>

<script lang="ts" setup>
import type { InputEmits, InputProps } from './types';

type Props = InputProps & {
    precision?: number;
    integer?: boolean;
};

type Emits = InputEmits & {};

const props = withDefaults(defineProps<Props>(), {
    precision: 2,
    integer: false,
})
const emit = defineEmits<Emits>()

const sanitizeValue = (value: string): string => {
    let newValue = value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1')
        .replace(/^0+(?=\d)/, '');

    if (props.integer) {
        newValue = newValue.replace(/[^0-9]/g, '');
    }

    return newValue;
};

const applyPrecision = (value: string): string => {
    if (props.precision !== undefined) {
        const regExp = new RegExp(`\\.\\d{${props.precision + 1},}`, 'g');
        return value.replace(regExp, (match) => match.substring(0, props.precision! + 1));
    }

    return value.replace(/\./gi, '');
};

function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    let newValue = sanitizeValue(target.value);

    if (newValue.startsWith('.')) {
        newValue = '0' + newValue;
    }

    const prevValue = newValue;

    newValue = applyPrecision(newValue);

    if (newValue !== prevValue) {
        const diff = newValue.length - prevValue.length;
        const increment = props.precision ? 1 : 0;
        const start = target.selectionStart || 0;
        const end = target.selectionEnd || 0;
        target.selectionStart = Math.max(0, start + diff + increment);
        target.selectionEnd = Math.max(0, end + diff + increment);
    }

    target.value = newValue;
    emit('update:modelValue', newValue);
}

function onBlur(e: Event) {
    const target = e.target as HTMLInputElement;

    let newValue = sanitizeValue(target.value);

    if (newValue.endsWith('.')) {
        newValue = newValue.slice(0, -1);
    }

    target.value = newValue;
    emit('update:modelValue', newValue);
    emit('blur', e);
}

onBeforeMount(() => emit('update:modelValue', applyPrecision(sanitizeValue(props.modelValue || ''))))
</script>