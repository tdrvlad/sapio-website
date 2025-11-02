export type Language = "en" | "ro";

export const translations = {
	ro: {
		// Navigation
		navbar: {
			home: "Acasă",
			solutions: "Soluții",
			projects: "Proiecte",
			team: "Echipă",
			contact: "Contact",
			consultation: "Obține o consultare",
		},
		// Footer
		footer: {
			tagline: "Tehnologie AI adaptată pentru fiecare afacere.",
			company: "Companie",
			services: "Servicii",
			overview: "Prezentare generală",
			chatbots: "Chatboturi & RAG",
			vision: "Viziune computerizată",
			speech: "Vorbire și audio",
			connect: "Conectează-te",
			linkedin: "LinkedIn",
			github: "GitHub",
			copyright: "© 2025 Sapio AI Systems. Toate drepturile rezervate.",
			privacy: "Politica de confidențialitate",
		},
		// Hero Video Section
		heroVideo: {
			title: "Suntem în afacerea rezolvării problemelor",
			description: "Transformă-ți ideile în soluții de ultimă oră de inteligență artificială.",
			button: "Începe-ți proiectul",
			see_work: "Vezi lucrările noastre",
		},
		// Home Page
		home: {
			projects: {
				title: "Proiecte",
				aiAflat: {
					title: "ai-aflat.ro",
					description: "Asistent juridic alimentat de AI pentru legislația română. Căutare semantică în ~500k texte cu surse verificabile.",
					visit: "Vizitează ai-aflat.ro",
					caseStudy: "Vezi studiul de caz",
				},
				knowledgeAssistant: {
					title: "Knowledge Assistant",
					description: "Chatbot proprietar configurable care integrează cunoștințele de afaceri pentru răspunsuri și suport instant.",
					explore: "Explorează Asistentul",
					caseStudy: "Vezi studiul de caz",
				},
			},
			clients: {
				heading: "Încrederea echipei cu viziune",
			},
			capabilities: {
				title: "Ce putem construi",
				tapToLearn: "Apasă pentru a afla mai multe",
				seeProjects: "Vezi proiecte care folosesc această capabilitate",
			},
			technologies: {
				heading: "Tehnologii cu care lucrăm",
			},
			chat: {
				question: "Ai o întrebare?",
			},
			cta: {
				title: "Hai să construim soluția ta",
				description: "Vrei să vezi cum ar arăta o soluție AI adaptată pentru afacerea ta? Hai să vorbim.",
				button: "Obține o consultare gratuită",
				contact: "Contact: Vlad Tudor — Manager, Sapio AI",
			},
		},
		// Capabilities
		capabilities: {
			vision: {
				title: "Viziune computerizată",
				description:
					"Înțelegere imagini și video: detectare, segmentare, OCR, inspecție calitate și pipeline-uri de imagistică medicală. De la procesare pe dispozitiv la procesare la scară cloud.",
			},
			audio: {
				title: "Audio și vorbire",
				description:
					"ASR/TTS, analiză apeluri, diarizare vorbitor, detectare wake-word. Procesare în timp real și batch cu suport multilingv.",
			},
			nlp: {
				title: "Limbaj natural",
				description:
					"Chat RAG, rezumare, înțelegere documente și extragere informații — răspunsuri fundamentate cu citări peste cunoștințele tale.",
			},
			dataScience: {
				title: "Știința datelor",
				description:
					"Prognoză, detectare anomalii, clasificare și personalizare. Construiește modele interpretabile care conduc la rezultate de afaceri tangibile.",
			},
			agents: {
				title: "Agenți de sistem",
				description:
					"Agenți de workflow care se integrează cu stack-ul tău: ticketing, CRMs și instrumente de operațiuni. Acțiuni protejate cu om în buclă.",
			},
			training: {
				title: "Antrenare modele",
				description:
					"Fine-tuning și adaptare la domeniu. Pipeline-uri de date, harness-uri de evaluare și monitorizare pentru deploy-uri de încredere.",
			},
		},
		// Solution Finder
		solutionFinder: {
			title: "Găsește soluția ta AI",
			step1: "Industrie",
			step2: "Provocare",
			step3: "Soluție",
			selectIndustry: "Selectează industria ta",
			chooseChallenge: "Alege provocarea ta",
			inIndustry: "în",
			talkToUs: "Vorbește cu noi",
			seeOtherChallenges: "Vezi alte provocări",
			placeholder: "Selectează o industrie și o provocare pentru a vedea soluția recomandată",
		},
	},
	en: {
		// Navigation
		navbar: {
			home: "Home",
			solutions: "Solutions",
			projects: "Projects",
			team: "Team",
			contact: "Contact",
			consultation: "Get a consultation",
		},
		// Footer
		footer: {
			tagline: "AI technology tailored for every business.",
			company: "Company",
			services: "Services",
			overview: "Overview",
			chatbots: "Chatbots & RAG",
			vision: "Computer Vision",
			speech: "Speech & Audio",
			connect: "Connect",
			linkedin: "LinkedIn",
			github: "GitHub",
			copyright: "© 2025 Sapio AI Systems. All rights reserved.",
			privacy: "Privacy Policy",
		},
		// Hero Video Section
		heroVideo: {
			title: "We're in the business of problem-solving",
			description: "Transform your ideas into state-of-the-art AI solutions.",
			button: "Start your project",
			see_work: "See our work",
		},
		// Home Page
		home: {
			projects: {
				title: "Projects",
				aiAflat: {
					title: "ai-aflat.ro",
					description: "AI-powered legal assistant for Romanian legislation. Semantic search across ~500k texts with verifiable sources.",
					visit: "Visit ai-aflat.ro",
					caseStudy: "View case study",
				},
				knowledgeAssistant: {
					title: "Knowledge Assistant",
					description: "Configurable proprietary chatbot integrating business knowledge for instant answers and support.",
					explore: "Explore the Assistant",
					caseStudy: "View case study",
				},
			},
			clients: {
				heading: "Trusted by forward-thinking teams",
			},
			capabilities: {
				title: "What we can build",
				tapToLearn: "Tap to learn more",
				seeProjects: "See projects using this capability",
			},
			technologies: {
				heading: "Technologies we work with",
			},
			chat: {
				question: "Got a question?",
			},
			cta: {
				title: "Let's build your solution",
				description: "Do you want to see what an AI solution tailored for your business would look like? Let's talk.",
				button: "Get a free consultation",
				contact: "Contact: Vlad Tudor — Manager, Sapio AI",
			},
		},
		// Capabilities
		capabilities: {
			vision: {
				title: "Computer Vision",
				description:
					"Image and video understanding: detection, segmentation, OCR, quality inspection, and medical imaging pipelines. From on-device to cloud-scale processing.",
			},
			audio: {
				title: "Audio & Speech",
				description:
					"ASR/TTS, call analytics, speaker diarization, and wake-word detection. Real-time and batch processing with multilingual support.",
			},
			nlp: {
				title: "Natural Language",
				description:
					"RAG chat, summarization, document understanding, and information extraction — grounded answers with citations over your knowledge.",
			},
			dataScience: {
				title: "Data Science",
				description:
					"Forecasting, anomaly detection, ranking, and personalization. Build interpretable models that drive tangible business outcomes.",
			},
			agents: {
				title: "System Agents",
				description:
					"Workflow agents that integrate with your stack: ticketing, CRMs, and ops tools. Guarded actions with human-in-the-loop.",
			},
			training: {
				title: "Model Training",
				description:
					"Fine-tuning and domain adaptation. Data pipelines, evaluation harnesses, and monitoring for reliable deployments.",
			},
		},
		// Solution Finder
		solutionFinder: {
			title: "Find your AI solution",
			step1: "Industry",
			step2: "Challenge",
			step3: "Solution",
			selectIndustry: "Select your industry",
			chooseChallenge: "Choose your challenge",
			inIndustry: "in",
			talkToUs: "Talk to us",
			seeOtherChallenges: "See other challenges",
			placeholder: "Select an industry and challenge to see the recommended solution",
		},
	},
};


