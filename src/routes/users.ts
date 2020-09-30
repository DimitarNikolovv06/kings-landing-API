import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";

const router = express.Router();

//create new user
router.post("/", async (req, res, next) => {
  if (req.body.password.length < 3) {
    return res.send({ err: "Password should be at least 3 symbols" }).end();
  }

  const saltRounds = 10;
  const password = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const newUser = new User({
      username: req.body.username,
      password,
      followers: [],
      following: [],
      tweets: [],
      bio: "",
      location: "",
      website: "",
    });

    const saved = await newUser.save();

    res.json(saved);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// get user by id
router.get("/:id", async (req, res, next) => {
  try {
    if (req.query.withTweets === "true") {
      const user = await User.findById(req.params.id).populate("tweets");
      res.json(user);
    } else {
      const user = await User.findById(req.params.id);
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//get all users
router.get("/", async (req, res, next) => {
  try {
    if (req.query.populateAll === "true") {
      const data = await User.find()
        .populate("tweets")
        .populate("following")
        .populate("followers");
      res.json(data);
    } else {
      const data = await User.find();
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//remove user
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await User.deleteOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//update user
router.patch("/:id", async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);

    if (data) {
      const isUpdated = await User.updateOne({ _id: data.id }, { ...req.body });

      res.json(isUpdated);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
