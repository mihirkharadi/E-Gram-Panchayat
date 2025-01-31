import express from "express";
import{login,signUp,forgotPassword} from '../controllers/userController.js';



const router=express.Router();

router.post('/login',login);

router.post('/signup',signUp);

router.get('/forgot-password',forgotPassword);

export default router;