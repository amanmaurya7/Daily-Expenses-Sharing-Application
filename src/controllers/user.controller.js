import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export class UserController {
  static async register(req, res) {
    try {
      const user = await User.create(req.body);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getUserDetails(req, res) {
    res.json(req.user);
  }
}
