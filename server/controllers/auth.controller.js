const bcrtpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require( "../models/user.model.js");

let refreshTokens = [];

dotenv.config();

const getUsers = async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
};

const checkToken = (req, res) => {
  jwt.verify(
    req.cookies.jwToken,
    process.env.ACCESS_TOKEN_SECERET,
    (err, user) => {
      if (err) {
        res.sendStatus(403);
      } else {
        UserModel.find({ username: user.username }, (err, doc) => {
          if (err) {
            console.log(`Error`);
            return;
          }
          res
            .status(200)
            .send({ valid: true, username: user.username, userID: doc[0].id });
        });
      }
    }
  );
};

const createUser = async (req, res) => {
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

const loginUser = async (req, res) => {
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
      const YearinMs = 365 * 24 * 60 * 60 * 1000;
      res.cookie("jwToken", accesToken, {
        maxAge: YearinMs,
        // You can't access these tokens in the client's javascript
        httpOnly: false,
      });
      res.status(200).send({ loginValid: true });
    } else {
      res.status(401).send({ passwordValid: false });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const logoutUser = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

const getRefreshtoken = (req, res) => {
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

exports.getUsers = getUsers;
exports.checkToken =  checkToken;
exports.createUser =  createUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.getRefreshtoken=  getRefreshtoken;