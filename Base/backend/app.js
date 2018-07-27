const express = require("express");
const bodyParser = require("body-parser");
const monoose = require("mongoose");
const Post = require("./models/user");

const app = express();

monoose
  .connect(
    "mongodb+srv://eyup:46IFMNe6oE9ecjuQ@cluster0-ieixg.mongodb.net/longin-test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/users", (req, res, next) => {
  const post = new Post({
    UserName: req.body.UserName,
    password: req.body.password,
    mail: req.body.mail,
    tel: req.body.tel,
    title: req.body.title,
    gender: req.body.gender

  });
  post.save().then(createdPost => {
  res.status(201).json({
    message: "Post added successfully",
    postId: createdPost._id
  });
});
});


app.get("/api/users", (req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

module.exports = app;
