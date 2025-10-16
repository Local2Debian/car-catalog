<template>
    <UiBlock class="pt-2">
        <div class="flex justify-between items-center px-4 mb-2">
            <h1 class="text-xl first-letter:uppercase font-semibold text-primary">Model Filter</h1>
            <UiButton schema="clean" size="sm" icon class="!size-fit !p-1">
                <Icon name="iconoir:trash" mode="svg" @click="clearAll" />
            </UiButton>
        </div>
        <div class="px-4">
            <UiInput v-model="searchModel" placeholder="Search Models">
                <template #before>
                    <Icon name="ri:search-line" class="!size-5" />
                </template>
                <template #after="{ clear, model }">
                    <UiButton :class="{ 'opacity-0': !model }" schema="clean" size="sm" icon class="!size-fit !p-1"
                        @click="clear">
                        <Icon name="ri:close-line" mode="svg" @click="" />
                    </UiButton>
                </template>
            </UiInput>
        </div>
        <hr class="bg-accent opacity-10 mt-2" />
        <div class="flex max-h-62 overflow-y-auto flex-wrap gap-2 pb-4 pt-2 px-4 custom-scrollbar">
            <div v-for="makeGroup in groupedModels" :key="makeGroup.make" class="w-full">
                <div class="text-sm font-medium text-primary mb-2 px-2">{{ makeGroup.make }}</div>
                <div class="flex flex-wrap gap-2 mb-3">
                    <UiButtonFilter size="md" class="min-h-fit" v-for="model in makeGroup.models" :key="model"
                        query="model" :value="model">
                        <p class="first-letter:uppercase">{{ model }}</p>
                    </UiButtonFilter>
                </div>
            </div>
        </div>
    </UiBlock>
</template>

<script setup lang="ts">
import { FiltersService } from '~/services/filters.service'

const searchModel = ref('')
const models = ref<{ name: string, make: string }[]>([])
const { queryValue: selectedMakes } = useQuery('make')
const { setValue, queryValue: selectedModels } = useQuery('model')

const filtersService = new FiltersService()

watch(selectedMakes, async (newMakes) => {
    try {
        if (!newMakes || newMakes.length === 0) {
            models.value = []
            setValue([])
            return
        }

        const result = await filtersService.models(newMakes as string[])
        models.value = result.data.value ?? []

        if (selectedModels.value && selectedModels.value.length > 0) {
            const validModels = selectedModels.value.filter((modelName: any) => {
                return models.value.some((m: any) => m.name === modelName && newMakes.includes(m.make))
            })

            if (validModels.length !== selectedModels.value.length) {
                setValue(validModels)
            }
        }
    } catch (error) {
        console.error('Error loading models:', error)
        models.value = []
        setValue([])
    }
}, { immediate: true })

const filteredModels = computed(() => {
    if (!searchModel.value) return models.value
    return models.value.filter(model =>
        model.name.toLowerCase().includes(searchModel.value.toLowerCase())
    )
})

const groupedModels = computed(() => {
    if (!selectedMakes.value || selectedMakes.value.length === 0) return []

    const groups = new Map<string, string[]>()

    filteredModels.value.forEach(model => {
        if (selectedMakes.value.includes(model.make)) {
            if (!groups.has(model.make)) {
                groups.set(model.make, [])
            }
            groups.get(model.make)!.push(model.name)
        }
    })

    return Array.from(groups.entries()).map(([make, modelNames]) => ({
        make,
        models: [...new Set(modelNames)].sort()
    })).sort((a, b) => a.make.localeCompare(b.make))
})

const clearAll = () => setValue([])
</script>
