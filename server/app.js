const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var jwt = require("jsonwebtoken");
const authUser = require("./middleware/auth");
const User = require("./models/user");
app.use(express.json());
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const bcrypt = require("bcrypt");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.use(cors());

// create connection
mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("not connected", error));
// schema
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage }).single("file");
app.use("/uploads", express.static("uploads"));
//  post
app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.firstName || !body.email || !body.password) {
      return res.status(401).json({ msg: "all fields are required" });
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const result = await User.create({
      firstName: body.firstName,
      email: body.email,
      password: hashPassword,
    });
    return res.status(201).json({ msg: "success", data: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


app.get("/api/users", async (req, res) => {
  try {
    const data = await User.find()
    return res.status(201).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.post("/api/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    // jwt token
    const token = jwt.sign({ _id: user._id }, "mern@jwt!");
    const cookie = res.cookie("token", token);

    return res.status(200).json({ msg: "Sign-in successful", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//   get user by id
app.get("/api/profile", authUser, (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
});
// //   get user by id
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)

  const user = users.find((user) => user.id == id);
  console.log(user)
  res.json(user);
});
app.post("/upload", uploadFile, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  console.log(req.file); // Check uploaded file details
  return res
    .status(200)
    .json({
      msg: "File uploaded successfully",
      file: `./uploads/${req.file.filename}`,
    });
});
// delete
app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndDelete(id);
    if (!updatedUser) {
      return res.status(400).json({ message: "error while deleting user" });
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(8000, () => {
  console.log("server start");
});
