import express from "express"
const router = express.Router()
import {verifytokens} from "../Controllers/Auth.controller.js"
import { home , profile } from "../Controllers/user.controller.js"

  router.get("/home",verifytokens,home)

  router.get("/profile",verifytokens,profile)

export default router;