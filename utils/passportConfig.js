import 'dotenv/config';
const GOOGLE_CLIENT_ID = process.env.GOOGLEID;                                                 //Write Google Client Id 
const GOOGLE_CLIENT_SECRET = process.env.GOOGLESECRET;  
import {LOCAL_URL, BACKEND_URL} from '../const/url.js'

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
                                 //Write Google Client Secret Key 
import userController from '../controller/user.js'

async function generateCallback(){
    const ENV = process.env.ENV
    console.log('ENV:'+ENV);
    if(ENV === 'STAGE'){
        return BACKEND_URL+'user/log-in/google/callback'
    }
    else{
        return LOCAL_URL+'user/log-in/google/callback'
    }
}


if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not provided.');
}

if (!GOOGLE_CLIENT_SECRET) {
    throw new Error('Google Client Secret not provided.');
}

export default async(passport) => {
    const callbackURL = await generateCallback()
    passport.serializeUser(function(user, cb) {
        cb(null, user);
      });
      
    passport.deserializeUser(function(obj, cb) {
       cb(null, obj);
    });    
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://www.creativenotebook.me/user/log-in/google/callback',
        passReqToCallback : true
        },
        userController.google_login
    ))
}
