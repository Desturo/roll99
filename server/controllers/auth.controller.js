import bcrtpt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
import cookieParser from 'cookie-parser'

let refreshTokens = [];

dotenv.config();

export const getUsers = async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
};

export const checkToken = async (req, res) => {
  jwt.verify(req.cookies.jwToken, process.env.ACCESS_TOKEN_SECERET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
  })
  res.status(200).send('token valid');
}

export const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrtpt.hash(req.body.password, 10);

    const user = { username: req.body.username, password: hashedPassword };

    //checing if usermodel database already has a user with the entered name and gives docs object containing all the user objects with the given name as an array
    UserModel.find({ username: user.username }, (err, docs) => {
      if (docs.length) {
        console.log(`User ${user.username} already exists`);
        console.log(docs);
        res.status(409).send("User already exists");
      } else {
        const newUser = new UserModel(user);
        newUser.save((error) => {
          if (error) return console.log(error);
        });
        res.status(201).send("User created");
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  const query = await UserModel.find({ username: req.body.username });

  const user = { username: query[0].username, password: query[0].password };

  try {
    if (await bcrtpt.compare(req.body.password, user.password)) {
      const accesToken = generateAccesToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECERET);
      refreshTokens.push(refreshToken);
      //Just sends tokenst as json
      //res.json({ accesToken: accesToken, refreshToken: refreshToken });
      //sending tokens as Cookies
      console.log("sendToken");
      const FiveMinInMs = 5 * 60 * 1000;
      res.cookie("jwToken", accesToken, {
        maxAge: FiveMinInMs,
        // You can't access these tokens in the client's javascript
        httpOnly: false,
      });
      res.status(200).send({ loginValid: true });
    } else {
      res.send("Wrong Password");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const logoutUser = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

export const getRefreshtoken = (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccesToken({ username: user.name });
    res.json({ accessToken: accessToken });
  });
};

//non expiering
const generateAccesToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECERET);
};
