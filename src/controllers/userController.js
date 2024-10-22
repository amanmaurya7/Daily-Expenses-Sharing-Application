const userService = require('../services/userService');

const userController = {
  async register(req, res) {
    try {
      const user = await userService.createUser(req.body);
      const token = await userService.generateAuthToken(user);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.loginUser(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};