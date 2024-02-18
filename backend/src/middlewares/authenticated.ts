import { passportGoogle } from './passport';

import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {

  if (req.isAuthenticated()) {
    // Generate a JWT token with user data
    const token = jwt.sign({ userId: req.user.id }, process.env.SESSION_SECRET, { expiresIn: '48h' });

    // Set the cookie with secure flag in production
    res.cookie('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      maxAge: 3600000, // 1 hour
    });


    next();
  } else {
    // Redirect to login page or handle unauthenticated access
    res.redirect('/login');
  }
};
