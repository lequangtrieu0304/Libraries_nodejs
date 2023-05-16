import express from 'express'
const router = express.Router()

import { loanController } from '../controllers/index.js'

router.post('/create-loan', loanController.addLoan)

router.get('/fetch-all', loanController.getAllLoans)

router.get('/fetch-unpaid', loanController.getStudentUnpaid)

router.get('/fetch-paid', loanController.getStudentPaid)

router.delete('/delete-loan/:id', loanController.deleteLoan)

export default router