var mongoose= require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODBKEY);

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

var countschema =mongoose.Schema({
    count:Number
    

});

var count = mongoose.model("count",countschema);

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

module.exports={mongoose,sign_up,count,form,send,feedback};