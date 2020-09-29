import express from "express";
import Tweet from "../models/tweet";

const router = express.Router();

router.get("/", (_req, res) => res.send("<h1>Hello</h1>").status(200));

router.post("/", async (req, res) => {
  const newTweet = new Tweet(req.body);

  try {
    const result = await newTweet.save();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

export default router;
