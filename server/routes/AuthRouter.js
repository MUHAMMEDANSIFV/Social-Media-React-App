import express  from "express"
const router = express.Router();
import { Signup , Login ,refreshtoken , verifytokens ,Logout } from "../Controllers/Auth.controller.js"

 router.post('/newuser/signup',Signup)

 router.post("/login",Login)

 router.get("/refreshtoken",refreshtoken)

 router.get("/jwtveryfication", verifytokens,(req,res) =>{ res.json({success:"jwt is veryfied"})
 console.log("hi");
})

 router.get("/Logout",Logout)


export default router;