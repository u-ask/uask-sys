import { ItemTypes, PageItem, User } from "uask-dom";
import test from "tape";
import { AuditableRef, AuditRecord, AuditTrail } from "./audit.js";

test("Build an audit record for interview item #121", t => {
  const user = new User("me", "me", "Me", "me", "me");
  const target = <AuditableRef>{};
  const record = new AuditRecord(
    target,
    "001",
    new Date(),
    "update",
    { value: 1 },
    user
  );
  t.equal(record.operation, "update");
  t.equal(record.changes.value, 1);
  t.equal(record.user.name, "me");
  t.end();
});

test("Build an audit record on an instanced item #180", t => {
  const user = new User("me", "me", "Me", "me", "me");
  const target = <AuditableRef>{ instance: 1 };
  const record = new AuditRecord(
    target,
    "001",
    new Date(),
    "update",
    { value: 2 },
    user
  );
  t.equal(record.target.instance, 1);
  t.equal(record.operation, "update");
  t.equal(record.changes.value, 2);
  t.equal(record.user.name, "me");
  t.end();
});

test("Build audit trail with unit change #121", t => {
  const user = new User("me", "me", "Me", "me", "me");
  const target = <AuditableRef>{};
  const date = new Date();
  const records = [
    new AuditRecord(
      target,
      "001",
      date,
      "create",
      { value: 1, unit: "cm" },
      user
    ),
    new AuditRecord(target, "001", date, "update", { unit: "m" }, user),
  ];
  const auditTrail = new AuditTrail(
    records,
    new PageItem("Q", "V", ItemTypes.integer)
  );
  t.deepLooseEqual(auditTrail, [
    {
      target,
      sampleCode: "001",
      date,
      user,
      operation: "create",
      previous: undefined,
      current: "1 cm",
    },
    {
      target,
      sampleCode: "001",
      date,
      user,
      operation: "update",
      previous: "1 cm",
      current: "1 m",
    },
  ]);
  t.end();
});

test("Item created with no value is not displayed in audit trail #144", t => {
  const user = new User("me", "me", "Me", "me", "me");
  const target = <AuditableRef>{};
  const date = new Date();
  const auditTrail = new AuditTrail(
    [new AuditRecord(target, "001", date, "create", {}, user)],
    new PageItem("Q", "V", ItemTypes.integer)
  );
  t.equal(auditTrail.length, 0);
  t.end();
});

test("Item create with no value then updated is displayed as created in audit trail #144", t => {
  const user = new User("me", "me", "Me", "me", "me");
  const target = <AuditableRef>{};
  const auditTrail = new AuditTrail(
    [
      new AuditRecord(target, "001", new Date(2021, 2, 1), "create", {}, user),
      new AuditRecord(target, "001", new Date(2021, 2, 2), "update", {}, user),
      new AuditRecord(
        target,
        "001",
        new Date(2021, 2, 3),
        "update",
        { value: 1 },
        user
      ),
    ],
    new PageItem("Q", "V", ItemTypes.integer)
  );
  t.deepLooseEqual(auditTrail, [
    {
      target,
      sampleCode: "001",
      date: new Date(2021, 2, 3),
      user,
      operation: "create",
      previous: undefined,
      current: "1",
    },
  ]);
  t.end();
});

test("Audit record date is after another #152", t => {
  const a = new AuditRecord(
    { participantCode: "00", nonce: 1234, variableName: "Q" },
    "001",
    new Date(2021, 10, 1),
    "create",
    {},
    Object.create(User.prototype)
  );
  const b = new AuditRecord(
    { participantCode: "00", nonce: 1234, variableName: "Q" },
    "001",
    new Date(2020, 10, 1),
    "create",
    {},
    Object.create(User.prototype)
  );
  t.ok(a.isAfter(b));
  t.notok(b.isAfter(a));
  t.end();
});
