<template>
    <component v-bind="props" :is="props.is" :class="[buttonClass]">
        <Icon v-if="loading" name="eos-icons:three-dots-loading" class="size-full absolute" mode="svg" />
        <span class="flex items-center gap-2" :class="{ 'opacity-0': loading }">
            <slot></slot>
        </span>
    </component>
</template>

<script lang="ts" setup generic="T">
import type { ButtonProps } from './types';
import { buttonSizes, useButtonVariants } from './variants';

const props = withDefaults(defineProps<ButtonProps<T>>(), { is: 'button', loading: false });

const calculatedSize = useCalculatedSize(buttonSizes, props.size)
const buttonClass = computed(() => useButtonVariants({ ...props, size: calculatedSize.value }))
</script>