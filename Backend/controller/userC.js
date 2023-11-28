const UserModel = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SignUp = async (req, res, next) => {
  let existingUser;
  const { name, email, password } = req.body;
  //   const postUser = await UserModel.create({ name, email, password });
  existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    res.status(400).json({ msg: `user with ${email} already exists` });
  }
  const encryptText = bcrypt.hashSync(password);
  const user = new UserModel({
    name: name,
    email: email,
    password: encryptText,
  });
  await user.save();
  res.status(201).json({ user });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  let userExisted;
  userExisted = await UserModel.findOne({ email: email });
  if (!userExisted) {
    return res.status(400).json({ msg: "check credentials" });
  }
  const validPassword = bcrypt.compareSync(password, userExisted.password);
  if (!validPassword) {
    return res.status(404).json({ msg: `invalid credentials` });
  }

  const userToken = jwt.sign(
    {
      id: userExisted._id,
    },
    process.env.MY_KEY,
    {
      expiresIn: "40s",
    }
  );

  console.log("login token ", userToken);

  if (req.cookies[`${userExisted._id}`]) {
    req.cookies[`${userExisted._id}`] = "";
  }

  res.cookie(String(userExisted._id), userToken, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ msg: "success", user: userToken });
};

const userVerification = (req, res, next) => {
  const cookie = req.headers.cookie;
  const token = cookie.split("=")[1];
  if (!token) {
    return res.status(404).json({ msg: "invalid token" });
  }
  jwt.verify(token.toString(), process.env.MY_KEY, (error, user) => {
    if (error) {
      return res.status(404).json({ msg: "invalid credentials" });
    }
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  console.log("hit");
  const UserId = req.id;
  let User;
  try {
    User = await UserModel.findById(UserId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!User) {
    return res.status(404).json({ msg: "usernot found" });
  }
  return res.status(200).json(User);
};

const refreshToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(400).json("Cookie not found");
  }

  const cookieParts = cookie.split("=");
  if (cookieParts.length !== 2) {
    return res.status(400).json("Invalid cookie format");
  }

  const oldToken = cookieParts[1];

  jwt.verify(oldToken.toString(), process.env.MY_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ msg: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    const newToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.MY_KEY,
      {
        expiresIn: "35s",
      }
    );
    console.log("retoken :", newToken);

    res.cookie(String(user.id), newToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });
    console.log(user);
    req.id = user.id;
    next();
  });
};

module.exports = { SignUp, Login, userVerification, getUser, refreshToken };
