import userSchema  from "../model/user.model.js"
import bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"


export const Signup = async (req,res) => {
   console.log(req.session.accesstoken)
   res.json({session:req.session.accesstoken})
   //   try{
   //   let data = req.body;
   //   data.password =await bcrypt.hash(data.password,10)

   //   let user =await userSchema(data)
    
   //   user = await user.save()

   //   res.json({success:"User Signup Success",Userdata:user})
   //   }catch (err) {
   //        console.log(err.keyValue)
   //      res.json({error:"Signup is failed please try again",message:Object.keys(err.keyValue)})
   //   }
}

export const Login = async (req,res) => {
     try{
       const {username,password} = req.body
       const user =await userSchema.findOne({username})
      
       if(user){
       const password_checking = await  bcrypt.compare(password,user.password)
       if(password_checking){
         console.log(user)
         const data = {
            firstname:user.firstname,
            lastname:user.lastname,
            username:user.username,
            email:user.email
         }
          const accessToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET_KEY)
          req.session.accesstoken = accessToken;
          console.log(req.session.accesstoken)

          res.json({success:"Login success"})
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

export const refreshtoken = (req,res) => {
   console.log("d")
   if(req.session.accessToken){
       console.log("hi")
        jwt.verify(req.session.refreshtoken,process.env.REFRESH_TOKEN_SECRET_KEY,(err,user) => {
           if(err) console.log(err)
           else console.log(user)
       })
   }else{
       console.log(req.session.accessToken)
       res.json({error:"your jwt is not found"})
   }
}