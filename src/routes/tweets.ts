import express from "express";
import Tweet from "../models/tweet";
import { getToken } from "../utils/auth";
import jwt from "jsonwebtoken";
import config from "../utils/config";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const token = getToken(req);
    if (token) {
      const decodedToken = jwt.verify(token, config.SECRET);
      if (!decodedToken) {
        return res.status(401).send("Missing or invalid token!").end();
      }

      const newTweet = new Tweet({
        ...req.body,
        likedBy: [],
        comments: [],
        retweetedBy: [],
      });

      try {
        const result = await newTweet.save();
        res.json(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  } catch (error) {}
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
