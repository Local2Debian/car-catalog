<template>
    <div class="flex justify-between break-inside-avoid">
        <span class="text-secondary">{{ label }}:</span>
        <span class="font-bold">{{ value || 'N/A' }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    value?: string | number
}>()
</script>
