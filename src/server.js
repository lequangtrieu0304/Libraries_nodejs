import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import { connect } from './database/database.js'
import { 
    bookRouter, 
    studentRouter,
    loanRouter,
    returnRouter
} from './routers/index.js'
import { handleError } from './middlewares/handle.error.js'

const app = express()
const PORT = process.env.PORT ?? 3002;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/books', bookRouter)
app.use('/api/students', studentRouter)
app.use('/api/loans', loanRouter)
app.use('/api/returns', returnRouter)

app.use(handleError)

app.listen(PORT, async () => {
    await connect()
    console.log(`listening on port: ${PORT}`)
})