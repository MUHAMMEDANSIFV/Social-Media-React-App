import userSchema  from "../model/user.model.js"
import bcrypt  from "bcrypt"

export const Signup = async (req,res) => {
     try{
     console.log(req.body)
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
          res.json({success:"Login success",user:user})
       }else{
          res.json({error:"Password is incorrect Please try again"})
       }
       }else{
        res. json({error:"No user found please Singup"})
       }

     }catch (err){
        res.json({error:"Some technical Problem Please try after some time we will fix it"})
     }
}