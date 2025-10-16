<template>
    <UiInput v-bind="props" :model-value="queryString || ''" placeholder="Search" @update:model-value="debounceSearch">
        <template #before>
            <Icon name="ri:search-line" class="!size-5" />
        </template>
        <template #after="{ clear, model }">
            <UiButton :class="{ 'opacity-0': !model }" schema="clean" size="sm" icon class="!size-fit !p-1" @click="clear">
                <Icon name="ri:close-line" mode="svg" @click="" />
            </UiButton>
        </template>
    </UiInput>
</template>

<script lang="ts" setup>
import type { InputEmits, InputProps } from './types';

type Props = InputProps & {
    query: string
};

type Emits = InputEmits & {};

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { queryString, setValue } = useQuery(props.query)

const debounceSearch = useDebounceFn((value: string) => {
    setValue([value])
    emit('update:modelValue', value)
})
</script>