import cloudinary from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import mongoose from 'mongoose';
import Userschema from '../model/user.model.js';
import PostSchema from '../model/poste.model.js';

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

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
export const sharepost = async (req, res) => {
  try {
    let locaFilePath;
    if (req.file) {
      locaFilePath = req.file.path;
    } else {
      console.log('file not found');
      res.json({ error: 'file not found' });
    }

    const file = await uploadToCloudinary(locaFilePath);

    if (file.public_id) {
      const post = {
        user: req.userinfo._id,
        posturl: file.secure_url,
        postid: file.public_id,
        discription: req.body.description[0],
      };

      const post1 = await PostSchema(post);
      const response = await post1.save();

      const posts = await find_all_post(req.userinfo._id);

      res.json({
        success: 'Post uploading is successfully finished',
        posts,
      });
    } else {
      res.json({ error: 'file uploading is failed pelase try again' });
    }
  } catch (err) {
    console.log(err);
    res.json({
      error: 'Some tecnical error find Over team will fix it soon',
      message: err,
    });
  }
};

export const allposts = async (req, res) => {
  try {
    const userid = req.userinfo._id;

    const Posts = await find_all_post(userid);

    res.json({ success: 'Posts loading success', posts: Posts });
  } catch (err) {
    console.log(err);
  }
};

export const deletepost = async (req, res) => {
  try {
    const userid = req.userinfo._id;

    const data = req.body;
    await cloudinary.uploader.destroy(data.postimage);
    await PostSchema.deleteOne({ _id: data.postid });
    await Userschema.updateOne(
      { _id: data.userid },
      {
        $pull: {
          post: data.postid,
        },
      },
    );
    const posts = await find_all_post(userid);

    res.json({ success: 'deleted', posts });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Some tecnical issue' });
  }
};

export const postlike = async (req, res) => {
  try {
    const userid = req.userinfo._id;
    const { postid } = req.body;
    let status;

    const posts = await PostSchema.findById(postid);

    const check_like_status = posts.likes.find(
      (obj) => obj.user == userid,
    );

    if (check_like_status) {
      status = dislikepost();
    } else {
      status = likepost();
    }

    async function likepost() {
      const like = await PostSchema.findByIdAndUpdate(postid, {
        $push: {
          likes: {
            user: userid,
          },
        },
      });
      if (like) return 'liked';
      return false;
    }

    async function dislikepost() {
      const dislike = await PostSchema.findByIdAndUpdate(postid, {
        $pull: {
          likes: {
            user: userid,
          },
        },
      });
      if (dislike) return 'disliked';
      return false;
    }

    if (status) {
      const posts = await find_all_post(userid);

      res.status(200).json({ success: true, posts });
    } else {
      res.status(304).json({
        error: 'Like is Not updated please try again',
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userposts = async (req, res) => {
  try {
    console.log('hi');
    const userid = req.userinfo._id;

    const Posts = await PostSchema.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(userid),
        },
      },
      {
        $addFields: {
          liked: {
            $cond: {
              if: {
                $in: [
                  mongoose.Types.ObjectId(userid),
                  '$likes.user',
                ],
              },
              then: true,
              else: false,
            },
          },
          likescount: {
            $size: '$likes',
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: '$users',
      },
    ]);

    const User = await Userschema.findById(userid);
    console.log(User);

    res.status(200).json({ success: true, posts: Posts, user: User });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

async function find_all_post(userid) {
  try {
    const Posts = await PostSchema.aggregate([
      {
        $addFields: {
          liked: {
            $cond: {
              if: {
                $in: [mongoose.Types.ObjectId(userid), '$likes.user'],
              },
              then: true,
              else: false,
            },
          },
          likescount: {
            $size: '$likes',
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: '$users',
      },
    ]);
    console.log(Posts);
    return Posts;
  } catch (err) {
    console.log(err);
    return err;
  }
}
