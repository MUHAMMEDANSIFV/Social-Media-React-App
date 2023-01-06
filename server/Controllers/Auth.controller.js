import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import userSchema from '../model/user.model.js';

export const Signup = async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    let user = await userSchema(data);

    user = await user.save();

    res.json({
      success: 'User Signup Success',
      Userdata: user,
    });
  } catch (err) {
    console.log(err.keyValue);
    res.json({
      error: 'Signup is failed please try again',
      message: Object.keys(err.keyValue),
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.findOne({ username });

    if (user) {
      const password_checking = await bcrypt.compare(
        password,
        user.password,
      );
      if (password_checking) {
        console.log(user);
        const posts = user.posts ? user.posts.length : 0;
        const workat = user.workat
          ? user.workat
          : 'please add work informaion';
        const livesin = user.livesin
          ? user.livesin
          : 'please add your place and details';
        const status = user.status
          ? user.status
          : 'please add your status';
        const data = {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          bio: user.bio,
          followers: user.followers.length,
          following: user.following.length,
          posts,
          workat,
          livesin,
          status,
        };
        const accessToken = jwt.sign(
          data,
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: '1m' },
        );
        const refreshtoken = jwt.sign(
          data,
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: '1d' },
        );
        const time = Date.now();

        res.cookie('refreshtoken', refreshtoken, {
          sameSite: 'strict',
          path: '/',
          maxAge: 3600000 * 24,
          httpOnly: true,
          secure: true,
        })
          .cookie('accesstoken', accessToken, {
            sameSite: 'strict',
            path: '/',
            maxAge: 3600000 * 24,
            httpOnly: true,
            secure: true,
          })
          .json({
            success: 'Login success',
            jwt: accessToken,
          });
      } else {
        res.json({
          error: 'Password is incorrect Please try again',
        });
      }
    } else {
      res.json({
        error: 'No user found please Singup',
      });
    }
    await userSchema.findOneAndUpdate(
      { username },
      {
        $set: {
          presence: true,
        },
      },
    );
  } catch (err) {
    console.log(err);
    res.json({
      error: 'Some technical Problem Please try after some time we will fix it',
    });
  }
};

export const refreshtoken = (req, res) => {
  try {
    if (req.cookies.refreshtoken) {
      jwt.verify(
        req.cookies.refreshtoken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (err, done) => {
          if (err) {
            res.status(498).json({
              error: 'refresh token is not valid',
            });
          } else {
            delete done.iat;
            delete done.exp;
            const accessToken = jwt.sign(
              done,
              process.env.ACCESS_TOKEN_SECRET_KEY,
              {
                expiresIn: '1m',
              },
            );
            const refreshtoken = jwt.sign(
              done,
              process.env.REFRESH_TOKEN_SECRET_KEY,
              {
                expiresIn: '1d',
              },
            );

            res.cookie('refreshtoken', refreshtoken, {
              sameSite: 'strict',
              path: '/',
              maxAge: 3600000 * 24,
              httpOnly: true,
              secure: true,
            })
              .cookie('accesstoken', accessToken, {
                sameSite: 'strict',
                path: '/',
                maxAge: 3600000 * 24,
                httpOnly: true,
                secure: true,
              })
              .status(200)
              .json({
                message: 'token refreshed',
              });
          }
        },
      );
    } else {
      res.status(498).json({
        error: 'refreshtoken is not found',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const verifytokens = (req, res, next) => {
  try {
    if (req.cookies?.accesstoken) {
      jwt.verify(
        req.cookies.accesstoken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, done) => {
          if (err) {
            const { message } = err;
            if (message == 'jwt expired') {
              res.status(401).json({
                status: 'jwt expired',
              });
            } else {
              res.status(401).json({
                error: 'jwt is not valid',
              });
            }
          } else {
            req.userinfo = done;
            next();
          }
        },
      );
    } else {
      res.json({ error: 'jwt is not valid' });
    }
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie('accesstoken')
      .clearCookie('refreshtoken')
      .json({ success: 'cookie cleraed' });

    const userid = req.userinfo._id;

    await userSchema.findOneAndUpdate(
      { _id: userid },
      {
        $set: {
          lastSeenAt: Date(Date.now()),
          presence: false,
        },
      },
    );
  } catch (err) {}
};

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'buildyourfuture36@gmail.com', // generated ethereal user
        pass: process.env.NODE_MAILER_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = {
      from: 'buildyourfuture36@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    };

    transporter.sendMail(info, (error, done) => {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        console.log('success');
        console.log(done);
        res.status(200).json({ success: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
