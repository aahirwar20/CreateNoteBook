import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    method: {type: String, enum : ['local', 'google'], default : 'local' },
    socialId: String,
    fname: String,
    lname: String,
    mbl: String,
    pin: Number,
    mail: {
        type: String,
        unique: true
    },
    pass: String

});


export default mongoose.model("User", userSchema); 