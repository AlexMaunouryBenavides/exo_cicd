import { AppDataSource } from "../../../config/data-source.ts";
import { User } from "./user.entity.ts";

export class UserRepository {
  private repo = AppDataSource.getRepository(User);
  merge(user: User, updates: Partial<User>) {
    return this.repo.merge(user, updates);
  }

  create(data: Partial<User>) {
    return this.repo.create(data);
  }
  readOne(email: string) {
    return this.repo.findOneBy({ email });
  }
  read() {
    return this.repo.find();
  }
  update(user: User) {
    return this.repo.save(user);
  }
  delete(user: User) {
    return this.repo.remove(user);
  }
  save(user: User) {
    return this.repo.save(user);
  }
}
