const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users - Get all users
router.get('/', (req, res) => {
  console.log('GET /api/users endpoint hit');
  res.json([]); // Return empty array for now
});

// POST /api/users - Create a new user
router.post('/', userController.createUser);

module.exports = router;
