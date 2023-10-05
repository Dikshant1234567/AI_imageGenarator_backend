import express from "express";
// import * as dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.js";

// dotenv.config();

const router = express.Router();

console.log("working ===> post Router");

cloudinary.config({
  cloud_name: "dwurf9pmz",
  api_key: "346183198536769",
  api_secret: "7WWl4PDE8knLoiLMvqFKcXQn4TY",
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.insertMany([
      {
        name: name,
        prompt: prompt,
        photo: photoUrl.url,
      },
    ]);
    console.log(newPost);

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

export default router;
