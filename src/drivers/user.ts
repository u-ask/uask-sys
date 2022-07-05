import { Sample, Survey, User } from "uask-dom";

interface IUserDriver {
  getAll(survey: Survey, samples: Sample[]): Promise<User[]>;
  getByUserId(
    survey: Survey,
    samples: Sample[],
    userid: string
  ): Promise<User | undefined>;
  save(survey: Survey, user: User): Promise<Partial<User>>;
}

export { IUserDriver };
