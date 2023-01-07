import express from 'express';
import { verifytokens } from '../Controllers/Auth.controller.js';
import { allchatster, addnewchatster,getchats,addNewchat } from '../Controllers/Chat.Controllers.js';

const router = express.Router();

router.get('/allchatsters', verifytokens, allchatster);

router.post('/add-new-chatster', verifytokens, addnewchatster);

router.get('/get-chats',verifytokens,getchats)

router.post('/add-new-message',verifytokens,addNewchat)

export default router;
