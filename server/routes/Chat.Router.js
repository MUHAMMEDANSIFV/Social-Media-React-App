import express from "express"
const router = express.Router();
import {verifytokens} from "../Controllers/Auth.controller.js"
import {allchatster} from "../Controllers/Chat.Controllers.js"

  router.get("/allchasrter",verifytokens,allchatster)

export default router