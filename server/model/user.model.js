import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    workat: String,
    livesin: String,
    status: String,
    bio: {
      type: String,
      default: 'I am a Social media user',
    },
    followers: [
      {
        followerid: String,
      },
    ],
    following: [
      {
        followerid: String,
      },
    ],
    profile: {
      profileurl: {
        type: String,
      },
      profileid: {
        type: String,
      },
    },
    lastSeenAt: Date,
    presence: Boolean,
  },
  { timestamps: true },
);

export default mongoose.model('user', userSchema);
