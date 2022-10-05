const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user : {
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    },
    title:{
        type:String,
    },
    content:{
        type: String,
    },
    createdAt:{
        type:Date,
    }
});

module.exports = mongoose.model("Post", postSchema)