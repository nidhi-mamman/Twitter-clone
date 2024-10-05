import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({
    path:"../Config/.env"
})
const dataconnect=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database connected")       
    }).catch((error)=>{
        console.log(error)       
    })
}
export default dataconnect;
