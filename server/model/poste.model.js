import mongoose,{Schema} from "mongoose";

const PostSchema = mongoose.Schema(
        {
            user:{
                type:Schema.Types.ObjectId , ref:"user"
            },
            posturl:String,
            postid:String,
            discription:String,
            likes:[
                {
                    user:{
                        type:Schema.Types.ObjectId,ref:"user"
                    },
                    likedAt:Date
                }
            ],
            comments:[
                {
                    user:String,
                    comment:[
                        {
                         commentlikes:[
                            {
                                user:String
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
                }
            ],
            shares:[
                {
                    sharefrom:String,
                    shareto:String,
                    time:Date
                }
            ]
        },{timestamps: true})

export default mongoose.model("post",PostSchema)