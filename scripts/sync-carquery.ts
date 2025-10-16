// scripts/sync-carquery.ts
import { getConnection } from './redis'
import { Repository } from 'redis-om'
import { CarQueryParser } from './carquery-parser'
import { FilterSchema, TrimSchema, ModelSchema } from './schems'

async function main() {
    const client = await getConnection()
    
    const trimRepository = new Repository(TrimSchema, client)
    const filterRepository = new Repository(FilterSchema, client)
    const modelRepository = new Repository(ModelSchema, client)
    const parser = new CarQueryParser(trimRepository, filterRepository, modelRepository)

    try {
        console.log('🚀 Запуск синхронизации CarQuery API...')
        await parser.parseAllData()
        console.log('✅ Синхронизация завершена успешно!')
        await client.disconnect()
        process.exit(0)
    } catch (error) {
        console.error('❌ Ошибка синхронизации:', error)
        await client.disconnect()
        process.exit(1)
    }
}

main()