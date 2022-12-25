var mongoose= require('mongoose');
//const { route } = require('.');
require('dotenv').config();
//const MongoStore = require('connect-mongo');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODBKEY);


var sign_upschema =mongoose.Schema({                       //schema for new sign up 
    s_no:Number,
    fname: String,
    lname: String,
    mbl: String,
    pin: Number,
    mail: String,
    pass: String

});


var sign_up = mongoose.model("sign_up",sign_upschema);           

var countschema =mongoose.Schema({                                                    // schema for no of users
    count:Number
    });

var count = mongoose.model("count",countschema);

var formschema =mongoose.Schema({                                              // schema for one notebook
    s_no:Number,
    name: String,
    data: String,
    

});

var form = mongoose.model("form",formschema);

var sendschema =mongoose.Schema({                                               // schema form send notebook from one user to second user
    from:{id:Number,name:String,mail:String},
    to:{id:Number,mail:String},
    name: String,
    data: String,
    });

var send = mongoose.model("send",sendschema);

var feedbackschema =mongoose.Schema({                                           // schema form for feedback
    s_no:Number,
    feed: String
    
    

});

var feedback = mongoose.model("feedback",feedbackschema);

module.exports={mongoose,sign_up,count,form,send,feedback};