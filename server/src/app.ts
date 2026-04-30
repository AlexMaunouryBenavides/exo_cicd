import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get("/", (_, res) => {
  res.send("API Lancé");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
