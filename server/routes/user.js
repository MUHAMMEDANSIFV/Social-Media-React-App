import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import {home} from "../Controllers/user.controller.js"

  router.get("/home",verifytokens,home)

export default router;