import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import { home , profile , editprofile} from "../Controllers/user.controller.js"
import {getAllUser} from "../Controllers/user.controller.js"

  router.get("/home",verifytokens,home)

  router.get("/profile",verifytokens,profile)

  router.post("/editprofile",verifytokens,editprofile)

  router.get("/all-users",verifytokens,getAllUser)


export default router;