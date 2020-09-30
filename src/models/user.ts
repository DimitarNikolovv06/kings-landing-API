import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
    get: (): undefined => undefined,
  },
  followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  tweets: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tweet" }],
  bio: String,
  location: String,
  birthDate: Date,
  website: String,
});

// userSchema.pre("find", function (next) {
//   this.populate("followers");
//   this.populate("following");
//   this.populate("tweets");

//   next();
// });

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
  },
  getters: true,
});

export default mongoose.model("User", userSchema);
