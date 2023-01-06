import express from 'express';
import { verifytokens } from '../Controllers/Auth.controller.js';
import { home, editprofile, getAllUser } from '../Controllers/user.controller.js';

const router = express.Router();

router.get('/home', verifytokens, home);

router.post('/editprofile', verifytokens, editprofile);

router.get('/all-users', verifytokens, getAllUser);

export default router;
