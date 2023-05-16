import mongoose from "mongoose"
import Loan from "../loans/loan.model.js";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    majors: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
    loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
    fine: { type: Number, default: 0.0 }
});

studentSchema.pre('deleteOne', { document: true }, async function(next){
    await Loan.deleteOne({ student: this._id })
    next()
})
  
const Student = mongoose.model('Student', studentSchema)
export default Student