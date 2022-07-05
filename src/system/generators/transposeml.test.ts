import test from "tape";
import { transposeML } from "./transposeml.js";

test("Transpose multiple languages array #252", t => {
  const labels = [
    { en: "Q1 (en)", fr: "Q1 (fr)" },
    { en: "Q2 (en)", fr: "Q2 (fr)" },
  ];
  const transposed = transposeML(labels, { defaultLang: "fr" });
  t.deepEqual(transposed, {
    fr: ["Q1 (fr)", "Q2 (fr)"],
    en: ["Q1 (en)", "Q2 (en)"],
  });
  t.end();
});
