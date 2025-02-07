
import Application from "../models/application.js"
import {uploadMultipleImages} from '../utils/cloudinary.js'

export const userApplication=async(req,res)=>
{
    try {
        const{email,address,name,phone,pinCode}=req.body;

        const uploadedImages=await uploadMultipleImages(req.files,'documents');
       
       
      if(!uploadedImages ||uploadedImages.length===0)
      {
        return res.status(400)
        .json({message:"No images uploaded"})
      }


      const documentData = uploadedImages.map((url) => ({ url }));


        const newApplication=new Application({
            name,
            email,
            address,
            phone,
            pinCode,
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
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
