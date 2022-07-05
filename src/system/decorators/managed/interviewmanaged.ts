import {
  Survey,
  Participant,
  Interview,
  IDomainCollection,
  InterviewItem,
  DomainCollection,
  messageNames,
} from "uask-dom";
import { IInterviewDriver } from "../../../drivers/index.js";
import {
  assertNoSubset,
  InterviewSaveOptions,
  PartialInterview,
} from "../../../drivers/interview.js";
import { Changes } from "../../aspect/index.js";
import { hasChanges, hasKeys, Keys } from "../../aspect/index.js";

export class InterviewManagedDriver implements IInterviewDriver {
  constructor(private readonly driver: IInterviewDriver) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items,
    options = new InterviewSaveOptions()
  ): Promise<PartialInterview> {
    assertNoSubset(interview, items);
    const ret: PartialInterview = [
      {},
      {
        items: new Array(items.length).fill({}),
      },
    ];
    const changedItems = this.getChanged(items);
    if (this.somethingChanged(interview, changedItems)) {
      const keys = await this.driver.save(
        survey,
        participant,
        interview,
        items.filter((_, ix) => changedItems.includes(ix)),
        options
      );
      this.buildResult(ret, keys, changedItems);
    }
    return ret;
  }

  private buildResult(
    ret: PartialInterview,
    keys: PartialInterview,
    imap: IDomainCollection<number>
  ) {
    ret[0] = keys[0];
    for (const [i, x] of imap.entries()) ret[1].items[x] = keys[1].items[i];
  }

  private getChanged<T extends Keys & Changes<T>>(oo: IDomainCollection<T>) {
    return oo.reduce(
      (acc, o, ix) => (isManaged(o) ? acc.append(ix) : acc),
      DomainCollection<number>()
    );
  }

  private somethingChanged(
    interview: Interview,
    changedItems: IDomainCollection<number>
  ) {
    return (
      hasChanges(interview) || !hasKeys(interview) || changedItems.length > 0
    );
  }
}

export function isManaged<T extends Keys & Changes<T>>(
  o: T
): o is T & {
  readonly __changes__: Partial<T>;
} {
  return hasKeys(o)
    ? hasChanges(o)
    : !(o instanceof InterviewItem) || hasValue(o);
}

function hasValue(interviewItem: InterviewItem) {
  return (
    typeof interviewItem.value != "undefined" ||
    typeof interviewItem.specialValue != "undefined" ||
    messageNames(interviewItem.messages).length > 0 ||
    typeof interviewItem.unit != "undefined"
  );
}
