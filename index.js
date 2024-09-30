import 'dotenv/config.js'
import express from 'express'

import { pool } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const client = await pool.connect()

    const results = await client.query('SELECT * FROM users')

    res.send(JSON.stringify(results.rows))
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 8000')
})
