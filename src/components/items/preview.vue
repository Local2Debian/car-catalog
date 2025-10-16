<template>
    <div class="w-full h-56 bg-gray-200 rounded-lg overflow-hidden relative">
        <NuxtImg src="https://kartinkof.club/uploads/posts/2022-07/1657096482_1-kartinkof-club-p-demotivator-ladi-1.png"
            alt="car image" title="бугагага object-fill тут для кринжа" class="w-full h-full object-fill" loading="lazy" decoding="sync" />
        <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t bg-accent/30 from-black/70 to-transparent p-4 text-white">
            <div class="font-bold text-lg">{{ make_display }}</div>
            <div class="text-sm">{{ model_name }}</div>
            <div class="text-xs mt-1">{{ model_year }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Trim } from '~/types/cars.types'

defineProps<Trim>()
</script>