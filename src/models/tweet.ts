import mongoose from "mongoose";

export const tweetSchema = new mongoose.Schema({
  // userID: mongoose.SchemaTypes.ObjectId,
  user: String,
  value: String,
  likedBy: Array,
  retweetedBy: Array,
  comments: Array,
  date: Date || undefined,
});

tweetSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Tweet", tweetSchema);
