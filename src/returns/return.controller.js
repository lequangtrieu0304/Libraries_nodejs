import returnService from "./return.service.js"

const createReturn = async (req, res, next) => {
    try {
        const { loan_id, bookArr } = req.body
        const result = await returnService.createReturn({ loan_id, bookArr })
        if(result.error)
            throw result.error
        return res.status(201).json({
            message: 'Tra sach thanh cong',
            data: result
        })
    }
    catch (error) {
        next(error)
    }
}

export default {
    createReturn
} 