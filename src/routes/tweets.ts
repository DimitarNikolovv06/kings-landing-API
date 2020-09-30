import express from "express";
import Tweet from "../models/tweet";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const newTweet = new Tweet(req.body);

  try {
    const result = await newTweet.save();
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    const data = await Tweet.find();

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
