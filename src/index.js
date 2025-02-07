import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';


const app=express();
dotenv.config();
app.use(express.json());
app.use(cors
    ({
        origin:"*",
        credentials: true,
        methods: 'GET,POST,PUT,DELETE,PATCH',
        allowedHeaders: 'Content-Type,Authorization'
    })
);
app.use('/api/users',userRoutes);

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log('Database Connected Successfully');
        
    }
    catch(error)
    {
        console.log('Db connection error :',error.message);
        process.exit(1);
        
    }
}

app.get('/',(req,res)=>{
    res.send('Welcome to E gram Panchayat');
})

const PORT=process.env.PORT ||3000;



const startServer=async()=>
{
    await connectDB();
    app.listen(PORT ,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

startServer();