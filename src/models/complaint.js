import mongoose from "mongoose";

const complaintSchema=new mongoose.Schema({
    
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
         },
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
    },

    status:
    {
        type:String,
        required:true,
        enum:['pending','resolved'],
        default:'pending'

    },
    resolveAt:
    {
        type:Date,
        default:null,
        
    },
    createdAt:
    {
        type:Date,
        default:Date.now
    }
     
});
complaintSchema.index({ resolveAt: 1 }, { expireAfterSeconds: 172800 });
export default mongoose.model('Complaint',complaintSchema) 