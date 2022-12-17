import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import { home , profile , editprofile, sharepost , fileupload} from "../Controllers/user.controller.js"

  router.get("/home",verifytokens,home)

  router.get("/profile",verifytokens,profile)

  router.post("/editprofile",verifytokens,editprofile)

  router.post("/sharepost",verifytokens,fileupload,sharepost)

export default router;