<template>
    <UiButton :class="{ '!bg-slate-600': isSelected }" v-bind="props" @click="toggleValue(props.value)">
        <slot></slot>
        <Icon v-if="isSelected" name="ri:close-line"/>
    </UiButton>
</template>

<script lang="ts" setup generic="T">
import type { ButtonProps } from './types';
import { computed } from 'vue';

type FilterProps = ButtonProps<T> & {
    query: string
    value: string
}; 

const props = defineProps<FilterProps>()

const { queryValue, toggleValue } = useQuery(props.query)

const isSelected = computed(() => queryValue.value?.includes(props.value))

defineExpose({
    isSelected
})
</script>