import loanService from "./loan.service.js"

const addLoan = async (req, res, next) => {
    try {
        // debugger
        const { student, books, returnDate } = req.body
        const result = await loanService.addLoan({student, books, returnDate})
        if(result.error)
            throw result.error
        return res.status(201).json({
            message: 'Muon thanh cong',
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}

const getAllLoans = async (req, res, next) => {
    try {
        const result = await loanService.getAllLoans()
        if(result.error)
            throw result.error
        return res.status(200).json(result)
    }
    catch (error){
        next(error)
    }
}

const deleteLoan = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await loanService.deleteLoan(id)
        if(result.error)
            throw result.error
        return res.status(200).json({
            message: 'Da xoa',
            data: result
        })
    }
    catch (error){
        next(error)
    }
}

const getStudentUnpaid = async (req, res, next) => {
    try {
        const result = await loanService.getStudentUnpaid();
        if(result.error)
            throw result.error
        return res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }
}

const getStudentPaid = async (req, res, next) => {
    try {
        const result = await loanService.getStudentPaid();
        if(result.error)
            throw result.error
        return res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }
}

export default {
    addLoan,
    getAllLoans,
    deleteLoan,
    getStudentUnpaid,
    getStudentPaid
}