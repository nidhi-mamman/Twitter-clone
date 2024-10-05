import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    }
    ,
    username:{
        type:String,
        requied:true,
        unique:true
       
    }
    ,
    password:{
        type:String,
        requied:true
    },
    followers:{
        type:Array,
        default:[]
    },
    following: {
        type: Array,
        default: []
    },
    bookmarks: {
    type: Array,
    default: []

}
},{timestamps:true})

export const User = mongoose.model("User",UserSchema)