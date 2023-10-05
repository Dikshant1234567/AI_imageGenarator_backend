import OpenAIApi  from "openai";
import express from "express";


const router = express.Router();
const openai = new OpenAIApi({
  apiKey: "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",
});

console.log("message from dalle route ----> working")

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E! dikshant" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    // res.status(200).json({"message" : `${prompt} this the req body`})
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format:"url",
    });

    const image = await aiResponse.data[0].url;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response?.data.error.message || "Something went wrong in the dalle api");
  }
});

export default router;
