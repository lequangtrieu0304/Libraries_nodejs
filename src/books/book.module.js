import express from 'express'
const router = express.Router()

import bookController from './book.controller.js'

router.post('/create-book', bookController.create)

router.get('/fetch-all', bookController.getAllBooks)

router.get('/fetch-book-query', bookController.findByAuthorAndTitle)

router.delete('/delete-book/:id', bookController.deleteBook)

export default router