export async function sendMail(req, res, next){
    try{
        const {to_mail} = req.query
        const mailDetails={
         from:"ankitahirwarvinod2@gmail.com",
         to: to_mail,
         subject:"creative notebook",
         text:"It is from creative notebook"+qu.name+' '+qu.data+' ',
        }
        mailTranspoter.sendMail(mailDetails,function(err,data){
         if(err){throw err;}
         else{console.log("email sent succefully")}
       });
       res.send('email sent succefully');
    }catch(error){
        next(error)
    }
}