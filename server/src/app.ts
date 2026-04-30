import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userrouter from "./modules/user/presentation/user.route.ts";
import { AppDataSource } from "./config/data-source.ts";
dotenv.config();
try { await AppDataSource.initialize()
  console.log("data source has been initialize")
  
} catch (error) {console.log("error occured", error)
  
}
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/", userrouter)
const port = 3000;

app.get("/", (_, res) => {
  res.send("API Lancé");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
