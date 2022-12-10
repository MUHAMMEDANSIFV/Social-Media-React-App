import jwt from "jsonwebtoken"

export const home = async(req,res) => {
    try{
   const user = await jwt.verify(req.cookies.accesstoken,process.env.ACCESS_TOKEN_SECRET_KEY)
    res.json({success:"success",user:user}) 

    }catch(err){

    }
}

export const profile = (req , res) => {
    try{

     jwt.verify(req.cookies.accesstoken,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user) => {
         res.json({message:'success',user:user})
     })

    }catch(err){

    }
}