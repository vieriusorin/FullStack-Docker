import express from 'express';
const passport = require('passport');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    failureRedirect: '/login',
  })
)

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))


export { router as googleLoginRouter }