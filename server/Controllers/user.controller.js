import Userschema from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"  
import cloudinary from "cloudinary" 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})
export const home = async (req, res) => {
    try {

        res.json({ success: "success", user: req.userinfo })

    } catch (err) {

    }
}

export const profile = (req, res) => {
    try {
        res.json({ message: 'success', user: req.userinfo })

    } catch (err) {

    }
}

export const editprofile = async (req, res) => {
    try {
        const id = req.userinfo._id
        let data = req.body
        const user = await Userschema.findOne({ _id: id })
        const password_checking = await bcrypt.compare(data.password, user.password)
        if (password_checking) {
            const updateuser = await Userschema.updateOne({ _id: id }, {
                $set: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    email: data.email,
                    bio: data.bio
                }
            })
            if (updateuser.acknowledged) {
                let afterupdate = await Userschema.findById(id);
                const post = updateuser.post ? updateuser.post.length : 0
                const followers = updateuser.followers ? updateuser.followers.length : 0
                const following = updateuser.following ? updateuser.following.length : 0
                const workat = user.workat ? user.workat : "please add work informaion"
                const livesin = user.livesin ? user.livesin : "please add your place and details"
                const status = user.status ? user.status : "please add your status"
                console.log(updateuser)
                afterupdate = {
                    _id: afterupdate._id,
                    firstname: afterupdate.firstname,
                    lastname: afterupdate.lastname,
                    username: afterupdate.username,
                    email: afterupdate.email,
                    bio: afterupdate.bio,
                    post: post,
                    followers: followers,
                    following: following,
                    workat: workat,
                    livesin: livesin,
                    status: status
                }

                const accessToken = jwt.sign(afterupdate, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1m" })
                const refreshtoken = jwt.sign(afterupdate, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" })

                res.cookie('refreshtoken', refreshtoken, { 
                    sameSite: 'strict',
                    path: '/',
                    expires: new Date(new Date().getTime() + 100 * 1000),
                    httpOnly: true,
                    secure: true,
                }).cookie("accesstoken", accessToken, {
                    sameSite: 'strict',
                    path: '/',
                    expires: new Date(new Date().getTime() + 100 * 1000),
                    httpOnly: true,
                    secure: true,
                }).json({ success: "Login success", user: afterupdate })
            } else {
                res.json({ error: "updation is failed" })
            }
        } else {
            res.json({ error: "Password not correct" })
        }
    } catch (err) {
        res.json({ error: "Some error find please try again" })
    }
}

export const editpersonalinformation = (req,res) => {
     try{
         console.log(req.body)
     }catch(err) {
        res.json({error:"Some tecnical error find"})
     }
}

export const sharepost = async (req, res) => {
    try{
       const file = req.files.post[0];
       if(file){
         const result = await cloudinary.uploader.upload(file.tempFilePath,{
            public_id: `${Date.now()}`,
            resource_type:"auto",
            folder:"images"
         })
         console.log(result)
       }else{
        res.json({error:"Sorry your not selected file"})
       }
    }catch (err){
        console.log(err)
        res.json({error:"Some tecnical error find Over team will fix it",message:err})
    }
}