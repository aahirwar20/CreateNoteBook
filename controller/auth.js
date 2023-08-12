export {
   validateAccess,
   invalidateAccess,
   validateAdmin
}

function validateAccess(req, res, next){                           //function for checking sign in of user 
 try{
    if(req.session.userInfo.id){ next() }
    else{ res.redirect('/login') }
 }catch(error){
    throw error
 }
}

function invalidateAccess(req, res, next){                           //function for checking sign in of user 
   try{
      req.session.destroy(function(){
         res.redirect('/login'); 
     })
   }catch(error){
      throw error
   }
}

function validateAdmin(req,res,next){
   if(req.session.user.id==1){
       next();
    }
    else{res.redirect('/login')}
}
   
