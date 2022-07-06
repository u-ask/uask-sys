// https://towardsdatascience.com/heart-disease-uci-diagnosis-prediction-b1943ee835a7
/* eslint-disable prettier/prettier */
import { builder } from "uask-dom";

const b = builder();

b.options({
  languages: ["en", "fr"],
  defaultLang: "en",
  inclusionVar: { hidden: true }
});

b.workflow()
  .home("HOME")
  .initial("DATA")
;

b.survey("Demo-Stats")
  .pageSet("HOME")
    .translate("en", "Synthesis")
    .translate("fr", "Synthèse")
  .pages("HOME")
  .pageSet("DATA")
    .translate("en", "Collected data")
    .translate("fr", "Données collectées")
    .pages("DATA");
    
    
b.page("HOME")
  .translate("en", "Synthesis")
  .translate("fr", "Synthèse")
  .question("Internal code", "__CODE", b.types.text)
  .translate("fr", "Code interne")
  .modifiableWhen("!@ACK");

b.page("DATA")
    .translate("en", "Collected data")
    .translate("fr", "Données collectées")
  .question("Visit date", "VDATE", b.types.date())
    .translate("fr", "Date de la visite")
    .pin("Visit Date").translate("fr", "Date visite")
    .required()
  .question("Inclusion", "__INCLUDED", b.types.yesno)
    .translate("fr", "Inclusion")
    .defaultValue(1)
    .required()
  .question("Age", "AGE", b.types.integer)
    .translate("fr", "Age")
    .kpi({en: "Age", fr: "Age"})
  .question("Sex", "SEX",
    b.types.choice("one", "0", "1")
      .wording("F", "M")
      .translate("fr", "F", "M")
  )
    .translate("fr", "Sexe")
    .required()
    .kpi({en: "Sex", fr: "Sexe"})
  .question("Chest pain type", "PAIN", 
    b.types.choice("one", "1", "2", "3", "4")
      .wording("Typical angina", "Atypical angina", "Non-anginal pain","asymptomatic")
      .translate("fr", "Angine typique", "Angine atypique", "Douleur importante","Asymptomatique")
  )
    .translate("fr", "Type de douleur à la poitrine")
    .required()
    .pin({en: "Pain", fr: "Pain"})
    .kpi({en: "Pain", fr: "Pain"})
  .question("Resting blood pressure", "BLOOD", b.types.real)
    .translate("fr", "Pression sanguine au repos")
    .unit("mmHg")
    .required()
    .kpi({en: "Blood pressure", fr: "Pression sanguine"})
  .question("Serum cholesterol", "CHOLESTEROL", b.types.real)
    .translate("fr", "Cholestérol sérique")
    .unit("mg/dl")
    .required()
    .kpi({en: "Cholesterol|Disease=${value}", fr: "Cholesterol|Maladie=${value}"}, "DISEASE")
  .question("Fasting blood sugar > 120 mg/dl", "SUGAR", b.types.yesno)
    .translate("fr", "Glycémie à jeun > 120 mg/dl")
    .required()
    .kpi({en: "Sugar > 120", fr: "Glycémie > 120"})
  .question("Resting electrocardiographic results", "ECG",
    b.types.choice("one", "0", "1", "2")
      .wording("Normal", "ST-T wave abnormality", "Probable or definite left ventricular hypertrophy")
      .translate("fr", "Normal", "Anomalie des ondes ST-T", "Hypertrophie du ventricule gauche probable ou certaine")
  )
    .translate("fr", "Résultat de l'électrocardiogramme au repos")
    .required()
    .kpi({en: "ECG", fr: "ECG"})
  .question("Maximum heart rate", "RATE", b.types.real)
    .translate("fr", "Fréquence cardiaque maximale")
    .required()
    .kpi({en: "Max rate", fr: "Fréquence max"})
  .question("Exercise induced angina", "INDUCED", b.types.yesno)
    .translate("fr", "Angine provoquée par l'effort")
    .required()
    .kpi({en: "Exercice induced", fr: "Provoquée par l'effort"})
  .question("Oldpeak : ST depression induced by exercise relative to rest", "OLDPEAK", b.types.real)
    .translate("fr", "Affaissement de l'onde ST provoquée par l'exercice relativement au repos")
    .required()
    .kpi({en: "ST depression", fr: "Affaissement ST"})
  .question("Slope of the peak exercise ST segment", "SLOPE", b.types.real)
    .translate("fr", "Pente du segment de l'onde ST pour la phase d'exercice")
    .required()
    .kpi({en: "Slope during exercise", fr: "Pente durant l'effort"})
  .question("Number of major vessels colored by fluoroscopy", "VESSELS", b.types.score(0, 1, 2, 3))
    .translate("fr", "Nombre de vaisseaux majeurs visibles par fluoroscopie")
    .required()
    .kpi({en: "Colored vessels", fr: "Vaisseaux marqués"})
  .question("Thalassemia", "THAL", 
    b.types.choice("one", "3", "6", "7")
      .wording("Normal", "Defect", "Reversible defect")
      .translate("fr", "Normal", "Defaut", "Défaut réversible")
  )
    .translate("fr", "Thalassémie")
    .required()
    .pin({en: "Thalassemia", fr: "Thalassémie"})
    .kpi({en: "Thalassemia", fr: "Thalassémie"})
  .question("Heart disease presence", "DISEASE", b.types.yesno)
    .translate("fr", "Présence d'une maladie cardiaque")
    .required()
    .kpi({en: "Heart disease", fr: "Maladie cardiaque"})
    .pin({en: "Heart disease", fr: "Maladie cardiaque"});
    
export const StatlogHeart = b.get();
