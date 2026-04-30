import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../modules/user/domain/user.entity.ts";

dotenv.config();

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST!,
	port: parseInt(process.env.DB_PORT || "3306", 10),
	username: process.env.DB_USER!,
	password: process.env.DB_PASSWORD!,
	database: process.env.DB_NAME!,
	synchronize: true,
	logging: true,
	entities: [User],
});
