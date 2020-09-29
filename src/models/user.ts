import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  followers: Array,
  following: Array,
  tweets: Array,
  bio: String,
  location: String,
  birthDate: Date,
  website: String,
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("USER", userSchema);
