import type { NextFunction, Request, Response } from "express";
import { hashPassord } from "../../../shared/types/hash.js";
import type { User } from "../domain/user.entity.ts";
import { UserRepository } from "../domain/user.repository.js";

const repo = new UserRepository();

export class UserController {
  async browse(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await repo.read();
      res.json(users).status(200);
    } catch (error) {
      next(error);
    }
  }
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      if (!email || Array.isArray(email)) {
        res.status(400).json({ message: "Invalid email parameter" });
        return;
      }
      const user = await repo.readOne(email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user).status(200);
    } catch (error) {
      next(error);
    }
  }
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const hashpassord = await hashPassord(password);
      const user = repo.create({ username, email, password: hashpassord });
      const savedUser = repo.save(user);

      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }

  async edit(
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = req.params.email;
      if (!email || Array.isArray(email)) {
        res.status(400).json({ message: "Invalid email parameter" });
        return;
      }
      const user = await repo.readOne(email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const { username, password } = req.body;
      const updates: Partial<User> = {};
      if (username) updates.username = username;
      if (password) updates.password = password;

      repo.merge(user, updates);
      const updatedUser = await repo.update(user);
      res.json(updatedUser).status(200);
    } catch (error) {
      next(error);
    }
  }
  async destroy(
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = req.params.email;
      if (!email || Array.isArray(email)) {
        res.status(400).json({ message: "Invalid email parameter" });
        return;
      }
      const user = await repo.readOne(email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      await repo.delete(user);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
