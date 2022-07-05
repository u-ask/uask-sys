import test from "../../store/db/test-runner.js";
import { cleanTestDb, P11_05 } from "../../store/db/test-utils.js";
import { SurveyStoreDriver } from "../../store/surveystore.js";
import {
  builder,
  CrossItemRule,
  getItem,
  getTranslation,
  isScopedItem,
  ItemTypes,
  Page,
  PageItem,
  Participant,
  RuleName,
  Rules,
  ScopeLevel,
  Survey,
  SurveyBuilder,
} from "uask-dom";
import { buildParticipantWithStaleItems, seed } from "./test-utils.js";
import { IParticipantDriver, ISurveyDriver } from "../../../drivers/index.js";
import { surveyDeserialize, surveySerialize } from "../../json/index.js";
import {
  ParticipantStoreDriver,
  SampleStoreDriver,
} from "../../store/index.js";
import {
  ParticipantReconciliationDriver,
  SurveyReconciliationDriver,
} from "./drivers.js";

test("Reconciliation driver - save survey with unknown keys", async (store, t) => {
  await seed(store);
  t.false(P11_05.options.epro);
  const updated = P11_05.update({ options: { epro: true, defaultLang: "en" } });
  const storeDriver = new SurveyStoreDriver(store);
  const driver = new SurveyReconciliationDriver(storeDriver);
  await driver.save(updated);
  const survey = await driver.getByName(updated.name);
  t.equal(survey.options.epro, updated.options.epro);
  t.end();
});

test.tape(
  "Reconciliation driver - save survey with non conform name",
  async t => {
    const driver = new SurveyReconciliationDriver(<ISurveyDriver>{});
    const survey = new Survey("NODASH");
    await driver
      .save(survey)
      .then(() => t.fail())
      .catch(e => t.equal(e, "survey name must contain a dash (-)"));
    t.end();
  }
);

test("Reconciliation driver - get survey current version", async (store, t) => {
  await cleanTestDb(store);
  const b1 = builder();
  b1.survey("P11-06").pageSet("PS").pages("P1");
  b1.page("P1")
    .question("A", "A", ItemTypes.yesno)
    .required()
    .question("B", "B", ItemTypes.yesno)
    .required();
  const storeDriver = new SurveyStoreDriver(store);
  const driver = new SurveyReconciliationDriver(storeDriver);
  await driver.save(b1.get());
  const b2 = builder();
  b2.survey("P11-06").pageSet("PS").pages("P1");
  b2.page("P1").question("A", "A", ItemTypes.yesno);
  await driver.save(b2.get());
  const survey = await driver.getByName("P11-06");
  t.equal(survey.pages[0].items.length, 1);
  t.equal(getItem(survey.pages[0].items[0]).rules.length, 0);
  t.end();
});

test("Reconciliation driver - page removed", async (store, t) => {
  const survey = await seed(store);
  const surveyStoreDriver = new SurveyStoreDriver(store);
  const surveyDriver = new SurveyReconciliationDriver(surveyStoreDriver);
  const page = survey.pages.find(
    p => getTranslation(p.name) == "Status"
  ) as Page;
  const pages = survey.pages.delete(p => p == page);
  const pageSets = survey.pageSets.update(p =>
    p.update({ pages: p.pages.delete(p => p == page) })
  );
  const crossRules = survey.crossRules.delete(
    r =>
      r.pageItems.findIndex(i =>
        page.includes.includes(isScopedItem(i) ? i[0] : i)
      ) > -1
  );
  const survey1 = survey.update({ pages, pageSets, crossRules });
  await surveyDriver.save(survey1);
  const survey2 = await surveyDriver.getByName(survey1.name);
  t.false(survey2.pages.some(p => p.__keys__?.version != 2));
  t.false(survey2.pages.some(p => p.__keys__?.id == page.__keys__?.id));
  t.end();
});

test("Reconciliation driver - page removed from pageset", async (store, t) => {
  const survey = await seed(store);
  const surveyStoreDriver = new SurveyStoreDriver(store);
  const surveyDriver = new SurveyReconciliationDriver(surveyStoreDriver);
  const page = survey.pages.find(
    p => getTranslation(p.name) == "Status"
  ) as Page;
  const pageSet = survey.pageSets.find(p => p.pages.includes(page));
  const survey1 = survey.update({
    pageSets: survey.pageSets.update(p =>
      p == pageSet ? p.update({ pages: p.pages.delete(p => p == page) }) : p
    ),
  });
  await surveyDriver.save(survey1);
  const survey2 = await surveyDriver.getByName(survey1.name);
  t.false(
    survey2.pageSets.some(
      p =>
        p.__keys__?.id == pageSet?.__keys__?.id &&
        p.pages.some(p => p.__keys__?.id == page.__keys__?.id)
    )
  );
  t.end();
});

test("Reconciliation driver - pageset removed from workflow", async (store, t) => {
  const survey = await seed(store);
  const surveyStoreDriver = new SurveyStoreDriver(store);
  const surveyDriver = new SurveyReconciliationDriver(surveyStoreDriver);
  const pageSet = survey.workflows[0].sequence[0];
  const survey1 = survey.update({
    workflows: survey.workflows.update(w =>
      w.update({ sequence: w.sequence.delete(p => p == pageSet) })
    ),
  });
  await surveyDriver.save(survey1);
  const survey2 = await surveyDriver.getByName(survey1.name);
  t.false(
    survey2.workflows[0].sequence.some(
      p => p.__keys__?.id == pageSet.__keys__?.id
    )
  );
  t.end();
});

test("Reconciliation driver - rule page item change", async (store, t) => {
  const survey = await seed(store);
  const surveyStoreDriver = new SurveyStoreDriver(store);
  const surveyDriver = new SurveyReconciliationDriver(surveyStoreDriver);
  const pageItem = survey.items.find(
    i => i.variableName == "WEIGHT"
  ) as PageItem;
  const rule = survey.rules.find(
    r =>
      r.name == "activation" &&
      r.pageItems.every(i => (isScopedItem(i) ? i[0] : i) != pageItem)
  ) as CrossItemRule;
  const survey1 = survey.update({
    crossRules: survey.crossRules.update(r =>
      r == rule
        ? new CrossItemRule(
            r.pageItems.map((i, x) => (x == 0 ? pageItem : i)),
            Rules.create(r.name as RuleName, r.args)
          )
        : r
    ),
  });
  await surveyDriver.save(survey1);
  const survey2 = await surveyDriver.getByName(survey1.name);
  t.equal(survey2.rules.length, survey.rules.length);
  const rule2 = survey2.rules.find(
    r =>
      r.name == "activation" &&
      (r.pageItems[0] as [PageItem, ScopeLevel])[0].__keys__?.id ==
        pageItem.__keys__?.id
  ) as CrossItemRule;
  t.equal(rule2.pageItems.length, 2);
  t.end();
});

test.tape(
  "Reconciliation driver - stale items and interview removed",
  async t => {
    const { participant, survey } = buildParticipantWithStaleItems();
    const inner: IParticipantDriver = {
      getAll(): Promise<Participant[]> {
        return Promise.resolve([participant]);
      },
      getByParticipantCode(): Promise<Participant> {
        return Promise.resolve(participant);
      },
      getBySample(): Promise<Participant[]> {
        return Promise.resolve([participant]);
      },
      save(): Promise<Partial<Participant>> {
        return Promise.resolve({});
      },
    };
    const driver = new ParticipantReconciliationDriver(inner);
    const p0 = await driver.getByParticipantCode(
      survey,
      [participant.sample],
      "000001"
    );
    t.equal(p0.interviews.length, 1);
    const p1 = await driver.getAll(survey, [participant.sample]);
    t.deepEqual(p1[0], p0);
    const p2 = await driver.getBySample(survey, participant.sample);
    t.deepEqual(p2[0], p0);
    t.end();
  }
);

test("Store driver - do not get items that do not belongs to a pageset anymore #304", async (store, t) => {
  const survey = await seed(store);
  const surveyStoreDriver = new SurveyStoreDriver(store);
  const surveyDriver = new SurveyReconciliationDriver(surveyStoreDriver);
  const s1 = surveySerialize(survey);
  const s2 = {
    ...s1,
    crossRules: s1.crossRules.filter(r => !r.variableNames.includes("BMI")),
    pages: s1.pages.map(p => ({
      ...p,
      includes: p.includes.filter(
        i => "variableName" in i && i.variableName != "BMI"
      ),
    })),
  };
  const builder = new SurveyBuilder();
  surveyDeserialize(builder, s2);
  const updated = builder.get();
  await surveyDriver.save(updated);
  const samples = await new SampleStoreDriver(store).getAll(survey);
  const participantStoreDriver = new ParticipantStoreDriver(store);
  const participantDriver = new ParticipantReconciliationDriver(
    participantStoreDriver
  );
  await participantDriver
    .getAll(updated, samples)
    .then(() => t.pass())
    .catch(() => t.fail());
  t.end();
});
