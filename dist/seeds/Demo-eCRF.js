var survey = {
	name: "Demo-eCRF",
	config: {
		languages: [
			"en",
			"fr"
		],
		defaultLang: "en",
		visitDateVar: "VDATE",
		phoneVar: "__PHONE",
		emailVar: "__EMAIL",
		showFillRate: true,
		epro: false,
		inclusionVar: {
			name: "__INCLUDED",
			hidden: true
		},
		signatureVar: {
			name: "__SIGNED",
			hidden: true
		},
		consentVar: "CONSENT",
		unitSuffix: "_UNIT",
		workflowVar: "__WORKFLOW",
		participantCodeStrategy: {
			length: 5,
			bySample: false
		}
	},
	workflows: [
		{
			name: "main",
			infoType: "SYNT",
			singleTypes: [
				"PREINC",
				"INC",
				"WITHD",
				"GLOBALSIGN"
			],
			manyTypes: [
				"FUP",
				"PAIN",
				"SAE"
			],
			sequenceTypes: [
				"PREINC",
				"INC",
				"FUP"
			],
			stopTypes: [
				"WITHD"
			],
			actions: [
				[
					"input",
					"signature",
					"query",
					"checking"
				]
			],
			notifications: [
			]
		},
		{
			name: "writer:pv",
			infoType: "SYNT",
			singleTypes: [
				"PREINC",
				"INC",
				"WITHD",
				"GLOBALSIGN"
			],
			manyTypes: [
				"FUP",
				"PAIN",
				"SAE"
			],
			sequenceTypes: [
				"PREINC",
				"INC",
				"FUP"
			],
			stopTypes: [
				"WITHD"
			],
			actions: [
				[
					"input",
					"signature",
					"query",
					"checking"
				]
			],
			notifications: [
				"inclusion",
				"ae"
			]
		}
	],
	pageSets: [
		{
			type: {
				__code__: "SYNT",
				en: "Synthesis",
				fr: "Synthèse"
			},
			pageNames: [
				"SYNT"
			],
			mandatoryPageNames: [
			]
		},
		{
			type: {
				__code__: "PREINC",
				en: "Pre-Inclusion",
				fr: "Pré-Inclusion"
			},
			pageNames: [
				"PREINC"
			],
			mandatoryPageNames: [
				"PREINC"
			],
			datevar: "VISDATE"
		},
		{
			type: {
				__code__: "INC",
				en: "Inclusion visit",
				fr: "Visample d'inclusion"
			},
			pageNames: [
				"INCVIS",
				"PATINFO",
				"LABHAEMAT",
				"LABBIOCH",
				"ANTE",
				"QSF12",
				"QMFI20",
				"WORK"
			],
			mandatoryPageNames: [
				"INCVIS"
			],
			datevar: "VISDATE"
		},
		{
			type: {
				__code__: "FUP",
				en: "Follow-up visit",
				fr: "Visample de suivi"
			},
			pageNames: [
				"FUPVIS",
				"LABHAEMAT",
				"LABBIOCH",
				"QSF12",
				"QMFI20"
			],
			mandatoryPageNames: [
				"FUPVIS"
			],
			datevar: "VISDATE"
		},
		{
			type: {
				__code__: "PAIN",
				en: "Pain",
				fr: "Douleur"
			},
			pageNames: [
				"PAIN"
			],
			mandatoryPageNames: [
			],
			datevar: "PAIN_DATE"
		},
		{
			type: {
				__code__: "SAE",
				en: "SAE",
				fr: "EIG"
			},
			pageNames: [
				"SAE"
			],
			mandatoryPageNames: [
			],
			datevar: "STDT"
		},
		{
			type: {
				__code__: "WITHD",
				en: "End or Withdrawal visit",
				fr: "Visample de fin ou de retrait"
			},
			pageNames: [
				"WITHDVIS"
			],
			mandatoryPageNames: [
			],
			datevar: "VISDATE"
		},
		{
			type: {
				__code__: "GLOBALSIGN",
				en: "Global Signature",
				fr: "Signature Globale"
			},
			pageNames: [
				"GLOBALSIGN"
			],
			mandatoryPageNames: [
			],
			datevar: "PISIGNDATE"
		}
	],
	pages: [
		{
			name: {
				__code__: "SYNT",
				en: "Synthesis",
				fr: "Synthèse"
			},
			includes: [
			]
		},
		{
			name: "BVDATE",
			includes: [
				{
					array: false,
					wording: [
						{
							en: "Pre-inclusion Date:",
							fr: "Date de Pré-inclusion :"
						},
						{
							en: "Inclusion date:",
							fr: "Date d'inclusion :"
						},
						{
							en: "FUP date:",
							fr: "Date FUP :"
						},
						{
							en: "End visit or Withdrawal date:",
							fr: "Date de Visample de fin ou de retrait :"
						}
					],
					variableName: "VISDATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				}
			]
		},
		{
			name: "BCONTINUE",
			includes: [
				{
					array: false,
					wording: {
						en: "Can the participant continue the survey?",
						fr: "Le participant peut-il continuer l'étude ?"
					},
					variableName: "CONTINUE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				}
			]
		},
		{
			name: "BCONSENT",
			includes: [
				{
					array: false,
					wording: {
						en: "Consent has been obtained:",
						fr: "Consentement obtenu :"
					},
					variableName: "CONSENT",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Informed consent",
						fr: "Consentement éclairé"
					}
				},
				{
					array: false,
					wording: {
						en: "Consent date:",
						fr: "Date de Consentement :"
					},
					variableName: "CONS_DATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Informed consent",
						fr: "Consentement éclairé"
					}
				}
			]
		},
		{
			name: "BINCC",
			includes: [
				{
					array: false,
					wording: {
						en: "Participant aged 18 or over:",
						fr: "Participant âgé de 18 ans ou plus :"
					},
					variableName: "INC01",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Inclusion criteria",
						fr: "Critère d'inclusion"
					}
				},
				{
					array: false,
					wording: {
						en: "Participant agreeing to participate in the survey and having signed the informed consent form:",
						fr: "Participant acceptant de participer à l’étude et ayant signé le formulaire de consentement éclairé :"
					},
					variableName: "INC02",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Inclusion criteria",
						fr: "Critère d'inclusion"
					}
				},
				{
					array: false,
					wording: {
						en: "All inclusion criteria must be set to Yes to include the participant",
						fr: "Tous les critères d'inclusion doivent être positionnés à Oui pour inclure le participant"
					},
					variableName: "INCINFO",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: {
						en: "Inclusion criteria",
						fr: "Critère d'inclusion"
					}
				}
			]
		},
		{
			name: "BEXCC",
			includes: [
				{
					array: false,
					wording: {
						en: "Participant already participating in another interventional clinical trial :",
						fr: "Participant participant déjà à un autre essai clinique interventionnel :"
					},
					variableName: "EXC01",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Exclusion criteria",
						fr: "Critère d'exclusion"
					}
				},
				{
					array: false,
					wording: {
						en: "Woman of childbearing age, pregnant or wishing to be during the survey:",
						fr: "Femme en âge de procréer, enceinte ou désirant l’être pendant l’étude :"
					},
					variableName: "EXC02",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Exclusion criteria",
						fr: "Critère d'exclusion"
					}
				},
				{
					array: false,
					wording: {
						en: "All exclusion criteria must be set to No to include the participant",
						fr: "Tous les critères d'exclusion doivent être positionnés à Non pour inclure le participant"
					},
					variableName: "EXCINFO",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: {
						en: "Exclusion criteria",
						fr: "Critère d'exclusion"
					}
				}
			]
		},
		{
			name: "BPATINIT",
			includes: [
				{
					array: false,
					wording: {
						en: "Last name initial (*):",
						fr: "Initiale du nom :"
					},
					variableName: "LASTNAME",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "text"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						},
						{
							name: "fixedLength",
							precedence: 10,
							length: 2
						},
						{
							letterCase: "upper",
							name: "letterCase",
							precedence: 10
						}
					],
					itemComment: {
						en: "(*) 2 first letters of the name",
						fr: "(*) 2 premières lettres du nom"
					},
					pinTitle: {
						en: "Name",
						fr: "Nom"
					}
				},
				{
					array: false,
					wording: {
						en: "First name initial (*) :",
						fr: "Initiale du prénom :"
					},
					variableName: "FIRSTNAME",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "text"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						},
						{
							name: "fixedLength",
							precedence: 10,
							length: 3
						},
						{
							letterCase: "upper",
							name: "letterCase",
							precedence: 10
						}
					],
					itemComment: {
						en: "(*) 3 first letters of the first name",
						fr: "(*) 3 premières lettres du prénom"
					},
					pinTitle: {
						en: "First name",
						fr: "Prénom"
					}
				}
			]
		},
		{
			name: "BDM",
			includes: [
				{
					array: false,
					wording: {
						en: "Birth date",
						fr: "Date de naissance"
					},
					variableName: "BRTHDT",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: true,
						month: true,
						name: "date"
					},
					rules: [
					],
					section: {
						en: "Demography",
						fr: "Données démographiques"
					},
					pinTitle: {
						en: "Birth date",
						fr: "Date de naissance"
					}
				},
				{
					array: false,
					wording: {
						en: "Gender",
						fr: "Sexe"
					},
					variableName: "SEX",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"F",
							"M"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "F",
								en: "Female",
								fr: "Femme"
							},
							{
								__code__: "M",
								en: "Male",
								fr: "Homme"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"F",
							"M"
						]
					},
					rules: [
					],
					section: {
						en: "Demography",
						fr: "Données démographiques"
					},
					pinTitle: {
						en: "Gender",
						fr: "Sexe"
					}
				}
			]
		},
		{
			name: "BVS",
			includes: [
				{
					array: false,
					wording: {
						en: "Height",
						fr: "Taille"
					},
					variableName: "HEIGHT",
					units: {
						values: [
							"cm"
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "integer"
					},
					rules: [
						{
							min: 150,
							max: 210,
							limits: {
								includeLower: true,
								includeUpper: true
							},
							name: "inRange",
							precedence: 10
						}
					],
					section: {
						en: "Vital signs",
						fr: "Examen clinique"
					}
				},
				{
					array: false,
					wording: {
						en: "Weight",
						fr: "Poids"
					},
					variableName: "WEIGHT",
					units: {
						values: [
							"kg"
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "integer"
					},
					rules: [
						{
							min: 50,
							max: 110,
							limits: {
								includeLower: true,
								includeUpper: true
							},
							name: "inRange",
							precedence: 10
						}
					],
					section: {
						en: "Vital signs",
						fr: "Examen clinique"
					}
				},
				{
					array: false,
					wording: {
						en: "BMI",
						fr: "IMC"
					},
					variableName: "BMI",
					units: {
						values: [
							"kg/m²"
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 0
						}
					],
					section: {
						en: "Vital signs",
						fr: "Examen clinique"
					},
					itemComment: "{.no-specials}"
				}
			]
		},
		{
			name: "BWITHDR",
			includes: [
				{
					array: false,
					wording: {
						en: "Reason",
						fr: "Raison"
					},
					variableName: "WITHREAS",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"CW",
							"D",
							"LFU",
							"OTH"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "CW",
								en: "Consent withdrawal from the survey",
								fr: "Retrait du consentement de l'étude"
							},
							{
								__code__: "D",
								en: "Death",
								fr: "Décès"
							},
							{
								__code__: "LFU",
								en: "Lost to follow-up",
								fr: "Perdu de vue"
							},
							{
								__code__: "OTH",
								en: "Other",
								fr: "Autre"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"CW",
							"D",
							"LFU",
							"OTH"
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: false,
					wording: {
						en: "If Other, please specify",
						fr: "Si autre, précisez"
					},
					variableName: "WITHREAS_C",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "text"
					},
					rules: [
					]
				}
			]
		},
		{
			name: {
				__code__: "PREINC",
				en: "Pre-Inclusion",
				fr: "Pré-Inclusion"
			},
			includes: [
				{
					pageName: "BVDATE"
				},
				{
					pageName: "BCONSENT"
				},
				{
					pageName: "BINCC"
				},
				{
					pageName: "BEXCC"
				},
				{
					array: false,
					wording: {
						en: "Is the participant eligible?",
						fr: "Le participant est-il éligible ?"
					},
					variableName: "PAT_ELIG",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					pinTitle: {
						en: "Eligible",
						fr: "Eligible"
					}
				},
				{
					array: false,
					wording: {
						en: "Is the participant a healthy volunteer?",
						fr: "Le participant est-il volontaire sain ?"
					},
					variableName: "PAT_HEALTHY",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					],
					"default": 0
				},
				{
					array: false,
					wording: "Is the participant included?",
					variableName: "__INCLUDED",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "acknowledge",
						nature: "categorical",
						labels: [
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						},
						{
							event: "inclusion",
							message: "inclusion",
							name: "critical",
							precedence: 70,
							values: [
							]
						}
					]
				}
			]
		},
		{
			name: {
				__code__: "INCVIS",
				en: "Date",
				fr: "Date"
			},
			includes: [
				{
					pageName: "BVDATE",
					contexts: [
						[
							"VISDATE",
							1
						]
					]
				},
				{
					pageName: "BCONTINUE"
				}
			]
		},
		{
			name: {
				__code__: "PATINFO",
				en: "Participant information",
				fr: "Informations du participant"
			},
			includes: [
				{
					pageName: "BPATINIT"
				},
				{
					pageName: "BDM"
				},
				{
					pageName: "BVS"
				}
			]
		},
		{
			name: {
				__code__: "LABHAEMAT",
				en: "Lab tests - Haematology",
				fr: "Lab. tests - Hématologie"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Sample collected?",
						fr: "Echantillon collecté ?"
					},
					variableName: "HAEMATDONE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: false,
					wording: {
						en: "If no, please specify reason:",
						fr: "Si non, précisez la raison :"
					},
					variableName: "HAEMATNDONE_SPE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "text"
					},
					rules: [
					]
				},
				{
					pageName: "BLABTHAEMAT"
				},
				{
					pageName: "BSAMPLEIMG"
				}
			]
		},
		{
			name: {
				__code__: "LABBIOCH",
				en: "Lab tests - Biochemistry",
				fr: "Lab. tests - Biochimie"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Sample collected?",
						fr: "Echantillon collecté ?"
					},
					variableName: "BIOCHDONE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: false,
					wording: {
						en: "If no, please specify reason:",
						fr: "Si non, précisez la raison :"
					},
					variableName: "BIOCHNDONE_SPE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "text"
					},
					rules: [
					]
				},
				{
					pageName: "BLABTBIOCH"
				}
			]
		},
		{
			name: "BLABTHAEMAT",
			includes: [
				{
					array: false,
					wording: {
						en: "Collection date:",
						fr: "Date du prélèvement :"
					},
					variableName: "HAEMAT_DATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Fasting:",
						fr: "A jeun :"
					},
					variableName: "HAEMAT_FASTING",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					],
					"default": 0
				},
				{
					array: false,
					wording: {
						en: "Red Blood Cells -> Result",
						fr: "Globule rouge -> Résultat"
					},
					variableName: "REDBLOODR",
					units: {
						values: [
							"T/L (10^12/L)",
							"10^6/mm3"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Red Blood Cells -> Interpretation",
						fr: "Globule rouge -> Interprétation"
					},
					variableName: "REDBLOODI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Hemoglobin -> Result",
						fr: "Hémoglobine -> Résultat"
					},
					variableName: "HEMOGR",
					units: {
						values: [
							"g/L",
							"g/dL",
							"mmol/L"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Hemoglobin -> Interpretation",
						fr: "Hémoglobine -> Interprétation"
					},
					variableName: "HEMOGI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Hematocrit -> Result",
						fr: "Hématocrite -> Résultat"
					},
					variableName: "HEMATCR",
					units: {
						values: [
							"%"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Hematocrit -> Interpretation",
						fr: "Hématocrite -> Interprétation"
					},
					variableName: "HEMATCI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "White Blood Cells -> Result",
						fr: "Globule blanc -> Résultat"
					},
					variableName: "WHITEBLOODR",
					units: {
						values: [
							"G/L (10^9/L)",
							"10^3/mm3"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "White Blood Cells -> Interpretation",
						fr: "Globule blanc -> Interprétation"
					},
					variableName: "WHITEBLOODI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Lymphocytes -> Result",
						fr: "Lymphocytes -> Résultat"
					},
					variableName: "NEUTRR",
					units: {
						values: [
							"G/L (10^9/L)",
							"10^3/mm3",
							"%"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Lymphocytes -> Interpretation",
						fr: "Lymphocytes -> Interprétation"
					},
					variableName: "NEUTRI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Platelets -> Result",
						fr: "Plaquettes -> Résultat"
					},
					variableName: "PLATR",
					units: {
						values: [
							"G/L (10^9/L)",
							"10^3/mm3"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Platelets -> Interpretation",
						fr: "Plaquettes -> Interprétation"
					},
					variableName: "PLATI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				}
			]
		},
		{
			name: "BLABTBIOCH",
			includes: [
				{
					array: false,
					wording: {
						en: "Collection date:",
						fr: "Date du prélèvement :"
					},
					variableName: "BIOCH_DATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Fasting:",
						fr: "A jeun :"
					},
					variableName: "BIOCH_FASTING",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Glucose -> Result",
						fr: "Glycémie -> Résultat"
					},
					variableName: "GLUCR",
					units: {
						values: [
							"mmol/L",
							"g/L",
							"mg/dL"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Glucose -> Interpretation",
						fr: "Glycémie -> Interprétation"
					},
					variableName: "GLUCI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Urea -> Result",
						fr: "Urée -> Résultat"
					},
					variableName: "UREAR",
					units: {
						values: [
							"mmol/L",
							"g/L",
							"mg/dL"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Urea -> Interpretation",
						fr: "Urée -> Interprétation"
					},
					variableName: "UREAI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Creatinine -> Result",
						fr: "Créatinine -> Résultat"
					},
					variableName: "CREATR",
					units: {
						values: [
							"µmol/L",
							"g/L",
							"mg/L",
							"mg/dL"
						],
						isExtendable: true
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 2
						}
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Creatinine -> Interpretation",
						fr: "Créatinine -> Interprétation"
					},
					variableName: "CREATI",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"2",
							"3"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "2",
								en: "Abnormal - Clinically significant",
								fr: "Abnormal - Cliniquement significatif"
							},
							{
								__code__: "3",
								en: "Abnormal - Not clinically significant",
								fr: "Abnormal - Non cliniquement significatif"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3"
						]
					},
					rules: [
					],
					section: " "
				}
			]
		},
		{
			name: "BSAMPLEIMG",
			includes: [
				{
					array: false,
					wording: {
						en: "Please upload image:",
						fr: "Télécharger l'image :"
					},
					variableName: "SAMPLE_IMG",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "image"
					},
					rules: [
					],
					section: "  "
				}
			]
		},
		{
			name: {
				__code__: "ANTE",
				en: "Medical history",
				fr: "Antécédents médicaux"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Are you aware of any cases of skin cancer among close family members (parents/siblings)",
						fr: "Y a-t-il des cas de cancers cutanés dans votre famille chez des parents au premier degré (parents, fratrie, enfants)"
					},
					variableName: "CANCER_FAM",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"1",
							"N",
							"0",
							"UK"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Yes, only one to my knowledge",
								fr: "Oui, un seul à ma connaissance"
							},
							{
								__code__: "N",
								en: "Yes, several to my knowledge",
								fr: "Oui, plusieurs à ma connaissance"
							},
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "UK",
								en: "I don't know",
								fr: "Je ne sais pas"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"1",
							"N",
							"0",
							"UK"
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: false,
					wording: {
						en: "Have you personal history of skin cancer?",
						fr: "Avez-vous des antécédents personnels de cancers cutanés ?"
					},
					variableName: "CANCER_PER",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: true,
					wording: {
						en: " -> Histologic type",
						fr: " -> Type histologique"
					},
					variableName: "CANCER_TYPE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"BCC",
							"SCC",
							"M",
							"UK"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "BCC",
								en: "basal cell carcinoma",
								fr: "carcinome basocellulaire"
							},
							{
								__code__: "SCC",
								en: "squamous cell carcinoma",
								fr: "carcinome épidermoïde"
							},
							{
								__code__: "M",
								en: "melanoma",
								fr: "mélanome"
							},
							{
								__code__: "UK",
								en: "UK",
								fr: "NSP"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"BCC",
							"SCC",
							"M",
							"UK"
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Personal history",
						fr: "Antécédents personnel"
					}
				},
				{
					array: true,
					wording: {
						en: " -> Age of diagnostic",
						fr: " -> Age du diagnostique"
					},
					variableName: "CANCER_AGE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "integer"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Personal history",
						fr: "Antécédents personnel"
					}
				},
				{
					array: true,
					wording: {
						en: " -> Have you another skin cancer history ?",
						fr: " -> Avez-vous eu une d'autres antécédents ?"
					},
					variableName: "CANCER_MORE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					],
					section: {
						en: "Personal history",
						fr: "Antécédents personnel"
					},
					"default": 0
				},
				{
					array: true,
					wording: {
						en: " -> Please fill the next record",
						fr: " -> Veuillez renseigner l'enregistrement suivant"
					},
					variableName: "CANCER_FILL",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: {
						en: "Personal history",
						fr: "Antécédents personnel"
					}
				}
			]
		},
		{
			name: {
				__code__: "WORK",
				en: "Work history",
				fr: "Historique professionnel"
			},
			includes: [
				{
					array: true,
					wording: {
						en: " -> Work",
						fr: " -> Profession"
					},
					variableName: "WORK",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
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
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "10",
								en: "Farmer-operators",
								fr: "Agriculteurs exploitants"
							},
							{
								__code__: "21",
								en: "Craftsmen",
								fr: "Artisans"
							},
							{
								__code__: "22",
								en: "Traders and assimilated",
								fr: "Commerçants et assimilés"
							},
							{
								__code__: "23",
								en: "Company managers with 10 or more employees",
								fr: "Chefs d'entreprise de 10 salariés ou plus"
							},
							{
								__code__: "31",
								en: "Liberal and related professions",
								fr: "Professions libérales et assimilés"
							},
							{
								__code__: "32",
								en: "Civil servants, intellectual and artistic professions",
								fr: "Cadres de la fonction publique, professions intellectuelles et artistiques"
							},
							{
								__code__: "36",
								en: "Company executives",
								fr: "Cadres d'entreprise"
							},
							{
								__code__: "41",
								en: "Intermediate professions in education, health, civil service and the like",
								fr: "Professions intermédiaires de l'enseignement, de la santé, de la fonction publique et assimilés"
							},
							{
								__code__: "46",
								en: "Administrative and commercial intermediary professions of companies",
								fr: "Professions intermédiaires administratives et commerciales des entreprises"
							},
							{
								__code__: "47",
								en: "Technicians",
								fr: "Techniciens"
							},
							{
								__code__: "48",
								en: "Foremen, supervisors",
								fr: "Contremaîtres, agents de maîtrise"
							},
							{
								__code__: "51",
								en: "Civil servants",
								fr: "Employés de la fonction publique"
							},
							{
								__code__: "54",
								en: "Company administrative employees",
								fr: "Employés administratifs d'entreprise"
							},
							{
								__code__: "55",
								en: "Commercial employees",
								fr: "Employés de commerce"
							},
							{
								__code__: "56",
								en: "Staff of direct services to individuals",
								fr: "Personnels des services directs aux particuliers"
							},
							{
								__code__: "61",
								en: "Skilled workers",
								fr: "Ouvriers qualifiés"
							},
							{
								__code__: "66",
								en: "Unskilled workers",
								fr: "Ouvriers non qualifiés"
							},
							{
								__code__: "69",
								en: "Agricultural workers",
								fr: "Ouvriers agricoles"
							},
							{
								__code__: "71",
								en: "Former farmer-operators",
								fr: "Anciens agriculteurs exploitants"
							},
							{
								__code__: "72",
								en: "Former craftsmen, traders, business leaders",
								fr: "Anciens artisans, commerçants, chefs d'entreprise"
							},
							{
								__code__: "73",
								en: "Former executives and intermediate professions",
								fr: "Anciens cadres et professions intermédiaires"
							},
							{
								__code__: "76",
								en: "Former employees and workers",
								fr: "Anciens employés et ouvriers"
							},
							{
								__code__: "81",
								en: "Unemployed people who have never worked",
								fr: "Chômeurs n'ayant jamais travaillé"
							},
							{
								__code__: "82",
								en: "Miscellaneous inactive (other than retired)",
								fr: "Inactifs divers (autres que retraités)"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
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
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: true,
					wording: {
						en: " -> Details -> Location",
						fr: " -> Précisions -> Lieu"
					},
					variableName: "WORK_LOC",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"FRA",
							"BEL",
							"ESP",
							"ITA"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "FRA",
								en: "France",
								fr: "France"
							},
							{
								__code__: "BEL",
								en: "Belgium",
								fr: "Belgique"
							},
							{
								__code__: "ESP",
								en: "Spain",
								fr: "Espagne"
							},
							{
								__code__: "ITA",
								en: "Italy",
								fr: "Italie"
							}
						],
						name: "glossary",
						nature: "categorical",
						rawValues: [
							"FRA",
							"BEL",
							"ESP",
							"ITA"
						]
					},
					rules: [
					]
				},
				{
					array: true,
					wording: {
						en: " -> Details -> Duration",
						fr: " -> Précisions -> Durée"
					},
					variableName: "WORK_DUR",
					units: {
						values: [
							"mo",
							"yr / a"
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							name: "decimalPrecision",
							precedence: 10,
							precision: 1
						}
					]
				}
			]
		},
		{
			name: {
				__code__: "QSF12",
				en: "SF12",
				fr: "SF12"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Has the questionnaire been completed?",
						fr: "Le questionnaire a-t-il été rempli ?"
					},
					variableName: "SF12_DONE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					],
					"default": 0
				},
				{
					array: false,
					wording: {
						en: "Date",
						fr: "Date"
					},
					variableName: "SF12_DATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					pageName: "BSF12"
				}
			]
		},
		{
			name: "BSF12",
			includes: [
				{
					array: false,
					wording: {
						en: "1. In general, would you say your health is:",
						fr: "1. Dans\tl’ensemble,\tpensez-vous\tque\tvotre\tsanté\test\t:"
					},
					variableName: "SF12_01",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Excellent",
								fr: "Excellente"
							},
							{
								__code__: "2",
								en: "Very good",
								fr: "Très\tbonne"
							},
							{
								__code__: "3",
								en: "Good",
								fr: "Bonne"
							},
							{
								__code__: "4",
								en: "Fair",
								fr: "Médiocre"
							},
							{
								__code__: "5",
								en: "Poor",
								fr: "Mauvaise"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "The following questions are about activities you might do during a typical day. Does your health now limit you in these activities? If so, how much?",
						fr: "En\traison\tde\tvotre\tétat\tde\tsanté\tactuel,\têtes-vous\tlimité\tpour :"
					},
					variableName: "INFO_SF121",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "2. Moderate activities such as moving a table, pushing, a vacuum cleaner, bowling, or playing golf.",
						fr: "2. Des efforts physiques modérés (déplacer une table, passer l’aspirateur, jouer aux boules)."
					},
					variableName: "SF12_02",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Yes, limited a lot",
								fr: "Oui, beaucoup limité"
							},
							{
								__code__: "2",
								en: "Yes, limited a little",
								fr: "Oui, un peu limité"
							},
							{
								__code__: "3",
								en: "No, not limited at all",
								fr: "Non, pas du tout limité"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "3. Climbing several flights of stairs.",
						fr: "3. Monter plusieurs étages par l’escalier."
					},
					variableName: "SF12_03",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Yes, limited a lot",
								fr: "Oui, beaucoup limité"
							},
							{
								__code__: "2",
								en: "Yes, limited a little",
								fr: "Oui, un peu limité"
							},
							{
								__code__: "3",
								en: "No, not limited at all",
								fr: "Non, pas du tout limité"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "During the past 4 weeks, have you had any of the following problems with your work or other regular daily activities as a result of your physical health?",
						fr: "Au cours de ces 4 dernières semaines, et en raison de votre état physique :"
					},
					variableName: "INFO_SF122",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "4. Accomplished less than you would like.",
						fr: "4. Avez-vous accompli moins de choses que vous auriez souhaité ?"
					},
					variableName: "SF12_04",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "5. Were limited in the kind of work or other activities.",
						fr: "5. Avez-vous été limité pour faire certaines choses ?"
					},
					variableName: "SF12_05",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "During the past 4 weeks, have you had any of the following problems with your work or other regular daily activities as a result of any emotional problems (such as feeling depressed or anxious)?",
						fr: "Au cours de ces 4 dernières semaines, et en raison de votre état émotionnel (comme vous sentir triste, nerveux ou déprimé) :"
					},
					variableName: "INFO_SF123",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "6. Accomplished less than you would like.",
						fr: "6. Avez-vous accompli moins de choses que vous auriez souhaité ?"
					},
					variableName: "SF12_06",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "7. Did work or activities less carefully than usual.",
						fr: "7. Avez-vous eu des difficultés à faire ce que vous aviez à faire avec autant de soin et d’attention que d’habitude ?"
					},
					variableName: "SF12_07",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "8.  During the past 4 weeks, how much did pain interfere with your normal work (including work outside the home and housework)?",
						fr: "8. Au\tcours\tde ces 4 dernières semaines, dans quelle mesure vos douleurs physiques vous ont-elles limité dans votre travail ou vos activités domestiques ?"
					},
					variableName: "SF12_08",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Not at all",
								fr: "Pas du tout"
							},
							{
								__code__: "2",
								en: "A little bit",
								fr: "Un petit peu"
							},
							{
								__code__: "3",
								en: "Moderately",
								fr: "Moyennement"
							},
							{
								__code__: "4",
								en: "Quite a bit",
								fr: "Beaucoup"
							},
							{
								__code__: "5",
								en: "Extremely",
								fr: "Enormément"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "These questions are about how you have been feeling during the past 4 weeks. For each question, please give the one answer that comes closest to the way you have been feeling. ",
						fr: "Les questions qui suivent portent sur comment vous vous êtes senti au cours de ces 4 dernières semaines. Pour chaque question, indiquez la réponse qui vous semble la plus appropriée :"
					},
					variableName: "INFO_SF124",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "9. Have you felt calm & peaceful?",
						fr: "9. Y a t-il eu des moments où vous vous êtes senti calme et détendu ?"
					},
					variableName: "SF12_09",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "10. Did you have a lot of energy? ",
						fr: "10. Y a t-il eu des moments où vous vous êtes senti débordant d’énergie ?"
					},
					variableName: "SF12_10",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "11. Have you felt down-hearted and blue? ",
						fr: "11. Y a t-il eu des moments où vous vous êtes senti triste et abattu ?"
					},
					variableName: "SF12_11",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "12. During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (like visiting friends, relatives, etc.)? ",
						fr: "12. Au cours de ces 4\tdernières\tsemaines,\ty\ta\tt-il eu des\tmoments\toù votre état de santé physique ou émotionnel vous a gêné dans votre vie sociale et vos relations avec les autres, votre famille, vos amis, vos connaissances ?"
					},
					variableName: "SF12_12",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "All of the time",
								fr: "Toujours"
							},
							{
								__code__: "2",
								en: "Most of the time",
								fr: "La plupart du temps"
							},
							{
								__code__: "3",
								en: "Some of the time",
								fr: "Souvent"
							},
							{
								__code__: "4",
								en: "A little of the time",
								fr: "Parfois"
							},
							{
								__code__: "5",
								en: "None of the time",
								fr: "Jamais"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
					],
					section: " "
				},
				{
					array: false,
					wording: {
						en: "Compute score automatically:",
						fr: "Calculer le score automatiquement :"
					},
					variableName: "__SF12_SCORE_AUTO",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "acknowledge",
						nature: "categorical",
						labels: [
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							1
						]
					},
					rules: [
					],
					"default": true
				},
				{
					array: false,
					wording: {
						en: "Score:",
						fr: "Score :"
					},
					variableName: "SF12_SCORE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "integer"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				}
			]
		},
		{
			name: {
				__code__: "QMFI20",
				en: "MFI-20",
				fr: "MFI-20"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Has the questionnaire been completed?",
						fr: "Le questionnaire a-t-il été rempli ?"
					},
					variableName: "MFI20_DONE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					],
					"default": 0
				},
				{
					array: false,
					wording: {
						en: "Date",
						fr: "Date"
					},
					variableName: "MFI20_DATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					pageName: "BMFI20"
				}
			]
		},
		{
			name: "BMFI20",
			includes: [
				{
					array: false,
					wording: {
						en: "1. I feel fit.",
						fr: "1. Je me sens en forme."
					},
					variableName: "MFI20_01",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "2. Physically, I feel only able to do a little.",
						fr: "2. Physiquement, je ne me sens pas capable de faire grand chose."
					},
					variableName: "MFI20_02",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "3. I feel very active.",
						fr: "3. Je me sens très actif(ve)."
					},
					variableName: "MFI20_03",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "4. I feel like doing all sorts of nice things.",
						fr: "4. J'ai envie de faire des tas de choses agréables."
					},
					variableName: "MFI20_04",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "5. I feel tired.",
						fr: "5. Je me sens fatigué(e)."
					},
					variableName: "MFI20_05",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "6. I think I do a lot in a day.",
						fr: "6. Je pense que je fais beaucoup de choses dans une journée."
					},
					variableName: "MFI20_06",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "7. When I am doing something, I can keep my thoughts on it.",
						fr: "7. Quand je fais quelque chose, je peux me concentrer dessus."
					},
					variableName: "MFI20_07",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "8. Physically I can take on a lot.",
						fr: "8. Physiquement, je peux faire beaucoup."
					},
					variableName: "MFI20_08",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "9. I dread having to do things.",
						fr: "9. Je redoute d'avoir des choses à faire."
					},
					variableName: "MFI20_09",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "10. I think I do very little in a day.",
						fr: "10. Je pense que je ne fais pas grand-chose dans une journée."
					},
					variableName: "MFI20_10",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "11. I can concentrate well.",
						fr: "11. J'arrive à bien me concentrer."
					},
					variableName: "MFI20_11",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "12. I am rested.",
						fr: "12. Je me sens reposé(e)."
					},
					variableName: "MFI20_12",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "13. It takes a lot of effort to concentrate on things.",
						fr: "13. Me concentrer sur quelque chose me demande beaucoup d'effort."
					},
					variableName: "MFI20_13",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "14. Physically I feel I am in a bad condition.",
						fr: "14. Physiquement je me sens en mauvais état."
					},
					variableName: "MFI20_14",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "15. I have a lot of plans.",
						fr: "15. J'ai un tas de projets."
					},
					variableName: "MFI20_15",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "16. I tired easily.",
						fr: "16. Je me fatigue facilement."
					},
					variableName: "MFI20_16",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "17. I get little done.",
						fr: "17. Je mène peu de choses à bien."
					},
					variableName: "MFI20_17",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "18. I don't feel like doing anything.",
						fr: "18. Je n'ai rien envie de faire."
					},
					variableName: "MFI20_18",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "19. My thoughts easily wander.",
						fr: "19. Mes pensées s'égarent facilement."
					},
					variableName: "MFI20_19",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "20. Physically I feel I am in an excellent condition.",
						fr: "20. Physiquement, je me sens en parfait état."
					},
					variableName: "MFI20_20",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							1,
							2,
							3,
							4,
							5
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							}
						],
						name: "score",
						rawValues: [
							1,
							2,
							3,
							4,
							5
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: " ",
					itemComment: {
						en: "<yes, that is true | no, that is not true>",
						fr: "<oui, c'est vrai | non, ce n'est pas vrai>"
					}
				},
				{
					array: false,
					wording: {
						en: "Compute score automatically:",
						fr: "Calculer le score automatiquement :"
					},
					variableName: "__MFI20_SCORE_AUTO",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "acknowledge",
						nature: "categorical",
						labels: [
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							1
						]
					},
					rules: [
					],
					"default": true
				},
				{
					array: false,
					wording: {
						en: "Score:",
						fr: "Score :"
					},
					variableName: "MFI20_SCORE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "integer"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				}
			]
		},
		{
			name: "PWEIGHT",
			includes: [
				{
					pageName: "BVS",
					variableNames: [
						"WEIGHT"
					]
				}
			]
		},
		{
			name: {
				__code__: "FUPVIS",
				en: "Date",
				fr: "Date"
			},
			includes: [
				{
					pageName: "BVDATE",
					contexts: [
						[
							"VISDATE",
							2
						]
					]
				},
				{
					pageName: "BCONTINUE"
				},
				{
					pageName: "PWEIGHT"
				}
			]
		},
		{
			name: {
				__code__: "WITHDVIS",
				en: "End / withdrawal visit",
				fr: "Visample de fin / sorti d'étude"
			},
			includes: [
				{
					pageName: "BVDATE",
					contexts: [
						[
							"VISDATE",
							3
						]
					]
				},
				{
					pageName: "BWITHDR"
				}
			]
		},
		{
			name: "PAIN",
			includes: [
				{
					array: false,
					wording: {
						en: "Done on:",
						fr: "Réalisé le :"
					},
					variableName: "PAIN_DATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Pain",
						fr: "Douleur"
					}
				},
				{
					array: false,
					wording: {
						en: "Specify the importance of your pain at the present moment: 0 corresponds to no pain; 10 is the maximum pain imaginable",
						fr: "Préciser l'importance de votre douleur au moment présent : 0 correspond à pas de douleur ; 10 correspond à la douleur maximale imaginable"
					},
					variableName: "__INFO_PAIN_SCALE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "info"
					},
					rules: [
					],
					section: {
						en: "Pain",
						fr: "Douleur"
					}
				},
				{
					array: false,
					wording: "",
					variableName: "PAIN_SCORE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						min: 0,
						max: 10,
						defaultLang: "en",
						labels: [
							{
								__code__: "0",
								en: "0"
							},
							{
								__code__: "1",
								en: "1"
							},
							{
								__code__: "2",
								en: "2"
							},
							{
								__code__: "3",
								en: "3"
							},
							{
								__code__: "4",
								en: "4"
							},
							{
								__code__: "5",
								en: "5"
							},
							{
								__code__: "6",
								en: "6"
							},
							{
								__code__: "7",
								en: "7"
							},
							{
								__code__: "8",
								en: "8"
							},
							{
								__code__: "9",
								en: "9"
							},
							{
								__code__: "10",
								en: "10"
							}
						],
						name: "scale",
						rawValues: [
							0,
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9,
							10
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					section: {
						en: "Pain",
						fr: "Douleur"
					},
					itemComment: {
						en: "<no pain | maximum pain>",
						fr: "<pas de douleur | douleur maximale>"
					}
				}
			]
		},
		{
			name: {
				en: "SAE",
				fr: "EIG"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Adverse event",
						fr: "EI"
					},
					variableName: "SAETYPE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "text"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						},
						{
							event: "ae",
							message: "ae",
							name: "critical",
							precedence: 70,
							values: [
							]
						}
					]
				},
				{
					array: false,
					wording: {
						en: "Date of onset",
						fr: "Date de début"
					},
					variableName: "STDT",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: true,
						month: false,
						name: "date"
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Ongoing",
						fr: "En cours"
					},
					variableName: "ONGO",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "yesno",
						nature: "categorical",
						labels: [
							{
								__code__: "0",
								en: "No",
								fr: "Non"
							},
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							0,
							1
						]
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Date of end",
						fr: "Date de fin"
					},
					variableName: "ENDT",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: true,
						month: false,
						name: "date"
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Seriousness",
						fr: "Gravité"
					},
					variableName: "SERIOUSNESS",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"D",
							"H",
							"MS"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "D",
								en: "Death",
								fr: "Décès"
							},
							{
								__code__: "H",
								en: "Hospitalization",
								fr: "Hospitalisation"
							},
							{
								__code__: "MS",
								en: "Medically significant",
								fr: "Médicalement significatif"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"D",
							"H",
							"MS"
						]
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Severity",
						fr: "Sévérité"
					},
					variableName: "SEVERITY",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"MIL",
							"MOD",
							"SEV"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "MIL",
								en: "Mild",
								fr: "Légère"
							},
							{
								__code__: "MOD",
								en: "Moderate",
								fr: "Modérée"
							},
							{
								__code__: "SEV",
								en: "Severe",
								fr: "Sévère"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"MIL",
							"MOD",
							"SEV"
						]
					},
					rules: [
					]
				},
				{
					array: false,
					wording: {
						en: "Outcome",
						fr: "Résultat"
					},
					variableName: "OUTCOME",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"RVD",
							"RWS",
							"ONG",
							"RCV",
							"D"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "RVD",
								en: "Resolved",
								fr: "Résolu"
							},
							{
								__code__: "RWS",
								en: "Resolved with sequelae",
								fr: "Résolu avec séquelles"
							},
							{
								__code__: "ONG",
								en: "Ongoing",
								fr: "En cours"
							},
							{
								__code__: "RCV",
								en: "Recovering",
								fr: "En convalescence"
							},
							{
								__code__: "D",
								en: "Death",
								fr: "Décès"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"RVD",
							"RWS",
							"ONG",
							"RCV",
							"D"
						]
					},
					rules: [
					]
				}
			]
		},
		{
			name: {
				__code__: "GLOBALSIGN",
				en: "Global Signature",
				fr: "Signature Globale"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "As a PI of this sample, I confirm that the information provided in these forms are precise.",
						fr: "En tant que PI, je confirme que les informations renseignées dans ces formulaires sont exactes."
					},
					variableName: "PICONFIRM",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "acknowledge",
						nature: "categorical",
						labels: [
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							1
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: false,
					wording: "Date of Signature",
					variableName: "PISIGNDATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						incomplete: false,
						month: false,
						name: "date"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					]
				},
				{
					array: false,
					wording: "Signed",
					variableName: "__SIGNED",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						name: "acknowledge",
						nature: "categorical",
						labels: [
							{
								__code__: "1",
								en: "Yes",
								fr: "Oui"
							}
						],
						rawValues: [
							1
						]
					},
					rules: [
					]
				}
			]
		}
	],
	crossRules: [
		{
			variableNames: [
				"@TODAY",
				"VISDATE"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[#2020-12-01#,$1]",
					argCount: 1,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "inRange",
				extraArgs: [
					{
						includeLower: true,
						includeUpper: true
					}
				],
				formula: [
					"[#2020-12-01#,$1]",
					1
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"CONSENT",
				"CONS_DATE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"INC01",
				"INC02",
				"@ACK",
				"INCINFO"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[!($1 && $2)]]",
					argCount: 2,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"show"
				],
				formula: [
					"[[!($1 && $2)]]",
					2
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"@UNDEF",
				"EXC01",
				"EXC02",
				"@ACK",
				"EXCINFO"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[($2==$1 || $3==$1) || ($2 || $3)]]",
					argCount: 3,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"show"
				],
				formula: [
					"[[($2==$1 || $3==$1) || ($2 || $3)]]",
					3
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"@TODAY",
				"BRTHDT"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[#1915-01-01#,$1]",
					argCount: 1,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "inRange",
				extraArgs: [
					{
						includeLower: true,
						includeUpper: true
					}
				],
				formula: [
					"[#1915-01-01#,$1]",
					1
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"$WEIGHT",
				"WEIGHT"
			],
			args: {
				name: "copy"
			},
			when: "initialization"
		},
		{
			variableNames: [
				"HEIGHT",
				"WEIGHT",
				"BMI"
			],
			args: {
				name: "computed",
				formula: "$2 / (($1/100) * ($1/100))",
				argCount: 3
			},
			when: "always"
		},
		{
			variableNames: [
				"WITHREAS",
				"WITHREAS_C"
			],
			args: {
				name: "activation",
				values: [
					"OTH"
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"@ACK",
				"@UNDEF",
				"CONSENT",
				"CONS_DATE",
				"EXC01",
				"EXC02",
				"INC01",
				"INC02",
				"PAT_ELIG",
				"__INCLUDED"
			],
			args: {
				name: "computed",
				formula: "$3 && $4 && $7 && $8 && !$5 && !$6 && $9 ? $1 : $2",
				argCount: 10
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HAEMATNDONE_SPE"
			],
			args: {
				name: "activation",
				values: [
					0
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"BIOCHNDONE_SPE"
			],
			args: {
				name: "activation",
				values: [
					0
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HAEMAT_DATE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HAEMAT_FASTING"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"REDBLOODR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"REDBLOODI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HEMOGR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HEMOGI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HEMATCR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"HEMATCI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"WHITEBLOODR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"WHITEBLOODI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"NEUTRR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"NEUTRI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"PLATR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"HAEMATDONE",
				"PLATI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"BIOCH_DATE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"BIOCH_FASTING"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"GLUCR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"GLUCI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"UREAR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"UREAI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"CREATR"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"BIOCHDONE",
				"CREATI"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"CANCER_PER",
				"@ACK",
				"CANCER_TYPE"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[$1]]",
					argCount: 1,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"show"
				],
				formula: [
					"[[$1]]",
					1
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"CANCER_PER",
				"@ACK",
				"CANCER_AGE"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[$1]]",
					argCount: 1,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"show"
				],
				formula: [
					"[[$1]]",
					1
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"CANCER_PER",
				"@ACK",
				"CANCER_MORE"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[$1]]",
					argCount: 1,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"show"
				],
				formula: [
					"[[$1]]",
					1
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"CANCER_MORE",
				"CANCER_PER",
				"@ACK",
				"CANCER_FILL"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[($2) && ($1)]]",
					argCount: 2,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"show"
				],
				formula: [
					"[[($2) && ($1)]]",
					2
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_DATE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_01"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"INFO_SF121"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_02"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_03"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"INFO_SF122"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_04"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_05"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"INFO_SF123"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_06"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_07"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_08"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"INFO_SF124"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_09"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_10"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_11"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_12"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"__SF12_SCORE_AUTO"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_01",
				"SF12_02",
				"SF12_03",
				"SF12_04",
				"SF12_05",
				"SF12_06",
				"SF12_07",
				"SF12_08",
				"SF12_09",
				"SF12_10",
				"SF12_11",
				"SF12_12",
				"__SF12_SCORE_AUTO",
				"SF12_SCORE"
			],
			args: {
				name: "computed",
				formula: "!$13 ? $14 : $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10 + $11 + $12",
				argCount: 14
			},
			when: "always"
		},
		{
			variableNames: [
				"SF12_DONE",
				"SF12_SCORE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_DATE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_01"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_02"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_03"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_04"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_05"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_06"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_07"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_08"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_09"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_10"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_11"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_12"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_13"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_14"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_15"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_16"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_17"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_18"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_19"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_20"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"__MFI20_SCORE_AUTO"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_01",
				"MFI20_02",
				"MFI20_03",
				"MFI20_04",
				"MFI20_05",
				"MFI20_06",
				"MFI20_07",
				"MFI20_08",
				"MFI20_09",
				"MFI20_10",
				"MFI20_11",
				"MFI20_12",
				"MFI20_13",
				"MFI20_14",
				"MFI20_15",
				"MFI20_16",
				"MFI20_17",
				"MFI20_18",
				"MFI20_19",
				"MFI20_20",
				"__MFI20_SCORE_AUTO",
				"MFI20_SCORE"
			],
			args: {
				name: "computed",
				formula: "!$21 ? $22 : $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10 + $11 + $12+ $13+ $14+ $15+ $16+ $17+ $18+ $19+ $20",
				argCount: 22
			},
			when: "always"
		},
		{
			variableNames: [
				"MFI20_DONE",
				"MFI20_SCORE"
			],
			args: {
				name: "activation",
				values: [
					1
				],
				behavior: "show"
			},
			when: "always"
		},
		{
			variableNames: [
				"ONGO",
				"ENDT"
			],
			args: {
				name: "activation",
				values: [
					0
				],
				behavior: "enable"
			},
			when: "always"
		},
		{
			variableNames: [
				"PICONFIRM",
				"@ACK",
				"PISIGNDATE"
			],
			args: {
				name: "dynamic",
				computedArgs: {
					formula: "[[$1]]",
					argCount: 1,
					name: "computed",
					precedence: 100
				},
				underlyingRule: "activation",
				extraArgs: [
					"enable"
				],
				formula: [
					"[[$1]]",
					1
				]
			},
			when: "always"
		},
		{
			variableNames: [
				"PICONFIRM",
				"PISIGNDATE",
				"__SIGNED"
			],
			args: {
				name: "computed",
				formula: "!!$1 && !!$2",
				argCount: 3
			},
			when: "always"
		}
	]
};
var samples = [
	{
		name: "Sample 001",
		address: "75000 Paris",
		frozen: false,
		sampleCode: "001"
	},
	{
		name: "",
		address: "",
		frozen: false,
		sampleCode: "002"
	},
	{
		name: "Sample 003",
		address: "59000 Lille",
		frozen: false,
		sampleCode: "003"
	}
];
var participants = [
	{
		participantCode: "000001",
		sample: {
			name: "Sample 001",
			address: "75000 Paris",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7779246888473061",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-02T22:00:00.000Z"
			},
			{
				nonce: "6542446874429537",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T06:58:57.020Z"
			},
			{
				nonce: "4607371463115590",
				pageSetType: "INC",
				items: [
					{
						variableName: "MFI20_05",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						value: 24,
						messages: {
						}
					},
					{
						variableName: "CANCER_MORE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "WORK_DUR",
						instance: 1,
						value: 10,
						unit: "yr / a",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "WORK",
						instance: 2,
						value: "10",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "WORK_LOC",
						instance: 2,
						value: "FRA",
						messages: {
						}
					},
					{
						variableName: "WORK_DUR",
						instance: 2,
						value: 5,
						unit: "yr / a",
						messages: {
						}
					},
					{
						variableName: "CANCER_TYPE",
						instance: 2,
						value: "SCC",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CANCER_AGE",
						instance: 2,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CANCER_AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "CANCER_PER",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CANCER_TYPE",
						instance: 1,
						value: "UK",
						messages: {
						}
					},
					{
						variableName: "CANCER_FAM",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "WORK",
						instance: 1,
						value: "21",
						messages: {
						}
					},
					{
						variableName: "WORK_LOC",
						instance: 1,
						value: "BEL",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "LASTNAME",
						instance: 1,
						value: "PR",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						value: "LUC",
						messages: {
						}
					},
					{
						variableName: "BRTHDT",
						instance: 1,
						value: "1980-05",
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "F",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						value: 168,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						value: 23,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						value: 65,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						value: 4.59,
						unit: "T/L (10^12/L)",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						value: 13.6,
						unit: "g/L",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						value: 40.6,
						unit: "%",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						value: 6.3,
						unit: "G/L (10^9/L)",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						value: 30.3,
						unit: "%",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						value: 298,
						unit: "G/L (10^9/L)",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						value: "2021-07-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						value: 4.6,
						unit: "mmol/L",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						value: 5.9,
						unit: "mmol/L",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						value: 45,
						unit: "µmol/L",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						value: "3",
						messages: {
						}
					}
				],
				lastInput: "2022-03-25T15:51:32.671Z"
			},
			{
				nonce: "7623281382209168",
				pageSetType: "FUP",
				items: [
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						value: 65,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-19T22:00:00.000Z",
						context: 2,
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						value: "Reason 1",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						value: "Reason 1",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					}
				],
				lastInput: "2022-03-24T15:05:48.110Z"
			},
			{
				nonce: "7720223089439739",
				pageSetType: "SAE",
				items: [
					{
						variableName: "SAETYPE",
						instance: 1,
						value: "Headache",
						messages: {
						}
					},
					{
						variableName: "STDT",
						instance: 1,
						value: "2021-07-17T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "ONGO",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ENDT",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SERIOUSNESS",
						instance: 1,
						value: "MS",
						messages: {
						}
					},
					{
						variableName: "SEVERITY",
						instance: 1,
						value: "MOD",
						messages: {
						}
					},
					{
						variableName: "OUTCOME",
						instance: 1,
						value: "ONG",
						messages: {
						}
					}
				],
				lastInput: "2021-12-31T06:29:59.220Z"
			}
		]
	},
	{
		participantCode: "000002",
		sample: {
			name: "Sample 001",
			address: "75000 Paris",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2744794416470831",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-02T22:00:00.000Z"
			},
			{
				nonce: "5816761456256418",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T06:59:06.986Z"
			},
			{
				nonce: "9525580568301998",
				pageSetType: "INC",
				items: [
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INFO_SF121",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "LASTNAME",
						instance: 1,
						value: "LO",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						value: "MAT",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BRTHDT",
						instance: 1,
						value: "1985-03",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "M",
						messages: {
						}
					},
					{
						variableName: "INFO_SF122",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF123",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF124",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					}
				],
				lastInput: "2022-03-24T15:06:16.586Z"
			},
			{
				nonce: "7470670523881859",
				pageSetType: "PAIN",
				items: [
					{
						variableName: "PAIN_SCORE",
						instance: 1,
						value: 4,
						messages: {
						}
					},
					{
						variableName: "PAIN_DATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						messages: {
						}
					}
				],
				lastInput: "2021-08-09T22:00:00.000Z"
			}
		]
	},
	{
		participantCode: "000003",
		sample: {
			name: "Sample 001",
			address: "75000 Paris",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "170633989500749",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-03T22:00:00.000Z"
			},
			{
				nonce: "1518282553187161",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T06:59:21.296Z"
			},
			{
				nonce: "2834598557275563",
				pageSetType: "INC",
				items: [
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF121",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF122",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF123",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF124",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "LASTNAME",
						instance: 1,
						messages: {
							required: "value is required",
							fixedLength: "text length must be 2"
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						messages: {
							required: "value is required",
							fixedLength: "text length must be 3"
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					}
				],
				lastInput: "2022-03-24T15:06:33.931Z"
			}
		]
	},
	{
		participantCode: "000004",
		sample: {
			name: "Sample 001",
			address: "75000 Paris",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2143401734679160",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-03T22:00:00.000Z"
			},
			{
				nonce: "7759295775687731",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T06:59:29.473Z"
			},
			{
				nonce: "7951622904221916",
				pageSetType: "INC",
				items: [
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INFO_SF121",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF122",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF123",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF124",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "LASTNAME",
						instance: 1,
						messages: {
							required: "value is required",
							fixedLength: "text length must be 2"
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						messages: {
							required: "value is required",
							fixedLength: "text length must be 3"
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					}
				],
				lastInput: "2022-03-24T15:06:45.319Z"
			}
		]
	},
	{
		participantCode: "000005",
		sample: {
			name: "Sample 001",
			address: "75000 Paris",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3767036974152805",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-03T22:00:00.000Z"
			},
			{
				nonce: "8430014858889228",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T06:59:38.839Z"
			},
			{
				nonce: "4920983244585262",
				pageSetType: "INC",
				items: [
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-21T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF124",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF121",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF122",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF123",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "LASTNAME",
						instance: 1,
						messages: {
							required: "value is required",
							fixedLength: "text length must be 2"
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						messages: {
							required: "value is required",
							fixedLength: "text length must be 3"
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						messages: {
							required: "value is required"
						}
					}
				],
				lastInput: "2022-03-24T15:07:02.853Z"
			}
		]
	},
	{
		participantCode: "000006",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "4794983136193169",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-10T22:00:00.000Z"
			},
			{
				nonce: "9078061099247360",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T06:59:54.740Z"
			},
			{
				nonce: "1740135691139735",
				pageSetType: "INC",
				items: [
					{
						variableName: "LASTNAME",
						instance: 1,
						value: "MA",
						messages: {
						}
					},
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CANCER_FAM",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "CANCER_MORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CANCER_FILL",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CANCER_PER",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "WORK",
						instance: 1,
						value: "22",
						messages: {
						}
					},
					{
						variableName: "WORK_LOC",
						instance: 1,
						specialValue: "unknown",
						messages: {
						}
					},
					{
						variableName: "WORK_DUR",
						instance: 1,
						specialValue: "unknown",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CANCER_TYPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						value: "JUL",
						messages: {
						}
					},
					{
						variableName: "CANCER_AGE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BRTHDT",
						instance: 1,
						value: "1965-02",
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						value: "reason a",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						value: 165,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						value: 55,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						value: 20,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "F",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						value: "reason b",
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF121",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF122",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF123",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF124",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					}
				],
				lastInput: "2022-03-24T15:08:24.158Z"
			}
		]
	},
	{
		participantCode: "000007",
		sample: {
			name: "Sample 003",
			address: "59000 Lille",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7334246396830320",
				pageSetType: "SYNT",
				items: [
				],
				lastInput: "2021-08-10T22:00:00.000Z"
			},
			{
				nonce: "9366621454362862",
				pageSetType: "PREINC",
				items: [
					{
						variableName: "PAT_HEALTHY",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "CONSENT",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "CONS_DATE",
						instance: 1,
						value: "2021-07-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "INC01",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INC02",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "INCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "EXC01",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXC02",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "EXCINFO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PAT_ELIG",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-05-06T07:00:08.890Z"
			},
			{
				nonce: "5762465263555010",
				pageSetType: "INC",
				items: [
					{
						variableName: "CANCER_FAM",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "CONTINUE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SAMPLE_IMG",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CANCER_MORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CANCER_PER",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "CANCER_FILL",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WORK",
						instance: 1,
						value: "23",
						messages: {
						}
					},
					{
						variableName: "WORK_LOC",
						instance: 1,
						value: "FRA",
						messages: {
						}
					},
					{
						variableName: "WORK_DUR",
						instance: 1,
						value: 18,
						unit: "mo",
						messages: {
						}
					},
					{
						variableName: "LASTNAME",
						instance: 1,
						value: "GE",
						messages: {
						}
					},
					{
						variableName: "HAEMATNDONE_SPE",
						instance: 1,
						value: "reason a",
						messages: {
						}
					},
					{
						variableName: "CANCER_TYPE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMATDONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "CANCER_AGE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "FIRSTNAME",
						instance: 1,
						value: "MAR",
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "F",
						messages: {
						}
					},
					{
						variableName: "BRTHDT",
						instance: 1,
						value: "1955-04",
						messages: {
						}
					},
					{
						variableName: "BMI",
						instance: 1,
						value: 22,
						unit: "kg/m²",
						messages: {
						}
					},
					{
						variableName: "HEIGHT",
						instance: 1,
						value: 170,
						unit: "cm",
						messages: {
						}
					},
					{
						variableName: "WEIGHT",
						instance: 1,
						value: 65,
						unit: "kg",
						messages: {
						}
					},
					{
						variableName: "VISDATE",
						instance: 1,
						value: "2021-07-14T22:00:00.000Z",
						context: 1,
						messages: {
						}
					},
					{
						variableName: "HEMATCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMATCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HAEMAT_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "WHITEBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "REDBLOODR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHDONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "REDBLOODI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "HEMOGR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCHNDONE_SPE",
						instance: 1,
						value: "reason b",
						messages: {
						}
					},
					{
						variableName: "HEMOGI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_18",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_19",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_20",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__MFI20_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "NEUTRI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "PLATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "BIOCH_FASTING",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "GLUCI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "UREAI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATR",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "CREATI",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SF12_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF121",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF122",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF123",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "INFO_SF124",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "__SF12_SCORE_AUTO",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "SF12_SCORE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_DONE",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "MFI20_DATE",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_01",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_02",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_03",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_04",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_05",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_06",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_07",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_08",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_09",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_10",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_11",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_12",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_13",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_14",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_15",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_16",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					},
					{
						variableName: "MFI20_17",
						instance: 1,
						specialValue: "notApplicable",
						messages: {
						}
					}
				],
				lastInput: "2022-03-24T15:08:11.591Z"
			}
		]
	}
];
var DemoECRF = {
	survey: survey,
	samples: samples,
	participants: participants
};

export { DemoECRF as default, participants, samples, survey };
