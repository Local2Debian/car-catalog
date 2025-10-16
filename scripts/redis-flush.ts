import { getConnection } from './redis'

async function flushRedis() {
    console.log('🗑️ Очищаем все данные из Redis...')
    
    try {
        const client = await getConnection()
        
        // Получаем все ключи
        const keys = await client.keys('*')
        console.log(`📊 Найдено ключей: ${keys.length}`)
        
        if (keys.length > 0) {
            // Удаляем все ключи
            await client.del(keys)
            console.log('✅ Все ключи удалены')
        } else {
            console.log('ℹ️ Redis уже пуст')
        }
        
        console.log('🎉 Очистка завершена!')
        
        process.exit(0)
    } catch (error) {
        console.error('❌ Ошибка при очистке Redis:', error)
        process.exit(1)
    }
}

flushRedis()
