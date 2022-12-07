const nodemailer =require("nodemailer");
require("dotenv").config();
var secure_configuration ={
    EMAIL_USERNAME:process.env.GMAIL,                                   //Write your Mail ID
    PASSWORD:process.env.PASSWORD,                                      //Write Your Password 
    CLIENT_ID: process.env.CLIENTID,
    CLIENT_SECRET:process.env.CLIENTSECRET,
    REFRESH_TOKEN:process.env.REFRESHTOKEN,
}

let mailTranspoter =nodemailer.createTransport({
    host:process.env.MAIL_SERVER,
    secure: false,
    port:5870,
    service:"gmail",
    auth:{
        type: 'OAuth2',
        user: secure_configuration.EMAIL_USERNAME,
        pass: secure_configuration.PASSWORD,
        clientId: secure_configuration.CLIENT_ID,
        clientSecret: secure_configuration.CLIENT_SECRET,
        refreshToken: secure_configuration.REFRESH_TOKEN
        
    },
    tls:{rejectUnauthorized:false}
})
module.exports =mailTranspoter;