import mongoose, { Schema } from "mongoose";

const chatsterSchema = mongoose.Schema({
    user:String,
    chatsters:[{
        personid: {
            type: Schema.Types.ObjectId, ref: "user"
        },
        chatMessage: {
            type: Schema.Types.ObjectId, ref: "chatmessage"
        }
    }]
})

export default mongoose.model("chatster",chatsterSchema)