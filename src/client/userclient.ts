import { Got } from "got/dist/source";
import { Sample, Survey, User } from "uask-dom";
import { IUserDriver } from "../drivers/index.js";
import { handleClientError } from "../system/client.js";

class UserWebDriver implements IUserDriver {
  constructor(private client: Got) {}

  getAll(survey: Survey): Promise<User[]> {
    const query = `admin/${survey.name}/users`;
    return this.client
      .get(query)
      .json<User[]>()
      .then(response => response.map(u => this.createUser(u)))
      .catch(async error => await handleClientError(error));
  }

  private createUser(u: User): User {
    return new User(
      u.name,
      u.firstName,
      u.title,
      u.workflow,
      u.email,
      u.phone,
      u.samples,
      u.participantIds,
      {
        role: u.role,
        email_verified: u.email_verfied,
        id: u.id,
        userid: u.userid,
      }
    );
  }

  getByUserId(
    survey: Survey,
    samples: Sample[],
    userid: string
  ): Promise<User | undefined> {
    const route = `admin/${survey.name}/users/${userid}`;
    return this.client
      .get(route)
      .json<User>()
      .then(response => this.createUser(response))
      .catch(async error => await handleClientError(error));
  }

  save(survey: Survey, user: User): Promise<Partial<User>> {
    const route = `admin/${survey.name}/users/${user.userid}`;
    return this.client
      .post(route, { json: user })
      .json<Partial<User>>()
      .catch(async error => await handleClientError(error));
  }
}

export { UserWebDriver };
