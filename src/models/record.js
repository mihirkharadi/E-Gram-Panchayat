import mongoose from "mongoose";

const recordSchema=new mongoose.Schema({
    recordId:{
        type:String,
        required:true,
        unique:true,
    },
    staffName:
    {
        type:String,
        required:true,
    },
    taskCompletedDate:
    {
        type:String,
        required:true,
    },
    taskDescription:
    {
        type:String,
        required:true,
    },
    cost:
    {
        type:String,
        required:true,
    },
})

export default mongoose.model('record',recordSchema);