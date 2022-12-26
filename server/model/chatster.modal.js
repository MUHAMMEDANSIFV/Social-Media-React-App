import mongoose, { Schema } from "mongoose";

const chatsterSchema = mongoose.Schema({
    userid: [{
        chatster: {
            type: Schema.Types.ObjectId, ref: "user"
        },
        lastSeenAt: Date,
        presence: Boolean,
        chatMessage: {
            type: Schema.Types.ObjectId, ref: "chatmessage"
        }
    }]
})

export default mongoose.model("chatster",chatsterSchema)