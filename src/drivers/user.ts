import { Survey, User } from "uask-dom";

interface IUserDriver {
  getAll(survey: Survey): Promise<User[]>;
  getByUserId(survey: Survey, userid: string): Promise<User | undefined>;
  save(survey: Survey, user: User): Promise<Partial<User>>;
}

export { IUserDriver };
