import mongoose from "mongoose";
import { TweetInterface } from "../types";

const TweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  text: String || undefined,
  likedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  retweetedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  comments: [
    {
      byUserId: mongoose.SchemaTypes.ObjectId,
      value: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  imgURL: String || undefined,
});

TweetSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<TweetInterface>(
  "Tweet",
  TweetSchema
);
