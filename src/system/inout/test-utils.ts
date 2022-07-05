import { dump } from "./dump.js";
import { SampleStoreDriver, Store, SurveyStoreDriver } from "../store/index.js";

export async function dumpRenamedSamples(store: Store): Promise<string> {
  const survey = await new SurveyStoreDriver(store).getByName("P11-05");
  const sampleDriver = new SampleStoreDriver(store);
  const samples = await sampleDriver.getAll(survey);
  const updated = samples.map((s, i) =>
    s.update({ name: `Sample ${i}`, address: `${i} avenue` })
  );
  await Promise.all(updated.map(s => sampleDriver.save(survey, s)));
  return await dump(store.client, "P11-05");
}
