import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    workat:String,
    livesin:String,
    status:String,
    bio:{
        type:String,
        default:"I am a Social media user"
    }
})

export default mongoose.model("user",userSchema);