/* eslint-disable prettier/prettier */
import { builder } from "uask-dom";
import { mfi20 } from "./mfi20.js";
import { sf12 } from "./sf12.js";

export const b = builder();

b.strict();

b.options({
  languages: ["en", "fr"],
  defaultLang: "en",
  inclusionVar: { hidden: true },
});

//#region Visites
b.workflow()
  .home("SYNT")
  .initial("PREINC", "INC")
  .followUp("FUP")
  .auxiliary("PAIN", "SAE")
  .terminal("WITHD");

b.workflow("writer:pv").notify("inclusion", "ae");

b.survey("Demo-eCRF")
  .pageSet("SYNT")
  .translate("en", "Synthesis")
  .translate("fr", "Synthèse")
  .pages("SYNT")
  .translate("en", "Synthesis")
  .translate("fr", "Synthèse")
  .pageSet("PREINC")
  .translate("en", "Pre-Inclusion")
  .translate("fr", "Pré-Inclusion")
  .datevariable("VISDATE")
  .pages(b.mandatory("PREINC"))
  .pageSet("INC")
  .translate("en", "Inclusion visit")
  .translate("fr", "Visite d'inclusion")
  .datevariable("VISDATE")
  .pages(
    b.mandatory("INCVIS"),
    "PATINFO",
    "LABHAEMAT",
    "LABBIOCH",
    "ANTE",
    "QSF12",
    "QMFI20",
    "WORK"
  )
  .pageSet("FUP")
  .translate("en", "Follow-up visit")
  .translate("fr", "Visite de suivi")
  .datevariable("VISDATE")
  .pages(b.mandatory("FUPVIS"), "LABHAEMAT", "LABBIOCH", "QSF12", "QMFI20")
  .pageSet("PAIN")
  .translate("en", "Pain")
  .translate("fr", "Douleur")
  .datevariable("PAIN_DATE")
  .pages("PAIN")
  .pageSet("SAE")
  .translate("en", "SAE")
  .translate("fr", "EIG")
  .datevariable("STDT")
  .pages("SAE")
  .pageSet("WITHD")
  .translate("en", "End or Withdrawal visit")
  .translate("fr", "Visite de fin ou de retrait")
  .datevariable("VISDATE")
  .pages("WITHDVIS")
  .pageSet("GLOBALSIGN")
  .translate("en", "Global Signature")
  .translate("fr", "Signature Globale")
  .datevariable("PISIGNDATE")
  .pages("GLOBALSIGN");

b.page("SYNT").translate("en", "Synthesis").translate("fr", "Synthèse");
//#endregion

//#region BVDATE
b.page("BVDATE")
  .question("VISDATE", b.types.date(false))
  .wordings(
    "Pre-inclusion Date:",
    "Inclusion date:",
    "FUP date:",
    "End visit or Withdrawal date:"
  )
  .translate(
    "fr",
    "Date de Pré-inclusion :",
    "Date d'inclusion :",
    "Date FUP :",
    "Date de Visite de fin ou de retrait :"
  )
  .required()
  .inRange(b.date("2020-12-01"), b.computed("@TODAY"));
//#endregion

//#region BCONTINUE
b.page("BCONTINUE")
  .question("Can the patient continue the study?", "CONTINUE", b.types.yesno)
  .translate("fr", "Le patient peut-il continuer l'étude ?")
  .required();
//#endregion

//#region "CONSENT"
b.page("BCONSENT")
  .startSection("CONSENT")
  .translate("en", "Informed consent")
  .translate("fr", "Consentement éclairé")
  .question("Consent has been obtained:", "CONSENT", b.types.yesno)
  .translate("fr", "Consentement obtenu :")
  .required()
  .question("Consent date:", "CONS_DATE", b.types.date(false))
  .translate("fr", "Date de Consentement :")
  .required()
  .activateWhen("CONSENT", 1)
  .endSection();
//#endregion

//#region BINCC
b.page("BINCC")
  .startSection("INCC")
  .translate("en", "Inclusion criteria")
  .translate("fr", "Critère d'inclusion")
  .question("Patient aged 18 or over:", "INC01", b.types.yesno)
  .translate("fr", "Patient âgé de 18 ans ou plus :")
  .required()
  .question(
    "Patient agreeing to participate in the study and having signed the informed consent form:",
    "INC02",
    b.types.yesno
  )
  .translate(
    "fr",
    "Patient acceptant de participer à l’étude et ayant signé le formulaire de consentement éclairé :"
  )
  .required()
  .info(
    "All inclusion criteria must be set to Yes to include the patient",
    "INCINFO"
  )
  .translate(
    "fr",
    "Tous les critères d'inclusion doivent être positionnés à Oui pour inclure le patient"
  )
  .visibleWhen("!(INC01 && INC02)")
  .endSection();
//#endregion

//#region BEXCC
b.page("BEXCC")
  .startSection("EXCC")
  .translate("en", "Exclusion criteria")
  .translate("fr", "Critère d'exclusion")
  .question(
    "Patient already participating in another interventional clinical trial :",
    "EXC01",
    b.types.yesno
  )
  .translate(
    "fr",
    "Patient participant déjà à un autre essai clinique interventionnel :"
  )
  .required()
  .question(
    "Woman of childbearing age, pregnant or wishing to be during the study:",
    "EXC02",
    b.types.yesno
  )
  .translate(
    "fr",
    "Femme en âge de procréer, enceinte ou désirant l’être pendant l’étude :"
  )
  .required()
  .info(
    "All exclusion criteria must be set to No to include the patient",
    "EXCINFO"
  )
  .translate(
    "fr",
    "Tous les critères d'exclusion doivent être positionnés à Non pour inclure le patient"
  )
  .visibleWhen("(EXC01==@UNDEF || EXC02==@UNDEF) || (EXC01 || EXC02)")
  .endSection();
//#endregion

//#region BPATINIT
b.page("BPATINIT")
  .question("Last name initial (*):", "LASTNAME", b.types.text)
  .translate("fr", "Initiale du nom :")
  .required()
  .fixedLength(2)
  .pin("Name")
  .translate("fr", "Nom")
  .letterCase("upper")
  .comment("(*) 2 first letters of the name")
  .translate("fr", "(*) 2 premières lettres du nom")
  .question("First name initial (*) :", "FIRSTNAME", b.types.text)
  .translate("fr", "Initiale du prénom :")
  .required()
  .fixedLength(3)
  .pin("First name")
  .translate("fr", "Prénom")
  .letterCase("upper")
  .comment("(*) 3 first letters of the first name")
  .translate("fr", "(*) 3 premières lettres du prénom");
//#endregion

//#region BDM
b.page("BDM")
  .startSection("DM")
  .translate("en", "Demography")
  .translate("fr", "Données démographiques")
  .question("Birth date", "BRTHDT", b.types.date(true, true))
  .translate("fr", "Date de naissance")
  .pin("Birth date")
  .translate("fr", "Date de naissance")
  .inRange(b.date("1915-01-01"), b.computed("@TODAY"))
  .question(
    "Gender",
    "SEX",
    b.types
      .choice("one", "F", "M")
      .wording("Female", "Male")
      .translate("fr", "Femme", "Homme")
  )
  .translate("fr", "Sexe")
  .pin("Gender")
  .translate("fr", "Sexe")
  .endSection();
//#endregion

//#region BVS
b.page("BVS")
  .startSection("VS")
  .translate("en", "Vital signs")
  .translate("fr", "Examen clinique")
  .question("Height", "HEIGHT", b.types.integer)
  .translate("fr", "Taille")
  .unit("cm")
  .inRange(150, 210, b.includeBoth)
  .question("Weight", "WEIGHT", b.types.integer)
  .translate("fr", "Poids")
  .defaultValue(b.copy("$WEIGHT"))
  .unit("kg")
  .inRange(50, 110, b.includeBoth)
  .question("BMI", "BMI", b.types.real)
  .translate("fr", "IMC")
  .unit("kg/m²")
  .computed("WEIGHT / ((HEIGHT/100) * (HEIGHT/100))")
  .decimalPrecision(0)
  .comment("{.no-specials}")
  .endSection();
//#endregion

//#region BWITHDR
b.page("BWITHDR")
  .question(
    "Reason",
    "WITHREAS",
    b.types
      .choice("one", "CW", "D", "LFU", "OTH")
      .wording(
        "Consent withdrawal from the study",
        "Death",
        "Lost to follow-up",
        "Other"
      )
      .translate(
        "fr",
        "Retrait du consentement de l'étude",
        "Décès",
        "Perdu de vue",
        "Autre"
      )
  )
  .translate("fr", "Raison")
  .required()
  .question("If Other, please specify", "WITHREAS_C", b.types.text)
  .translate("fr", "Si autre, précisez")
  .activateWhen("WITHREAS", "OTH");
//#endregion

//#region Pre-Inclusion page
b.page("PREINC")
  .translate("en", "Pre-Inclusion")
  .translate("fr", "Pré-Inclusion")
  .include("BVDATE")
  .context("VISDATE", 0)
  .include("BCONSENT")
  .include("BINCC")
  .include("BEXCC")
  .question("Is the patient eligible?", "PAT_ELIG", b.types.yesno)
  .translate("fr", "Le patient est-il éligible ?")
  .pin({ en: "Eligible", fr: "Eligible" })
  .required()
  .question("Is the patient a healthy volunteer?", "PAT_HEALTHY", b.types.yesno)
  .translate("fr", "Le patient est-il volontaire sain ?")
  .defaultValue(0)
  .question("Is the patient included?", "__INCLUDED", b.types.acknowledge)
  .required()
  .critical("inclusion")
  .computed(
    "CONSENT && CONS_DATE && INC01 && INC02 && !EXC01 && !EXC02 && PAT_ELIG ? @ACK : @UNDEF"
  );
//#endregion

//#region Inclusion date page
b.page("INCVIS")
  .translate("en", "Date")
  .translate("fr", "Date")
  .include("BVDATE")
  .context("VISDATE", 1)
  .include("BCONTINUE");
//#endregion

//#region Patient Information Page
b.page("PATINFO")
  .translate("en", "Patient information")
  .translate("fr", "Informations du patient")
  .include("BPATINIT")
  .include("BDM")
  .include("BVS");
//#endregion

//#region Lab tests - Haematology page
b.page("LABHAEMAT")
  .translate("en", "Lab tests - Haematology")
  .translate("fr", "Lab. tests - Hématologie")
  .question("Sample collected?", "HAEMATDONE", b.types.yesno)
  .translate("fr", "Echantillon collecté ?")
  .required()
  .question("If no, please specify reason:", "HAEMATNDONE_SPE", b.types.text)
  .translate("fr", "Si non, précisez la raison :")
  .activateWhen("HAEMATDONE", 0)
  .include("BLABTHAEMAT")
  .activateWhen("HAEMATDONE", 1)
  .include("BSAMPLEIMG");
//#endregion

//#region Lab tests - Biochemistry page
b.page("LABBIOCH")
  .translate("en", "Lab tests - Biochemistry")
  .translate("fr", "Lab. tests - Biochimie")
  .question("Sample collected?", "BIOCHDONE", b.types.yesno)
  .translate("fr", "Echantillon collecté ?")
  .required()
  .question("If no, please specify reason:", "BIOCHNDONE_SPE", b.types.text)
  .translate("fr", "Si non, précisez la raison :")
  .activateWhen("BIOCHDONE", 0)
  .include("BLABTBIOCH")
  .activateWhen("BIOCHDONE", 1);
//#endregion

//#region labInterpretationGlossary
const labInterpretationGlossary = b.types
  .glossary("one", "1", "2", "3")
  .wording(
    "Normal",
    "Abnormal - Clinically significant",
    "Abnormal - Not clinically significant"
  )
  .translate(
    "fr",
    "Normal",
    "Abnormal - Cliniquement significatif",
    "Abnormal - Non cliniquement significatif"
  );
//#endregion

//#region BLABTHAEMAT
b.page("BLABTHAEMAT")
  .question("Collection date:", "HAEMAT_DATE", b.types.date(false))
  .translate("fr", "Date du prélèvement :")
  .question("Fasting:", "HAEMAT_FASTING", b.types.yesno)
  .defaultValue(0)
  .translate("fr", "A jeun :")
  .startSection(" ")
  .question("Red Blood Cells -> Result", "REDBLOODR", b.types.real)
  .translate("fr", "Globule rouge -> Résultat")
  .unit("T/L (10^12/L)", "10^6/mm3")
  .extendable()
  .decimalPrecision(2)
  .question(
    "Red Blood Cells -> Interpretation",
    "REDBLOODI",
    labInterpretationGlossary
  )
  .translate("fr", "Globule rouge -> Interprétation")
  .question("Hemoglobin -> Result", "HEMOGR", b.types.real)
  .translate("fr", "Hémoglobine -> Résultat")
  .unit("g/L", "g/dL", "mmol/L")
  .extendable()
  .decimalPrecision(2)
  .question("Hemoglobin -> Interpretation", "HEMOGI", labInterpretationGlossary)
  .translate("fr", "Hémoglobine -> Interprétation")
  .question("Hematocrit -> Result", "HEMATCR", b.types.real)
  .translate("fr", "Hématocrite -> Résultat")
  .unit("%")
  .extendable()
  .decimalPrecision(2)
  .question(
    "Hematocrit -> Interpretation",
    "HEMATCI",
    labInterpretationGlossary
  )
  .translate("fr", "Hématocrite -> Interprétation")
  .question("White Blood Cells -> Result", "WHITEBLOODR", b.types.real)
  .translate("fr", "Globule blanc -> Résultat")
  .unit("G/L (10^9/L)", "10^3/mm3")
  .extendable()
  .decimalPrecision(2)
  .question(
    "White Blood Cells -> Interpretation",
    "WHITEBLOODI",
    labInterpretationGlossary
  )
  .translate("fr", "Globule blanc -> Interprétation")
  .question("Lymphocytes -> Result", "NEUTRR", b.types.real)
  .translate("fr", "Lymphocytes -> Résultat")
  .unit("G/L (10^9/L)", "10^3/mm3", "%")
  .extendable()
  .decimalPrecision(2)
  .question(
    "Lymphocytes -> Interpretation",
    "NEUTRI",
    labInterpretationGlossary
  )
  .translate("fr", "Lymphocytes -> Interprétation")
  .question("Platelets -> Result", "PLATR", b.types.real)
  .translate("fr", "Plaquettes -> Résultat")
  .unit("G/L (10^9/L)", "10^3/mm3")
  .extendable()
  .decimalPrecision(2)
  .question("Platelets -> Interpretation", "PLATI", labInterpretationGlossary)
  .translate("fr", "Plaquettes -> Interprétation")
  .endSection();
//#endregion

//#region BLABTBIOCH
b.page("BLABTBIOCH")
  .question("Collection date:", "BIOCH_DATE", b.types.date(false))
  .translate("fr", "Date du prélèvement :")
  .question("Fasting:", "BIOCH_FASTING", b.types.yesno)
  .translate("fr", "A jeun :")
  .startSection(" ")
  .question("Glucose -> Result", "GLUCR", b.types.real)
  .translate("fr", "Glycémie -> Résultat")
  .unit("mmol/L", "g/L", "mg/dL")
  .extendable()
  .decimalPrecision(2)
  .question("Glucose -> Interpretation", "GLUCI", labInterpretationGlossary)
  .translate("fr", "Glycémie -> Interprétation")
  .question("Urea -> Result", "UREAR", b.types.real)
  .translate("fr", "Urée -> Résultat")
  .unit("mmol/L", "g/L", "mg/dL")
  .extendable()
  .decimalPrecision(2)
  .question("Urea -> Interpretation", "UREAI", labInterpretationGlossary)
  .translate("fr", "Urée -> Interprétation")
  .question("Creatinine -> Result", "CREATR", b.types.real)
  .translate("fr", "Créatinine -> Résultat")
  .unit("µmol/L", "g/L", "mg/L", "mg/dL")
  .extendable()
  .decimalPrecision(2)
  .question("Creatinine -> Interpretation", "CREATI", labInterpretationGlossary)
  .translate("fr", "Créatinine -> Interprétation")
  .endSection();
//#endregion

//#region BSAMPLEIMG
b.page("BSAMPLEIMG")
  .startSection("  ")
  .question("Please upload image:", "SAMPLE_IMG", b.types.image)
  .translate("fr", "Télécharger l'image :")
  .endSection();

//#region
b.page("ANTE")
  .translate("en", "Medical history")
  .translate("fr", "Antécédents médicaux")
  .question(
    "Are you aware of any cases of skin cancer among close family members (parents/siblings)",
    "CANCER_FAM",
    b.types
      .choice("one", "1", "N", "0", "UK")
      .translate(
        "en",
        "Yes, only one to my knowledge",
        "Yes, several to my knowledge",
        "No",
        "I don't know"
      )
      .translate(
        "fr",
        "Oui, un seul à ma connaissance",
        "Oui, plusieurs à ma connaissance",
        "Non",
        "Je ne sais pas"
      )
  )
  .translate(
    "fr",
    "Y a-t-il des cas de cancers cutanés dans votre famille chez des parents au premier degré (parents, fratrie, enfants)"
  )
  .required()
  .question(
    "Have you personal history of skin cancer?",
    "CANCER_PER",
    b.types.yesno
  )
  .translate("fr", "Avez-vous des antécédents personnels de cancers cutanés ?")
  .required()
  .startSection("Personal history")
  .translate("fr", "Antécédents personnel")
  .visibleWhen("CANCER_PER")
  .question(
    " -> Histologic type",
    "CANCER_TYPE",
    b.types
      .choice("one", "BCC", "SCC", "M", "UK")
      .translate(
        "en",
        "basal cell carcinoma",
        "squamous cell carcinoma",
        "melanoma",
        "UK"
      )
      .translate(
        "fr",
        "carcinome basocellulaire",
        "carcinome épidermoïde",
        "mélanome",
        "NSP"
      )
  )
  .translate("fr", " -> Type histologique")
  .required()
  .question(" -> Age of diagnostic", "CANCER_AGE", b.types.integer)
  .translate("fr", " -> Age du diagnostique")
  .required()
  .question(
    " -> Have you another skin cancer history ?",
    "CANCER_MORE",
    b.types.yesno
  )
  .translate("fr", " -> Avez-vous eu une d'autres antécédents ?")
  .defaultValue(0)
  .info(" -> Please fill the next record", "CANCER_FILL")
  .translate("fr", " -> Veuillez renseigner l'enregistrement suivant")
  .visibleWhen("CANCER_MORE")
  .endSection();
//#endregion

//#region
const listPCS2003Choices = b.types
  .glossary(
    "one",
    "10",
    "21",
    "22",
    "23",
    "31",
    "32",
    "36",
    "41",
    "46",
    "47",
    "48",
    "51",
    "54",
    "55",
    "56",
    "61",
    "66",
    "69",
    "71",
    "72",
    "73",
    "76",
    "81",
    "82"
  )
  .translate(
    "en",
    "Farmer-operators",
    "Craftsmen",
    "Traders and assimilated",
    "Company managers with 10 or more employees",
    "Liberal and related professions",
    "Civil servants, intellectual and artistic professions",
    "Company executives",
    "Intermediate professions in education, health, civil service and the like",
    "Administrative and commercial intermediary professions of companies",
    "Technicians",
    "Foremen, supervisors",
    "Civil servants",
    "Company administrative employees",
    "Commercial employees",
    "Staff of direct services to individuals",
    "Skilled workers",
    "Unskilled workers",
    "Agricultural workers",
    "Former farmer-operators",
    "Former craftsmen, traders, business leaders",
    "Former executives and intermediate professions",
    "Former employees and workers",
    "Unemployed people who have never worked",
    "Miscellaneous inactive (other than retired)"
  )
  .translate(
    "fr",
    "Agriculteurs exploitants",
    "Artisans",
    "Commerçants et assimilés",
    "Chefs d'entreprise de 10 salariés ou plus",
    "Professions libérales et assimilés",
    "Cadres de la fonction publique, professions intellectuelles et artistiques",
    "Cadres d'entreprise",
    "Professions intermédiaires de l'enseignement, de la santé, de la fonction publique et assimilés",
    "Professions intermédiaires administratives et commerciales des entreprises",
    "Techniciens",
    "Contremaîtres, agents de maîtrise",
    "Employés de la fonction publique",
    "Employés administratifs d'entreprise",
    "Employés de commerce",
    "Personnels des services directs aux particuliers",
    "Ouvriers qualifiés",
    "Ouvriers non qualifiés",
    "Ouvriers agricoles",
    "Anciens agriculteurs exploitants",
    "Anciens artisans, commerçants, chefs d'entreprise",
    "Anciens cadres et professions intermédiaires",
    "Anciens employés et ouvriers",
    "Chômeurs n'ayant jamais travaillé",
    "Inactifs divers (autres que retraités)"
  );

b.page("WORK")
  .translate("en", "Work history")
  .translate("fr", "Historique professionnel")
  .question(" -> Work", "WORK", listPCS2003Choices)
  .translate("fr", " -> Profession")
  .required()
  .question(" -> Details -> Location", "WORK_LOC", b.types.countries("one"))
  .translate("fr", " -> Précisions -> Lieu")
  .question(" -> Details -> Duration", "WORK_DUR", b.types.real)
  .translate("fr", " -> Précisions -> Durée")
  .unit("mo", "yr / a")
  .decimalPrecision(1);
//#endregion

//#region Questionnaire SF12 page
b.page("QSF12")
  .translate("en", "SF12")
  .translate("fr", "SF12")
  .question("Has the questionnaire been completed?", "SF12_DONE", b.types.yesno)
  .defaultValue(0)
  .translate("fr", "Le questionnaire a-t-il été rempli ?")
  .question("Date", "SF12_DATE", b.types.date(false))
  .translate("fr", "Date")
  .required()
  .visibleWhen("SF12_DONE", 1)
  .include("BSF12")
  .visibleWhen("SF12_DONE", 1);
//#endregion

//#region BSF12
sf12(b, "BSF12");
//#endregion

//#region Questionnaire MFI20 page
b.page("QMFI20")
  .translate("en", "MFI-20")
  .translate("fr", "MFI-20")
  .question(
    "Has the questionnaire been completed?",
    "MFI20_DONE",
    b.types.yesno
  )
  .defaultValue(0)
  .translate("fr", "Le questionnaire a-t-il été rempli ?")
  .question("Date", "MFI20_DATE", b.types.date(false))
  .translate("fr", "Date")
  .required()
  .visibleWhen("MFI20_DONE", 1)
  .include("BMFI20")
  .visibleWhen("MFI20_DONE", 1);
//#endregion

//#region BMFI20
mfi20(b, "BMFI20");
//#endregion

//#region WEIGHT page
b.page("PWEIGHT").include("BVS").select("WEIGHT");
//#endregion

//#region Follow-up date page
b.page("FUPVIS")
  .translate("en", "Date")
  .translate("fr", "Date")
  .include("BVDATE")
  .context("VISDATE", 2)
  .include("BCONTINUE")
  .include("PWEIGHT");
//#endregion

//#region End or withdrawal visit
b.page("WITHDVIS")
  .translate("en", "End / withdrawal visit")
  .translate("fr", "Visite de fin / sorti d'étude")
  .include("BVDATE")
  .context("VISDATE", 3)
  .include("BWITHDR");
//#endregion

//#region PAIN
b.page("PAIN")
  .startSection("Pain")
  .translate("fr", "Douleur")
  .question("Done on:", "PAIN_DATE", b.types.date(false))
  .translate("fr", "Réalisé le :")
  .required()
  .info(
    "Specify the importance of your pain at the present moment: 0 corresponds to no pain; 10 is the maximum pain imaginable",
    "__INFO_PAIN_SCALE"
  )
  .translate(
    "fr",
    "Préciser l'importance de votre douleur au moment présent : 0 correspond à pas de douleur ; 10 correspond à la douleur maximale imaginable"
  )
  .question("", "PAIN_SCORE", b.types.scale(0, 10))
  .comment("<no pain | maximum pain>")
  .translate("fr", "<pas de douleur | douleur maximale>")
  .required()
  .endSection();
//#endregion

//#region SAE
b.page("SAE")
  .translate("fr", "EIG")
  .question("Adverse event", "SAETYPE", b.types.text)
  .translate("fr", "EI")
  .required()
  .critical("ae")
  .question("Date of onset", "STDT", b.types.date(true))
  .translate("fr", "Date de début")
  .question("Ongoing", "ONGO", b.types.yesno)
  .translate("fr", "En cours")
  .question("Date of end", "ENDT", b.types.date(true))
  .translate("fr", "Date de fin")
  .activateWhen("ONGO", 0)
  .question(
    "Seriousness",
    "SERIOUSNESS",
    b.types
      .choice("one", "D", "H", "MS")
      .wording("Death", "Hospitalization", "Medically significant")
      .translate("fr", "Décès", "Hospitalisation", "Médicalement significatif")
  )
  .translate("fr", "Gravité")
  .question(
    "Severity",
    "SEVERITY",
    b.types
      .choice("one", "MIL", "MOD", "SEV")
      .wording("Mild", "Moderate", "Severe")
      .translate("fr", "Légère", "Modérée", "Sévère")
  )
  .translate("fr", "Sévérité")
  .question(
    "Outcome",
    "OUTCOME",
    b.types
      .choice("one", "RVD", "RWS", "ONG", "RCV", "D")
      .wording(
        "Resolved",
        "Resolved with sequelae",
        "Ongoing",
        "Recovering",
        "Death"
      )
      .translate(
        "fr",
        "Résolu",
        "Résolu avec séquelles",
        "En cours",
        "En convalescence",
        "Décès"
      )
  )
  .translate("fr", "Résultat");
//#endregion

//#region "Gloabl Signature"
b.page("GLOBALSIGN")
  .translate("en", "Global Signature")
  .translate("fr", "Signature Globale")
  .question(
    "As a PI of this site, I confirm that the information provided in these forms are precise.",
    "PICONFIRM",
    b.types.acknowledge
  )
  .translate(
    "fr",
    "En tant que PI, je confirme que les informations renseignées dans ces formulaires sont exactes."
  )
  .required()
  .question("Date of Signature", "PISIGNDATE", b.types.date())
  .required()
  .activateWhen("PICONFIRM")
  .question("Signed", "__SIGNED", b.types.acknowledge)
  .computed("!!PICONFIRM && !!PISIGNDATE");
//#endregion

