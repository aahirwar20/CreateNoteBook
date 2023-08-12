import mongoose from "mongoose";

var feedbackschema =mongoose.Schema({                                           // schema form for feedback
    data: String
});

export default mongoose.model("feedback", feedbackschema);
