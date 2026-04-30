import  { Router } from "express";
import { UserController } from "./user.controller.ts";

const userrouter = Router();
const controller = new UserController

userrouter.get("/users", controller.browse);
userrouter.get("/user/:email", controller.read);
userrouter.post("/user",controller.add);
userrouter.patch("/user/:email",controller.edit);
userrouter.delete("/user/:email",controller.destroy);

export default userrouter;
