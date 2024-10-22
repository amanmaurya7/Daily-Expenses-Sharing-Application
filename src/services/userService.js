const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const userService = {
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  },

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = await this.generateAuthToken(user);
    return { user, token };
  },

  async generateAuthToken(user) {
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return token;
  }
};