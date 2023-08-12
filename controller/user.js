import User from '../model/user.model.js'
import StatusCode from 'http-status-codes'

export default {
  google_login,
  register,
  local_login
}

async function register(req, res, next){
  try{
    let userParam = req.body
    const user = await User( userParam )
    const data = await user.save()
    req.session.userInfo = { id: user._id }
    res.redirect('/dashboard')
  }catch(error){
    next(error)
  }
}

async function local_login(req, res, next){
  try{
    const {mail, pass} = req.body
    const user = await User.find({mail: mail, pass: pass})
    if(!user){
      const error = new Error('log in failed')
      throw error
    }
    req.session.userInfo = { id: user[0]._id.toString() }
    res.redirect('/dashboard')
  }catch(error){
    console.error('Login error:', error);
    res.status(401).send('Login failed');
  }
}

async function google_login(request, accessToken, refreshToken, profile, done){
    try {
        let existingUser = await User.findOne({ method: 'google',socialId: profile.id });
        
        if (existingUser) {
          return done(null, existingUser);
        }
         
        console.log('Creating new user...');
        const newUser = new User({
            method: 'google',
            socialId: profile.id,
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            mail: profile.emails[0].value
        });
        await newUser.save();
        return done(null, newUser);
    } catch (error) {
        return done(error, false)
    }
}