const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const apiPrefix = '/api'

// Routers - Middlewares
const despesasRouter = require('./routers/despesas')

app.use(`${apiPrefix}/despesas`, despesasRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})