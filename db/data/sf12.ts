import { SurveyBuilder } from "uask-dom";

export function sf12(b: SurveyBuilder, code: string) {
  const sf12ChoicePart2 = b.types
    .score(1, 2, 3)
    .wording(
      "Yes, limited a lot",
      "Yes, limited a little",
      "No, not limited at all"
    )
    .translate(
      "fr",
      "Oui, beaucoup limité",
      "Oui, un peu limité",
      "Non, pas du tout limité"
    );

  const sf12ChoicePart3 = b.types
    .score(1, 2, 3, 4, 5)
    .wording(
      "All of the time",
      "Most of the time",
      "Some of the time",
      "A little of the time",
      "None of the time"
    )
    .translate(
      "fr",
      "Toujours",
      "La plupart du temps",
      "Souvent",
      "Parfois",
      "Jamais"
    );

  const sf12ChoiceQ8 = b.types
    .score(1, 2, 3, 4, 5)
    .wording(
      "Not at all",
      "A little bit",
      "Moderately",
      "Quite a bit",
      "Extremely"
    )
    .translate(
      "fr",
      "Pas du tout",
      "Un petit peu",
      "Moyennement",
      "Beaucoup",
      "Enormément"
    );

  const pb = b.page(code);

  pb.startSection(" ")
    .question(
      "1. In general, would you say your health is:",
      "SF12_01",
      b.types
        .score(1, 2, 3, 4, 5)
        .wording("Excellent", "Very good", "Good", "Fair", "Poor")
        .translate(
          "fr",
          "Excellente",
          "Très	bonne",
          "Bonne",
          "Médiocre",
          "Mauvaise"
        )
    )
    .translate("fr", "1. Dans	l’ensemble,	pensez-vous	que	votre	santé	est	:")
    .info(
      "The following questions are about activities you might do during a typical day. Does your health now limit you in these activities? If so, how much?",
      "INFO_SF121"
    )
    .translate("fr", "En	raison	de	votre	état	de	santé	actuel,	êtes-vous	limité	pour :")
    .question(
      "2. Moderate activities such as moving a table, pushing, a vacuum cleaner, bowling, or playing golf.",
      "SF12_02",
      sf12ChoicePart2
    )
    .translate(
      "fr",
      "2. Des efforts physiques modérés (déplacer une table, passer l’aspirateur, jouer aux boules)."
    )
    .question(
      "3. Climbing several flights of stairs.",
      "SF12_03",
      sf12ChoicePart2
    )
    .translate("fr", "3. Monter plusieurs étages par l’escalier.")
    .info(
      "During the past 4 weeks, have you had any of the following problems with your work or other regular daily activities as a result of your physical health?",
      "INFO_SF122"
    )
    .translate(
      "fr",
      "Au cours de ces 4 dernières semaines, et en raison de votre état physique :"
    )
    .question(
      "4. Accomplished less than you would like.",
      "SF12_04",
      sf12ChoicePart3
    )
    .translate(
      "fr",
      "4. Avez-vous accompli moins de choses que vous auriez souhaité ?"
    )
    .question(
      "5. Were limited in the kind of work or other activities.",
      "SF12_05",
      sf12ChoicePart3
    )
    .translate("fr", "5. Avez-vous été limité pour faire certaines choses ?")
    .info(
      "During the past 4 weeks, have you had any of the following problems with your work or other regular daily activities as a result of any emotional problems (such as feeling depressed or anxious)?",
      "INFO_SF123"
    )
    .translate(
      "fr",
      "Au cours de ces 4 dernières semaines, et en raison de votre état émotionnel (comme vous sentir triste, nerveux ou déprimé) :"
    )
    .question(
      "6. Accomplished less than you would like.",
      "SF12_06",
      sf12ChoicePart3
    )
    .translate(
      "fr",
      "6. Avez-vous accompli moins de choses que vous auriez souhaité ?"
    )
    .question(
      "7. Did work or activities less carefully than usual.",
      "SF12_07",
      sf12ChoicePart3
    )
    .translate(
      "fr",
      "7. Avez-vous eu des difficultés à faire ce que vous aviez à faire avec autant de soin et d’attention que d’habitude ?"
    )
    .question(
      "8.  During the past 4 weeks, how much did pain interfere with your normal work (including work outside the home and housework)?",
      "SF12_08",
      sf12ChoiceQ8
    )
    .translate(
      "fr",
      "8. Au	cours	de ces 4 dernières semaines, dans quelle mesure vos douleurs physiques vous ont-elles limité dans votre travail ou vos activités domestiques ?"
    )
    .info(
      "These questions are about how you have been feeling during the past 4 weeks. For each question, please give the one answer that comes closest to the way you have been feeling. ",
      "INFO_SF124"
    )
    .translate(
      "fr",
      "Les questions qui suivent portent sur comment vous vous êtes senti au cours de ces 4 dernières semaines. Pour chaque question, indiquez la réponse qui vous semble la plus appropriée :"
    )
    .question("9. Have you felt calm & peaceful?", "SF12_09", sf12ChoicePart3)
    .translate(
      "fr",
      "9. Y a t-il eu des moments où vous vous êtes senti calme et détendu ?"
    )
    .question("10. Did you have a lot of energy? ", "SF12_10", sf12ChoicePart3)
    .translate(
      "fr",
      "10. Y a t-il eu des moments où vous vous êtes senti débordant d’énergie ?"
    )
    .question(
      "11. Have you felt down-hearted and blue? ",
      "SF12_11",
      sf12ChoicePart3
    )
    .translate(
      "fr",
      "11. Y a t-il eu des moments où vous vous êtes senti triste et abattu ?"
    )
    .question(
      "12. During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (like visiting friends, relatives, etc.)? ",
      "SF12_12",
      sf12ChoicePart3
    )
    .translate(
      "fr",
      "12. Au cours de ces 4	dernières	semaines,	y	a	t-il eu des	moments	où votre état de santé physique ou émotionnel vous a gêné dans votre vie sociale et vos relations avec les autres, votre famille, vos amis, vos connaissances ?"
    )
    .endSection()
    .question(
      "Compute score automatically:",
      "__SF12_SCORE_AUTO",
      b.types.acknowledge
    )
    .translate("fr", "Calculer le score automatiquement :")
    .defaultValue(true)
    .question("Score:", "SF12_SCORE", b.types.integer)
    .translate("fr", "Score :")
    .computed(
      "!__SF12_SCORE_AUTO ? SF12_SCORE : SF12_01 + SF12_02 + SF12_03 + SF12_04 + SF12_05 + SF12_06 + SF12_07 + SF12_08 + SF12_09 + SF12_10 + SF12_11 + SF12_12"
    )
    .required();
}
