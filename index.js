import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbconnection from "./db/dbConnect.js";
import dalleRoute from "./routes/dalleRoute.js";
import postRoute from "./routes/postRoute.js";
import AbortControllerPolyfill from "abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js";
import dotenv from 'dotenv';


dotenv.config({path : "./config.env"})


// Assign the polyfill to the AbortController variable
const AbortController = AbortControllerPolyfill;

const app = express();
const port = process.env.PORT || 5555;
app.use(bodyParser.json());

dbconnection();

app.use(cors());

app.use("/api/v1/dalle", dalleRoute);
app.use("/api/v1/post", postRoute);

app.get("/", (req, res) => {
  res.send("This is home page.");
});

app.listen(port, () => {
  console.log(`app is running on server http://localhost:${port}`);
});
