import { BAD_REQUEST, NOT_FOUND } from "../exceptions/index.js"
import Book from "../books/book.model.js"
import Loan from "../loans/loan.model.js"
import Student from "../students/student.model.js"
import Return from "./return.model.js"
import { compareDate } from "../utils/compare.date.js"

const createReturn = async ({ loan_id, bookArr }) => {
    try {
        debugger
        const findLoan = await Loan.findById(loan_id.toString())
        const newReturn = new Return({ loan: loan_id, books: bookArr })
        const booksLoan = findLoan.books
       
        let updateReturnBooks = findLoan.returnBooks
        let notExistBooksLoan = []
        bookArr.forEach(book_id => {
            if(booksLoan.includes(book_id.toString())) {
                if(!updateReturnBooks.includes(book_id))
                    updateReturnBooks.push(book_id.toString()) 
            }
            else {
                notExistBooksLoan.push(book_id)
            }
        })
        
        await findLoan.save()
        if(booksLoan.length === updateReturnBooks.length){
            await Loan.findByIdAndUpdate(
                { _id: findLoan._id},
                { returned: true }
            )
        }
        let updateBooks = [] 
        updateReturnBooks.forEach( book_id => {
            const updateBook = Book.findByIdAndUpdate(
                {_id: book_id },
                { $inc: { copies: 1}},
                { new: true})
                
            updateBooks.push(updateBook)
        })
                
        const result = await newReturn.save()
        if(!result)
            throw new BAD_REQUEST('Them that bai')
        
        let updateStudent
        if(compareDate(result.returnDate, findLoan.returnDate)){
            updateStudent = Student.findByIdAndUpdate(
                { _id: findLoan.student},
                { $inc: { fine: 10.0 }},
                { new: true}
                )
            }
        await Promise.all([...updateBooks, updateStudent])

        if(notExistBooksLoan.length > 0)
            throw new BAD_REQUEST(`Sach ${notExistBooksLoan.map(e => `${e +', '}`).join("")} khong co trong phieu muon`)
        return result
    }
    catch (error) {
        return { error }
    }
}

export default {
    createReturn
}