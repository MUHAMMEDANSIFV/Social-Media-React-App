import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import Userschema from '../model/user.model.js';
import multer from 'multer';
import fs from 'fs';

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

export const home = async (req, res) => {
  try {
    res.json({ success: 'success', user: req.userinfo });
  } catch (err) {}
};

export const editprofile = async (req, res) => {
  try {
    const id = req.userinfo._id;
    const data = req.body;
    const user = await Userschema.findOne({ _id: id });
    const password_checking = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (password_checking) {
      const updateuser = await Userschema.updateOne(
        { _id: id },
        {
          $set: {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            bio: data.bio,
          },
        },
      );
      if (updateuser.acknowledged) {
        let afterupdate = await Userschema.findById(id);
        const post = updateuser.post ? updateuser.post.length : 0;
        const followers = updateuser.followers
          ? updateuser.followers.length
          : 0;
        const following = updateuser.following
          ? updateuser.following.length
          : 0;
        const workat = user.workat ? user.workat : 'please add work informaion';
        const livesin = user.livesin
          ? user.livesin
          : 'please add your place and details';
        const status = user.status ? user.status : 'please add your status';

        afterupdate = {
          _id: afterupdate._id,
          firstname: afterupdate.firstname,
          lastname: afterupdate.lastname,
          username: afterupdate.username,
          email: afterupdate.email,
          bio: afterupdate.bio,
          post,
          followers,
          following,
          workat,
          livesin,
          status,
        };

        const accessToken = jwt.sign(
          afterupdate,
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: '1m' },
        );
        const refreshtoken = jwt.sign(
          afterupdate,
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: '1d' },
        );

        res
          .cookie('refreshtoken', refreshtoken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 100 * 1000),
            httpOnly: true,
            secure: true,
          })
          .cookie('accesstoken', accessToken, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 100 * 1000),
            httpOnly: true,
            secure: true,
          })
          .json({ success: 'Login success', user: afterupdate });
      } else {
        res.json({ error: 'updation is failed' });
      }
    } else {
      res.json({ error: 'Password not correct' });
    }
  } catch (err) {
    res.json({ error: 'Some error find please try again' });
  }
};

export const editpersonalinformation = (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.json({ error: 'Some tecnical error find' });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const alluser = await Userschema.find({_id:{$ne:req.userinfo._id}}).limit(10);

    res.status(200).json({ success: true, AllUser: alluser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

const uploadToCloudinary = async (localFilePath) => {
  try {
    const mainFolderName = 'main';

    const filePathOnCloudinary = `${mainFolderName}/${localFilePath}`;

    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: filePathOnCloudinary,
    });

    if (result) return result;
    false;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateprofile = async (req, res) => {
  try {
    let locaFilePath;
    if (req.file) {
      console.log(req.file)
      locaFilePath = req.file.path;
    } else {
      console.log('file not found');
      res.json({ error: 'file not found' });
    }

    const file = await uploadToCloudinary(locaFilePath);
    console.log(file)
    if (file.public_id) {

      const response = await Userschema.findByIdAndUpdate(req.userinfo._id,{
        $set:{
          profile: {
            profileurl: file.secure_url,
            profileid: file.public_id
          }
        }
      })
      console.log(response)
      res.json({
        success: 'profile uploading is successfully finished',
        user:response,
      });
    } else {
      res.json({ error: 'file uploading is failed pelase try again' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};

export const followrequestsend = async (req, res) => {
  try {
    
    const userid = req.userinfo._id
    const followerid = req.body.followerid

    console.log(userid)

    const following = await Userschema.findByIdAndUpdate(userid,{
      $push:{
        following:
          {
            followerid: followerid,
          }
      }
    })

    const followers = await Userschema.findByIdAndUpdate(followerid,{
      $push:{
        followers:
          {
            followerid: userid,
          },
      }
    })

    if(followers && following){

    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};
