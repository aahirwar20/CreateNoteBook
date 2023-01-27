var express =require('express');
var app= express();
var fs = require('fs');
var bodyparser=require('body-parser');
var multer =require('multer');
var upload= multer();
var {mongoose,sign_up,count,count,form,send,feedback}=require('./mongoose');
var url =require('url');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//const nodemailer =require("nodemailer");
var mailTranspoter=require('./mail');
var  router = express.Router();


 


/* GET home page. */
function check_sign_in(req,res,next){                           //function for checking sign in of user 
    if(req.session.user){next();}
    else{res.redirect('/log-in');}

}
function check_feed(req,res,next){                                 //check admin
    if(req.session.user.id==1){
        next();
    
}
else{res.redirect('/log-in');}

}


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home.html');
  });


router.get('/add',check_sign_in,function(req,res){                       //find users  notebooks 
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

router.get('/addname',check_sign_in,function(req,res){                           //
    var a={s_no:req.session.user.id};
    sign_up.find(a,function(err,data){
        var k={fname:data[0].fname,lname:data[0].lname}
        var t=JSON.stringify(k);
        res.write(t);res.end();})});

router.get('/form',check_sign_in,function(req,res){                        // req add new notebook
    qu= url.parse(req.url,true).query;
    console.log(qu);
 var formbody= new form({s_no:req.session.user.id,name:qu.name,data:qu.data});
 formbody.save(function(err,form){if(err){throw err;}});
 res.redirect('/note');});

router.get('/delete',check_sign_in,function(req,res){var i;  
    ur =url.parse(req.url,true).query;
   
   var no= ur.index;
   
   form.find({s_no:req.session.user.id},function(err,data){
        if(err){ throw err;}
       else{ var j;
           for(j in data){if(j==no){
               
               var i=data[j].id; 
               form.findByIdAndRemove(i,function(err,dat){if(err){throw err;}else{ }});
               res.send('');}}}});});

router.get('/update',check_sign_in,function(req,res){var i;               //req for update notebook
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



       

 router.get("/log-in/login-form?",function(req,res){                     //for login form
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

router.post("/g_check",function(req,res){                     //sign up throw google
   qu= url.parse(req.url,true).query;
   var flag =0;
   var a={mail:qu.mail};
  sign_up.find(a,function(err,response){
       if(response[0]==null){flag=1; }         
   if(flag==1){res.write('1');res.end();}
   else{ res.write('0');res.end();}
   });
 });

 router.get("/log-in/sign-up-form?",function(req,res){                           //sign up form
   qu= url.parse(req.url,true).query;
   var flag =0;
   var a={mail:qu.mail};
   sign_up.find(a,function(err,response){
       if(response[0]==null){flag=1;}
if(flag==1){
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
         console.log("hello");
          c=data[0].count+1;
         var co={count:c};
       count.updateMany({},co,function(err,data){
             if(err){throw err;}})}
    
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
   });
   var b= {id:c,password:qu.pass};
       req.session.user=b;
       res.redirect('/note');
});
}
     else{res.redirect('/log-in/sign-up');}});
});

 
router.get("/feedback",function(req,res){                                     //store new feedback
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
     
    
router.get("/add_feed",check_feed,function(req,res){                    //take all store feedback
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

router.get('/add_send',check_sign_in,function(req,res){                                //send notebook to mail
   var qu=url.parse(req.url,true).query;
   let mailDetails={
    from:"ankitahirwarvinod2@gmail.com",
    to:qu.to_mail,
    subject:"test",
    text:"nice to me"+qu.name+' '+qu.data+' ',
   };
  mailTranspoter.sendMail(mailDetails,function(err,data){
    if(err){throw err;}
    else{console.log("email sent succefully")}
  });
  res.send('succesfully add');
  /*sign_up.find({s_no:req.session.user.id},function(err,from_data){
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

  });*/
});
router.get('/find_send',check_sign_in,function(req,res){                         //give user sent notebook
    sign_up.find({s_no:req.session.user.id},function(err,sign){
        var k={to:{id:req.session.user.id,mail:sign[0].mail}}
        
send.find(k,function(err,data){
   
   var m={send:data};
   
   res.send(m);
   
});});


});


router.get('/note/page/:id',check_sign_in,function(req,res){
    //console.log("hello")
    var note_id=req.params.id

    form.find({s_no:req.session.user.id},function(err,data){
        if(err){throw err;}
        else{ 
            var struct={
                id:Number,
                name:String,
                data:String
            }
            
            for(i in data){
               
                if(i===note_id){ 
                struct={
                    id:i,
                    name:data[i].name,
                    data:data[i].data
                }
                res.render('Notepage.ejs',{note:struct})   
            }
              
            }
           }});
   
})

router.get('/note/delete',check_sign_in,function(req,res){var i;  
    ur =url.parse(req.url,true).query;
   
   var no= ur.index;
   
   form.find({s_no:req.session.user.id},function(err,data){
        if(err){ throw err;}
       else{ var j;
           for(j in data){if(j==no){
               console.log("here");
               var i=data[j].id; 
               form.findByIdAndRemove(i,function(err,dat){if(err){throw err;}else{ console.log("here2");}});
               res.send('note')}}
             
            }});
        });

  module.exports =router;