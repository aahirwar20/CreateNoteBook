const nodemailer =require("nodemailer");

var secure_configuration ={
    EMAIL_USERNAME:'ankitahirwarvinod2@gmail.com',
    PASSWORD:'ank26kartik',
    CLIENT_ID: '367127692858-a6flma77nn516lt1ptsi30cq3729hf5r.apps.googleusercontent.com',
    CLIENT_SECRET:'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',
    REFRESH_TOKEN:"1//046KfIKn9RMj7CgYIARAAGAQSNwF-L9IrhQL4UkjKWErozGsBJbIXxHVrhQmk-ZItgQeCaSca_xep5zijR7MlEnjAr2Ne-CXt-LI",
}
const EMAIL_USERNAME='ankitahirwarvinod2@gmail.com'
const PASSWORD = 'ank26kartik'
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