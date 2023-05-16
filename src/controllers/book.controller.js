import { bookService } from '../services/index.js'

const create = async (req, res, next) => {
    try {
        const { title, author, copies } = req.body
        const result = await bookService.addBook({ title, author, copies})
        debugger
        if(result?.error) 
            throw result.error 
        return res.status(201).json({
            message: "Tao thanh cong",
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}

const getAllBooks = async (req, res, next) => {
    try {
        const result = await bookService.getAllBooks()
        if(result?.error) 
            throw result.error
        return res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }
}

const findByAuthorAndTitle = async (req, res, next) => {
    const title = req?.query?.title
    const author = req?.query?.author
    try {
        const result = await bookService.findByAuthorAndTitle({ title, author })
        if(result?.error)
            throw result.error
        return res.status(200).json(result)
    }
    catch (error){
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await bookService.deleteBook(id)
        if(result?.error)
            throw result.error
        return res.status(200).json({
            message: 'Xoa thanh cong'
        })
    }
    catch(error){
        next(error)
    }
}

export default {
    create,
    getAllBooks,
    deleteBook,
    findByAuthorAndTitle
}