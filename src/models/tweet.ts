import mongoose from "mongoose";

export const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  text: String,
  likedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  retweetedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  comments: [
    {
      byUserId: mongoose.SchemaTypes.ObjectId,
      value: String,
    },
  ],
  date: Date,
  imgURL: String || undefined,
});

tweetSchema.pre("find", function (next) {
  this.populate("user");
  this.populate("retweetedBy");
  this.populate("likedBy");

  next();
});

// tweetSchema.pre('')

tweetSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Tweet", tweetSchema);
