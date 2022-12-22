import PostSchema from "../model/poste.model.js"
import cloudinary from "../Connections/Cloudinary.connection.js";
import Userschema from "../model/user.model.js"

export const sharepost = async (req, res) => {
    try{
        const file = req.file;
        console.log(req.body)
        const post = {
            user:req.userinfo._id,
            posturl:file.secure_url,
            postid:file.public_id,
            discription:req.body.description[0]
        }

       const post1 =await PostSchema(post)
       const response = await post1.save()
        await Userschema.findByIdAndUpdate(req.userinfo._id,{
        $push:{
            post:response._id
        }
       })
       const posts = await PostSchema.find().populate("user").sort({createdAt:-1})
       res.json({success:"Post uploading is successfully finished",posts:posts})
    }catch (err){
        console.log(err)
        res.json({error:"Some tecnical error find Over team will fix it soon",message:err})
    }
}

export const fileupload = async (req,res,next) => {
     try{
        const file = req.files.post[0]
        console.log(file)
        if(file){
          const result = await cloudinary.uploader.upload(file.tempFilePath,{
            public_id:Date.now(),
            folder:"Socia-media/Posts"
          })
        req.file = result
        next()
        }else{
            console.log("err")
            res.json({error:"file not found"})
        }
     }catch(err){
       console.log(err)
        res.json({errro:"Some tecnical error find Over team will fix it soon"})
     }
}

export const allposts = async (req,res) => {
    try{
      const Posts = await PostSchema.find().populate("user").sort({createdAt:-1})
      res.json({success:"Posts loading success",posts:Posts})
    }catch(err) {

    }
}

export const deletepost = async (req,res) => {
  try{
    const data = req.body
    await cloudinary.uploader.destroy(data.postimage)
    await PostSchema.deleteOne({_id:data.postid})
    await Userschema.updateOne({_id:data.userid},{
      $pull:{
        post:data.postid
      }
     })
     const posts = await PostSchema.find().populate("user").sort({createdAt:-1})
     res.json({success:"deleted",posts:posts})
    }catch(err) {
      console.log(err)
    res.json({error:"Some tecnical issue"})
  }
}

export const postlike = (req,res) => {
   try{
     const userid = req.userinfo
     const postid = req.body.postid

    Userschema.updateOne({_id:userid},{
      $push:{
        likedpost:postid
      }
    },(error,done) => {
      if(error) console.log(error)
      res.json({success:"Post liked"})
    })
   }catch(err) {

   }
}