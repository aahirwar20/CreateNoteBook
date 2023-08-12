import 'dotenv/config';
const GOOGLE_CLIENT_ID = process.env.GOOGLEID;                                                 //Write Google Client Id 
const GOOGLE_CLIENT_SECRET = process.env.GOOGLESECRET;  
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
                                 //Write Google Client Secret Key 
import userController from '../controller/user.js'

if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not provided.');
}

if (!GOOGLE_CLIENT_SECRET) {
    throw new Error('Google Client Secret not provided.');
}

export default async(passport) => {
    passport.serializeUser(function(user, cb) {
        cb(null, user);
      });
      
    passport.deserializeUser(function(obj, cb) {
       cb(null, obj);
    });    
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/user/log-in/google/callback",
        passReqToCallback : true
        },
        userController.google_login
    ))
}
