<template>
    <UiBlock class="pt-2">
        <div class="flex justify-between items-center px-4 mb-2">
            <h1 class="text-xl first-letter:uppercase font-semibold text-primary">{{ type }} Filter</h1>
            <UiButton schema="clean" size="sm" icon class="!size-fit !p-1">
                <Icon name="iconoir:trash" mode="svg" @click="clearAll" />
            </UiButton>
        </div>
        <div class="px-4">
            <UiInput v-model="searchModel" :placeholder="`Search ${type}`">
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
            <UiButtonFilter size="md" class="min-h-fit" v-for="item in filteredList" :key="item" :query="type"
                :value="item">
                <p class="first-letter:uppercase">{{ item }}</p>
            </UiButtonFilter>
        </div>
    </UiBlock>
</template>

<script setup lang="ts">

const props = defineProps<{
    list: string[]
    type: string
}>()

const searchModel = ref('')

const filteredList = computed(() => {
    return props.list.filter((item) => item.toLowerCase().includes(searchModel.value.toLowerCase()))
})

const { setValue } = useQuery(props.type)

const clearAll = () => setValue([])
</script>