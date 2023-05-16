import { BAD_REQUEST } from "../exceptions/Bad_Request.js"
import { Student } from "../models/index.js"

const addStudent = async ({name, majors, address, phone}) => {
    try {
        const student = new Student({ name, majors, address, phone })
        const result = await student.save()
        if(!result) 
            throw new BAD_REQUEST('Luu that bai')
        return result
    }
    catch (error){
        return { error }
    }
}

const getAllStudents = async () => {
    try {
        const listStudents = await Student.find({}).populate('loans')
        return listStudents
    }
    catch (error){
        return { error }
    }
}

const deleteStudent = async (id) => {
    try {
        const student = await Student.findById(id)
        const result = await student.deleteOne()
        if(result){
            throw new BAD_REQUEST('Xoa thanh cong')
        }
        return result
    }
    catch (error){
        return { error }
    }
}

export default {
    addStudent,
    getAllStudents,
    deleteStudent
}