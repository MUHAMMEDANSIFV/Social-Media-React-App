import userSchema  from "../model/user.model.js"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"


export const Signup = async (req,res) => {
     try{
     let data = req.body;
     data.password =await bcrypt.hash(data.password,10)

     let user =await userSchema(data)
    
     user = await user.save()

     res.json({success:"User Signup Success",Userdata:user})
     }catch (err) {
          console.log(err.keyValue)
        res.json({error:"Signup is failed please try again",message:Object.keys(err.keyValue)})
     }
}

export const Login = async (req,res) => {
     try{
       const {username,password} = req.body
       const user =await userSchema.findOne({username})
      
       if(user){
       const password_checking = await  bcrypt.compare(password,user.password)
       if(password_checking){
         console.log(user)
         const posts = user.posts ? user.posts.length : 0 ;
         const workat = user.workat ? user.workat :  "please add work informaion"
         const livesin = user.livesin ? user.livesin : "please add your place and details"
         const status = user.status ? user.status : "please add your status"
         const data = {
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            username:user.username,
            email:user.email,
            bio:user.bio,
            followers:user.followers.length,
            following:user.following.length,
            posts:posts,
            workat:workat,
            livesin:livesin,
            status:status
         }
          const accessToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"1m"})
          const refreshtoken = jwt.sign(data,process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:"1d"})

          res.cookie('refreshtoken', refreshtoken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 100 * 1000 ),
               httpOnly: true,
               secure:true,
         }).cookie("accesstoken",accessToken,{
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 100 * 1000),
               httpOnly: true,
               secure:true,
         }).json({success:"Login success",jwt:accessToken})
       }else{
          res.json({error:"Password is incorrect Please try again"})
       }
       }else{
        res. json({error:"No user found please Singup"})
       }

     }catch (err){
      console.log(err)
        res.json({error:"Some technical Problem Please try after some time we will fix it"})
     }
}

export const refreshtoken = (req , res) => {
   try{
    if(req.cookies.refreshtoken){
      jwt.verify(req.cookies.refreshtoken,process.env.REFRESH_TOKEN_SECRET_KEY,(err,done) => {
         if(err){
            res.json({error:"refresh token is not valid"})
         }else{
          const accesstoken = jwt.sign(done,process.env.ACCESS_TOKEN_SECRET_KEY)
         res.cookie("accesstoken",accesstoken,{
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 60 * 24),
               httpOnly: true,
               secure:true,
         }).json({message:"token refreshed"})
         }
      })
    }else{
      res.json({error:"refreshtoken is not found"})
    }

   }catch(err){
    
   }
}

export const verifytokens = (req,res,next) => {
     try{
     if(req.cookies?.accesstoken){
       jwt.verify(req.cookies.accesstoken,process.env.ACCESS_TOKEN_SECRET_KEY,(err,done) => {
         if(err){
            let message = err.message
            if(message == "jwt expired"){
               res.json({status:"jwt expired"})
            }else{
               res.json({status:"jwt is not valid"})
            }
         }else{
            req.userinfo = done
            next()
         }
       })
     }else{
      res.json({status:"jwt is not found"})
     }

     }catch(err){
      console.log(err)
     }
}

export const Logout = (req,res) => {
   try{
     console.log("hi")
     res.clearCookie("accesstoken").clearCookie("refreshtoken").json({success:"cookie cleraed"})

   }catch(err){

   }
}