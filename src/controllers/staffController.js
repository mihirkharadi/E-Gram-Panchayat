import 'dotenv/config';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { role, staffEmail,staffName,staffPassword,staffRole } from '../config/admin.js';


export const staff=async(req,res)=>
{
    try{
        const{email,password}=req.body;


        if(email!==staffEmail)
        {
            return res.status(401).json({message:"Invalid Credential"})
        }
       
        const isPass=await bcrypt.compare(password,staffPassword);

        if(!isPass)
        {
              return res.status(401).json({message:'Invalid Credential'})
        }

        const token=jwt.sign(
        {email:staffEmail,role:staffRole},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
        );

        return res.json({
            success:'true',
            message:'login successful',
            token:token,
            staff:{
                name:staffName,
                email:staffEmail,
                role:role,
            },
        })
    }
    catch(error)
    {
        console.error('Error during admin login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}


export const getStaffProfile=async(req,res)=>
{
    try
    {
        return res.json({
            success:true,
            staff:
            {
                name:staffName,
                role:role,
                 email:staffEmail,
            }
        })
    }
    catch(error)
    {
        console.error('Error fetching admin profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}