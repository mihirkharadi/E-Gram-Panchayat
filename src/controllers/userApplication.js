

import Application from "../models/application.js"
import {uploadMultipleImages} from '../utils/cloudinary.js'
import mongoose from "mongoose";

export const userApplication=async(req,res)=>
{
    try {
        const{email,address,name,phone,pinCode,status}=req.body;
        const userId=req.user.id;
 if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid User ID' });
    }
        const uploadedImages=await uploadMultipleImages(req.files,'documents');
       
       
      if(!uploadedImages ||uploadedImages.length===0)
      {
        return res.status(400)
        .json({message:"No images uploaded"})
      }


      const documentData = uploadedImages.map((url) => ({ url }));


        const newApplication=new Application({
             userId: new mongoose.Types.ObjectId(userId),
            name,
            email,
            address,
            phone,
            pinCode,
            status,
            documents:documentData,

        })

        await newApplication.save();

        return res.status(201)
        .json(
            {message:'Application submitted successfully',Application:newApplication}
        )
    } catch (error) {
       
        
        
        
        res.status(500).json({ error: error.message });
    }
}

export const getApplications = async (req, res) => {
    try {
        if (req.user.role!=='user') {
            const applications = await Application.find();
            res.status(200).json(applications);
            
        }
       else
       {
        const userId=new mongoose.Types.ObjectId(req.user.id);
        const userApplication=await Application.find({userId});
         res.status(200).json(userApplication);
        
       }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const staffVerify=async(req,res)=>
{
    try {
        const {userId}=req.params;
        const{status}=req.body;
       
        if (!["staff_verified", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
          }
        
        const application = await Application.findOneAndUpdate(
            { _id: userId, status: "pending" },
            { status }, 
            { new: true } 
        );
        
      if (!application) return res.status(404).json({
            error:"Application not found or status already verify"
        }) ;
   
         res.status(200).json({message:"Application Verified",application})
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
   

}
export const adminVerify=async (req,res) => {

    try {
        
        const {userId}=req.params;
         
        const{status}=req.body;
       
        if (!["officer_approved", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
          }
        
        const application = await Application.findOneAndUpdate(
            { _id: userId, status: "staff_verified" },
            { status }, 
            { new: true } 
        );
        if (!application) return res.status(404).json({error:'application not found or not verify by staff'}) ;
         

       
        res.status(200).json({
            message:"Application approved", application
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}

export const staffRejected=async (req,res) => {


    try {
        const{userId}=req.params;
    const{status,remarks}=req.body;
    if(remarks==="")
    {
        return res.status(400).json({error:"pls enter remarks "})
    }
    if (!["rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      
    
    const application = await Application.findOneAndUpdate(
        { _id: userId, status: "pending",remarks:"Nothing" },
        { status ,remarks}, 
        { new: true } 
    );
    if (!application) return res.status(404).json({error:'application not found '}) ;
    res.status(200).json({
        message:"Application rejected", application
    })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
    


    
}
export const adminRejected=async (req,res) => {


    try {
        const{userId}=req.params;
    const{status,remarks}=req.body;
    if(remarks==="")
    {
        return res.status(400).json({error:"pls enter remarks "})
    }
    if (!["rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      
    
    const application = await Application.findOneAndUpdate(
        { _id: userId, status: "staff_verified",remarks:"Nothing" },
        { status ,remarks}, 
        { new: true } 
    );
    if (!application) return res.status(404).json({error:'application not found '}) ;
    res.status(200).json({
        message:"Application rejected", application
    })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
    


    
}