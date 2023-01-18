import express from 'express';
import { verifytokens } from '../Controllers/Auth.controller.js';
import { home, editprofile, getAllUser, updateprofile, upload, followrequestsend } from '../Controllers/user.controller.js';

const router = express.Router();

router.get('/home', verifytokens, home);

router.post('/editprofile', verifytokens, editprofile);

router.get('/all-users', verifytokens, getAllUser);

router.post('/upload-profile-photo',verifytokens, upload.single('profile'),updateprofile)

router.post('/send-follow-request',verifytokens, followrequestsend)

router.get('/get-All-followers',verifytokens)

router.get('/get-All followings',verifytokens)

export default router;
