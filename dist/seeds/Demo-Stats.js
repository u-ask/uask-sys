var survey = {
	name: "Demo-Stats",
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
			hidden: false
		},
		consentVar: "__CONSENT",
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
			infoType: "HOME",
			singleTypes: [
				"DATA"
			],
			manyTypes: [
			],
			sequenceTypes: [
				"DATA"
			],
			stopTypes: [
			],
			actions: [
				[
					"input",
					"query",
					"checking"
				]
			],
			notifications: [
			]
		}
	],
	pageSets: [
		{
			type: {
				__code__: "HOME",
				en: "Synthesis",
				fr: "Synthèse"
			},
			pageNames: [
				"HOME"
			],
			mandatoryPageNames: [
			]
		},
		{
			type: {
				__code__: "DATA",
				en: "Collected data",
				fr: "Données collectées"
			},
			pageNames: [
				"DATA"
			],
			mandatoryPageNames: [
			]
		}
	],
	pages: [
		{
			name: {
				__code__: "HOME",
				en: "Synthesis",
				fr: "Synthèse"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Internal code",
						fr: "Code interne"
					},
					variableName: "__CODE",
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
				__code__: "DATA",
				en: "Collected data",
				fr: "Données collectées"
			},
			includes: [
				{
					array: false,
					wording: {
						en: "Visit date",
						fr: "Date de la visample"
					},
					variableName: "VDATE",
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
					pinTitle: {
						en: "Visit Date",
						fr: "Date visample"
					}
				},
				{
					array: false,
					wording: {
						en: "Inclusion",
						fr: "Inclusion"
					},
					variableName: "__INCLUDED",
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
					"default": 1
				},
				{
					array: false,
					wording: {
						en: "Age",
						fr: "Age"
					},
					variableName: "AGE",
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
					],
					kpiTitle: {
						en: "Age",
						fr: "Age"
					}
				},
				{
					array: false,
					wording: {
						en: "Sex",
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
							"0",
							"1"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "0",
								en: "F",
								fr: "F"
							},
							{
								__code__: "1",
								en: "M",
								fr: "M"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"0",
							"1"
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "Sex",
						fr: "Sexe"
					}
				},
				{
					array: false,
					wording: {
						en: "Chest pain type",
						fr: "Type de douleur à la poitrine"
					},
					variableName: "PAIN",
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
							"3",
							"4"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "1",
								en: "Typical angina",
								fr: "Angine typique"
							},
							{
								__code__: "2",
								en: "Atypical angina",
								fr: "Angine atypique"
							},
							{
								__code__: "3",
								en: "Non-anginal pain",
								fr: "Douleur importante"
							},
							{
								__code__: "4",
								en: "asymptomatic",
								fr: "Asymptomatique"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"1",
							"2",
							"3",
							"4"
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
						en: "Pain",
						fr: "Pain"
					},
					kpiTitle: {
						en: "Pain",
						fr: "Pain"
					}
				},
				{
					array: false,
					wording: {
						en: "Resting blood pressure",
						fr: "Pression sanguine au repos"
					},
					variableName: "BLOOD",
					units: {
						values: [
							"mmHg"
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "Blood pressure",
						fr: "Pression sanguine"
					}
				},
				{
					array: false,
					wording: {
						en: "Serum cholesterol",
						fr: "Cholestérol sérique"
					},
					variableName: "CHOLESTEROL",
					units: {
						values: [
							"mg/dl"
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "Cholesterol|Disease=${value}",
						fr: "Cholesterol|Maladie=${value}"
					},
					kpiPivot: "DISEASE"
				},
				{
					array: false,
					wording: {
						en: "Fasting blood sugar > 120 mg/dl",
						fr: "Glycémie à jeun > 120 mg/dl"
					},
					variableName: "SUGAR",
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
					kpiTitle: {
						en: "Sugar > 120",
						fr: "Glycémie > 120"
					}
				},
				{
					array: false,
					wording: {
						en: "Resting electrocardiographic results",
						fr: "Résultat de l'électrocardiogramme au repos"
					},
					variableName: "ECG",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"0",
							"1",
							"2"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "0",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "1",
								en: "ST-T wave abnormality",
								fr: "Anomalie des ondes ST-T"
							},
							{
								__code__: "2",
								en: "Probable or definite left ventricular hypertrophy",
								fr: "Hypertrophie du ventricule gauche probable ou certaine"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"0",
							"1",
							"2"
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "ECG",
						fr: "ECG"
					}
				},
				{
					array: false,
					wording: {
						en: "Maximum heart rate",
						fr: "Fréquence cardiaque maximale"
					},
					variableName: "RATE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "Max rate",
						fr: "Fréquence max"
					}
				},
				{
					array: false,
					wording: {
						en: "Exercise induced angina",
						fr: "Angine provoquée par l'effort"
					},
					variableName: "INDUCED",
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
					kpiTitle: {
						en: "Exercice induced",
						fr: "Provoquée par l'effort"
					}
				},
				{
					array: false,
					wording: {
						en: "Oldpeak : ST depression induced by exercise relative to rest",
						fr: "Affaissement de l'onde ST provoquée par l'exercice relativement au repos"
					},
					variableName: "OLDPEAK",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "ST depression",
						fr: "Affaissement ST"
					}
				},
				{
					array: false,
					wording: {
						en: "Slope of the peak exercise ST segment",
						fr: "Pente du segment de l'onde ST pour la phase d'exercice"
					},
					variableName: "SLOPE",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "numerical",
						name: "real"
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "Slope during exercise",
						fr: "Pente durant l'effort"
					}
				},
				{
					array: false,
					wording: {
						en: "Number of major vessels colored by fluoroscopy",
						fr: "Nombre de vaisseaux majeurs visibles par fluoroscopie"
					},
					variableName: "VESSELS",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						nature: "categorical",
						scores: [
							0,
							1,
							2,
							3
						],
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
							}
						],
						name: "score",
						rawValues: [
							0,
							1,
							2,
							3
						]
					},
					rules: [
						{
							enforced: true,
							name: "required",
							precedence: 70
						}
					],
					kpiTitle: {
						en: "Colored vessels",
						fr: "Vaisseaux marqués"
					}
				},
				{
					array: false,
					wording: {
						en: "Thalassemia",
						fr: "Thalassémie"
					},
					variableName: "THAL",
					units: {
						values: [
						],
						isExtendable: false
					},
					type: {
						multiplicity: "one",
						choices: [
							"3",
							"6",
							"7"
						],
						defaultLang: "en",
						labels: [
							{
								__code__: "3",
								en: "Normal",
								fr: "Normal"
							},
							{
								__code__: "6",
								en: "Defect",
								fr: "Defaut"
							},
							{
								__code__: "7",
								en: "Reversible defect",
								fr: "Défaut réversible"
							}
						],
						name: "choice",
						nature: "categorical",
						rawValues: [
							"3",
							"6",
							"7"
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
						en: "Thalassemia",
						fr: "Thalassémie"
					},
					kpiTitle: {
						en: "Thalassemia",
						fr: "Thalassémie"
					}
				},
				{
					array: false,
					wording: {
						en: "Heart disease presence",
						fr: "Présence d'une maladie cardiaque"
					},
					variableName: "DISEASE",
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
						en: "Heart disease",
						fr: "Maladie cardiaque"
					},
					kpiTitle: {
						en: "Heart disease",
						fr: "Maladie cardiaque"
					}
				}
			]
		}
	],
	crossRules: [
		{
			variableNames: [
				"$__CODE",
				"@ACK",
				"__CODE"
			],
			args: {
				name: "computed",
				formula: "!$2?$3:$1",
				argCount: 3
			},
			when: "always"
		}
	]
};
var samples = [
	{
		name: "",
		address: "",
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
		name: "",
		address: "",
		frozen: false,
		sampleCode: "003"
	},
	{
		name: "",
		address: "",
		frozen: false,
		sampleCode: "004"
	}
];
var participants = [
	{
		participantCode: "000001",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8070324395646820",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "14923932",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:46.501Z"
			},
			{
				nonce: "5302097188029518",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 70,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 322,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 109,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:46.596Z"
			}
		]
	},
	{
		participantCode: "000002",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3159414669418970",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "13641653",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:46.812Z"
			},
			{
				nonce: "8748974838626853",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 115,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 564,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:46.909Z"
			}
		]
	},
	{
		participantCode: "000003",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "215771874813598",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22545602",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:47.101Z"
			},
			{
				nonce: "7914494483215284",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 124,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 261,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 141,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:47.204Z"
			}
		]
	},
	{
		participantCode: "000004",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7794757814104396",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "13884390",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:47.380Z"
			},
			{
				nonce: "9771643534345052",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 263,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 105,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:47.456Z"
			}
		]
	},
	{
		participantCode: "000005",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "5147492377109220",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "78689427",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:47.632Z"
			},
			{
				nonce: "6101215906372233",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 74,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 269,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 121,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:47.766Z"
			}
		]
	},
	{
		participantCode: "000006",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1881949486525783",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "72153195",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.004Z"
			},
			{
				nonce: "8731736871802986",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 177,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.078Z"
			}
		]
	},
	{
		participantCode: "000007",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8012215238034315",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "10703356",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.249Z"
			},
			{
				nonce: "2546223187623151",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 256,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.325Z"
			}
		]
	},
	{
		participantCode: "000008",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1293546978267435",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "85334101",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.491Z"
			},
			{
				nonce: "1336281455721513",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 239,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.566Z"
			}
		]
	},
	{
		participantCode: "000009",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1298321540560308",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "51858394",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.736Z"
			},
			{
				nonce: "1204866885944376",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 293,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.812Z"
			}
		]
	},
	{
		participantCode: "000010",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5802021399704262",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "95446583",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:48.995Z"
			},
			{
				nonce: "4290942741576491",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 407,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 154,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.076Z"
			}
		]
	},
	{
		participantCode: "000011",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2978694288877102",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "30847312",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.262Z"
			},
			{
				nonce: "3885311698780485",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 135,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 234,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 161,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.337Z"
			}
		]
	},
	{
		participantCode: "000012",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2945877761986362",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "23372668",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.512Z"
			},
			{
				nonce: "8078855801764186",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 226,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 111,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.584Z"
			}
		]
	},
	{
		participantCode: "000013",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "213261806412844",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "71897584",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.750Z"
			},
			{
				nonce: "4238981780894566",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 235,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 180,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:49.831Z"
			}
		]
	},
	{
		participantCode: "000014",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "9167350422503066",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "23060460",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.003Z"
			},
			{
				nonce: "3380521587766234",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 134,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 234,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.076Z"
			}
		]
	},
	{
		participantCode: "000015",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2903750804786958",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "46530058",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.252Z"
			},
			{
				nonce: "6645639849688698",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 303,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 159,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.333Z"
			}
		]
	},
	{
		participantCode: "000016",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "6178557329190981",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "45075959",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.498Z"
			},
			{
				nonce: "6368680939437208",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 71,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 149,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.568Z"
			}
		]
	},
	{
		participantCode: "000017",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "195569358059001",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "77604950",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.741Z"
			},
			{
				nonce: "6687980191235958",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 311,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.825Z"
			}
		]
	},
	{
		participantCode: "000018",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5244125527560375",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17278883",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:50.993Z"
			},
			{
				nonce: "9599375462947430",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 203,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 155,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.080Z"
			}
		]
	},
	{
		participantCode: "000019",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2538634512145572",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "49398134",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.259Z"
			},
			{
				nonce: "4072572836119486",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 211,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 144,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.335Z"
			}
		]
	},
	{
		participantCode: "000020",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8712892254387006",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "85486424",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.552Z"
			},
			{
				nonce: "7401655244433873",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 40,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 199,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.637Z"
			}
		]
	},
	{
		participantCode: "000021",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3356006092809929",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "76063458",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.822Z"
			},
			{
				nonce: "9169995676014562",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 229,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 129,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:51.905Z"
			}
		]
	},
	{
		participantCode: "000022",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "3967184759979417",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "39217738",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.085Z"
			},
			{
				nonce: "7956416399775388",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 245,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 180,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.162Z"
			}
		]
	},
	{
		participantCode: "000023",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "9407751659554926",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "98415194",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.321Z"
			},
			{
				nonce: "5174101463093781",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 115,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 303,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 181,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.398Z"
			}
		]
	},
	{
		participantCode: "000024",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2032182203387316",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "71886274",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.652Z"
			},
			{
				nonce: "2373589158359773",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 47,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 204,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 143,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.786Z"
			}
		]
	},
	{
		participantCode: "000025",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1828345396263969",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "83709277",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:52.971Z"
			},
			{
				nonce: "3016176345846402",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 288,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 159,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.040Z"
			}
		]
	},
	{
		participantCode: "000026",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5817454423001336",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "66238097",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.206Z"
			},
			{
				nonce: "8833326995374269",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 275,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 139,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.279Z"
			}
		]
	},
	{
		participantCode: "000027",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "4343335086943507",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "96569371",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.470Z"
			},
			{
				nonce: "986362659083091",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 243,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.546Z"
			}
		]
	},
	{
		participantCode: "000028",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3464604163633569",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "38133750",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.736Z"
			},
			{
				nonce: "7534196471784593",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 295,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 157,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.817Z"
			}
		]
	},
	{
		participantCode: "000029",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "4952308130842460",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "56637643",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:53.996Z"
			},
			{
				nonce: "2216981945932004",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 230,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 165,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.071Z"
			}
		]
	},
	{
		participantCode: "000030",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6364506646388306",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "79298307",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.246Z"
			},
			{
				nonce: "1030805336735908",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 71,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 265,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.324Z"
			}
		]
	},
	{
		participantCode: "000031",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "426453659392839",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "87758652",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.492Z"
			},
			{
				nonce: "2629216316922709",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 229,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.563Z"
			}
		]
	},
	{
		participantCode: "000032",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "3780328934794133",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "73866089",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.721Z"
			},
			{
				nonce: "1817449312565860",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 66,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 228,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.789Z"
			}
		]
	},
	{
		participantCode: "000033",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7343935785626894",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "32904610",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:54.947Z"
			},
			{
				nonce: "1952694799366470",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 37,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 215,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.019Z"
			}
		]
	},
	{
		participantCode: "000034",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7831445129358083",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "35551984",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.181Z"
			},
			{
				nonce: "8221148996379857",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 326,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.247Z"
			}
		]
	},
	{
		participantCode: "000035",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "8830710550732432",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "76618586",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.409Z"
			},
			{
				nonce: "3416153478039637",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-17T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 144,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 200,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.477Z"
			}
		]
	},
	{
		participantCode: "000036",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8679653709275663",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "41149741",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.629Z"
			},
			{
				nonce: "4712325249850631",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-17T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 256,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.690Z"
			}
		]
	},
	{
		participantCode: "000037",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "5102157163740400",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "71062345",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.879Z"
			},
			{
				nonce: "1355020100414706",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 207,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:55.956Z"
			}
		]
	},
	{
		participantCode: "000038",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "659959613098931",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "89784293",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.108Z"
			},
			{
				nonce: "167134583454960",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 273,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.195Z"
			}
		]
	},
	{
		participantCode: "000039",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7036867461008254",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "83508674",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.375Z"
			},
			{
				nonce: "1193683752594994",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 180,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.457Z"
			}
		]
	},
	{
		participantCode: "000040",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2590760005096185",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "04411580",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.635Z"
			},
			{
				nonce: "4629920756712655",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 222,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 186,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.720Z"
			}
		]
	},
	{
		participantCode: "000041",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3674956351806720",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "75781778",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.882Z"
			},
			{
				nonce: "561200219969380",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 40,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 223,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 181,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:56.955Z"
			}
		]
	},
	{
		participantCode: "000042",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1677299176375960",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "47385681",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.099Z"
			},
			{
				nonce: "7347568350990725",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 124,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 209,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.185Z"
			}
		]
	},
	{
		participantCode: "000043",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "4617012752344727",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "03826882",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.337Z"
			},
			{
				nonce: "828814854528706",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 233,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 179,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.403Z"
			}
		]
	},
	{
		participantCode: "000044",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "4814023720390790",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "87840258",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.587Z"
			},
			{
				nonce: "9603965771051606",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 101,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 197,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 156,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.662Z"
			}
		]
	},
	{
		participantCode: "000045",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5344074386065216",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "19516428",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.806Z"
			},
			{
				nonce: "2725475611995569",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 218,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 134,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:57.907Z"
			}
		]
	},
	{
		participantCode: "000046",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "4425971499303356",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "70076877",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:58.076Z"
			},
			{
				nonce: "2827529696614086",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 211,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 165,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:58.146Z"
			}
		]
	},
	{
		participantCode: "000047",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1958725008879199",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "70271685",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:58.324Z"
			},
			{
				nonce: "2692640979717882",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 49,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 149,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:58.427Z"
			}
		]
	},
	{
		participantCode: "000048",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9364422001735214",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "90253555",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:58.650Z"
			},
			{
				nonce: "1159213178141108",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-23T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 197,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 177,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:58.789Z"
			}
		]
	},
	{
		participantCode: "000049",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7812550477330709",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "80217379",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.022Z"
			},
			{
				nonce: "3045482149700316",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-23T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 66,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 246,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.127Z"
			}
		]
	},
	{
		participantCode: "000050",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "348786560213934",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "05872146",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.316Z"
			},
			{
				nonce: "9985255045088410",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-23T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 225,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 114,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.384Z"
			}
		]
	},
	{
		participantCode: "000051",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2134824698180482",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "70548365",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.619Z"
			},
			{
				nonce: "7254099545099095",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 136,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 315,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.755Z"
			}
		]
	},
	{
		participantCode: "000052",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "9071213010244768",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "34535952",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:10:59.992Z"
			},
			{
				nonce: "4035267317082359",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 205,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 184,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.109Z"
			}
		]
	},
	{
		participantCode: "000053",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1915018754940716",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "32312555",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.305Z"
			},
			{
				nonce: "7262590536015574",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 417,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 157,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.413Z"
			}
		]
	},
	{
		participantCode: "000054",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "3044699028275278",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "69269991",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.596Z"
			},
			{
				nonce: "8100452099121349",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 195,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 179,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.718Z"
			}
		]
	},
	{
		participantCode: "000055",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5145222856269200",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "48139287",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.895Z"
			},
			{
				nonce: "1633792434986752",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 234,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 175,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:00.977Z"
			}
		]
	},
	{
		participantCode: "000056",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5612051701701171",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "35640664",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:01.191Z"
			},
			{
				nonce: "3914620092951800",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 105,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 198,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 168,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:01.277Z"
			}
		]
	},
	{
		participantCode: "000057",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7998236430541590",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "26117919",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:01.462Z"
			},
			{
				nonce: "6609834028542285",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 166,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:01.546Z"
			}
		]
	},
	{
		participantCode: "000058",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "6508976031563543",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "69926920",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:01.895Z"
			},
			{
				nonce: "1584833608241354",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 96,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:01.975Z"
			}
		]
	},
	{
		participantCode: "000059",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "8305464024791378",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "87463010",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.154Z"
			},
			{
				nonce: "4954745045165887",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 174,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 249,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 143,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.224Z"
			}
		]
	},
	{
		participantCode: "000060",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "3773190208872131",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "25261868",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.409Z"
			},
			{
				nonce: "1906863793001108",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-26T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 281,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 103,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.491Z"
			}
		]
	},
	{
		participantCode: "000061",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7834796270239435",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "60353070",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.674Z"
			},
			{
				nonce: "8356687569369989",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 173,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.762Z"
			}
		]
	},
	{
		participantCode: "000062",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5787494532136876",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "36761756",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:02.965Z"
			},
			{
				nonce: "1091404515185935",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 305,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.044Z"
			}
		]
	},
	{
		participantCode: "000063",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2322688556623942",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "52965188",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.231Z"
			},
			{
				nonce: "4849922470048789",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 226,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 169,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.300Z"
			}
		]
	},
	{
		participantCode: "000064",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3817280585836367",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17743860",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.476Z"
			},
			{
				nonce: "4823293208014852",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 240,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 171,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.552Z"
			}
		]
	},
	{
		participantCode: "000065",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "358265939333069",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "15977870",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.734Z"
			},
			{
				nonce: "7889473512644922",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 233,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.818Z"
			}
		]
	},
	{
		participantCode: "000066",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7431704848811194",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "29696013",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:03.989Z"
			},
			{
				nonce: "7127412809997977",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-29T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 276,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.086Z"
			}
		]
	},
	{
		participantCode: "000067",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "127963494412311",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "89520151",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.263Z"
			},
			{
				nonce: "2311040651965704",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-04-30T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 261,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 186,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.348Z"
			}
		]
	},
	{
		participantCode: "000068",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "1291218671214301",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "42525407",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.535Z"
			},
			{
				nonce: "4135227038735563",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-01T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 136,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 319,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.623Z"
			}
		]
	},
	{
		participantCode: "000069",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "6868763382446641",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "36925048",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.844Z"
			},
			{
				nonce: "5051584117374486",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 242,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 149,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:04.921Z"
			}
		]
	},
	{
		participantCode: "000070",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "9110549542733744",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "77884309",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.113Z"
			},
			{
				nonce: "6751459677675931",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 47,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 243,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.208Z"
			}
		]
	},
	{
		participantCode: "000071",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2813327700306105",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "99388699",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.396Z"
			},
			{
				nonce: "7287506199204290",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 260,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.468Z"
			}
		]
	},
	{
		participantCode: "000072",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9219806502675998",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "76028141",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.638Z"
			},
			{
				nonce: "7001744670508796",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 354,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.709Z"
			}
		]
	},
	{
		participantCode: "000073",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2509433961053134",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "81207254",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.888Z"
			},
			{
				nonce: "4173578755609520",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 70,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 156,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 245,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 143,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:05.964Z"
			}
		]
	},
	{
		participantCode: "000074",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7501107966716540",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "95528544",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:06.160Z"
			},
			{
				nonce: "8348782092238014",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 76,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 197,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 116,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:06.242Z"
			}
		]
	},
	{
		participantCode: "000075",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7248889394542761",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "11327469",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:06.456Z"
			},
			{
				nonce: "8271370513669278",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 106,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 223,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:06.541Z"
			}
		]
	},
	{
		participantCode: "000076",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1342228034071218",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "32990430",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:06.741Z"
			},
			{
				nonce: "3424645236460087",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 309,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 147,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:06.829Z"
			}
		]
	},
	{
		participantCode: "000077",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "5453180139591045",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "30119621",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.031Z"
			},
			{
				nonce: "8969485303601743",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 104,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 208,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 148,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.106Z"
			}
		]
	},
	{
		participantCode: "000078",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3123685473185565",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "20162930",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.290Z"
			},
			{
				nonce: "1327876831499751",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 39,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 94,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 199,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 179,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.369Z"
			}
		]
	},
	{
		participantCode: "000079",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "451423525829476",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "90978533",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.551Z"
			},
			{
				nonce: "3706518943201038",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 209,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 173,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.646Z"
			}
		]
	},
	{
		participantCode: "000080",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7664825534573112",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "42676851",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.815Z"
			},
			{
				nonce: "6732264949350790",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 236,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:07.895Z"
			}
		]
	},
	{
		participantCode: "000081",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "4691040330917280",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "76394087",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.080Z"
			},
			{
				nonce: "2517966876709841",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 146,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 218,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 105,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.155Z"
			}
		]
	},
	{
		participantCode: "000082",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "990617807671057",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "87725100",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.353Z"
			},
			{
				nonce: "8925792197856721",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 35,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 198,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.426Z"
			}
		]
	},
	{
		participantCode: "000083",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8197771281599577",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "89792455",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.624Z"
			},
			{
				nonce: "453493707095838",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 270,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 111,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.702Z"
			}
		]
	},
	{
		participantCode: "000084",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2568687526851543",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "05391336",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.899Z"
			},
			{
				nonce: "5698152092435969",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 214,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 168,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:08.983Z"
			}
		]
	},
	{
		participantCode: "000085",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3504950870426946",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "18754234",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:09.185Z"
			},
			{
				nonce: "9556322230093622",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 201,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:09.275Z"
			}
		]
	},
	{
		participantCode: "000086",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "8951625154627534",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "91406418",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:09.496Z"
			},
			{
				nonce: "2059346924502630",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 148,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 244,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:09.607Z"
			}
		]
	},
	{
		participantCode: "000087",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "976837368309742",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "03537772",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:09.874Z"
			},
			{
				nonce: "3610059396460064",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 208,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:09.976Z"
			}
		]
	},
	{
		participantCode: "000088",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5166432699835095",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "11838470",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:10.178Z"
			},
			{
				nonce: "9803849723406160",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 270,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 4.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:10.279Z"
			}
		]
	},
	{
		participantCode: "000089",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "4822497879026220",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "67006719",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:10.535Z"
			},
			{
				nonce: "8343444555446364",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 306,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:10.651Z"
			}
		]
	},
	{
		participantCode: "000090",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "336922164639111",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "29422182",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.028Z"
			},
			{
				nonce: "2838493225037953",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 243,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.102Z"
			}
		]
	},
	{
		participantCode: "000091",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2762012894192960",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "37072067",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.273Z"
			},
			{
				nonce: "2058420649104403",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 221,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 164,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.365Z"
			}
		]
	},
	{
		participantCode: "000092",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "269393876936180",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "59594377",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.566Z"
			},
			{
				nonce: "4602305482643751",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 330,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 169,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.649Z"
			}
		]
	},
	{
		participantCode: "000093",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "1477323726197351",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "07535733",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.835Z"
			},
			{
				nonce: "6808964492612748",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 124,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 266,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 109,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:11.908Z"
			}
		]
	},
	{
		participantCode: "000094",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8642631611533700",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "44790918",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.077Z"
			},
			{
				nonce: "3901568936350606",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 206,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.152Z"
			}
		]
	},
	{
		participantCode: "000095",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2841121637617299",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "04860644",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.334Z"
			},
			{
				nonce: "1019949018532465",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 212,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 168,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.411Z"
			}
		]
	},
	{
		participantCode: "000096",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8914553220156558",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "63237252",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.610Z"
			},
			{
				nonce: "4458149668549971",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 47,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 275,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.695Z"
			}
		]
	},
	{
		participantCode: "000097",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "6176914432787350",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "13926975",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.878Z"
			},
			{
				nonce: "2203974565199132",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 66,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 302,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 151,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:12.953Z"
			}
		]
	},
	{
		participantCode: "000098",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "4200493664377727",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "62636299",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.155Z"
			},
			{
				nonce: "6643659103875927",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 100,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 234,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 156,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.234Z"
			}
		]
	},
	{
		participantCode: "000099",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "1278313217609384",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "16131180",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.444Z"
			},
			{
				nonce: "3198191933250474",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-17T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 313,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 133,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.535Z"
			}
		]
	},
	{
		participantCode: "000100",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6702845761163427",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "80161228",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.732Z"
			},
			{
				nonce: "5249651009946188",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 244,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.813Z"
			}
		]
	},
	{
		participantCode: "000101",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "9245902559607884",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "13927698",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:13.994Z"
			},
			{
				nonce: "4087625653662628",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 141,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 175,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.076Z"
			}
		]
	},
	{
		participantCode: "000102",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9643234632215558",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "51899014",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.250Z"
			},
			{
				nonce: "6973047618179880",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 237,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 71,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.324Z"
			}
		]
	},
	{
		participantCode: "000103",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "8071880227907720",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "43954146",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.509Z"
			},
			{
				nonce: "1978135205008720",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 49,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 269,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.592Z"
			}
		]
	},
	{
		participantCode: "000104",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "6123844376273484",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "14550985",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.795Z"
			},
			{
				nonce: "2263690829835576",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 165,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 289,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 124,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:14.880Z"
			}
		]
	},
	{
		participantCode: "000105",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7559995439836578",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "42687187",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.071Z"
			},
			{
				nonce: "968349218276652",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 254,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 147,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.156Z"
			}
		]
	},
	{
		participantCode: "000106",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "626592783306450",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "48223380",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.345Z"
			},
			{
				nonce: "3939431903618500",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 124,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 274,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 166,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.420Z"
			}
		]
	},
	{
		participantCode: "000107",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7706594661929806",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "07813848",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.610Z"
			},
			{
				nonce: "1549454910334303",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-23T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 100,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 222,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 143,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.706Z"
			}
		]
	},
	{
		participantCode: "000108",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "1829870119953905",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "86995488",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.906Z"
			},
			{
				nonce: "348043099358646",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 258,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 157,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:15.989Z"
			}
		]
	},
	{
		participantCode: "000109",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "2078682021785334",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "14212665",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.180Z"
			},
			{
				nonce: "5149892517273964",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 177,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.270Z"
			}
		]
	},
	{
		participantCode: "000110",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "214582938633119",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "25582723",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.463Z"
			},
			{
				nonce: "3547167057394023",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.534Z"
			}
		]
	},
	{
		participantCode: "000111",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "1168455004229676",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "53802005",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.733Z"
			},
			{
				nonce: "1470276497301595",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 55,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 180,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 327,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 117,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.806Z"
			}
		]
	},
	{
		participantCode: "000112",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "579853155456798",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "13757613",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:16.991Z"
			},
			{
				nonce: "1994113739009236",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 235,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 153,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:17.075Z"
			}
		]
	},
	{
		participantCode: "000113",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8290959071532571",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "67857906",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:17.279Z"
			},
			{
				nonce: "2304313891188506",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 305,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 161,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:17.383Z"
			}
		]
	},
	{
		participantCode: "000114",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5926294774347518",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "65638778",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:17.652Z"
			},
			{
				nonce: "1394130518865706",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-26T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 135,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 304,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:17.765Z"
			}
		]
	},
	{
		participantCode: "000115",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2071933768361649",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "89726864",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:18.032Z"
			},
			{
				nonce: "341387486747254",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 295,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:18.139Z"
			}
		]
	},
	{
		participantCode: "000116",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "4229714933779949",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "76570077",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:18.419Z"
			},
			{
				nonce: "8506166356899161",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 49,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 134,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 271,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:18.509Z"
			}
		]
	},
	{
		participantCode: "000117",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7744577116163049",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "52144967",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:18.737Z"
			},
			{
				nonce: "9173079170311012",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 249,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 144,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:18.874Z"
			}
		]
	},
	{
		participantCode: "000118",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7312706840521586",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17654660",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:19.134Z"
			},
			{
				nonce: "4211861455070205",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 200,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 288,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 133,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:19.243Z"
			}
		]
	},
	{
		participantCode: "000119",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7675489266094870",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "50154675",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:19.506Z"
			},
			{
				nonce: "3892806679229195",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 66,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 226,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 114,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:19.628Z"
			}
		]
	},
	{
		participantCode: "000120",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9344155247588166",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "85458531",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:19.861Z"
			},
			{
				nonce: "6858516594729305",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 283,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 103,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:19.947Z"
			}
		]
	},
	{
		participantCode: "000121",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "5108823026124616",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "08935855",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:20.130Z"
			},
			{
				nonce: "9808007614422148",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-29T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 49,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 188,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 139,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:20.207Z"
			}
		]
	},
	{
		participantCode: "000122",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "4219406004388644",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "76535824",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:20.407Z"
			},
			{
				nonce: "2707789967960752",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-29T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 286,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 116,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:20.695Z"
			}
		]
	},
	{
		participantCode: "000123",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7255212059012468",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "67814060",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:20.863Z"
			},
			{
				nonce: "9154367157641138",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-29T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 274,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 88,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:20.955Z"
			}
		]
	},
	{
		participantCode: "000124",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "4360409127434517",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "00289111",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.135Z"
			},
			{
				nonce: "1918759681911944",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-30T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 360,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 151,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.212Z"
			}
		]
	},
	{
		participantCode: "000125",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "4086287966773064",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "04832431",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.385Z"
			},
			{
				nonce: "9596700806043632",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-31T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 273,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.467Z"
			}
		]
	},
	{
		participantCode: "000126",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "4161014093448299",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "40950552",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.642Z"
			},
			{
				nonce: "9666732184391944",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-05-31T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 201,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.722Z"
			}
		]
	},
	{
		participantCode: "000127",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9594968168370936",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "02510535",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.912Z"
			},
			{
				nonce: "9401103339125934",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-01T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 267,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 99,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:21.991Z"
			}
		]
	},
	{
		participantCode: "000128",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2716550860883367",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22806380",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.177Z"
			},
			{
				nonce: "8151458235608315",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 136,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 196,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 169,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.271Z"
			}
		]
	},
	{
		participantCode: "000129",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3846067320111666",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "70133386",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.467Z"
			},
			{
				nonce: "7082847372858192",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 134,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 201,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.554Z"
			}
		]
	},
	{
		participantCode: "000130",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3260292684487250",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "63044112",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.736Z"
			},
			{
				nonce: "8810871362254307",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 117,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 230,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.801Z"
			}
		]
	},
	{
		participantCode: "000131",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "821992542227430",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "47990436",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:22.996Z"
			},
			{
				nonce: "7499086302494782",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 269,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 169,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.064Z"
			}
		]
	},
	{
		participantCode: "000132",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "3603610254990633",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "74790632",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.261Z"
			},
			{
				nonce: "5934935896569320",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 66,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 212,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.354Z"
			}
		]
	},
	{
		participantCode: "000133",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6184554186103455",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "33269123",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.552Z"
			},
			{
				nonce: "4580512750538159",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 226,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.644Z"
			}
		]
	},
	{
		participantCode: "000134",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "8951010528043313",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "21093612",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.837Z"
			},
			{
				nonce: "7317217148214443",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 246,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 96,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:23.917Z"
			}
		]
	},
	{
		participantCode: "000135",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2942385056981723",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "35510126",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.113Z"
			},
			{
				nonce: "2375709057986249",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 232,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 165,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.192Z"
			}
		]
	},
	{
		participantCode: "000136",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "6724727679108684",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "31031478",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.378Z"
			},
			{
				nonce: "1111294416595497",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 177,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.458Z"
			}
		]
	},
	{
		participantCode: "000137",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7053925464342812",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "61857094",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.624Z"
			},
			{
				nonce: "4795693990204914",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 277,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.699Z"
			}
		]
	},
	{
		participantCode: "000138",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9931233232416848",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "01565847",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.871Z"
			},
			{
				nonce: "4222497545554673",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 249,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 144,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:24.952Z"
			}
		]
	},
	{
		participantCode: "000139",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7343073551786441",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "99572386",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.137Z"
			},
			{
				nonce: "4643342690710306",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 34,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 210,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 192,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.7,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.216Z"
			}
		]
	},
	{
		participantCode: "000140",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "5818076922635242",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "50417255",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.376Z"
			},
			{
				nonce: "9631596773626638",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 207,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 168,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.453Z"
			}
		]
	},
	{
		participantCode: "000141",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2301309883626084",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "29170171",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.654Z"
			},
			{
				nonce: "4718951783230",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 212,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.731Z"
			}
		]
	},
	{
		participantCode: "000142",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2149392170804992",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "30440676",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.910Z"
			},
			{
				nonce: "9106681784072582",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 271,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 182,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:25.988Z"
			}
		]
	},
	{
		participantCode: "000143",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2994606737260681",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "38896915",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:26.188Z"
			},
			{
				nonce: "3200531422537703",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 233,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:26.271Z"
			}
		]
	},
	{
		participantCode: "000144",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9578832000217074",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "27024374",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:26.498Z"
			},
			{
				nonce: "8579253530113182",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 213,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:26.588Z"
			}
		]
	},
	{
		participantCode: "000145",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3253464168784095",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "03853994",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:26.796Z"
			},
			{
				nonce: "9587206036540500",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 192,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 283,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 195,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:26.879Z"
			}
		]
	},
	{
		participantCode: "000146",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6622051182597604",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "01915333",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.088Z"
			},
			{
				nonce: "6018726817417419",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 123,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 282,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 95,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.167Z"
			}
		]
	},
	{
		participantCode: "000147",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3901623305331021",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22535938",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.361Z"
			},
			{
				nonce: "7520722488107827",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 230,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.432Z"
			}
		]
	},
	{
		participantCode: "000148",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "3755072447038390",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "80500070",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.620Z"
			},
			{
				nonce: "1057443535444474",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 40,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 167,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 114,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.700Z"
			}
		]
	},
	{
		participantCode: "000149",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "8418460599736819",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "43406132",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.887Z"
			},
			{
				nonce: "5359149690005927",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 224,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 173,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:27.961Z"
			}
		]
	},
	{
		participantCode: "000150",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9120666140107164",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "48882702",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:28.147Z"
			},
			{
				nonce: "9626573915729860",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 268,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:28.237Z"
			}
		]
	},
	{
		participantCode: "000151",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "5666714208261634",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "74935312",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:28.439Z"
			},
			{
				nonce: "5778285722425391",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 250,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 179,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:28.525Z"
			}
		]
	},
	{
		participantCode: "000152",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7390734510647825",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "39487206",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:28.734Z"
			},
			{
				nonce: "3230542367403193",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 219,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:28.826Z"
			}
		]
	},
	{
		participantCode: "000153",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2928624747945552",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "70315021",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:29.024Z"
			},
			{
				nonce: "1805733409372641",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 267,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 167,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:29.110Z"
			}
		]
	},
	{
		participantCode: "000154",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2952764231508085",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "07629976",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:29.324Z"
			},
			{
				nonce: "1050429422191966",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 303,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:29.417Z"
			}
		]
	},
	{
		participantCode: "000155",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6332248050219378",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "92256093",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:29.761Z"
			},
			{
				nonce: "81456094404944",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 256,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 149,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:29.836Z"
			}
		]
	},
	{
		participantCode: "000156",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "1807952058261204",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "84417147",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.050Z"
			},
			{
				nonce: "761106297271324",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 105,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 204,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.147Z"
			}
		]
	},
	{
		participantCode: "000157",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9489553074942694",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "03096924",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.332Z"
			},
			{
				nonce: "8084464319404598",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 55,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 217,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 111,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 5.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.415Z"
			}
		]
	},
	{
		participantCode: "000158",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "6893610087958437",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "61840855",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.604Z"
			},
			{
				nonce: "9833836390648436",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 308,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.691Z"
			}
		]
	},
	{
		participantCode: "000159",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2811663551170702",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "90710405",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.876Z"
			},
			{
				nonce: "750873701013466",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-17T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 193,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:30.962Z"
			}
		]
	},
	{
		participantCode: "000160",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5153806531150078",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "08754417",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.153Z"
			},
			{
				nonce: "7757539143344243",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 66,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 228,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 165,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.228Z"
			}
		]
	},
	{
		participantCode: "000161",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6645421239979341",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "80843923",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.406Z"
			},
			{
				nonce: "6031304866133185",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 38,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 231,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 182,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.484Z"
			}
		]
	},
	{
		participantCode: "000162",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "7825364659281109",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "05571757",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.656Z"
			},
			{
				nonce: "4317417909206765",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 244,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 154,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.738Z"
			}
		]
	},
	{
		participantCode: "000163",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "989239698539933",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "51348206",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.898Z"
			},
			{
				nonce: "3415623612476444",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 55,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 262,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 155,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:31.970Z"
			}
		]
	},
	{
		participantCode: "000164",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9333470956299056",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "95886937",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.147Z"
			},
			{
				nonce: "8946738016396332",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 259,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.226Z"
			}
		]
	},
	{
		participantCode: "000165",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6315867362736809",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "79347730",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.401Z"
			},
			{
				nonce: "4756054710784265",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 211,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 161,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.497Z"
			}
		]
	},
	{
		participantCode: "000166",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "920891209998045",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "78171007",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.686Z"
			},
			{
				nonce: "1801071528870102",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 180,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 325,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 154,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.767Z"
			}
		]
	},
	{
		participantCode: "000167",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "450193541534436",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "15234710",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:32.990Z"
			},
			{
				nonce: "6427054093175990",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 254,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 159,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.083Z"
			}
		]
	},
	{
		participantCode: "000168",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3101068671867771",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "93338717",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.286Z"
			},
			{
				nonce: "6138294028637958",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 197,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.354Z"
			}
		]
	},
	{
		participantCode: "000169",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9154510560107206",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "88115175",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.542Z"
			},
			{
				nonce: "9157279884979190",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 236,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.625Z"
			}
		]
	},
	{
		participantCode: "000170",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2924074330579005",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "65829746",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.810Z"
			},
			{
				nonce: "6839484256908386",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 282,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 174,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:33.883Z"
			}
		]
	},
	{
		participantCode: "000171",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5279879339012745",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "64276102",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.063Z"
			},
			{
				nonce: "7909620981784806",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 69,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 234,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 131,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.132Z"
			}
		]
	},
	{
		participantCode: "000172",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "4675558258312504",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "85102733",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.361Z"
			},
			{
				nonce: "8886572661494605",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 69,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 254,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 146,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.457Z"
			}
		]
	},
	{
		participantCode: "000173",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3157237086839331",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "81162668",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.645Z"
			},
			{
				nonce: "1069485865624436",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 100,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 299,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.724Z"
			}
		]
	},
	{
		participantCode: "000174",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7254820452168773",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "31254630",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:34.940Z"
			},
			{
				nonce: "7728690113896979",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 68,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 211,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 115,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.031Z"
			}
		]
	},
	{
		participantCode: "000175",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7422087377187316",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "29539849",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.234Z"
			},
			{
				nonce: "2659894652536195",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 34,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 182,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 174,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.313Z"
			}
		]
	},
	{
		participantCode: "000176",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "6179458311852266",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "72941491",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.504Z"
			},
			{
				nonce: "139463109242067",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 294,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 106,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.581Z"
			}
		]
	},
	{
		participantCode: "000177",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7914777951017822",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "61360865",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.778Z"
			},
			{
				nonce: "6240269462960530",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 298,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 4.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:35.859Z"
			}
		]
	},
	{
		participantCode: "000178",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "441423278397324",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "67369783",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.046Z"
			},
			{
				nonce: "3939180638803524",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 46,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 231,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 147,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.113Z"
			}
		]
	},
	{
		participantCode: "000179",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "9910728051788426",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "42421937",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.272Z"
			},
			{
				nonce: "3329807516590289",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 254,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.350Z"
			}
		]
	},
	{
		participantCode: "000180",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6399778493541646",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "92571236",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.520Z"
			},
			{
				nonce: "8905140928794422",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 50,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 129,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 196,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 163,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.589Z"
			}
		]
	},
	{
		participantCode: "000181",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7204103361828127",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "80984554",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.778Z"
			},
			{
				nonce: "3334483377528896",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-23T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 240,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 194,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:36.872Z"
			}
		]
	},
	{
		participantCode: "000182",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "3650520360678254",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "73117706",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.041Z"
			},
			{
				nonce: "1257007918884919",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 134,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 409,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.112Z"
			}
		]
	},
	{
		participantCode: "000183",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1913894916628714",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "74300253",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.324Z"
			},
			{
				nonce: "2140549782712984",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.416Z"
			}
		]
	},
	{
		participantCode: "000184",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6272048696219819",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "08544314",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.614Z"
			},
			{
				nonce: "9771907810270768",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 42,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 102,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 265,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.707Z"
			}
		]
	},
	{
		participantCode: "000185",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9919754458175330",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "88164972",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.903Z"
			},
			{
				nonce: "4585826286471095",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-26T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 246,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 173,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:37.979Z"
			}
		]
	},
	{
		participantCode: "000186",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6732631780083718",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "20918435",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:38.179Z"
			},
			{
				nonce: "6390257864056488",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 315,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:38.259Z"
			}
		]
	},
	{
		participantCode: "000187",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7145085921388434",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "45294107",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:38.457Z"
			},
			{
				nonce: "3212195957782935",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 184,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 105,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:38.686Z"
			}
		]
	},
	{
		participantCode: "000188",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2053344292129274",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "97010297",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:38.868Z"
			},
			{
				nonce: "7611029022459497",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 233,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 147,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:38.952Z"
			}
		]
	},
	{
		participantCode: "000189",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3303647688385201",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "43221395",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:39.199Z"
			},
			{
				nonce: "7018362054552763",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 394,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 157,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:39.290Z"
			}
		]
	},
	{
		participantCode: "000190",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7824794174008709",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "59571499",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:39.484Z"
			},
			{
				nonce: "7525580105076910",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-29T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 70,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 269,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.9,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:39.579Z"
			}
		]
	},
	{
		participantCode: "000191",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "281488372496826",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "38007520",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:39.785Z"
			},
			{
				nonce: "2905839057131794",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-06-30T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 239,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:39.865Z"
			}
		]
	},
	{
		participantCode: "000192",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3037963312221266",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "91525565",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.086Z"
			},
			{
				nonce: "9059150066651774",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-01T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 70,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 174,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.158Z"
			}
		]
	},
	{
		participantCode: "000193",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3230175535213964",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "32478738",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.358Z"
			},
			{
				nonce: "8916252406267309",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-01T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 309,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 156,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.429Z"
			}
		]
	},
	{
		participantCode: "000194",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "5226873663004661",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "09874112",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.621Z"
			},
			{
				nonce: "4179023283661792",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 35,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 282,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 156,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.693Z"
			}
		]
	},
	{
		participantCode: "000195",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7961213821583044",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "68389721",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.877Z"
			},
			{
				nonce: "7020808400769343",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 124,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 255,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 175,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:40.946Z"
			}
		]
	},
	{
		participantCode: "000196",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9976124017070704",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "83047079",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.118Z"
			},
			{
				nonce: "7022240256921943",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 55,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 135,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 250,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 161,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.218Z"
			}
		]
	},
	{
		participantCode: "000197",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1933220167860623",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "71786701",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.400Z"
			},
			{
				nonce: "6742203524689074",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 100,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 248,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.492Z"
			}
		]
	},
	{
		participantCode: "000198",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5732683120103224",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "01711290",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.694Z"
			},
			{
				nonce: "6708649073768826",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 214,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.766Z"
			}
		]
	},
	{
		participantCode: "000199",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "309920216693094",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "07135098",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:41.930Z"
			},
			{
				nonce: "2377278127094809",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 69,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 239,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 151,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.043Z"
			}
		]
	},
	{
		participantCode: "000200",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8413684312375573",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17933012",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.238Z"
			},
			{
				nonce: "9065252366127418",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 77,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 304,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.342Z"
			}
		]
	},
	{
		participantCode: "000201",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8873131535616270",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "60494365",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.530Z"
			},
			{
				nonce: "7950188427813107",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 68,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 277,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 151,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.619Z"
			}
		]
	},
	{
		participantCode: "000202",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8980107656864347",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "72987182",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.820Z"
			},
			{
				nonce: "9680584073572254",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 300,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 171,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:42.904Z"
			}
		]
	},
	{
		participantCode: "000203",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7943774263991563",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "45653776",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.073Z"
			},
			{
				nonce: "641602494940865",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 258,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 141,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.145Z"
			}
		]
	},
	{
		participantCode: "000204",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "4693907711406493",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "44809156",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.318Z"
			},
			{
				nonce: "4597062300075128",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 299,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 173,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.398Z"
			}
		]
	},
	{
		participantCode: "000205",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "1291282014902735",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22684832",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.611Z"
			},
			{
				nonce: "9716881917478634",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 55,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 289,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.743Z"
			}
		]
	},
	{
		participantCode: "000206",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2336009643277408",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "09647747",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:43.925Z"
			},
			{
				nonce: "1885610302135266",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 152,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 298,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 178,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.009Z"
			}
		]
	},
	{
		participantCode: "000207",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "244253127503627",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "18761475",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.191Z"
			},
			{
				nonce: "3817207202611353",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 102,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 318,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.277Z"
			}
		]
	},
	{
		participantCode: "000208",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5974036703540158",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "94925698",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.465Z"
			},
			{
				nonce: "6765922326271909",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 105,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 240,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 154,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.562Z"
			}
		]
	},
	{
		participantCode: "000209",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "5264223524248464",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22119819",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.744Z"
			},
			{
				nonce: "8100566349240812",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 309,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 131,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:44.819Z"
			}
		]
	},
	{
		participantCode: "000210",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "705004729727432",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "57321313",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.045Z"
			},
			{
				nonce: "6240549492617171",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 37,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 250,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 187,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.162Z"
			}
		]
	},
	{
		participantCode: "000211",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "4927796068473285",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "97495435",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.348Z"
			},
			{
				nonce: "600395064216262",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 288,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 159,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.435Z"
			}
		]
	},
	{
		participantCode: "000212",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7465872177365267",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "64085425",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.679Z"
			},
			{
				nonce: "6217565889228862",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 125,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 245,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 166,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.774Z"
			}
		]
	},
	{
		participantCode: "000213",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "2335514048857828",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "88870327",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:45.966Z"
			},
			{
				nonce: "857121453564343",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 122,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 213,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 165,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.056Z"
			}
		]
	},
	{
		participantCode: "000214",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1566831318421656",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "97970596",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.252Z"
			},
			{
				nonce: "8632654018286354",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 216,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 131,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.340Z"
			}
		]
	},
	{
		participantCode: "000215",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "1610340321125379",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "05398635",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.532Z"
			},
			{
				nonce: "3995894311415427",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 29,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 204,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 202,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.624Z"
			}
		]
	},
	{
		participantCode: "000216",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "4211372785687815",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "20907859",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.812Z"
			},
			{
				nonce: "531952882817528",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 204,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:46.890Z"
			}
		]
	},
	{
		participantCode: "000217",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5392119579635402",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "12501782",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:47.073Z"
			},
			{
				nonce: "484109670855875",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 135,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 252,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:47.148Z"
			}
		]
	},
	{
		participantCode: "000218",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2531215618511567",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "02534965",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:47.333Z"
			},
			{
				nonce: "8113275985218635",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 94,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 227,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 154,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:47.408Z"
			}
		]
	},
	{
		participantCode: "000219",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5176803399073198",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22964918",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:47.574Z"
			},
			{
				nonce: "8175559434993416",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 258,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 147,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:47.654Z"
			}
		]
	},
	{
		participantCode: "000220",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1052131612265810",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "23565023",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.014Z"
			},
			{
				nonce: "7596346091942976",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 220,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 170,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.089Z"
			}
		]
	},
	{
		participantCode: "000221",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3817102216927790",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "79249900",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.259Z"
			},
			{
				nonce: "3049936301465439",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 239,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 126,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.333Z"
			}
		]
	},
	{
		participantCode: "000222",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7870948382246044",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "46705392",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.499Z"
			},
			{
				nonce: "5143121006118183",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-17T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 135,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 254,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 127,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.574Z"
			}
		]
	},
	{
		participantCode: "000223",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "5287994198493251",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "72020349",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.731Z"
			},
			{
				nonce: "2654724535289295",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 168,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 174,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.812Z"
			}
		]
	},
	{
		participantCode: "000224",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "5358632050559038",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "80532900",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:48.972Z"
			},
			{
				nonce: "2656516046444908",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-18T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 63,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 330,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.049Z"
			}
		]
	},
	{
		participantCode: "000225",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6302266496538893",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "38297087",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.219Z"
			},
			{
				nonce: "7775770441830505",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-19T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 35,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 183,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 182,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.300Z"
			}
		]
	},
	{
		participantCode: "000226",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9881649419381420",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "09787941",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.467Z"
			},
			{
				nonce: "8217913574590054",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-20T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 41,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 135,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 203,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.572Z"
			}
		]
	},
	{
		participantCode: "000227",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7291396994824315",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "98702466",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.840Z"
			},
			{
				nonce: "4281673615651878",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 263,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 97,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:49.921Z"
			}
		]
	},
	{
		participantCode: "000228",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2716867928525484",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "81965076",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:50.099Z"
			},
			{
				nonce: "817762149035482",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 341,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 136,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:50.191Z"
			}
		]
	},
	{
		participantCode: "000229",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9971660251780290",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "22141754",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:50.401Z"
			},
			{
				nonce: "3407408555669518",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-21T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 283,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:50.497Z"
			}
		]
	},
	{
		participantCode: "000230",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6055100575073504",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "10131816",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:50.675Z"
			},
			{
				nonce: "909171972607521",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 186,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 190,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:50.817Z"
			}
		]
	},
	{
		participantCode: "000231",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6963394920417376",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "99332321",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.012Z"
			},
			{
				nonce: "8727499102888574",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-22T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 307,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 146,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.107Z"
			}
		]
	},
	{
		participantCode: "000232",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3969859954185307",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "90481067",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.346Z"
			},
			{
				nonce: "7569233027371700",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-23T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 39,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 118,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 219,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.454Z"
			}
		]
	},
	{
		participantCode: "000233",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7551377534002797",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17608029",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.677Z"
			},
			{
				nonce: "1319707039937455",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 45,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 115,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 260,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 185,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.777Z"
			}
		]
	},
	{
		participantCode: "000234",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "7292552134709553",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "65223728",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:51.985Z"
			},
			{
				nonce: "5845928332708057",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-24T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 128,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 255,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 161,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.071Z"
			}
		]
	},
	{
		participantCode: "000235",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "1923927799314638",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "13122123",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.259Z"
			},
			{
				nonce: "2244326513108146",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 231,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 146,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.347Z"
			}
		]
	},
	{
		participantCode: "000236",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "384870300081935",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17585885",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.544Z"
			},
			{
				nonce: "4400446588553768",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-25T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 164,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 6.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.623Z"
			}
		]
	},
	{
		participantCode: "000237",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "4419269374085198",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "98948094",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.825Z"
			},
			{
				nonce: "1167298848864922",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-26T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 234,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:52.921Z"
			}
		]
	},
	{
		participantCode: "000238",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "2306062696071252",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "97998067",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.151Z"
			},
			{
				nonce: "4681553280652531",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-27T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 177,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.249Z"
			}
		]
	},
	{
		participantCode: "000239",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1890219754057208",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "01695544",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.430Z"
			},
			{
				nonce: "3108195845472632",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-28T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 47,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 138,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 257,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 156,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.518Z"
			}
		]
	},
	{
		participantCode: "000240",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "001"
		},
		interviews: [
			{
				nonce: "173979982077448",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "64029275",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.712Z"
			},
			{
				nonce: "2617107162516050",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-29T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 325,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.803Z"
			}
		]
	},
	{
		participantCode: "000241",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "4511127136192534",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "32651375",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:53.982Z"
			},
			{
				nonce: "148130065679384",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-30T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 68,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 180,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 274,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.070Z"
			}
		]
	},
	{
		participantCode: "000242",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "4310262121847817",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "02474779",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.273Z"
			},
			{
				nonce: "27297288929376",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-30T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 39,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 321,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 182,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.364Z"
			}
		]
	},
	{
		participantCode: "000243",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "6524002853711071",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "71047775",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.553Z"
			},
			{
				nonce: "6386797133311586",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-30T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 53,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 264,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 143,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.637Z"
			}
		]
	},
	{
		participantCode: "000244",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2606085319039047",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "92801557",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.828Z"
			},
			{
				nonce: "7921742550056707",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-31T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 62,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 268,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:54.911Z"
			}
		]
	},
	{
		participantCode: "000245",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9326659260028268",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "32287607",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.116Z"
			},
			{
				nonce: "3838354172125906",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-07-31T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 308,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.201Z"
			}
		]
	},
	{
		participantCode: "000246",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "3384190950007844",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "00620500",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.395Z"
			},
			{
				nonce: "1618202420518460",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-01T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 253,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 144,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.486Z"
			}
		]
	},
	{
		participantCode: "000247",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "6674865116478332",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "04671942",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.674Z"
			},
			{
				nonce: "5608138888311425",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 248,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.761Z"
			}
		]
	},
	{
		participantCode: "000248",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "9066622058053950",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "48284663",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:55.957Z"
			},
			{
				nonce: "6025615723926043",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-02T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 65,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 155,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 269,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 148,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.034Z"
			}
		]
	},
	{
		participantCode: "000249",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2569996948248861",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "04659237",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.219Z"
			},
			{
				nonce: "4547359129859558",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-03T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 185,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 155,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.297Z"
			}
		]
	},
	{
		participantCode: "000250",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "9906504939547550",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "39184113",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.503Z"
			},
			{
				nonce: "1761166071617597",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-04T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 145,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 282,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 142,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.583Z"
			}
		]
	},
	{
		participantCode: "000251",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6150027183666658",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "86469783",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.755Z"
			},
			{
				nonce: "2107745993893018",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-05T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 54,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 188,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 113,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:56.833Z"
			}
		]
	},
	{
		participantCode: "000252",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2767011856571973",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "98017537",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:57.230Z"
			},
			{
				nonce: "7724658518336269",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-06T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 219,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 188,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:57.308Z"
			}
		]
	},
	{
		participantCode: "000253",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "1999475207221629",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "02562132",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:57.497Z"
			},
			{
				nonce: "3623062750075301",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-07T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 112,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 290,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 153,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:57.587Z"
			}
		]
	},
	{
		participantCode: "000254",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "1019441096162637",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "05063632",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:57.781Z"
			},
			{
				nonce: "5181797553805645",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 51,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 175,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 123,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:57.867Z"
			}
		]
	},
	{
		participantCode: "000255",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "1018721354695465",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "46605313",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.056Z"
			},
			{
				nonce: "5582170248546363",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-08T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 59,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 212,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 157,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.163Z"
			}
		]
	},
	{
		participantCode: "000256",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "8090733199540185",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "20617822",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.352Z"
			},
			{
				nonce: "2323133758873464",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 71,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 302,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.437Z"
			}
		]
	},
	{
		participantCode: "000257",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6626600523578092",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "41282311",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.610Z"
			},
			{
				nonce: "1599320277598928",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 61,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 243,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 137,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.687Z"
			}
		]
	},
	{
		participantCode: "000258",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "2576793079155258",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "43506230",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.889Z"
			},
			{
				nonce: "6556651751537073",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 55,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 353,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.2,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:58.974Z"
			}
		]
	},
	{
		participantCode: "000259",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "8243914901506875",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "40622202",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:59.192Z"
			},
			{
				nonce: "3898773711752231",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 64,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 335,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 158,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:59.279Z"
			}
		]
	},
	{
		participantCode: "000260",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8540334440928561",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "56703396",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:59.463Z"
			},
			{
				nonce: "257413180779669",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 43,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 150,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 247,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 171,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:59.566Z"
			}
		]
	},
	{
		participantCode: "000261",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "7544679004637498",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "44972027",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:59.766Z"
			},
			{
				nonce: "4246548800104078",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-09T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 340,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:11:59.843Z"
			}
		]
	},
	{
		participantCode: "000262",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "725202508188497",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "85647284",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.040Z"
			},
			{
				nonce: "1462429461528201",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 60,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 206,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 132,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 2.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.131Z"
			}
		]
	},
	{
		participantCode: "000263",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "7044730296634316",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "40396367",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.323Z"
			},
			{
				nonce: "7886771541790489",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-10T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 58,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 284,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.8,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.394Z"
			}
		]
	},
	{
		participantCode: "000264",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8637590615669521",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "64487731",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.586Z"
			},
			{
				nonce: "5884758814867639",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-11T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 49,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 130,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 266,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 171,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.6,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.658Z"
			}
		]
	},
	{
		participantCode: "000265",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "9787238653327388",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "59565786",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.847Z"
			},
			{
				nonce: "1220865604801849",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-12T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 48,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 110,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 229,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 168,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:00.924Z"
			}
		]
	},
	{
		participantCode: "000266",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "8026748997470938",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "08883630",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.135Z"
			},
			{
				nonce: "4454560919952890",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-13T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 52,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 172,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 199,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 162,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.217Z"
			}
		]
	},
	{
		participantCode: "000267",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "451748960572176",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "31393100",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.419Z"
			},
			{
				nonce: "4743187327989200",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 44,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 120,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 263,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 173,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "7",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.495Z"
			}
		]
	},
	{
		participantCode: "000268",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "003"
		},
		interviews: [
			{
				nonce: "5384368036449056",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "28273408",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.694Z"
			},
			{
				nonce: "6517338216620352",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-14T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 56,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 294,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 153,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.3,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.776Z"
			}
		]
	},
	{
		participantCode: "000269",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "002"
		},
		interviews: [
			{
				nonce: "3798957600152491",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "17757279",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:01.980Z"
			},
			{
				nonce: "8952456989935622",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-15T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 57,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 140,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 192,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "0",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 148,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 0.4,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "6",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 0,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:02.076Z"
			}
		]
	},
	{
		participantCode: "000270",
		sample: {
			name: "",
			address: "",
			frozen: false,
			sampleCode: "004"
		},
		interviews: [
			{
				nonce: "6400685823938825",
				pageSetType: "HOME",
				items: [
					{
						variableName: "__CODE",
						instance: 1,
						value: "92942376",
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:02.268Z"
			},
			{
				nonce: "4074878243741358",
				pageSetType: "DATA",
				items: [
					{
						variableName: "VDATE",
						instance: 1,
						value: "2021-08-16T22:00:00.000Z",
						messages: {
						}
					},
					{
						variableName: "__INCLUDED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "AGE",
						instance: 1,
						value: 67,
						messages: {
						}
					},
					{
						variableName: "SEX",
						instance: 1,
						value: "1",
						messages: {
						}
					},
					{
						variableName: "PAIN",
						instance: 1,
						value: "4",
						messages: {
						}
					},
					{
						variableName: "BLOOD",
						instance: 1,
						value: 160,
						messages: {
						}
					},
					{
						variableName: "CHOLESTEROL",
						instance: 1,
						value: 286,
						messages: {
						}
					},
					{
						variableName: "SUGAR",
						instance: 1,
						value: 0,
						messages: {
						}
					},
					{
						variableName: "ECG",
						instance: 1,
						value: "2",
						messages: {
						}
					},
					{
						variableName: "RATE",
						instance: 1,
						value: 108,
						messages: {
						}
					},
					{
						variableName: "INDUCED",
						instance: 1,
						value: 1,
						messages: {
						}
					},
					{
						variableName: "OLDPEAK",
						instance: 1,
						value: 1.5,
						messages: {
						}
					},
					{
						variableName: "SLOPE",
						instance: 1,
						value: 2,
						messages: {
						}
					},
					{
						variableName: "VESSELS",
						instance: 1,
						value: 3,
						messages: {
						}
					},
					{
						variableName: "THAL",
						instance: 1,
						value: "3",
						messages: {
						}
					},
					{
						variableName: "DISEASE",
						instance: 1,
						value: 1,
						messages: {
						}
					}
				],
				lastInput: "2022-03-26T14:12:02.359Z"
			}
		]
	}
];
var DemoStats = {
	survey: survey,
	samples: samples,
	participants: participants
};

export { DemoStats as default, participants, samples, survey };
