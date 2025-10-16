<template>
    <div class="bg-primary-alt drop-shadow-md rounded-lg overflow-hidden">
        <h2 v-if="slots?.title" class="text-xl font-bold">
            <slot name="title" />
        </h2>
        <slot />
    </div>
</template>

<script setup lang="ts">
const slots = useSlots()
</script>























<!-- Изображение -->
<!-- <div v-if="type === 'image'" class="h-80 bg-gray-100 flex items-center justify-center relative">
            <NuxtImg v-if="imageUrl" :src="imageUrl" :alt="`${car.make_display} ${car.model_name}`"
                class="w-full h-full object-cover" loading="lazy" @error="handleImageError" />
            <div v-else class="text-center text-gray-500">
                <svg class="w-16 h-16 mx-auto mb-2 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd" />
                </svg>
                <p class="text-sm">No image available</p>
                <p class="text-xs text-gray-400">{{ car.make_display }} {{ car.model_name }}</p>
            </div>
        </div> -->

<!-- Контент -->
<!-- <div v-else class="p-6">
            <h2 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h2>
            <slot />
        </div> -->