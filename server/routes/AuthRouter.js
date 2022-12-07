import express  from "express"
const router = express.Router();
import { Signup , Login ,refreshtoken } from "../Controllers/Auth.controller.js"

 router.post('/newuser/signup',Signup)

 router.post("/login",Login)

 router.get("/refreshtoken",refreshtoken)

 router.get("/sample",(req,res) => {
    console.log("sample called")
    req.session.sample = "Ansif"
    res.json({s:req.session.sample})
 })

 router.get("/test",(req,res) => {
    console.log("test called")
    console.log(req.session.sample);
    res.json({s:req.session.sample})
 })

export default router;