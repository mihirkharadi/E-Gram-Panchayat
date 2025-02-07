import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
    }
)

export const uploadMultipleImages=async(files,folder='uploads')=>
{
    try {

        if(!files) return null
        const uploadImages=files.map(async(file)=>
        {

       
       const result =await cloudinary.uploader.upload(file.path,{folder});
        
       fs.unlinkSync(file.path)
        return result.secure_url;
    })

    return await Promise.all(uploadImages);
    } catch (error) {
        
        throw new Error("Image upload failed");
        
        
        
    }
}
export default cloudinary;