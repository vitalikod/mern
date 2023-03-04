import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dataBase from "./models/dataBase.js";
import authRoute from "./routes/auth.js";

const app = express();
const port = 5000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({ messege: "hello world" });
});

function start() {
  try {
    app.listen(port, () => {
      console.log(`server start on port: ${port}`);
    });
    dataBase.once("open", () => {
      console.log("connekt to DB");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
