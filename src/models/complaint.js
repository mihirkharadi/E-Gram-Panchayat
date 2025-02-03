import mongoose from "mongoose";

const complaintSchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },

    contactDetail:
    {
       type:String,
       required:true,
    },

    complaint:
    {
        type:String,
        required:true,
    }
     
},{timestamps:true});

export default mongoose.model('Complaints',complaintSchema) 