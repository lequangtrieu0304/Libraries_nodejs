import mongoose from "mongoose"
import Loan from "../loans/loan.model.js"

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    copies: { type: Number, default: 0 },
    loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
    numsLoan: { type: Number, default: 0 },
})

bookSchema.pre('deleteOne', { document: true }, async function(next) {
    const loans = await Loan.find()
    loans.forEach(async loan => {
        loan.books = loan.books.filter((book) =>  book.toString() !== (this._id).toString())
        await loan.save()  
    })
    next()
})

const Book = mongoose.model('Book', bookSchema)
export default Book 