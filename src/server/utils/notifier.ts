import {
  formatCode,
  Interview,
  InterviewItem,
  Metadata,
  Participant,
  Survey,
} from "uask-dom";
import sgMail from "@sendgrid/mail";
import {
  IContactable,
  INotifier,
  isContactable,
} from "../../system/notifier.js";
import { IUserDriver } from "../../drivers/index.js";
import twilio from "twilio";

export class Notifier implements INotifier {
  private readonly webHook =
    "https://chat.googleapis.com/v1/spaces/AAAAJuIG6SA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=U16boBwK9pa0igVFrHvDb0yGxacRuhGHVHU_D7hELfI%3D";

  private readonly origin: string;

  constructor(private userDriver?: IUserDriver, private fromUser?: string) {
    this.origin =
      process.env.CALLBACK_ROOT_URL?.replace(/\/callback/, "") ?? "/";
  }

  async notifyAuthentCode(
    user: IContactable | string,
    x: Survey | string,
    y?: string
  ): Promise<void> {
    const code = typeof x == "string" ? x : (y as string);
    user =
      typeof user == "string"
        ? await this.getUser(x as Survey, user)
        : (user as IContactable);
    const message = `Please use the code ${code} to authenticate.`;
    await this.notifyUser(user, message);
  }

  async notifyParticipantAccount(
    user: IContactable | string,
    survey: Survey,
    participant: Participant
  ): Promise<void> {
    user = await this.getUser(survey, user);
    const root = this.participantUrl(survey, participant, true);
    const message = `Please use ${root} to connect to your account in survey ${survey.name}`;
    await this.notifyUser(user, message);
  }

  async notifyEvent(
    user: IContactable | string,
    survey: Survey,
    participant: Participant,
    interview: Interview,
    item: InterviewItem
  ): Promise<void> {
    user = await this.getUser(survey, user);
    const interviewIndex =
      participant.interviews.findIndex(i => i.nonce == interview.nonce) + 1;
    const pageIndex =
      interview.pageSet.pages.indexOf(
        interview.pageSet.getPagesForItem(item.pageItem)[0]
      ) + 1;
    const root = this.participantUrl(survey, participant, false);
    const params = `visit=${interviewIndex}&page=${pageIndex}#${item.pageItem.variableName}`;
    const url = `${root}?${params}`;
    const notifPattern = new Metadata(item.pageItem, survey.rules)
      .notification as string;
    const notifMessage = notifPattern
      .replace(/@SAMPLE/g, participant.sample.sampleCode)
      .replace(/@PARTICIPANT/g, formatCode(participant, survey.options));
    const message = `${notifMessage}\nPlease check the following url : ${url}`;
    await this.notifyUser(user, message);
  }

  private participantUrl(
    survey: Survey,
    participant: Participant,
    epro: boolean
  ) {
    // eslint-disable-next-line prettier/prettier
    return `${this.origin}/${encodeURIComponent(survey.name)}${
      epro ? "/epro" : ""
    }/participant/${encodeURIComponent(participant.participantCode)}/form`;
  }

  private getUser(survey: Survey, user: IContactable | string) {
    if (isContactable(user)) return Promise.resolve(user);
    return this.userDriver?.getByUserId(survey, user) as Promise<IContactable>;
  }

  private notifyUser(user: IContactable, message: string): Promise<void> {
    if (user.email?.includes("@") && !!process.env.SENDGRID_API_KEY)
      return this.notifyByEmail(user, message);
    else if (
      /[+0-9 ]+/.test(user.phone ?? "") &&
      !process.env.TWILIO_API_KEY_SECRET
    )
      return this.notifyBySms(user, message);
    return Promise.resolve();
  }

  private async notifyBySms(user: IContactable, message: string) {
    const client = twilio(
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      { accountSid: process.env.TWILIO_ACCOUNT_SID }
    );

    const phone = user.phone?.replace(/^0/, "+33").replace(/ /g, "");

    await client.messages
      .create({
        body: message,
        messagingServiceSid: "MGe841482d8948cd0424b519c7576e5805",
        from: "ARONE",
        to: phone as string,
      })
      .catch(e => console.error(e));
  }

  private async notifyByEmail(user: IContactable, message: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: user.email,
      from: "maintenance@arone.com",
      subject: "Arone EDC",
      text: message,
    };
    await sgMail.send(msg);
  }
}
