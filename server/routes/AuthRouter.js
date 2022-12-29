import express  from "express"
const router = express.Router();
import { Signup , Login ,refreshtoken , verifytokens ,Logout } from "../Controllers/Auth.controller.js"

 router.post('/newuser/signup',Signup)

 router.post("/login",Login)

 router.get("/refreshtoken",refreshtoken)

 router.get("/jwtveryfication", verifytokens,(req,res) =>{ res.status(200).json({success:"jwt is veryfied",user:req.userinfo})})

 router.get("/Logout",verifytokens,Logout)


export default router;