import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import { connect } from './database/database.js'
import { 
    booksModule,
    returnsModule,
    studentsModule,
    loansModule
} from './app.module.js'
import { handleError } from './middlewares/handle.error.js'

const app = express()
const PORT = process.env.PORT ?? 3002;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/books', booksModule)
app.use('/api/students', studentsModule)
app.use('/api/loans', loansModule)
app.use('/api/returns', returnsModule)

app.use(handleError)

app.listen(PORT, async () => {
    await connect()
    console.log(`listening on port: ${PORT}`)
})