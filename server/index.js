const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "asdadaaxaxaaxaxa213123121qd";

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://kartikanand:Dr%40gonball2821@cluster0.paoeug0.mongodb.net/blogchain?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign(
      {
        id: userDoc._id,
        username: userDoc.username,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          })
          .json({
            id: userDoc._id,
            username: userDoc.username,
          });
      }
    );
  } else {
    res.status(400).json("Invalid Credentials.");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    console.log(info);
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/create-new-post", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { author, title, description, content } = req.body;
    postDoc = await Post.create({
      author: info.id,
      title,
      description,
      content,
    });
    res.json(postDoc);
  });
});

app.get("/get-all-posts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  postDoc = await Post.findOne({ _id: id }).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(5000);
