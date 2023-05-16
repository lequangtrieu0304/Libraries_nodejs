import { BAD_REQUEST, NOT_FOUND } from "../exceptions/index.js"
import Loan from "./loan.model.js"
import Book from "../books/book.model.js"
import Student from "../students/student.model.js"

const addLoan = async ({ student, books, returnDate }) => {
    try {
        debugger
        const getStudent = Student.findById(student)
        let getBooks = []
        books.forEach(element => {
            const book = Book.findById(element)
            getBooks.push(book)
        })
        const [findBooks, findStudent] = await Promise.all([Promise.all(getBooks), getStudent])
        if(!findStudent) throw new NOT_FOUND('Sinh vien khong ton tai')
        findBooks.forEach(b => {
            if(b.copies <= 0) throw new BAD_REQUEST(`Sach co id ${b._id} da het`)
        })
        const loan = new Loan({ student, books, returnDate })
        const savedLoan = await loan.save()
        if(!savedLoan)
            throw new BAD_REQUEST('Muon that bai')
        const updateStudent = 
                Student
                .findByIdAndUpdate(student, {
                    $push: { loans: savedLoan._id }
                })
        const updateBook = [] 
                books.forEach(book_id => {
                    const book = Book
                        .findByIdAndUpdate(book_id, {
                            $push: { loans: savedLoan._id },
                            $inc: { 
                                copies: -1,
                                numsLoan: 1,
                            }
                        })
                    updateBook.push(book)
                })
        await Promise.all([...updateBook, updateStudent])
        return savedLoan
    }
    catch (error) {
        return { error }
    }
}

const getAllLoans = async () => {
    try {
        const listLoans = await Loan.find({})
                            .populate('books')
                            .populate('student')
        return listLoans
    }
    catch (error){
        return { error }
    }
}

const deleteLoan = async (id) => {
    try {
        const loan = await Loan.findById(id)
        const result = await Loan.deleteOne({_id: id})
        if(!loan) 
            throw new NOT_FOUND('Khong tim thay phieu muon')
        const updateBook = Book
                            .findByIdAndUpdate(
                                loan.books, 
                                { $pull: { loans: loan._id}}
                            )
        const updateStudent = Student
                                .findByIdAndUpdate(
                                    loan.student, 
                                    { pull: { loans: loan._id}}
                                )
        await Promise.all([updateBook, updateStudent])
        return result 
    }
    catch (error){
        return { error }
    }
}

const getStudentUnpaid = async () => {
    try {
        let listStudents = await Student
                            .find()
                            .populate({
                                path: 'loans',
                                match: { returned: false },
                                select: 'student returned'})
                            .select('name address -_id')
        listStudents = listStudents.filter(s => s.loans.length > 0)
        return listStudents
    }
    catch (error){
        return { error }
    }
}

const getStudentPaid = async () => {
    try {
        let listStudents = await Loan
                            .find({ returned: true })
                            .populate({
                                path: 'student',
                                select: 'name address phone'
                            })
        return listStudents
    }
    catch (error){
        return { error }
    }
}

export default {
    addLoan,
    getAllLoans,
    deleteLoan,
    getStudentUnpaid,
    getStudentPaid
}