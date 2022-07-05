import { ISummaryDriver, SummaryGenericDriver } from "../../client.js";
import { ParticipantExampleDriver } from "./participantex.js";
import { SampleExampleDriver } from "./sampleex.js";

const participantDriver = new ParticipantExampleDriver();
const sampleDriver = new SampleExampleDriver();

export class SummaryExampleDriver
  extends SummaryGenericDriver
  implements ISummaryDriver
{
  constructor() {
    super(participantDriver, sampleDriver);
  }
}
