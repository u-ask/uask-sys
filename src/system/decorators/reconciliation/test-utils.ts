import { seedExample } from "../../../drivers/example/index.js";
import {
  DomainCollection,
  Interview,
  InterviewItem,
  ItemTypes,
  Page,
  PageItem,
  PageSet,
  Participant,
  Sample,
  Survey,
} from "uask-dom";
import {
  cleanTestDb,
  P11_05,
  seedTestInterviewItems,
  seedTestInterviews,
  seedTestParticipants,
  seedTestSamples,
} from "../../store/db/test-utils.js";
import { Store } from "../../store/../store/index.js";
import { SurveyStoreDriver } from "../../store/surveystore.js";

export async function seed(store: Store): Promise<Survey> {
  await cleanTestDb(store);
  seedExample();
  const driver = new SurveyStoreDriver(store);
  const survey = P11_05;
  await driver.save(P11_05);
  await seedTestSamples(store);
  await seedTestParticipants(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);
  seedExample();
  return survey;
}

export function buildParticipantWithStaleItems(): {
  participant: Participant;
  interview: Interview;
  survey: Survey;
  pageSet: PageSet;
  page: Page;
  item: PageItem;
} {
  const { interview, pageSet, page, item } = buildInterviewWithStaleItems();
  const staleInterview = new Interview(new PageSet(""), {});
  const participant = new Participant("", new Sample(""), {
    interviews: DomainCollection(interview, staleInterview),
  });
  const survey = new Survey("", {
    pageSets: DomainCollection(pageSet),
    pages: DomainCollection(page),
  });
  return { participant, interview, survey, pageSet, page, item };
}

export function buildInterviewWithStaleItems(): {
  interview: Interview;
  pageSet: PageSet;
  page: Page;
  item: PageItem<"prototype" | "instance">;
} {
  const item = new PageItem("", "NotStale", ItemTypes.text);
  const page = new Page("", {
    includes: DomainCollection(item),
  });
  const pageSet = new PageSet("", {
    pages: DomainCollection(page),
  });
  const staleItem = new PageItem("", "Stale", ItemTypes.text);
  const interview = new Interview(
    pageSet,
    {},
    {
      items: DomainCollection(
        new InterviewItem(item, ""),
        new InterviewItem(staleItem, "")
      ),
    }
  );
  return { interview, pageSet, page, item };
}
