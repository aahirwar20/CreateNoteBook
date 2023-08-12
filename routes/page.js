import {validateAdmin} from '../controller/auth.js'
import express from "express";
var  router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home.html');
})

router.get('/dashboard' ,function(req, res){                       //send main user page
     res.render('start.html')
});

router.get("/signUp",function(req, res){                      //sign up pages
    res.render('sign-up.html');
})

router.get("/login",function(req, res){                      //sign up pages
    res.render('log-in.html');
})

router.get("/about",function(req, res){                      //sign up pages
    res.render('about.html');
})

router.get("/feed_check", validateAdmin, function(req,res){                      //feed back page
    res.render('feedback.html');
});

export default router
