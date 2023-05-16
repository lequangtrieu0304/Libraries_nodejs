import mongoose from "mongoose"
mongoose.set('strictQuery', true)
export async function connect() {
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("connect mongoose successfully")
        return connection
    }
    catch(error){
        throw new Error('Cannot connect to mongoDB')
    }
}
