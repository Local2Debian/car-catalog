<template>
    <UiButton v-bind="props">
        <Icon :name="iconName" mode="svg" :class="{ 'text-red-400': favorite }"></Icon>
    </UiButton>
</template>

<script lang="ts" setup generic="T">
import type { ButtonProps } from './types';
import { computed } from 'vue';

type FavoriteButtonProps = ButtonProps<T> & {
    favorite?: boolean
};

const props = withDefaults(defineProps<FavoriteButtonProps>(), { 
    icon: true
});

const iconName = computed(() => (props.favorite ? 'ri:heart-fill' : 'ri:heart-line'))
</script>