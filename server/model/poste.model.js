import mongoose from "mongoose";

const Schema = mongoose.Schema(
        {
            post:String,
            likes:[
                {
                    user:String,
                    likedAt:new Date()
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
                    time:new Date()
                }
            ]
        },{timestamps: true})