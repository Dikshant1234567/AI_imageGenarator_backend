import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const Url =
  "mongodb+srv://Dikshant:Dikshant@cluster0.c7k2t4h.mongodb.net/?retryWrites=true&w=majority";


const dbconnection = async () => {
  try {
    await mongoose.connect(Url , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("connected sucessfully to mongodb atlas")
  } catch (err) {
    console.error("unable to connect to monogodb atlas", err);
  }
};
export default dbconnection;