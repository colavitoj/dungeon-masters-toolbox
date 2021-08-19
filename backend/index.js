import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MidbDao from "./dao/midbDAO.js"
import commentsDAO from "./dao/commentsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5100

MongoClient.connect(
    process.env.MIDB_URI,
    {

        poolSize: 10,
        wtimeout: 2500,
        useNewUrlParser: true
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await MidbDao.injectDB(client)
        await commentsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })

