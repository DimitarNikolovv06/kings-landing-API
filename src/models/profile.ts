import mongoose from "mongoose";
import { ProfileInterface } from "../types";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  bio: String,
  location: String,
  website: String,
  dateJoined: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<ProfileInterface & mongoose.Document>(
  "Profile",
  ProfileSchema
);
