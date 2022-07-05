import { Survey, Sample, User } from "uask-dom";
import { IUserDriver } from "../../client.js";
import { doImport } from "./surveyex.js";

export class UserExampleDriver implements IUserDriver {
  getAll(survey: Survey): Promise<User[]> {
    return doImport(survey.name).then(i => [...((i.users as User[]) ?? [])]);
  }

  getByUserId(
    survey: Survey,
    samples: Sample[],
    userid: string
  ): Promise<User | undefined> {
    return doImport(survey.name).then(i =>
      i.users?.find(u => u.userid == userid)
    );
  }

  save(survey: Survey, user: User): Promise<Partial<User>> {
    return doImport(survey.name).then(i => this.update(i.users, user));
  }

  private update(users: User[], user: User) {
    const i = users.findIndex(u => u.userid == user.userid);
    if (i == -1) users.push(user);
    else users[i] = user;
    return user;
  }
}
