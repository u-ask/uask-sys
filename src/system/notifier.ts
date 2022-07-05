import { Interview, InterviewItem, Participant, Survey } from "uask-dom";

export type IContactable = {
  email?: string;
  phone?: string;
  role?: string;
};

export function isContactable(obj: unknown): obj is IContactable {
  return (
    typeof obj == "object" && obj != null && ("email" in obj || "phone" in obj)
  );
}

export interface INotifier {
  notifyAuthentCode(user: IContactable, code: string): Promise<void>;
  notifyAuthentCode(
    userid: string,
    survey: Survey,
    code: string
  ): Promise<void>;
  notifyParticipantAccount(
    user: IContactable | string,
    survey: Survey,
    participant: Participant
  ): Promise<void>;
  notifyEvent(
    user: IContactable | string,
    survey: Survey,
    participant: Participant,
    interview: Interview,
    item: InterviewItem
  ): Promise<void>;
}
