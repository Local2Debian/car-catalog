<template>
  <section class="flex-1/4 pt-10 space-y-10">
    <UiFilterString v-if="makes" :type="makes.type" :list="makes.values ?? []" />
    <UiFilterModel v-if="makeQuery && makeQuery.length > 0" />
  </section>
  <section class="flex-3/4 relative !pr-0">
    <UseVirtualList v-if="chunksLists.length" ref="listRef" :list="chunksLists" :options="{ itemHeight: 244 }" height="100%"
      class="custom-scrollbar py-10 pr-10" v-slot="props">
      <div class="grid grid-cols-3 gap-10 w-full mb-5">
        <NuxtLink v-for="(car, idx) in props.data" :key="idx" :to="`/${car.model_id}`">
          <ItemsPreview v-bind="car" />
        </NuxtLink>
      </div>
    </UseVirtualList>
    <p v-else class="flex items-center font-bold text-2xl justify-center h-full">
      Здесь могла бы быть ваша реклама, кек... :/
    </p>
  </section>
</template>

<script setup lang="ts">
import { UseVirtualList } from '@vueuse/components';
import { CarsService } from '~/services/cars.service';
import { FiltersService } from '~/services/filters.service';
import type { Trim } from '~/types/cars.types';

const loadLimit = 18
const currentPage = ref(0)

const listRef = useTemplateRef<HTMLElement>('listRef')

const { queryString: searchQuery } = useQuery('search')
const { queryValue: makeQuery } = useQuery('make')
const { queryValue: modelQuery, setValue: setModelValue } = useQuery('model')

const carsService = new CarsService()
const filtersService = new FiltersService()

const { data: makes } = await filtersService.makes()
const { data: cars } = await carsService.search(currentPage.value, loadLimit, searchQuery.value, makeQuery.value as string[], modelQuery.value as string[])

const chunkSize = 3
const chunksData = ref<Trim[]>(cars.value ?? [])

const isLoading = ref(false)
const hasMoreData = ref(true)

const chunksLists = computed(() => {
  const chunks: Trim[][] = []

  for (let i = 0; i < chunksData.value.length; i += chunkSize) {
    chunks.push(chunksData.value.slice(i, i + chunkSize))
  }

  return chunks
})

const onLoadMore = async () => {
  if (isLoading.value || !hasMoreData.value) return

  isLoading.value = true
  try {
    const nextPage = currentPage.value + 1
    const chunksToAdd = await carsService.search(nextPage, loadLimit, searchQuery.value, makeQuery.value as string[], modelQuery.value as string[])

    if (!chunksToAdd.data.value?.length) {
      hasMoreData.value = false
      return
    }

    chunksData.value.push(...chunksToAdd.data.value)
    currentPage.value = nextPage
  } catch (error) {
    console.error('Error loading more cars:', error)
  } finally {
    isLoading.value = false
  }
}

watch(() => makeQuery.value, (newMakes) => {
  if (!newMakes || newMakes.length === 0) {
    setModelValue([])
  }
}, { immediate: true })

watch([searchQuery, makeQuery, modelQuery], async ([search, make, model]) => {
  currentPage.value = 0
  chunksData.value = []
  hasMoreData.value = true
  isLoading.value = false

  try {
    const { data } = await carsService.search(currentPage.value, loadLimit, search, make as string[], model as string[])
    chunksData.value = data.value ?? []

    reset()
  } catch (error) {
    console.error('Error searching cars:', error)
    chunksData.value = []
  }
})

const canLoadMore = () => !isLoading.value && hasMoreData.value


const { reset } = useInfiniteScroll(listRef, onLoadMore, {
  distance: 244,
  canLoadMore
})
</script>
