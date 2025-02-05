import express from "express";
import{login,signUp,forgotPassword} from '../controllers/userController.js';
import authMiddleware from "../middlewares/authMiddleware.js";
import { admin,getAdminProfile } from "../controllers/adminController.js";
import { staff, getStaffProfile } from "../controllers/staffController.js";
import { schemeAdd ,schemeAll ,schemeDelete } from "../controllers/schemeController.js";
import { complaintAdd , complaintAll ,ComplaintResolve} from "../controllers/complaint.js";

import User from '../models/user.js'


const router=express.Router();

router.post('/login',login);


router.post('/signup',signUp);

router.post('/forgotPassword',forgotPassword);
router.get('/profile',  authMiddleware,async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/admin-login', admin); 

router.get('/admin-profile', authMiddleware, getAdminProfile);

router.post('/staff-login' ,staff);

router.get('/staff-profile',authMiddleware,getStaffProfile);

router.post('/scheme-add',schemeAdd);

router.get('/scheme-all',schemeAll);

router.delete('/delete/:id',schemeDelete);

router.post('/complaint-add',authMiddleware,complaintAdd);

router.get('/complaint-all',authMiddleware,complaintAll);

router.put('/complaints/:id/resolve',ComplaintResolve);

export default router;