import { mlstring, SurveyOptions } from "uask-dom";

export function transposeML(
  labels: mlstring[],
  options: SurveyOptions = {}
): {
  [lang: string]: string[];
} {
  return labels.reduce(
    (acc, label) => pushTranslations(acc, label, options),
    {} as Record<string, string[]>
  );
}

function pushTranslations(
  acc: Record<string, string[]>,
  label: mlstring,
  options: SurveyOptions
) {
  if (typeof label == "string")
    pushTranslation(acc, (options.defaultLang as string) ?? "en", label);
  else
    for (const [lang, wording] of Object.entries(label))
      if (isLanguage(options, lang)) pushTranslation(acc, lang, wording);
  return acc;
}

function pushTranslation(
  acc: Record<string, string[]>,
  lang: string,
  wording: string
) {
  acc[lang] = acc[lang] ? [...acc[lang], wording] : [wording];
}

export function defaultLang(options: SurveyOptions): string {
  return (options.defaultLang ?? "en") as string;
}

function isLanguage(options: SurveyOptions, lang: string) {
  return (
    options.languages?.includes(lang) ||
    lang == options.defaultLang ||
    lang == "en" ||
    lang == "__code__"
  );
}
