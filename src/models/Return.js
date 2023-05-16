import mongoose from "mongoose"
import { format } from "date-fns"

const returnSchema = new mongoose.Schema({
    loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
    returnDate: { type: String, default: format(new Date(), 'yyyy-MM-dd')}
});

const Return = mongoose.model('Return', returnSchema)

export default Return