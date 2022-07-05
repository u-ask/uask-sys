import ejs from "ejs";
import {
  getTranslation,
  getItemWording,
  Interview,
  InterviewItem,
  mlstring,
  Participant,
  Survey,
  ItemContent,
  TableContent,
  RichItemContent,
  parseLayout,
  Page,
  Metadata,
  isVariableHidden,
  getItem,
  LayoutSection,
  RecordsetContent,
  isMLstring,
  formatCode,
} from "uask-dom";

const surveyHeaderTemplate =
  '<h1 class="survey-header"><%=survey.name%> - Sample: <%=sampleCode%> - Participant: <%=participantCode%></h1>';
const interviewHeaderTemplate = `
<div class="interview-header">
  <div class="interview-label">
    <%=(typeof interview.date == "string" ? interview.date : interview.date?.toISOString())?.substr(0, 10)%> - <%=type%>
  </div>
  <div class="participant-label">
    Sample: <%=sampleCode%> - Participant: <%=participantCode%>
  </div>
</div>`;
const sectionHeaderTemplate = `<h2 class="section-header"><%=title%></h2>`;
const itemPartTemplate = `<div class="item-part <%=part?.name%>"><%-part.content%></div>`;
const itemTemplate = `<div class="item"><div class="item-header"></div><div class="item-content"><%-content%></div></div>`;
const itemTableTemplate = `
<div class="item-table">
 <div class="item-table-header"><%-header%></div>
 <div class="item-table-body"><%-body%></div>
</div>`;
const sectionTemplate = `
<div class="section">
 <%-title%><div class="section-content"><%-content%></div>
</div>`;
const interviewTemplate = `
<div class="interview"><%-header%>
  <div class="interview-content"><%-content%></div>
</div>
`;
const participantTemplate = `
<div class="participant <%=name%>">
  <div class="interviews"><%-content%></div>
</div>
`;
const pageTemplate = `
<div class="page">
  <%-title%><div class="page-content"><%-content%></div>
</div>
`;
const pageHeaderTemplate = `<h2 class="page-header"><%=title%></h2>`;
const surveyTemplate = `
<!DOCTYPE html>
<html lang="<%=lang%>">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><%=survey.name%> - Sample: <%=sampleCode%> - Participant: <%=participantCode%></title>
  </head>
  <body>
    <div class="survey"><%-header%>
      <div class="participants"><%-content%></div>
    </div>
  </body>
</html>`;
const specialValues = {
  notDone: "ND",
  notApplicable: "NA",
  unknown: "UK",
};

export function showItem(survey: Survey, item: InterviewItem): boolean {
  if (isVariableHidden(item.pageItem.variableName, survey.options.inclusionVar))
    return true;
  if (item.pageItem.variableName.slice(0, 2) == "__") return false;
  const metadata = new Metadata(item.pageItem, survey.rules);
  return !(metadata.showable && item.specialValue == "notApplicable");
}

export function surveyHeader(survey: Survey, participant: Participant): string {
  return ejs.render(surveyHeaderTemplate, {
    survey,
    sampleCode: participant.sample.sampleCode,
    participantCode: formatCode(participant, survey.options),
  });
}

export function interviewHeader(
  survey: Survey,
  participant: Participant,
  interview: Interview,
  lang = "en"
): string {
  return ejs.render(interviewHeaderTemplate, {
    sampleCode: participant.sample.sampleCode,
    participantCode: formatCode(participant, survey.options),
    interview,
    type: getTranslation(interview.pageSet.type, lang),
  });
}

export function sectionHeader(
  section: { title?: mlstring },
  lang = "en"
): string {
  if (typeof section.title == "undefined") return "";
  const title = getTranslation(section.title, lang) ?? "";
  if (!title) return "";
  return ejs.render(sectionHeaderTemplate, {
    section,
    title: title,
  });
}

export function pageHeader(
  page: Page,
  interview: Interview,
  lang = "en"
): string {
  const title = `[ ${
    (typeof interview.date == "string"
      ? interview.date
      : interview.date?.toISOString()
    )?.substr(0, 10) ?? ""
  } - ${getTranslation(interview.pageSet.type, lang) ?? ""} ] - ${
    getTranslation(page.name, lang) ?? ""
  }`;
  return ejs.render(pageHeaderTemplate, {
    page,
    title: title,
  });
}

export function page(
  survey: Survey,
  page: Page,
  interview: Interview,
  lang = "en"
): string {
  const pageItems = page.items
    .flatMap(i => {
      const prototype = getItem(i);
      const all = interview.getItemsForPrototype(prototype);
      if (all.length == 0 || all[0].pageItem != prototype)
        return [new InterviewItem(i, undefined)];
      return all;
    })
    .filter(ii => showItem(survey, ii));
  const data = {
    title: pageHeader(page, interview, lang),
    content: [...parseLayout(pageItems).map(c => section(c, lang))].join(""),
  };
  return ejs.render(pageTemplate, data);
}

export function itemPart(part: { content: string; name: string }): string {
  return ejs.render(itemPartTemplate, { part });
}

export function item(content: ItemContent<InterviewItem>, lang = "en"): string {
  const item = content.item;
  return ejs.render(itemTemplate, {
    content: [
      itemPart({
        content: wordingContent(content.labels.wording ?? item, lang),
        name: "wording simple",
      }),
      itemPart({
        content: valueContent(item, lang),
        name: "value simple",
      }),
    ].join(""),
  });
}

function wordingContent(item: InterviewItem | mlstring, lang: string): string {
  return (
    getTranslation(isMLstring(item) ? item : getItemWording(item), lang) ?? ""
  );
}

function headersContent(
  headers: (mlstring | { wording: mlstring })[],
  lang: string
) {
  return [
    ...headers.map((c, i) =>
      itemPart({
        content: wordingContent(isMLstring(c) ? c : c.wording, lang),
        name: i == 0 ? "wording" : "header",
      })
    ),
  ].join("");
}

function valueContent(
  item: InterviewItem | null | undefined,
  lang: string
): string {
  return `${
    item?.specialValue
      ? specialValues[item.specialValue]
      : item?.label(lang) ?? item?.value ?? ""
  }`.trim();
}

export function table(
  content: TableContent<InterviewItem>,
  lang = "en"
): string {
  const header = ejs.render(itemTemplate, {
    content: headersContent(["", ...content.columns], lang),
  });
  const body = content.items
    .map(item =>
      ejs.render(itemTemplate, {
        content: [
          itemPart({
            content: wordingContent(item.wording, lang),
            name: "wording row",
          }),
          ...item.row.map(c =>
            itemPart({
              content: valueContent(c?.item, lang),
              name: "value row",
            })
          ),
        ].join(""),
      })
    )
    .join("");
  return ejs.render(itemTableTemplate, { header, body });
}

export function recordset(
  content: RecordsetContent<InterviewItem>,
  lang = "en"
): string {
  const data = content.items
    .map((record, x) => {
      const c = record.filter((i, x) => record.indexOf(i) == x);
      return section({ title: `${x + 1}.`, content: c }, lang);
    })
    .join("");
  return ejs.render(sectionTemplate, { title: "", content: data });
}

export function richItem(
  content: RichItemContent<InterviewItem>,
  lang = "en"
): string {
  return ejs.render(itemTemplate, {
    content: [
      itemPart({
        content: content.labels.wording
          ? getTranslation(content.labels.wording, lang) ?? ""
          : `${getTranslation(content.labels.leftWording, lang) ?? ""} / ${
              getTranslation(content.labels.rightWording, lang) ?? ""
            }`,
        name: "wording rich",
      }),
      itemPart({
        content: `${content.item.label(lang) ?? content.item.value ?? ""}${
          content.item.specialValue
            ? specialValues[content.item.specialValue]
            : ""
        }`.trim(),
        name: "value rich",
      }),
    ].join(""),
  });
}

export function section(
  section: LayoutSection<InterviewItem>,
  lang = "en"
): string {
  const data = {
    title: sectionHeader(section, lang),
    content: section.content
      .map(c => {
        switch (c?.behavior) {
          case "item":
            return item(c, lang);
          case "table":
            return table(c, lang);
          case "recordset":
            return recordset(c, lang);
          case "richItem":
            return richItem(c, lang);
          default:
            return "";
        }
      })
      .join(""),
  };
  return ejs.render(sectionTemplate, data);
}
export function interview(
  survey: Survey,
  participant: Participant,
  interview: Interview,
  lang = "en"
): string {
  const data = {
    participant,
    interview,
    header: interviewHeader(survey, participant, interview, lang),
    items: interview.items,
    content: [
      ...interview.pageSet.pages.map(p => page(survey, p, interview, lang)),
    ].join(""),
  };
  return ejs.render(interviewTemplate, data);
}

export function participant(survey: Survey, participant: Participant, lang = "en"): string {
  const data = {
    participant,
    content: [
      ...participant.interviews
        .filter(i => i.items.length != 0)
        .map(i => interview(survey, participant, i, lang)),
    ].join(""),
    name: participant.participantCode.startsWith("annotated")
      ? "annotated"
      : participant.participantCode.startsWith("blank")
      ? "blank"
      : "",
  };
  return ejs.render(participantTemplate, data);
}

export function print(survey: Survey, p: Participant, lang = "en"): string {
  const data = {
    survey,
    header: surveyHeader(survey, p),
    content: participant(survey, p, lang),
    sampleCode: p.sample.sampleCode,
    participantCode: formatCode(p, survey.options),
    lang,
  };
  return ejs.render(surveyTemplate, data);
}
