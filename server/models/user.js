const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
async function getAllUsers() {
  return await prisma.user.findMany();
}

// Create a new user
async function createUser(data) {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name
    }
  });
}

module.exports = {
  getAllUsers,
  createUser
};
