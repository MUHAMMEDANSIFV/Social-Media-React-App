import mongoose, { Schema } from "mongoose";

const chatMessageSchema = mongoose.Schema({
    userid:String,
    chatster:{
        type:Schema.Types.ObjectId , ref:"user"
    },
    imageurl:String,
    imageid:String,
    emoji:String,
    text:String,
    status:String
})