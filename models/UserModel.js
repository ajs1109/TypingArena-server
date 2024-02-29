import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
// import PassComp from 'joi-password-complexity';

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

userModel.methods.generateAuthToken =  () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
}

export const User = mongoose.model("User", userModel);

export const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: PassComp().required().label("Password"),
    confirmPassword: PassComp().required().label("Confirm Password"),
  })

return schema.validate(data)
}

