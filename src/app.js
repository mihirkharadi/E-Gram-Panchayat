import express from 'express';

import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';

const app=express();
app.use(express.json());
app.use(cors());

app.use('/api/users',userRoutes);

const PORT=process.env.PORT||2000;
app.listen(PORT,()=>
{
    console.log(`Server running on http://localhost:${PORT}`);
    
});