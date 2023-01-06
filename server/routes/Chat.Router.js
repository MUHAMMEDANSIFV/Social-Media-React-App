import express from 'express';
import { verifytokens } from '../Controllers/Auth.controller.js';
import { allchatster, addnewchat } from '../Controllers/Chat.Controllers.js';

const router = express.Router();

router.get('/allchatsters', verifytokens, allchatster);

router.post('/add-new-chat', verifytokens, addnewchat);

export default router;
