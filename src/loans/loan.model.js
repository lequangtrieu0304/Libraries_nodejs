import mongoose from "mongoose"
import { format } from "date-fns";

const loanSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true }],
    returnBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan', require: true }],
    loanDate: { type: String, default: format(new Date(), 'yyyy-MM-dd')},
    returnDate: { type: String },
    returned: { type: Boolean, default: false }
});
  
const Loan = mongoose.model('Loan', loanSchema)

export default Loan
