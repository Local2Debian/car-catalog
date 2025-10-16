<template>
    <section class="columns-2 size-full space-y-4 mt-10">
        <UiBlock class="p-4 space-y-2">
            <template #title>
                {{ car?.make_display }} {{ car?.model_name }}
            </template>
            <hr class="bg-accent opacity-10" />
            <div class="space-y-3">
                <ItemsSpec label="Year" :value="car?.model_year" />
                <ItemsSpec label="Make" :value="car?.make_display" />
                <ItemsSpec label="Model" :value="car?.model_name" />
                <ItemsSpec label="Body" :value="car?.model_body" />
                <ItemsSpec label="Country" :value="car?.make_country" />
                <ItemsSpec label="Engine Position" :value="car?.model_engine_position" />
                <ItemsSpec label="Engine Type" :value="car?.model_engine_type" />
                <ItemsSpec label="Drive" :value="car?.model_drive" />
                <ItemsSpec label="Transmission" :value="car?.model_transmission_type" />
            </div>
        </UiBlock>

        <UiBlock class="p-4 space-y-2">
            <template #title>
                Technical Specifications
            </template>
            <hr class="bg-accent opacity-10" />
            <div class="flex gap-6 space-y-3">
                <div class="w-full space-y-3">
                    <ItemsSpec label="Engine CC"
                        :value="car?.model_engine_cc ? `${car?.model_engine_cc} cc` : undefined" />
                    <ItemsSpec label="Cylinders" :value="car?.model_engine_cyl" />
                    <ItemsSpec label="Power"
                        :value="car?.model_engine_power_ps ? `${car?.model_engine_power_ps} PS` : undefined" />
                    <ItemsSpec label="Power HP"
                        :value="car?.model_engine_power_hp ? `${car?.model_engine_power_hp} HP` : undefined" />
                </div>
                <hr class="bg-accent opacity-10 w-px h-[inherit]" />
                <div class="w-full space-y-3">
                    <ItemsSpec label="Top Speed"
                        :value="car?.model_top_speed_kph ? `${car?.model_top_speed_kph} km/h` : undefined" />
                    <ItemsSpec label="Weight"
                        :value="car?.model_weight_kg ? `${car?.model_weight_kg} kg` : undefined" />
                    <ItemsSpec label="Seats" :value="car?.model_seats" />
                    <ItemsSpec label="Doors" :value="car?.model_doors" />
                </div>
            </div>
        </UiBlock>

        <UiBlock>
            <div class="h-80 bg-gray-100 flex items-center justify-center relative">
                <NuxtImg :src="imageUrl" :alt="`${car?.make_display} ${car?.model_name}`"
                    class="w-full h-full object-cover" loading="lazy">
                </NuxtImg>
            </div>
        </UiBlock>

        <UiBlock class="p-4 space-y-2">
            <template #title>
                Dimensions
            </template>
            <hr class="bg-accent opacity-10" />
            <div class="flex gap-6 space-y-3">
                <div class="w-full space-y-3">
                    <ItemsSpec label="Length"
                        :value="car?.model_length_mm ? `${car?.model_length_mm} mm` : undefined" />
                    <ItemsSpec label="Width" :value="car?.model_width_mm ? `${car?.model_width_mm} mm` : undefined" />
                    <ItemsSpec label="Height"
                        :value="car?.model_height_mm ? `${car?.model_height_mm} mm` : undefined" />
                    <ItemsSpec label="Wheelbase"
                        :value="car?.model_wheelbase_mm ? `${car?.model_wheelbase_mm} mm` : undefined" />
                </div>
                <hr class="bg-accent opacity-10 w-px h-[inherit]" />
                <div class="w-full space-y-3">
                    <ItemsSpec label="Fuel Capacity"
                        :value="car?.model_fuel_cap_l ? `${car?.model_fuel_cap_l} L` : undefined" />
                    <ItemsSpec label="Highway L/100km" :value="car?.model_lkm_hwy" />
                    <ItemsSpec label="City L/100km" :value="car?.model_lkm_city" />
                    <ItemsSpec label="Sold in US"
                        :value="car?.model_sold_in_us ? (car?.model_sold_in_us === '1' ? 'Yes' : 'No') : undefined" />
                </div>
            </div>
        </UiBlock>
    </section>
</template>

<script setup lang="ts">
import { CarsService } from '~/services/cars.service';

definePageMeta({
    props: true
})

const props = defineProps<{
    id: string
}>()

const carsService = new CarsService()

const { data: car } = await carsService.byId(props.id)

const imageUrl = ref<string | undefined>(undefined)
carsService.image(`${car.value?.make_display} ${car.value?.model_name}`).then(res => (imageUrl.value = res.data?.value?.hits?.[0]?.largeImageURL))

if (!car.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Not Found'
    })
}
</script>