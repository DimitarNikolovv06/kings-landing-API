import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";
import { UserInterface } from "../types";

const router = express.Router();

//create new user
router.post("/", async (req, res) => {
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
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  const user = (await User.findById(req.params.id)) as UserInterface | null;
  if (user) {
    const {
      bio,
      birthDate,
      followers,
      following,
      location,
      username,
      website,
      tweets,
    } = user;

    res.json({
      bio,
      birthDate,
      followers,
      following,
      location,
      username,
      website,
      tweets,
    });
  }

  return res.send({ err: "Not found bruh" }).status(404);
});

//get all users
router.get("/", async (_req, res) => {
  try {
    const data = ((await User.find()) as unknown) as UserInterface[] | null;
    if (data) {
      const safeData = data.map(
        ({
          tweets,
          location,
          bio,
          username,
          website,
          following,
          followers,
          birthDate,
        }: UserInterface) => ({
          tweets,
          location,
          following,
          website,
          bio,
          username,
          followers,
          birthDate,
        })
      );

      res.json(safeData);
    }

    res.send({ Err: "N0t found 404 :/" }).status(404);
  } catch (error) {
    console.error(error);
  }
});

export default router;
