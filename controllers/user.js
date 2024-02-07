import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

export async function RegistrationHandeler(req, res) {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    return res.json({ message: "Registration Successfull" });
  }
}

export async function LoginHandeler(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User does not exist" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password Is Incorrect!" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, user });
}
