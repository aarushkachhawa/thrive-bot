const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
async function getAllUsers() {
  return await prisma.user.findMany();
}

// Create a new user
async function createUser(userData) {
  return await prisma.user.create({
    data: userData
  });
}

module.exports = {
  getAllUsers,
  createUser
};
