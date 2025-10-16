import { Schema } from "redis-om"

export const TrimSchema = new Schema('Trim', {
    model_id: { type: 'string' },
    model_make_id: { type: 'text' },
    model_name: { type: 'text' },
    model_trim: { type: 'string' },
    model_year: { type: 'string' },
    model_body: { type: 'string' },
    model_engine_position: { type: 'string' },
    model_engine_cc: { type: 'string' },
    model_engine_cyl: { type: 'string' },
    model_engine_type: { type: 'string' },
    model_engine_power_ps: { type: 'string' },
    model_engine_power_hp: { type: 'string' },
    model_top_speed_kph: { type: 'string' },
    model_drive: { type: 'string' },
    model_transmission_type: { type: 'string' },
    model_seats: { type: 'string' },
    model_doors: { type: 'string' },
    model_weight_kg: { type: 'string' },
    model_length_mm: { type: 'string' },
    model_width_mm: { type: 'string' },
    model_height_mm: { type: 'string' },
    model_wheelbase_mm: { type: 'string' },
    model_lkm_hwy: { type: 'string' },
    model_lkm_city: { type: 'string' },
    model_fuel_cap_l: { type: 'string' },
    model_sold_in_us: { type: 'string' },
    make_display: { type: 'text' },
    make_country: { type: 'text' }
})

export const FilterSchema = new Schema('Filter', {
    type: { type: 'string' },
    values: { type: 'string[]' }
})

export const ModelSchema = new Schema('Model', {
    name: { type: 'text' },
    make: { type: 'text' }
})