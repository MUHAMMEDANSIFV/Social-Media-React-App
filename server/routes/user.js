import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import { home , profile , editprofile} from "../Controllers/user.controller.js"
import { fileupload , sharepost , allposts , deletepost, postlike} from "../Controllers/post.controller.js"

  router.get("/home",verifytokens,home)

  router.get("/profile",verifytokens,profile)

  router.post("/editprofile",verifytokens,editprofile)

  router.post("/sharepost",verifytokens,fileupload,sharepost)

  router.get("/all-posts",verifytokens,allposts)

  router.post("/delete-post",verifytokens,deletepost)

  router.post("/post-like",verifytokens,postlike)

export default router;