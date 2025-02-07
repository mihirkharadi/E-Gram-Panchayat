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
staffRemarks:
{
    type:String,
    default:'Nothing',
},
adminRemarks:
{
    type:String,
    default:"Nothing",
}






},{timestamps:true})

export default mongoose.model('Application',userSchemeAppSchema);