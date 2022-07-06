import { SurveyBuilder } from "uask-dom";

export function mfi20(b: SurveyBuilder, code: string) {
  const mfi20Score = b.types.score(1, 2, 3, 4, 5);
  const mfi20CommentEn = "<yes, that is true | no, that is not true>";
  const mfi20CommentFr = "<oui, c'est vrai | non, ce n'est pas vrai>";

  const pb = b.page(code);

  pb.startSection(" ")
    .question("1. I feel fit.", "MFI20_01", mfi20Score)
    .translate("fr", "1. Je me sens en forme.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question(
      "2. Physically, I feel only able to do a little.",
      "MFI20_02",
      mfi20Score
    )
    .translate(
      "fr",
      "2. Physiquement, je ne me sens pas capable de faire grand chose."
    )
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("3. I feel very active.", "MFI20_03", mfi20Score)
    .translate("fr", "3. Je me sens très actif(ve).")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question(
      "4. I feel like doing all sorts of nice things.",
      "MFI20_04",
      mfi20Score
    )
    .translate("fr", "4. J'ai envie de faire des tas de choses agréables.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("5. I feel tired.", "MFI20_05", mfi20Score)
    .translate("fr", "5. Je me sens fatigué(e).")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("6. I think I do a lot in a day.", "MFI20_06", mfi20Score)
    .translate(
      "fr",
      "6. Je pense que je fais beaucoup de choses dans une journée."
    )
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question(
      "7. When I am doing something, I can keep my thoughts on it.",
      "MFI20_07",
      mfi20Score
    )
    .translate(
      "fr",
      "7. Quand je fais quelque chose, je peux me concentrer dessus."
    )
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("8. Physically I can take on a lot.", "MFI20_08", mfi20Score)
    .translate("fr", "8. Physiquement, je peux faire beaucoup.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("9. I dread having to do things.", "MFI20_09", mfi20Score)
    .translate("fr", "9. Je redoute d'avoir des choses à faire.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("10. I think I do very little in a day.", "MFI20_10", mfi20Score)
    .translate(
      "fr",
      "10. Je pense que je ne fais pas grand-chose dans une journée."
    )
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("11. I can concentrate well.", "MFI20_11", mfi20Score)
    .required()
    .translate("fr", "11. J'arrive à bien me concentrer.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("12. I am rested.", "MFI20_12", mfi20Score)
    .translate("fr", "12. Je me sens reposé(e).")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question(
      "13. It takes a lot of effort to concentrate on things.",
      "MFI20_13",
      mfi20Score
    )
    .translate(
      "fr",
      "13. Me concentrer sur quelque chose me demande beaucoup d'effort."
    )
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question(
      "14. Physically I feel I am in a bad condition.",
      "MFI20_14",
      mfi20Score
    )
    .translate("fr", "14. Physiquement je me sens en mauvais état.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("15. I have a lot of plans.", "MFI20_15", mfi20Score)
    .translate("fr", "15. J'ai un tas de projets.")
    .required()
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .question("16. I tired easily.", "MFI20_16", mfi20Score)
    .translate("fr", "16. Je me fatigue facilement.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("17. I get little done.", "MFI20_17", mfi20Score)
    .translate("fr", "17. Je mène peu de choses à bien.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("18. I don't feel like doing anything.", "MFI20_18", mfi20Score)
    .translate("fr", "18. Je n'ai rien envie de faire.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question("19. My thoughts easily wander.", "MFI20_19", mfi20Score)
    .translate("fr", "19. Mes pensées s'égarent facilement.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .question(
      "20. Physically I feel I am in an excellent condition.",
      "MFI20_20",
      mfi20Score
    )
    .translate("fr", "20. Physiquement, je me sens en parfait état.")
    .comment(mfi20CommentEn)
    .translate("fr", mfi20CommentFr)
    .required()
    .endSection()
    .question(
      "Compute score automatically:",
      "__MFI20_SCORE_AUTO",
      b.types.acknowledge
    )
    .translate("fr", "Calculer le score automatiquement :")
    .defaultValue(true)
    .question("Score:", "MFI20_SCORE", b.types.integer)
    .translate("fr", "Score :")
    .computed(
      "!__MFI20_SCORE_AUTO ? MFI20_SCORE : MFI20_01 + MFI20_02 + MFI20_03 + MFI20_04 + MFI20_05 + MFI20_06 + MFI20_07 + MFI20_08 + MFI20_09 + MFI20_10 + MFI20_11 + MFI20_12+ MFI20_13+ MFI20_14+ MFI20_15+ MFI20_16+ MFI20_17+ MFI20_18+ MFI20_19+ MFI20_20"
    )
    .required();
}
