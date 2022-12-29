import express from "express"
const router = express.Router();
import {verifytokens} from "../Controllers/Auth.controller.js"
import {allchatster , addnewchat} from "../Controllers/Chat.Controllers.js"

  router.get("/allchasrter",verifytokens,allchatster)

  router.put("/add-new-chat",verifytokens,addnewchat)

export default router