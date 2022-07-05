import {
  SurveyBuilder,
  ParticipantBuilder,
  Participant,
  Sample,
  Survey,
  DomainCollection,
  User,
} from "uask-dom";
import {
  exampleSurvey,
  exampleParticipants,
  exampleSamples,
} from "uask-dom/example";
import { exampleAccounts } from "uask-auth/example";
import {
  Document,
  participantDeserialize,
  participantSerialize,
  surveyDeserialize,
  surveySerialize,
} from "../../client.js";

export let P11_05: typeof exampleSurvey;
export let P11_05_Samples: typeof exampleSamples;
export let P11_05_Participants: typeof exampleParticipants;
export let P11_05_Users: User[];
export let P11_05_Documents: Document[];

const surveyObj = JSON.stringify(surveySerialize(exampleSurvey));
const participantsObj = exampleParticipants.map(p =>
  JSON.stringify(participantSerialize(p))
);
const samplesObj = exampleSamples.map(s => JSON.stringify(s));
const userObj = exampleAccounts
  .filter(u => Object.keys(u.surveys).includes("P11-05"))
  .map(user =>
    JSON.stringify({
      ...new User(
        user.surname as string,
        user.given_name as string,
        user.title as string,
        user.surveys["P11-05"]?.role,
        user.email,
        user.phone as string,
        DomainCollection(),
        DomainCollection(),
        {
          id: user.id,
          userid: user.userid,
        }
      ),
      samples: user.surveys["P11-05"].samples,
      participantIds: user.surveys["P11-05"].participantIds,
    })
  );

export function seedExample(): void {
  P11_05 = seedExampleSurvey();
  P11_05_Samples = seedExampleSamples();
  P11_05_Participants = seedExampleParticipants();
  P11_05_Users = seedExampleUsers();
  P11_05_Documents = seedExampleDocuments();
}

function seedExampleSurvey(): Survey {
  const surveyBuilder = new SurveyBuilder();
  surveyDeserialize(surveyBuilder, JSON.parse(surveyObj));
  return surveyBuilder.build();
}

function seedExampleParticipants(): Participant[] {
  return participantsObj.map(p => {
    const participantBuilder = new ParticipantBuilder(
      P11_05,
      DomainCollection(...P11_05_Samples)
    );
    participantDeserialize(participantBuilder, JSON.parse(p));
    return participantBuilder.build();
  });
}

function seedExampleSamples(): Sample[] {
  return samplesObj.map(s =>
    Object.assign(Object.create(Sample.prototype), JSON.parse(s))
  );
}

function seedExampleUsers(): User[] {
  return userObj.map(u => {
    const uu = JSON.parse(u);
    return Object.assign(Object.create(User.prototype), {
      ...uu,
      samples:
        uu.samples[0] == "__all__"
          ? P11_05_Samples
          : uu.samples.map((sc: string) =>
              P11_05_Samples.find(s => s.sampleCode == sc)
            ),
    });
  });
}

function seedExampleDocuments(): Document[] {
  const userGuide = new Document(
    "UGES",
    "User Guide eCFR uask",
    DomainCollection("user", "guide", "uask"),
    { hash: 201 }
  );
  const CRFinitial = new Document(
    "CRFIP",
    "CRF intial P11-05",
    DomainCollection("CRF"),
    { hash: 202 }
  );
  const CRFsuivi = new Document(
    "CRFSP",
    "CRF de suivi P11-05",
    DomainCollection("CRF"),
    { hash: 203, content: new Uint8Array([21, 31]) }
  );
  return [userGuide, CRFinitial, CRFsuivi];
}

seedExample();
