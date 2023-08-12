import express from "express";
var  router = express.Router();
import passport from "passport";
import passportConfig from '../utils/passportConfig.js'
await passportConfig(passport)
import userController from '../controller/user.js'
import { invalidateAccess } from "../controller/auth.js";

router.post('/login', userController.local_login)

router.post('/signUp', userController.register)

router.route('/logout')
      .get( invalidateAccess )

router.get('/log-in/google', 
passport.authenticate('google', { scope : ['profile', 'email'],prompt:"select_account" }),function(req,res){});

router.get('/log-in/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    req.session.userInfo = { id: req.user._id }
    // Successful authentication, redirect success.
    res.redirect('/dashboard');  
});

export default router;
