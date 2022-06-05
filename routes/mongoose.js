var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_db');
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
module.exports={mongoose,sign_up,count};