const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {

  try {
    // Check if a user is logged in based on your session configuration
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      });
    }

    // Fetch user details from the database
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      });
    }

    // Attach user details to the request object for further use in routes
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};

