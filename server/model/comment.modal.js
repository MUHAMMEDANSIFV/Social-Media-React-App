import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user:String,
    postid:String,
    comment:[
        {
         commentlikes:[
            {
                user:String,
            }
         ],
         commentreplay:[
            {
                user:String,
                replay:String
            }
         ]
        }
    ]
},{ timestamps: true })