import { DomainCollection, User } from "uask-dom";
import { Test } from "tape";
import { IDrivers } from "../index.js";

export async function testUsersGetBySurvey(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const users = await drivers.userDriver.getAll(survey, samples);
  t.equal(users?.length, 8);
  const writer = users?.find(u => u.email == "writer001@example.com");
  t.deepLooseEqual(writer?.sampleCodes, DomainCollection("001"));
  t.equal(writer?.role, "writer");
}

export async function testCreateNewUser(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "001");
  const newUser = new User(
    "Pottier",
    "Henri",
    "Dr.",
    "writer",
    "writer003@example.com",
    "0512131415",
    DomainCollection(sample.sampleCode),
    DomainCollection(),
    {
      userid: Math.random(),
    }
  );
  await drivers.userDriver.save(survey, newUser);
  const samples = await drivers.sampleDriver.getAll(survey);
  const users = await drivers.userDriver.getAll(survey, samples);
  t.equal(users?.length, 9);
}

export async function testUpdateExistingUser(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "001");
  const userUpdate = new User(
    "Pottier",
    "Henri",
    "Dr.",
    "writer",
    "writer001@example.com",
    "+33612345678",
    DomainCollection(sample.sampleCode),
    DomainCollection(),
    {
      id: "b7b0b6e2-d05c-44cf-8241-02ca8c87d15b",
      userid: "writer_s001",
    }
  );
  await drivers.userDriver.save(survey, userUpdate);
  const samples = await drivers.sampleDriver.getAll(survey);
  const users = await drivers.userDriver.getAll(survey, samples);
  t.equal(users?.length, 8);
  const updatedUser = users?.find(u => u.userid == "writer_s001");
  t.equal(updatedUser?.name, "Pottier");
  t.equal(updatedUser?.firstName, "Henri");
  t.equal(updatedUser?.email, "writer001@example.com");
}

export async function testGetUserById(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const user = await drivers.userDriver.getByUserId(
    survey,
    samples,
    "administrator"
  );
  t.equal(user?.email, "administrator@example.com");
}
