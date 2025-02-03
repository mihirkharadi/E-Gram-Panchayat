import Complaints from "../models/complaint.js";

export const complaintAdd=async(req,res)=>
{
    try {
        const{name,contactDetail,complaint}=req.body;

        const complaintDetail=new Complaints({name,contactDetail,complaint});
        await complaintDetail.save();
        res.status(201).json({message:'Complaint submitted successfully',complaintDetail})
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const complaintAll=async(req,res)=>
{

    try {
        const complaintDetails=await Complaints.find();
    res.status(200).json(complaintDetails);
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
    
}