![U-ASK](./logo.svg)
# U-ASK Management System
This repository contains the server and the client of the [U-ASK](https://github.com/u-ask/uask#readme) system. Before going further with this setup guide be sure to have been through [U-ASK](https://github.com/u-ask/uask#readme) introduction and demo.

The server offers a GraphQL and a REST API. The client allows application to interact with the server by easing authentication and queries.

Authentication is implemented in a separate repository : [U-ASK Authentication](https://github.com/u-ask/uask-auth#readme).

_*Note:*_ npm scripts needs bash ; please [configure git bash](https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows) as script shell for npm on Windows.

# Install the server
```
git clone https://github.com/u-ask/uask-sys.git
```

## Server configuration

| variable          | description                                  | example 
|:------------------|:---------------------------------------------|:-------
| APP_ENV           | the execution environment                    | `production`
| PORT              | the port to listen to                        | `3000`
| CALLBACK_ROOT_URL | the authorized open id callback URL          | `https://uask.example.com/callback`
| AUTH_URL          | the public URL of the authentication service | `https://uask-api.example.com/oidc`
| AUTH_JWKS         | a JSON stringified JWKS                      | `{"keys":[{"crv":"P-256",...`
| SAAS_MODE         | set to false to remove sign up               | `true`
| DB_CONNSTR        | a knex connection string to a PostgreSQL db  | `{"user":"postgres",`<br>`host":"localhost",`<br>`database":"postgres",`<br>`password":"******"}`
| SENDGRID_API_KEY<br>SENDGRID_SENDER  | a sendgrid authentication key and authorized email address
| TWILIO_API_KEY_SID<br>TWILIO_API_KEY_SECRET<br>TWILIO_ACCOUNT_SID | a twilio authentication key set

Setting AUTH_JWKS to `{}` will use a quick start development-only signing set. For more information about JWKS generation, see [this example](https://github.com/panva/node-oidc-provider-example/blob/main/01-oidc-configured/generate-keys.js).

SAAS_MODE defaults to `true`, this will allow anybody to sign up to the system. SAAS mode is required for the first start to allow the first user to sign up. This first user will be able to create more users.
 
The APP_ENV variable must be set to `production`. The other possible values are `development` or `demo` (see [U-ASK](https://github.com/u-ask/uask#readme)).

[Sendgrid](https://sendgrid.com/) and / or [Twilio](https://www.twilio.com/) account and keys are necessary for sending authentication codes.

_*Important:*_ do not rely on the `.env` file in production environment ; set the environment variable at host level. The present guide assumes that this is the case.

## Database initialization
```
npm run migrate
```

## Starting the server
First start, SAAS mode is required to create the first user.
```
SAAS_MODE=true npm run start
```

In order to create a first user, run the `cli.js` script.
```
./cli.js "https://localhost:<port>" signup
```
A browser will open on the connexion page. Choose "Sign up" to create a user.

_*Note:*_ from now, the server can be restarted with SAAS mode disabled. No one will be able to sign up ; new users will be created by an existing user.

Subsequent starts :
```
npm run start
```

If no error is logged to the console, the system is properly started. The easiest way to test is to use the U-ASK client.

# Install the client
```
npm i uask-sys
```

## Client usage
A survey is built using [U-SAK Domain Model](https://github.com/u-ask/uask-dom#readme). Note that a survey name **must** contain a `-`.
```js
import { UaskClient } from "uask-sys/pkce";
import { builder, Sample } from "uask-dom";

const b = builder();

b.survey("First-Survey")
  .pageSet("Questionnaire").pages("Questions");
b.page("Questions")
  .question("Ok?", "__INCLUDED", b.types.yesno)
  .question("When:", "INCLUSION_DATE", b.types.date());

const survey = b.get();

const client = new UaskClient("http://127.0.0.1:3000");
await client.surveyDriver.save(survey);
await client.sampleDriver.save(survey, new Sample("Sample-001"));
await client.destroy();
```

Running the program above will open a browser, asking to sign in or sign up.

The following will read the study we have just created :
```js
import { UaskClient } from "uask-sys/pkce";

const client = new UaskClient("http://127.0.0.1:3000");
const survey = await client.surveyDriver.getByName("First-Survey");
console.log(survey);
await client.destroy();
```
This should print a `Survey` domain model object to the console.

## Persistence identifiers
When a domain model object is saved into the persistent store, it is given some identifiers. For example a `Participant` has a unique code that is computed server side. Changes done server side are returned by the client and should be used to create an updated version of the saved domain model object.

```ts
import { UaskClient } from "uask-sys/pkce";
import { ParticipantBuilder } from "uask-dom";

const client = new UaskClient("http://127.0.0.1:3000");

const survey = await client.surveyDriver.getByName("First-Survey");
const sample = await client.sampleDriver.getBySampleCode(survey, "Sample-001");
const participant = new ParticipantBuilder(survey, "", sample).build();

const keys = await client.participantDriver.save(survey, participant);
const participantWithCode = participant.update(keys);
console.log(participantWithCode);
await client.destroy();
```
This prints a `Participant` domain model object to the console with a `participantCode` computed server side.

Saving a participant and its interviews :
```ts
import { UaskClient } from "uask-sys/pkce";
import { ParticipantBuilder } from "uask-dom";

const client = new UaskClient("http://127.0.0.1:3000");

const survey = await client.surveyDriver.getByName("First-Survey");
const sample = await client.sampleDriver.getBySampleCode(survey, "Sample-001");

const builder0 = new ParticipantBuilder(survey, "", sample);
builder0.interview("Questionnaire")
  .item("__INCLUDED").value(true)
  .item("INCLUSION_DATE").value(new Date());
const participant = builder0.build();
const interview = participant.interviews[0];

const participantKeys = await client.participantDriver.save(survey, participant);
const participantWithCode = participant.update(participantKeys);

const interviewKeys = await client.interviewDriver.save(survey, participantWithCode, interview);
const interviewWithNonce = interview.update(interviewKeys);
const builder1 = new ParticipantBuilder(survey, participantWithCode);
builder1.interview(interviewWithNonce);

const persistedParticipant = builder1.build();
console.log(persistedParticipant);
await client.destroy();
```

This prints a `Participant` domain model object to the console with a `participantCode` computed server side. The `Interview` contained in the `Participant` has a `nonce` property also computed server side.

## Audit trail
All modification are tracked into the audit trail. The following snippet modify the patient created above and display all journalized modifications.
```ts
import { UaskClient } from "uask-sys/pkce";
import { ParticipantBuilder } from "uask-dom";

const client = new UaskClient("http://127.0.0.1:3000");

const survey = await client.surveyDriver.getByName("First-Survey");
const samples = await client.sampleDriver.getAll(survey, "Sample-001");
const participant = await client.participantDriver.getByParticipantCode(survey, samples, "000002")
const interview = participant.interviews[0];

const builder = new ParticipantBuilder(survey, participant);
builder.interview("Questionnaire", interview.nonce)
  .item("__INCLUDED").value(false)
  .item("INCLUSION_DATE").value(new Date());
const updatedParticipant = builder.build();

await client.participantDriver.save(survey, updatedParticipant);
const records = await client.auditDriver.get(survey, {participantCode: "000002"})

console.log(records);
await client.destroy();
```
The second argument of `auditDriver.get(survey, {participantCode: "000002"})` may take additional information to narrow the audit target. See [`auditDriver` reference](#uaskclientauditdriver)

## `generateDSL`
The `generateDSL` function takes a `Survey` ans returns a string that contains the code used to build the survey using DSL builders as defined in [U-ASK Domain Model](https://github.com/u-ask/uask-dom#readme).

```ts
import { UaskClient, generateDSL } from "uask-sys/pkce";

const client = new UaskClient("http://127.0.0.1:3000");

const survey = await client.surveyDriver.getByName("First-Survey");
const dsl = generateDSL(survey);
console.log(dsl);
```
The snippet above regenerates the code used to build the example used in this guide, see [Client usage above](#client-usage).

## Client reference
For more information on the domain object model, see [U-ASK Domain Model](https://github.com/u-ask/uask-dom#readme).

#### **UaskClient.surveyDriver**

| method                               | returns                    | description
|:-------------------------------------|:---------------------------|:------------------------
| `getByName(name: string)`            | `Promise<Survey>`          | get a survey by its name
| `save(survey: Survey)`               | `Promise`                  | save a survey and all its components

#### **UaskClient.sampleDriver**

| method                                          | returns             | description
|:------------------------------------------------|:--------------------|:------------------------
| `getAll(survey: Survey)`                        | `Promise<Sample[]>` | get all samples for given survey
| `getBySampleCode(survey: Survey, code: string)` | `Promise<Sample>`   | get a sample given its code
| `save(survey: Survey, sample: Sample)`          | `Promise`           | save a sample for the given survey

#### **UaskClient.participantDriver**

| method                                            | returns                   | description
|:--------------------------------------------------|:--------------------------|:------------------------
| `getAll(survey: Survey)`                          | `Promise<Participant[]>`  | get all participants for given survey
| `getBySample(survey: Survey, sample: Sample)`     | `Promise<Participant[]>`  | get all participants for given sample
| `getByParticipantCode(survey: Survey, code: string)` | `Promise<Participant>` | get a participant given its code
| `save(survey: Survey, participant: Participant)`     | `Promise`              | save a participant
| `delete(survey: Survey, participant: Participant)`   | `Promise`              | delete a participant

#### **UaskClient.interviewDriver**

| method                                                                   | returns   | description
|:-------------------------------------------------------------------------|:----------|:------------------------
| `save(survey: Survey, participant: Participant, interview: Interview)`   | `Promise` | save an interview
| `delete(survey: Survey, participant: Participant, interview: Interview)` | `Promise` | delete an interview

#### **UaskClient.participantDriver**

| method                                    | returns               | description
|:------------------------------------------|:----------------------|:------------------------
| `getAll(survey: Survey, sample?: Sample)` | `Promise<ISummary[]>` | get lightweight summaries for participants

#### **UaskClient.userDriver**

| method                                        | returns           | description
|:----------------------------------------------|:------------------|:------------------------
| `getAll(survey: Survey)`                      | `Promise<User[]>` | get all users for given survey
| `getByUserId(survey: Survey, userid: string)` | `Promise<User>`   | get a user given its userid
| `save(survey: Survey, user: User)`            | `Promise`         | save a user for the given survey

#### **UaskClient.auditDriver**

| method                                   | returns                  | description
|:-----------------------------------------|:-------------------------|:------------------------
| `get(survey: Survey, ref: AuditableRef)` | `Promise<AuditRecord[]>` | get audit records

#### **AuditableRef**

| property        | description
|:----------------|:------------------------
| `patientCode`   | participant code
| `nonce?`        | interview nonce
| `variableName?` | item variable name
| `intance?`      | instance

# Survey development life cycle

With U-ASK the recommended way to build surveys is to use DSL directly. It is recommended to create a new project with `npm init`, the add U-ASK dependencies:

```
npm install uask-dom uask-sys
```

Initialize a new survey with name `Second-Survey` on server `https://uask-api.example.com`:
```
./node_modules/.bin/uask-cli "https://uask-api.example.com" init "Second-Survey" > second-survey.js
```

This will create a starter script that creates a minimal survey. In order to create the survey on the server, run it :
```
node ./second-survey.js
```

The code may also be generated from an existing survey, by replacing the operation name from `init` to `generate` or `gen`:
```
./node_modules/.bin/uask-cli "https://uask-api.example.com" gen "Second-Survey" > second-survey.js
```

Survey code should be maintained in a software version control system like Github.
