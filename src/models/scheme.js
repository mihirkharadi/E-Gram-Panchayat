import mongoose from "mongoose";

const schemeSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    name:
    {
        type:String,
        required:true,
       

    },
    eligibility:
    {
        type:String,
        required:true,
       
    },
    lastDate:
    {
        type:String,
        required:true,

    },
    reqDocuments:
    {
        type:String,
        required:true,
    },
  



},{timestamps:true});

export default mongoose.model('Schemes',schemeSchema);

