import express from 'express'
import cors from 'cors'
import midb from "./api/midb.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/midb', midb)
app.use('*', (req, res) => res.status(404).json({ Error: 'Page not found' }))

export default app

