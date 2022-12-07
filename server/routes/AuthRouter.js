import express  from "express"
const router = express.Router();
import { Signup , Login } from "../Controllers/Auth.controller.js"

 router.post('/newuser/signup',Signup)

 router.post("/login",Login)

export default router;