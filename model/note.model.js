import mongoose from "mongoose";

var noteSchema =mongoose.Schema({                                              // schema for one notebook
    userId: String,
    name: String,
    data: String
});

export default mongoose.model("Note", noteSchema);
