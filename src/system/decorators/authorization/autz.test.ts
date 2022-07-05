import { User, Sample, DomainCollection } from "uask-dom";
import test from "tape";
import {
  P11_05,
  P11_05_Participants,
  P11_05_Samples,
} from "../../../client-example.js";
import { Document } from "../../../drivers/index.js";
import {
  ParticipantAuthorizationManager,
  SurveyAuthorizationManager,
} from "./autz.js";

test("Role can create", t => {
  const participant = P11_05_Participants[0];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("writer")
  );
  t.ok(am.canCreate());
  t.notOk(am.canCreateError());
  t.end();
});

test("Role cannot create", t => {
  const participant = P11_05_Participants[0];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("administrator")
  );
  t.notOk(am.canCreate());
  t.equal(am.canCreateError(), "role is not authorized to create items");
  t.end();
});

test("Role can write items", t => {
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[1];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("writer")
  );
  t.ok(am.canWriteItems(interview));
  t.notOk(am.canWriteItemsError(interview));
  t.end();
});

test("Role cannot write items", t => {
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[1];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("administrator")
  );
  t.notOk(am.canWriteItems(interview));
  t.equal(
    am.canWriteItemsError(interview),
    "role is not authorized to write items"
  );
  t.end();
});

test("Workflow cannot write items", t => {
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[1];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("writer:external")
  );
  t.notOk(am.canWriteItems(interview));
  t.equal(
    am.canWriteItemsError(interview),
    "workflow is not authorized to write items for interview"
  );
  t.end();
});

test("Sample frozen : cannot write item", t => {
  const participant = P11_05_Participants[0].update({
    sample: P11_05_Samples[0].freeze(),
  });
  const interview = participant.interviews[1];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("writer")
  );
  t.notOk(am.canWriteItems(interview));
  t.equal(am.canWriteItemsError(interview), "sample is frozen");
  t.end();
});

test("Role can delete", t => {
  const participant = P11_05_Participants[0];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("administrator")
  );
  t.ok(am.canDelete());
  t.notOk(am.canDeleteError());
  t.end();
});

test("Role can delete", t => {
  const participant = P11_05_Participants[0];
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("writer")
  );
  t.notOk(am.canDelete());
  t.equal(am.canDeleteError(), "role is not authorized to delete");
  t.end();
});

test("Sample frozen : cannot delete", t => {
  const participant = P11_05_Participants[0].update({
    sample: P11_05_Samples[0].freeze(),
  });
  const am = new ParticipantAuthorizationManager(
    P11_05,
    participant,
    new User("administrator")
  );
  t.notOk(am.canDelete());
  t.equal(am.canDeleteError(), "sample is frozen");
  t.end();
});

test("Can read sample", t => {
  const samples = [new Sample("001"), new Sample("002")];
  const am = new SurveyAuthorizationManager(
    P11_05,
    new User("writer").update({ samples: DomainCollection(samples[0]) })
  );
  t.ok(am.canReadSample(samples[0].sampleCode));
  t.notOk(am.canReadSample(samples[1].sampleCode));
  t.equal(
    am.canReadSampleError(samples[1].sampleCode),
    "not authorized to read participants from sample"
  );
  t.end();
});

test("Can read participant", t => {
  const participantIds = ["00001", "00002"];
  const am = new SurveyAuthorizationManager(
    P11_05,
    new User("writer").update({
      participantIds: DomainCollection(participantIds[0]),
    })
  );
  t.ok(am.canReadParticipant(participantIds[0]));
  t.notOk(am.canReadParticipant(participantIds[1]));
  t.equal(
    am.canReadParticipantError(participantIds[1]),
    "not authorized to read participant"
  );
  t.end();
});

test("Role cannot save user", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("writer"));
  t.false(am.canSaveUser());
  t.equal(am.canSaveUserError(), "role is not authorized to save user");
  t.end();
});

test("Role cannot save survey", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("writer"));
  t.false(am.canSaveSurvey());
  t.equal(am.canSaveSurveyError(), "role is not authorized to save survey");
  t.end();
});

test("Role cannot save sample", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("writer"));
  t.false(am.canSaveSample());
  t.equal(am.canSaveSampleError(), "role is not authorized to save sample");
  t.end();
});

test("Role cannot save survey document #391", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("writer"));
  const document = new Document("testDoc", "", DomainCollection());
  t.false(am.canSaveDocument(document));
  t.equal(
    am.canSaveDocumentError(document),
    "role is not authorized to save survey document"
  );
  t.end();
});

test("Role can save survey document #391", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("administrator"));
  const document = new Document("testDoc", "", DomainCollection());
  t.ok(am.canSaveDocument(document));
  t.equal(am.canSaveDocumentError(document), "");
  t.end();
});

test("Role cannot save participant document #391", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("administrator"));
  const document = new Document("testDoc", "", DomainCollection(), {
    visibility: "participant",
  });
  t.notOk(am.canSaveDocument(document));
  t.equal(
    am.canSaveDocumentError(document),
    "role is not authorized to save participant document"
  );
  t.end();
});

test("Role can save participant document #391", t => {
  const am = new SurveyAuthorizationManager(P11_05, new User("writer"));
  const document = new Document("testDoc", "", DomainCollection(), {
    visibility: "participant",
  });
  t.ok(am.canSaveDocument(document));
  t.equal(am.canSaveDocumentError(document), "");
  t.end();
});
