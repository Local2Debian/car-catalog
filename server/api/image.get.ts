export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const { query: queryString, per_page: perPage } = query
    try {
        return await proxyRequest(event, `https://pixabay.com/api/?key=52794659-795d76aa42f6e8ec58f2733e7&q=in+profile+car+photo+${queryString}&per_page=${3}`)
    } catch (e) {
        createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: e
        })
    }
})