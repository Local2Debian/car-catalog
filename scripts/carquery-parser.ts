// lib/carquery-parser.ts
import type { Repository } from 'redis-om'

const baseUrl = 'https://www.carqueryapi.com/api/0.3/'

interface CarQueryResponse {
  Makes?: any[]
  Models?: any[]
  Trims?: any[]
  Years?: { min_year: string; max_year: string }
}

export class CarQueryParser {
  constructor(
    private trimRepository: Repository, 
    private filterRepository: Repository,
    private modelRepository: Repository
  ) {}
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async fetchData(params: Record<string, string>): Promise<CarQueryResponse> {
    const urlParams = new URLSearchParams(params)
    const response = await fetch(`${baseUrl}?${urlParams}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }

  private generateYearRange(minYear: string, maxYear: string): string[] {
    const years = []
    const min = parseInt(minYear)
    const max = parseInt(maxYear)
    
    for (let year = min; year <= max; year++) {
      years.push(year.toString())
    }
    
    return years
  }

  async parseAllData(): Promise<void> {
    console.log('🚀 Начинаем парсинг CarQuery API...')
    
    try {
      // Получаем диапазон годов
      const yearsData = await this.fetchData({ cmd: 'getYears' })
      if (!yearsData.Years) {
        throw new Error('Не удалось получить данные о годах')
      }
      
      const { min_year, max_year } = yearsData.Years
      console.log(`📅 Диапазон годов: ${min_year} - ${max_year}`)
      
      // Получаем все марки
      console.log('🔍 Получаем марки...')
      const makesData = await this.fetchData({ cmd: 'getMakes' })
      console.log('📊 Ответ API для марок:', JSON.stringify(makesData, null, 2))
      
      if (!makesData.Makes) {
        console.log('⚠️ API не вернул марки, пробуем альтернативный подход...')
        
        // Попробуем получить марки с параметром года
        const makesWithYear = await this.fetchData({ cmd: 'getMakes', year: '2020' })
        console.log('📊 Ответ API для марок с годом:', JSON.stringify(makesWithYear, null, 2))
        
        if (!makesWithYear.Makes) {
          throw new Error('Не удалось получить данные о марках даже с параметром года')
        }
        
        makesData.Makes = makesWithYear.Makes
      }
      
      console.log(`🏭 Найдено марок: ${makesData.Makes.length}`)
      
      let totalSaved = 0
      const processedTrims = new Set<string>()
      
      // Парсим все марки
      const limitedMakes = makesData.Makes
      console.log(`🏭 Парсим все ${limitedMakes.length} марок`)
      
      // Батч-обработка марок (по 1 одновременно для стабильности)
      const batchSize = 1
      for (let i = 0; i < limitedMakes.length; i += batchSize) {
        const batch = limitedMakes.slice(i, i + batchSize)
        console.log(`🔄 Обрабатываем марку: ${batch[0].make_display}`)
        
        // Обрабатываем одну марку
        const result = await this.processMake(batch[0], processedTrims)
        totalSaved += result
        
        console.log(`  💾 Всего сохранено: ${totalSaved}`)
        
        // Задержка между марками
        if (i + batchSize < limitedMakes.length) {
          console.log('⏳ Ожидание перед следующей маркой...')
          await this.delay(2000) // 2 секунды между марками
        }
      }
      
      console.log(`✅ Парсинг завершен! Сохранено комплектаций: ${totalSaved}`)
      
      // Генерируем фильтры
      await this.generateFilters()
      
    } catch (error) {
      console.error('❌ Ошибка при парсинге:', error)
      throw error
    }
  }

  private async processMake(make: any, processedTrims: Set<string>): Promise<number> {
    console.log(`🔍 Обрабатываем марку: ${make.make_display}`)
    let saved = 0
    
    try {
      // Получаем все комплектации марки одним запросом (вместо запроса для каждой модели)
      const trimsData = await this.fetchData({
        cmd: 'getTrims',
        make: make.make_id,
        full_results: '1'
      })
      
      if (trimsData.Trims && trimsData.Trims.length > 0) {
        console.log(`  📋 Найдено комплектаций для марки: ${trimsData.Trims.length}`)
        
        // Сохраняем каждую комплектацию
        for (const trim of trimsData.Trims) {
          // Проверяем дубликаты по model_id
          if (processedTrims.has(trim.model_id)) continue
          
          const trimData = {
            model_id: trim.model_id || '',
            model_make_id: trim.model_make_id || '',
            model_name: trim.model_name || '',
            model_trim: trim.model_trim || '',
            model_year: trim.model_year || '',
            model_body: trim.model_body || '',
            model_engine_position: trim.model_engine_position || '',
            model_engine_cc: trim.model_engine_cc || '',
            model_engine_cyl: trim.model_engine_cyl || '',
            model_engine_type: trim.model_engine_type || '',
            model_engine_power_ps: trim.model_engine_power_ps || '',
            model_engine_power_hp: trim.model_engine_power_hp || '',
            model_top_speed_kph: trim.model_top_speed_kph || '',
            model_drive: trim.model_drive || '',
            model_transmission_type: trim.model_transmission_type || '',
            model_seats: trim.model_seats || '',
            model_doors: trim.model_doors || '',
            model_weight_kg: trim.model_weight_kg || '',
            model_length_mm: trim.model_length_mm || '',
            model_width_mm: trim.model_width_mm || '',
            model_height_mm: trim.model_height_mm || '',
            model_wheelbase_mm: trim.model_wheelbase_mm || '',
            model_lkm_hwy: trim.model_lkm_hwy || '',
            model_lkm_city: trim.model_lkm_city || '',
            model_fuel_cap_l: trim.model_fuel_cap_l || '',
            model_sold_in_us: trim.model_sold_in_us || '',
            make_display: trim.make_display || '',
            make_country: trim.make_country || ''
          }
          
          await this.trimRepository.save(trimData)
          saved++
          processedTrims.add(trim.model_id)
        }
      } else {
        console.log(`  ⚠️ Нет комплектаций для ${make.make_display}`)
      }
      
    } catch (error) {
      console.error(`❌ Ошибка при обработке марки ${make.make_display}:`, error)
    }
    
    return saved
  }

  async generateFilters(): Promise<void> {
    console.log('🔍 Формируем фильтры...')
    
    // Создаем индекс для поиска
    await this.trimRepository.createIndex()
    
    // Получаем все комплектации для формирования фильтров
    const allTrims = await this.trimRepository.search().return.all()
    console.log(`📊 Анализируем ${allTrims.length} записей...`)
    
    // Собираем только марки и модели
    const makes = new Set<string>()
    const models = new Set<string>()
    const modelMakeMap = new Map<string, string>() // модель -> марка

    allTrims.forEach((trim: any) => {
      // Собираем марки
      if (trim.model_make_id && trim.model_make_id !== null && trim.model_make_id.trim() !== '') {
        makes.add(trim.model_make_id.trim())
      }
      
      // Собираем модели с привязкой к марке
      if (trim.model_name && trim.model_name !== null && trim.model_name.trim() !== '') {
        const makeName = trim.make_display || trim.model_make_id || 'Unknown'
        const modelName = trim.model_name.trim()
        models.add(modelName)
        modelMakeMap.set(modelName, makeName)
      }
    })

    // Создаем индексы для фильтров и моделей
    await this.filterRepository.createIndex()
    await this.modelRepository.createIndex()

    // Сохраняем фильтры марок
    const makeFilters = [
      { type: 'make', values: Array.from(makes).sort() }
    ]

    for (const filter of makeFilters) {
      await this.filterRepository.save(filter)
      console.log(`  ✅ ${filter.type}: ${filter.values.length} значений`)
    }

    // Сохраняем модели в отдельную схему
    const modelsToSave = Array.from(models).map(model => ({
      name: model,
      make: modelMakeMap.get(model) || 'Unknown'
    }))

    for (const model of modelsToSave) {
      await this.modelRepository.save(model)
    }
    console.log(`  ✅ models: ${modelsToSave.length} моделей сохранено`)

    console.log('✅ Все фильтры сформированы и сохранены')
  }

  async clearAllData(): Promise<void> {
    console.log('🗑️ Очищаем все данные...')
    
    await this.trimRepository.dropIndex()
    await this.filterRepository.dropIndex()
    await this.modelRepository.dropIndex()
    
    console.log('✅ Все данные очищены')
  }
}