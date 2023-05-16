import express from 'express'
const router = express.Router()

import studentController from './student.controller.js'

router.post('/create-student', studentController.addStudent)

router.get('/fetch-all', studentController.getAllStudents)

router.delete('/delete-student/:id', studentController.deleteStudent)

export default router