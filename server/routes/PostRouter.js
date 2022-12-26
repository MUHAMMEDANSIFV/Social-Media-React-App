import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import { fileupload , sharepost , allposts , deletepost, postlike} from "../Controllers/post.controller.js"


router.post("/sharepost",verifytokens,fileupload,sharepost)

router.get("/all-posts",verifytokens,allposts)

router.post("/delete-post",verifytokens,deletepost)

router.put("/post-like",verifytokens,postlike)

export default router