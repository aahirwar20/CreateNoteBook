var express =require('express');
var app= express();
var multer =require('multer');
var upload= multer();
var mongoose= require('mongoose');
var url =require('url');

var  router = express.Router();
function check_sign_in(req,res,next){
    if(req.session.user){next();}
    else{res.redirect('/log-in');}

}
function check_feed(req,res,next){
    if(req.session.user.id==1){
        next();
    
}
else{res.redirect('/log-in');}

}




router.get("/log-in",function(req,res){
      res.render('log-in.html');                    });
                        
router.get('/note',check_sign_in,function(req,res){
    var a=req.session.user.id;
    if(a==1){
       res.render('admin.html');
    }
    else{
     res.render('start.html');}
});

router.get("/log-in/sign-up",function(req,res){
   res.render('sign-up.html');
  });
 
  router.get("/log-out",function(req,res){
    
    req.session.destroy(function(){
        res.redirect('/log-in'); 
    });
  
  
  });
 router.get("/feed_check",check_feed,function(req,res){
    res.render('feedback.html');
 });

 module.exports =router;
      
