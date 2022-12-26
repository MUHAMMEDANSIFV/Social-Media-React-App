import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    userid:String,
    profileurl:String,
    profileid:String,
},{ timestamps: true })


export default mongoose.model("profile",profileSchema)