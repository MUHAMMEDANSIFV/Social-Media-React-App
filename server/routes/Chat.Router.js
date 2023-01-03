import express from "express"
const router = express.Router();
import {verifytokens} from "../Controllers/Auth.controller.js"
import {allchatster , addnewchat} from "../Controllers/Chat.Controllers.js"

  router.get("/allchatsters",verifytokens,allchatster)

  router.post("/add-new-chat",verifytokens,addnewchat)

export default router