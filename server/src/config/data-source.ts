import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../modules/user/domain/user.entity.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "error",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER || "error",
  password: process.env.DB_PASSWORD || "error",
  database: process.env.DB_NAME || "error",
  synchronize: true,
  logging: true,
  entities: [User],
});
