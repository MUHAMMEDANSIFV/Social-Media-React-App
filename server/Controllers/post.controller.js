import PostSchema from "../model/poste.model.js"
import Userschema from "../model/user.model.js"
import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs"

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

const uploadToCloudinary = async (localFilePath) => {
    try{
      
     const mainFolderName = "main"

     var filePathOnCloudinary = 
       mainFolderName + "/" + localFilePath;

         const result = await cloudinary.uploader.upload(localFilePath,{
           public_id:filePathOnCloudinary
         })
         console.log(result)
         if(result) return result;
         else false
    }catch(err){
      console.log(err)
       return err
    }
}
export const sharepost = async (req, res) => {
    try{
        let locaFilePath;
       if(req.file){
         locaFilePath = req.file.path;
       }else{
        console.log("file not found")
        res.json({error:"file not found"})
       }

        const file = await uploadToCloudinary(locaFilePath)

        if(file.public_id){

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
      }else{
        res.json({error:"file uploading is failed pelase try again"})
      }
    }catch (err){
        console.log(err)
        res.json({error:"Some tecnical error find Over team will fix it soon",message:err})
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

export const postlike = async (req,res) => {
   try{
    
    const userid = req.userinfo._id
    const postid = req.body.postid
    let status;

    const posts = await PostSchema.findById(postid)
    console.log(posts)
    const check_like_status = posts.likes.find(obj => obj.user == userid)
    console.log(check_like_status);
    if(check_like_status){
     status = dislikepost()
    }else{
     status = likepost()
    }

    async function likepost(){
      const like = await PostSchema.findByIdAndUpdate(postid,{
        $push:{
          likes:{
            user:userid
          }
        }
      })
    if(like) return "liked"
    else return false
   }

   async function dislikepost() {
    const dislike = await PostSchema.findByIdAndUpdate(postid,{
      $pull:{
        likes:{
          user:userid
        }
      }
    })
    if(dislike) return "disliked"
    else return false
 }

   if(status){
    const posts = await PostSchema.find().populate("user").sort({createdAt:-1})
    res.status(200).json({success:true,posts:posts})
   }else{
    res.status(304).json({error:"Like is Not updated please try again"})
   }

   }catch(err) {
    res.status(500).json({message:err.message})
   }
}