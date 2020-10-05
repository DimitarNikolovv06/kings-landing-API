import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";
import { UserInterface } from "../types";
import { isRealName } from "../utils/validation";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    validate: {
      validator: isRealName,
      message: "{VALUE} is not real first name",
    },
  },
  lastname: {
    type: String,
    required: true,
    validate: {
      validator: isRealName,
      message: "{VALUE} is not real last name",
    },
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
    get: (): undefined => undefined,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not real email.",
    },
    required: true,
    unique: true,
  },
  followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  tweets: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tweet" }],
  dateOfBirth: Date,
  dateJoined: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
  },
  getters: true,
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model<UserInterface & mongoose.Document>(
  "User",
  UserSchema
);

export default UserModel;
