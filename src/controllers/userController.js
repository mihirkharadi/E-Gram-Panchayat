import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({ name, email, password: hashedPassword, role: role || 'user' });


    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

 
    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const{role,id}=user;
    res.json({ token, user:{role,id} });
    console.log(user.id);
    
   
    
  
    
    
    
 
 
  
    
    
    
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

  
    user.password = hashedPassword;
    await user.save();

    
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error during forgot password:', error); // Logging error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};
