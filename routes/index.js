var express =require('express');
var app= express();
var fs = require('fs');
var bodyparser=require('body-parser');
var multer =require('multer');
var upload= multer();
var mongoose= require('mongoose');
var url =require('url');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var  router = express.Router();

mongoose.connect('mongodb://localhost:27017/my_db');
 
var formschema =mongoose.Schema({
    s_no:Number,
    name: String,
    data: String,
    

});

var form = mongoose.model("form",formschema);
var sendschema =mongoose.Schema({
    from:{id:Number,name:String,mail:String},
    to:{id:Number,mail:String},
    name: String,
    data: String,
    });

var send = mongoose.model("send",sendschema);
var feedbackschema =mongoose.Schema({
    s_no:Number,
    feed: String
    
    

});

var feedback = mongoose.model("feedback",feedbackschema);
var countschema =mongoose.Schema({
    count:Number
    

});

var count = mongoose.model("count",countschema);
var sign_upschema =mongoose.Schema({
    s_no:Number,
    fname: String,
    lname: String,
    mbl: String,
    pin: Number,
    mail: String,
    pass: String

});

var sign_up = mongoose.model("sign_up",sign_upschema);
/* GET home page. */
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


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home.html');
  });

  router.get('/add',check_sign_in,function(req,res){
    form.find({s_no:req.session.user.id},function(err,data){
        if(err){throw err;}
        else{
            var note =[],i;
            var struct={
                id:Number,
                name:String,
                data:String
            }
            
            for(i in data){
                
                struct={
                    id:i,
                    name:data[i].name,
                    data:data[i].data
                }
                
                note.push(struct);
            }
            var m={
            note:note
            };
            res.send(m);}});});

router.get('/addname',check_sign_in,function(req,res){
    var a={s_no:req.session.user.id};
    sign_up.find(a,function(err,data){
        var k={fname:data[0].fname,lname:data[0].lname}
        var t=JSON.stringify(k);
        res.write(t);res.end();})});

router.get('/form',check_sign_in,function(req,res){
    qu= url.parse(req.url,true).query;
    console.log(qu);
 var formbody= new form({s_no:req.session.user.id,name:qu.name,data:qu.data});
 formbody.save(function(err,form){if(err){throw err;}});
 res.redirect('/note');});

 app.get('/delete',check_sign_in,function(req,res){var i;  
    ur =url.parse(req.url,true).query;
   
   var no= ur.index;
   
   form.find({s_no:req.session.user.id},function(err,data){
        if(err){ throw err;}
       else{ var j;
           for(j in data){if(j==no){
               
               var i=data[j].id; 
               form.findByIdAndRemove(i,function(err,dat){if(err){throw err;}else{ }});
               res.send('');}}}});});

router.get('/update',check_sign_in,function(req,res){var i;  
            ur =url.parse(req.url,true).query;
           var no= ur.index;
           var nam =ur.name;
           var dat= ur.data;

           var d={s_no:req.session.user.id,name : nam,data: dat};
           form.find({s_no:d.s_no},function(err,data){
                if(err){ throw err;}
               else{ var j;
                   for(j in data){
                       if(j==no){ var    i=data[j].id; 
                           form.findByIdAndUpdate(i,d,function(err,dat){
                               if(err){throw err;}
                               else{ }});
                           res.send('');}}}});});



       

 router.get("/log-in/login-form?",function(req,res){
   qu= url.parse(req.url,true).query;
   var flag =0;
   var a={mail:qu.mail,pass:qu.pass};
   var id;
   sign_up.find(a,function(err,response){
       if(err){throw err;}
       if(response[0]==null){flag=1; }  
       else{id=response[0].s_no;}
       if(flag==1){
       res.redirect('/log-in'); }
   else{
      var b= {id:id,password:response[0].pass};
       req.session.user=b;
       var name=response[0].fname+''+response[0].lname;
    
       res.redirect('/note');}});
 });

 router.post("/g_check",function(req,res){
   qu= url.parse(req.url,true).query;
   var flag =0;
   var a={mail:qu.mail};
  sign_up.find(a,function(err,response){
       if(response[0]==null){flag=1; }         
   if(flag==1){res.write('1');res.end();}
   else{ res.write('0');res.end();}
   });
 });

 router.get("/log-in/sign-up-form?",function(req,res){
   qu= url.parse(req.url,true).query;
   var flag =0;
   var a={mail:qu.mail};
   sign_up.find(a,function(err,response){
       if(response[0]==null){flag=1;}
if(flag==1){
    var c;
     count.find({},function(err,data){
          c=data[0].count+1;
         var co={count:c};
       count.updateMany({},co,function(err,data){
             if(err){throw err;}
    
var formbody= new sign_up({
         s_no:c,
       fname: qu.fname,
       lname: qu.lname,
       mbl: qu.mbl,
       pin: qu.pin,
       mail: qu.mail,
       pass: qu.pass
       });
   
   formbody.save(function(err,sign_up){
       if(err){throw err;}
   }); });
   var b= {id:c,password:qu.pass};
       req.session.user=b;
       res.redirect('/note');
   });
   }
     else{res.redirect('/log-in/sign-up');}});
});

 
router.get("/feedback",function(req,res){
    var qu=url.parse(req.url,true).query;
    var a=new feedback({
       s_no:req.session.user.id,
       feed:qu.feedback
    });
    
    a.save(function(err,feedback){
       if(err){throw err;}
    });
    res.redirect('/note');
     });
     function check_feed(req,res,next){
           if(req.session.user.id==1){
               next();
           
       }
       else{res.redirect('/log-in');}
    
    }
    
router.get("/add_feed",check_feed,function(req,res){
   var t,m,k;
   
   feedback.find({},function(err,data){
       if(err){throw err;}
       else{var records=[];
           
           for(t in data){
               m={
                   
                   s_no:data[t].s_no,
                   feed:data[t].feed
               };records.push(m);}}
 var s={f:records};
           k=JSON.stringify(s); 
       res.write(k);
   res.end();       }); 
 
});

router.get('/add_send',check_sign_in,function(req,res){
   var qu=url.parse(req.url,true).query;
  
  sign_up.find({s_no:req.session.user.id},function(err,from_data){
      if(err){throw err;}
     
      sign_up.find({mail:qu.to_mail},function(err,to_data){
       if(err){throw err;}
       
     
       var formsend =new send({
           from:{id:from_data[0].s_no,name:from_data[0].fname,mail:from_data[0].mail},
           to:{id:to_data[0].s_no,mail:to_data[0].mail},
           name: qu.name,
           data: qu.data,});
           formsend.save(function(et,send){
               
               if(et){throw et;}
               res.send('succesfully add');
           });
      });

  });
});
router.get('/find_send',check_sign_in,function(req,res){
    sign_up.find({s_no:req.session.user.id},function(err,sign){
        var k={to:{id:req.session.user.id,mail:sign[0].mail}}
        
send.find(k,function(err,data){
   
   var m={send:data};
   
   res.send(m);
   
});});
});
  module.exports =router;