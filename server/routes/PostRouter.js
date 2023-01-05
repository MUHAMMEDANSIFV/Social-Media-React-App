import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import { upload , sharepost , allposts , deletepost, postlike , userposts} from "../Controllers/post.controller.js"


router.post("/sharepost",verifytokens,upload.single("post"),sharepost)

router.get("/all-posts",verifytokens,allposts)

router.post("/delete-post",verifytokens,deletepost)

router.put("/post-like",verifytokens,postlike)

router.get("/get-user-posts",verifytokens,userposts)

export default router