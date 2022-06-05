var express=require('express');
var  router = express.Router();
var passport = require('passport');
var {mongoose,sign_up,count}=require('./mongoose');
var userProfile =[];


router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'Google_Clint_ID.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'GOOGLE_SECRET';
var b;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3450/log-in/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile.push(profile);
      
      b= {id:profile.id,password:profile.emails[0].value};
      return done(null, userProfile);
  }
));
router.get('/log-in/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }),function(req,res){});
 

 
router.get('/log-in/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    
    
    // Successful authentication, redirect success.
    res.redirect('/g_sign');
    
  });

  router.get('/g_sign',function(req,res){
    
    function check_gmail(profile){
      if(profile.emails[0].value==b.password){
          return profile;
      }
    }
    var t=userProfile.find(check_gmail)
    
    if(t.emails[0].verified){
      sign_up.find({pass:t.id,mail:t.emails[0].value},function(err,data){
          if(data.length==0){
            console.log(t);
            var c;
     count.find({},function(err,data){

         if(data.length==0){
             var formcount=new count({count:1});
             formcount.save(function(err,data){
                 if(err){throw err;}
             });
             c=1;
         }
         else{
          c=data[0].count+1;
         var co={count:c};
       count.updateMany({},co,function(err,data){
             if(err){throw err;}})}
    
      var formbody= new sign_up({
        s_no:c,
       fname: t.name.givenName,
       lname: t.name.familyName,
       mbl: '',
       pin: '',
       mail: t.emails[0].value,
       pass: t.id
       });
   
         formbody.save(function(err,sign_up){
       if(err){throw err;}
         }); 
      var k= {id:c,password:t.id};
       req.session.user=k;
       res.redirect('/note');
           });
          }
 else{
              req.redirect('/note');
          }
      
    }) }})



module.exports=router;
