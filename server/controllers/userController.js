const userModel = require('../models/user');

// Get all users
async function getUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    
    console.log('Received create user request:', { name, email });
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const newUser = await userModel.createUser({ name, email });
    console.log('User created successfully:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Detailed error creating user:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ error: `Failed to create user: ${error.message}` });
  }
}

module.exports = {
  getUsers,
  createUser
};
