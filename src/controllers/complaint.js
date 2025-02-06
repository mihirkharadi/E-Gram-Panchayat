import Complaint from "../models/complaint.js";
import mongoose from "mongoose";

export const complaintAdd=async(req,res)=>
{
    try {
        
        
        
        const{name,contactDetail,complaint}=req.body;
       const userId=req.user.id;

       if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid User ID' });
    }

        const complaintDetail=new Complaint({
            userId: new mongoose.Types.ObjectId(userId),
            name,
            contactDetail,
            complaint});
           
            
            
        await complaintDetail.save();
        res.status(201).json({message:'Complaint submitted successfully',Complaint:complaintDetail})
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const complaintAll=async(req,res)=>
{

    try {

        if(req.user.role==="staff")
        {
            const complaints=await Complaint.find();
            res.json(complaints);

        }
        else{
           
            const userId = new mongoose.Types.ObjectId(req.user.id);
        const complaintDetails=await Complaint.find({ userId}) ;
        
        
        res.status(200).json(complaintDetails);
        }
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
    
}

export const ComplaintResolve=async(req,res)=>
{
    try {
       const complaintId=req.params.id;
       
       const updatedComplaint=await Complaint.findByIdAndUpdate(
        complaintId,
        {
            status:'resolved',
            resolveAt:new Date()
        },
        {new:true},
       )

       if(!updatedComplaint)
       {
        return res.status(404).json({error:'Complaint not found'});

       }
       res.json({message:'Complaint resolved successfully',complaint:updatedComplaint})


    } catch (error) {
        console.error('Error resolving successfully',error);
        res.status(500).json({error:"Internal server error"});
    }
}