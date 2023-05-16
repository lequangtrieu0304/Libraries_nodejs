import { studentService } from "../services/index.js";

const addStudent = async (req, res, next) => {
    try {
        const { name, majors, address, phone } = req.body
        const student = await studentService
                    .addStudent({ name, majors, address, phone})
        if(student.error)
            throw student.error
        return res.status(201).json({
            message: 'Them thanh cong',
            data: student
        })
    }
    catch (error){
        next(error)
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const listStudents = await studentService.getAllStudents()
        if(listStudents.error)
            throw listStudents.error
        return res.status(201).json(listStudents)
    }
    catch(error){
        next(error)
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await studentService.deleteStudent(id)
        if(result.error)
            throw result.error
        return res.status(200).json({
            message: 'Xoa thanh cong'
        })
    }
    catch(error){
        next(error)
    }
}


export default {
    addStudent,
    getAllStudents,
    deleteStudent
} 