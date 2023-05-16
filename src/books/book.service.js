import { 
    BAD_REQUEST, 
    NOT_FOUND 
} from "../exceptions/index.js"
import Book from "./book.model.js"
import { BookValidation } from "./book.validation.js"

const addBook = async ({ title, author, copies }) => {
    try {
        const existBook = await Book.findOne({title})
        if(existBook){
            throw new BAD_REQUEST('Sach da ton tai')
        }
        const book = new Book({title, author, copies})
        const result = await book.save()
        return result
    }
    catch (error){
        return { error } 
    }
}

const getAllBooks = async () => {
    try {
        const listBooks = await Book.find({}).exec()
        if(listBooks.length === 0){
            throw new BAD_REQUEST(BookValidation.EMPTY)
        }
        return listBooks
    }
    catch (error){
        return { error }
    }
}

const findByAuthorAndTitle = async ({ title, author }) => {
    try{
        const book = await Book.findOne({ title, author})
        if(!book)
            throw new NOT_FOUND('Khong tim thay sach phu hop')
        return book
    }
    catch(error){
        return { error }
    }
}

const deleteBook = async (id) => {
    try {
        const book = await Book.findById(id)
        const result = await book.deleteOne()
        if(!result){
            throw new BAD_REQUEST(BookValidation.DELETE_FAILED)
        }
        return result
    }
    catch (error){
        return { error }
    }
}

export default {
    addBook,
    getAllBooks,
    deleteBook,
    findByAuthorAndTitle
}