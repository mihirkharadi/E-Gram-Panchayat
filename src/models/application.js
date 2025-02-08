import mongoose from "mongoose";
import {adminName,staffName} from "../config/admin.js"

const userSchemeAppSchema=new mongoose.Schema({

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
phone:
{
    type:String,
    required:true,

},
email:
{
    type:String,
    required:true,
},
address:
{
    type:String,
    required:true,
},
pinCode:
{
    type:String,
    required:true,
},
documents:[
   {
       url:{type:String,required:true} ,
   },
 ],

status:
{
    type:String,
    enum:['pending','staff_verified','officer_approved','rejected'],
    default:'pending', 
},
staffVerifiedBy:
{
    type:String,
    ref:'User',
    default:staffName,
},
adminApprovedBy:
{
    type:String,
    ref:'User',
    default:adminName,
},
remarks:
{
    type:String,
    default:'Nothing',
},
expiresAt:
{
    type: Date, default: null, index: { expires: 86400 }
}


},{timestamps:true})


userSchemeAppSchema.pre("save", function (next) {
    if (this.status === "officer_approved") {
      this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); 
    }
    next();
  });

export default mongoose.model('Application',userSchemeAppSchema);