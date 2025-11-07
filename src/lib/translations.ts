import { m } from "framer-motion";

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
					description: "Chatbot proprietar configurabil care integrează cunoștințele de afaceri pentru răspunsuri și suport instant.",
					explore: "Explorează Asistentul",
					caseStudy: "Vezi studiul de caz",
				},
			},
			clients: {
				heading: "Încrederea echipelor cu viziune",
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
		// Chat
		chatInvitation: {
			title: "Asistentul nostru AI îți poate explica serviciile Sapio și pașii de start.",
			ask: "Întreabă AI-ul",
			cta: "Deschide chatbot-ul Sapio",
		},
		servicesPage: {
			hero: {
				eyebrow: "Servicii AI personalizate",
				title: "Strategie, implementare și operațiuni — construite împreună cu echipa ta",
				subtitle:
					"Identificăm oportunitățile cu impact, proiectăm soluții AI scalabile și livrăm produse care generează rezultate măsurabile.",
			},
			highlightsTitle: "Cum colaborăm",
			highlights: [
				{
					title: "Descoperire și strategie",
					description: "Analizăm procesele, audităm datele și definim indicatorii de succes pentru inițiativa ta AI.",
				},
				{
					title: "Produs și inginerie",
					description: "Concepem fluxuri end-to-end, integrări și interfețe care funcționează în ecosistemul tău tehnic.",
				},
				{
					title: "Operațiuni și enablement",
					description: "Pregătim echipa, monitorizăm performanța modelelor și iterăm în siguranță cu om în buclă.",
				},
			],
			approach: {
				title: "Abordarea noastră",
				steps: [
					{
						title: "Săptămâna de fundație",
						description:
							"Workshop-uri executive, sesiuni cu stakeholderi și evaluarea datelor pentru a alinia obiectivele și constrângerile.",
					},
					{
						title: "Sprint-uri de construire",
						description:
							"Livrăm incremental: prototip, integrare, testare și lansare controlată, cu feedback continuu de la utilizatori.",
					},
					{
						title: "Transfer și scalare",
						description:
							"Documentație, training, monitorizare și roadmap pentru următoarele iterații astfel încât soluția să crească odată cu business-ul tău.",
					},
				],
			},
			cta: {
				title: "Hai să construim soluția ta AI",
				description: "Spune-ne despre provocările tale și îți arătăm în câteva zile cum ar putea arăta un MVP funcțional.",
				button: "Programează o discuție",
			},
		},
		teamPage: {
			hero: {
				eyebrow: "Echipă",
				title: "Cunoaște oamenii din spatele Sapio",
				subtitle:
					"Suntem cercetători aplicați, ingineri și designeri care construiesc produse AI cu impact direct în business.",
			},
			membersTitle: "Leadership",
			members: [
				{
					name: "Vlad Tudor",
					role: "Managing Partner",
					bio: "Coordonează strategia produselor și relația cu partenerii enterprise. 10+ ani în consultanță tehnologică și AI.",
				},
				{
					name: "Ioana Ionescu",
					role: "Head of Delivery",
					bio: "Conduce echipele cross-functionale și se asigură că soluțiile intră în producție în condiții de siguranță și conformitate.",
				},
				{
					name: "Andrei Popescu",
					role: "Lead Machine Learning Engineer",
					bio: "Specialist în modele lingvistice și RAG pentru industrii reglementate, cu experiență în scalarea infrastructurii.",
				},
			],
			values: {
				title: "Cum lucrăm",
				items: [
					{
						title: "Aplicat, nu teoretic",
						description: "Prototipăm rapid și învățăm din date reale, punând accent pe rezultate măsurabile.",
					},
					{
						title: "Transparență totală",
						description: "Împărtășim fiecare ipoteză, limitare și decizie tehnică pentru ca partenerii să ia decizii informate.",
					},
					{
						title: "Echipe integrate",
						description: "Lucrăm cot la cot cu oamenii tăi, din prima zi, pentru a transfera know-how și autonomie.",
					},
				],
			},
			cta: {
				title: "Vrei să ni te alături?",
				description: "Căutăm colegi care iubesc să rezolve probleme complexe în mod responsabil. Spune-ne câteva lucruri despre tine.",
				button: "Vezi rolurile deschise",
			},
		},
		projectsPage: {
			hero: {
				eyebrow: "Proiecte",
				title: "Produse AI livrate în producție",
				subtitle:
					"Selectăm câteva proiecte care arată cum abordăm provocări diferite — de la legal tech la operațiuni industriale.",
			},
			featured: [
				{
					slug: "ai-aflat",
					title: "ai-aflat.ro",
					description: "Asistent juridic cu căutare semantică peste legislația românească și surse verificate.",
					tags: ["NLP", "RAG", "Azure"],
					href: "/projects/ai-aflat",
				},
				{
					slug: "knowledge-assistant",
					title: "Sapio Knowledge Assistant",
					description: "Platformă multi-lingvă de suport conversațional conectată la procesele interne de business.",
					tags: ["LLM", "Automatizare", "Enterprise"],
					href: "/projects/knowledge-assistant",
				},
			],
			stats: {
				title: "Indicatori",
				items: [
					{ label: "Documente procesate", value: "500k+" },
					{ label: "Utilizatori lunari", value: "50k" },
					{ label: "Rate de automatizare", value: "85%" },
				],
			},
			cta: {
				title: "Ai un brief de proiect?",
				description: "Trimite-ne o prezentare rapidă și revenim cu sugestii de abordare în 48 de ore.",
				button: "Contactează-ne",
			},
		},
		projectDetails: {
			aiAflat: {
				hero: {
					title: "ai-aflat.ro",
					subtitle: "Asistent juridic pentru profesioniști",
					description: "Platformă de căutare semantică peste 500k de documente legislative, cu citări exacte și actualizări zilnice.",
				},
				overview: {
					challengeTitle: "Provocarea",
					challengeDescription: "Avocații și consilierii juridici pierdeau ore întregi căutând manual articole de lege actualizate și jurisprudență relevantă.",
					solutionTitle: "Soluția",
					solutionDescription: "Pipeline RAG cu extragere automată din Monitorul Oficial, normalizare semantică și motor de căutare cu ranking contextual.",
					impactTitle: "Impact",
					impactDescription: "Timpul de documentare a scăzut cu 70%, iar utilizatorii pot exporta citările complete direct în documentele de lucru.",
				},
				metrics: [
					"500k+ acte normative indexate",
					"<2 secunde timp mediu de răspuns",
					"Flux zilnic de actualizare automată",
				],
				sections: [
					{
						title: "Colectarea și pregătirea datelor",
						description: "Conectori pentru Monitorul Oficial și portalurile Ministerului Justiției normalizează documentele într-un format unitar.",
					},
					{
						title: "Căutare semantică cu citări",
						description: "Îmbinăm embedding-uri lingvistice cu reguli de business pentru a returna paragrafe exacte și sursa oficială.",
					},
				],
				techTitle: "Tehnologii",
				tech: ["Azure Cognitive Search", "Azure OpenAI", "Python", "Next.js"],
				cta: {
					title: "Vrei ceva similar pentru organizația ta?",
					button: "Programează o întâlnire",
				},
			},
			knowledgeAssistant: {
				hero: {
					title: "Sapio Knowledge Assistant",
					subtitle: "Suport conversațional pentru echipe de customer success",
					description: "Asistent multi-lingv conectat la procese interne, care oferă răspunsuri cu citări și propune acțiuni automate.",
				},
				overview: {
					challengeTitle: "Provocarea",
					challengeDescription: "Echipele de suport aveau nevoie de un mod rapid de a găsi procese și politici actualizate fără a părăsi instrumentele curente.",
					solutionTitle: "Soluția",
					solutionDescription: "Aplicație web și widget integrat în Slack ce folosește RAG peste baza de cunoștințe, CRM și instrumentele interne, cu audit trail complet.",
					impactTitle: "Impact",
					impactDescription: "Timpul de rezolvare a tichetelor a scăzut cu 45%, iar acuratețea răspunsurilor a crescut datorită citărilor automate.",
				},
				metrics: [
					"15 integrări API",
					"9 limbi suportate",
					"<1 săptămână pentru onboarding-ul noilor agenți",
				],
				sections: [
					{
						title: "Orchestrare de surse",
						description: "Conectori programabili păstrează baza de cunoștințe actualizată și răspunsurile fundamentate în ultimele politici.",
					},
					{
						title: "Asistent cu acțiuni",
						description: "Agenții pot genera răspunsuri, task-uri și automatizări direct din conversație, cu aprobări rapide.",
					},
				],
				techTitle: "Tehnologii",
				tech: ["OpenAI GPT-4", "LangChain", "PostgreSQL", "Vercel"],
				cta: {
					title: "Hai să construim asistentul tău",
					button: "Discută cu noi",
				},
			},
		},
		contactPage: {
			hero: {
				eyebrow: "Contact",
				title: "Spune-ne despre provocarea ta",
				subtitle: "Răspundem rapid și venim cu sugestii concrete în maximum 48 de ore.",
			},
			details: {
				email: "hello@sapio.ro",
				phone: "+40 723 000 000",
				location: "București & remote în UE",
				availability: "Program: Luni-Vineri, 09:00 - 18:00 EET",
			},
			cta: {
				title: "Preferi o întâlnire?",
				description: "Rezervă un slot de 30 de minute și discutăm live despre ce dorești să construiești.",
				button: "Rezervă o întâlnire",
			},
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
		// Chat
		chatInvitation: {
			title: "Converse with our newest AI model",
			ask: "Talk with our AI assistant",
			cta: "Open the Sapio chatbot",
		},
		servicesPage: {
			hero: {
				eyebrow: "Custom AI services",
				title: "Strategy, build, and launch — delivered with your team",
				subtitle:
					"We identify high-impact opportunities, architect scalable AI systems, and ship products that move the business needle.",
			},
			highlightsTitle: "How we partner",
			highlights: [
				{
					title: "Discovery & strategy",
					description: "Audit data, interview stakeholders, and define success metrics before writing a single line of code.",
				},
				{
					title: "Product & engineering",
					description: "Design end-to-end workflows, integrations, and interfaces that plug into your existing stack.",
				},
				{
					title: "Operations & enablement",
					description: "Train your team, monitor performance, and iterate safely with human-in-the-loop controls.",
				},
			],
			approach: {
				title: "Our delivery playbook",
				steps: [
					{
						title: "Foundations week",
						description: "Executive workshops, stakeholder interviews, and data readiness evaluation to align on goals and constraints.",
					},
					{
						title: "Build sprints",
						description: "Iterative delivery: prototype, integrate, test, and release with continuous feedback from users.",
					},
					{
						title: "Transfer & scale",
						description: "Documentation, training, monitoring, and a roadmap so your team can operate and extend the solution confidently.",
					},
				],
			},
			cta: {
				title: "Ready to build together?",
				description: "Share your challenge and we’ll outline a functional MVP concept within days.",
				button: "Book a call",
			},
		},
		teamPage: {
			hero: {
				eyebrow: "Team",
				title: "Meet the builders behind Sapio",
				subtitle:
					"We are applied researchers, engineers, and designers focused on shipping AI products that create measurable outcomes.",
			},
			membersTitle: "Leadership",
			members: [
				{
					name: "Vlad Tudor",
					role: "Managing Partner",
					bio: "Leads product strategy and enterprise partnerships. 10+ years delivering technology and AI programs.",
				},
				{
					name: "Ioana Ionescu",
					role: "Head of Delivery",
					bio: "Orchestrates cross-functional teams and ensures solutions reach production safely and compliantly.",
				},
				{
					name: "Andrei Popescu",
					role: "Lead Machine Learning Engineer",
					bio: "Specialises in language models and RAG for regulated industries, with experience scaling infrastructure.",
				},
			],
			values: {
				title: "How we work",
				items: [
					{
						title: "Applied first",
						description: "Prototype fast, learn from real data, and measure impact at every stage.",
					},
					{
						title: "Radical transparency",
						description: "We share every hypothesis, limitation, and technical decision so you can steer with confidence.",
					},
					{
						title: "Integrated teams",
						description: "Embed alongside your people from day one to transfer knowledge and autonomy.",
					},
				],
			},
			cta: {
				title: "Want to join the team?",
				description: "We’re hiring problem-solvers who care about responsible AI. Tell us about yourself.",
				button: "View open roles",
			},
		},
		projectsPage: {
			hero: {
				eyebrow: "Projects",
				title: "AI products shipped to production",
				subtitle:
					"A selection of engagements that showcase our approach across industries — from legal tech to customer experience.",
			},
			featured: [
				{
					slug: "ai-aflat",
					title: "ai-aflat.ro",
					description: "Legal assistant with semantic search across Romanian legislation and official citations.",
					tags: ["NLP", "RAG", "Azure"],
					href: "/projects/ai-aflat",
				},
				{
					slug: "knowledge-assistant",
					title: "Sapio Knowledge Assistant",
					description: "Multi-lingual conversational support platform connected to internal processes.",
					tags: ["LLM", "Automation", "Enterprise"],
					href: "/projects/knowledge-assistant",
				},
			],
			stats: {
				title: "By the numbers",
				items: [
					{ label: "Documents processed", value: "500k+" },
					{ label: "Monthly users", value: "50k" },
					{ label: "Automation rate", value: "85%" },
				],
			},
			cta: {
				title: "Have a project brief?",
				description: "Send a short overview and we’ll return with suggested next steps within 48 hours.",
				button: "Contact us",
			},
		},
		projectDetails: {
			aiAflat: {
				hero: {
					title: "ai-aflat.ro",
					subtitle: "Legal assistant for professionals",
					description: "Semantic search platform over 500k legal documents with precise citations and daily updates.",
				},
				overview: {
					challengeTitle: "Challenge",
					challengeDescription: "Legal teams spent hours manually searching for updated legislation and relevant case law.",
					solutionTitle: "Solution",
					solutionDescription: "RAG pipeline with automated ingestion from official gazettes, semantic normalisation, and a search engine tuned for contextual relevance.",
					impactTitle: "Impact",
					impactDescription: "Research time dropped by 70% and users export full citations directly into their documents.",
				},
				metrics: [
					"500k+ legal texts indexed",
					"<2s average response time",
					"Automated daily refresh pipeline",
				],
				sections: [
					{
						title: "Data acquisition & preparation",
						description: "Connectors for official gazettes normalise raw documents into a consistent schema ready for indexing.",
					},
					{
						title: "Semantic search with citations",
						description: "Combined embeddings with business rules to return exact paragraphs and highlight the authoritative source.",
					},
				],
				techTitle: "Tech stack",
				tech: ["Azure Cognitive Search", "Azure OpenAI", "Python", "Next.js"],
				cta: {
					title: "Need a similar solution?",
					button: "Book a meeting",
				},
			},
			knowledgeAssistant: {
				hero: {
					title: "Sapio Knowledge Assistant",
					subtitle: "Conversational support for customer teams",
					description: "Multi-lingual assistant connected to internal knowledge, CRMs, and tooling with full audit trail.",
				},
				overview: {
					challengeTitle: "Challenge",
					challengeDescription: "Support teams needed instant access to up-to-date processes without leaving their workflow tools.",
					solutionTitle: "Solution",
					solutionDescription: "Web app and Slack widget using RAG over knowledge bases, CRM, and internal tools, with permissions-aware controls.",
					impactTitle: "Impact",
					impactDescription: "Ticket resolution time decreased by 45% and answer accuracy improved with automatic citations.",
				},
				metrics: [
					"15 API integrations",
					"9 supported languages",
					"<1 week onboarding for new agents",
				],
				sections: [
					{
						title: "Source orchestration",
						description: "Programmable connectors keep the knowledge base fresh and responses grounded in the latest policies.",
					},
					{
						title: "Actionable assistant",
						description: "Agents can draft replies, create tasks, and trigger automations directly within the conversation.",
					},
				],
				techTitle: "Tech stack",
				tech: ["OpenAI GPT-4", "LangChain", "PostgreSQL", "Vercel"],
				cta: {
					title: "Build your assistant with us",
					button: "Talk to Sapio",
				},
			},
		},
		contactPage: {
			hero: {
				eyebrow: "Contact",
				title: "Tell us about your challenge",
				subtitle: "We reply fast with clear next steps — usually within 48 hours.",
			},
			details: {
				email: "hello@sapio.ro",
				phone: "+40 723 000 000",
				location: "Bucharest & remote across the EU",
				availability: "Availability: Monday–Friday, 09:00-18:00 EET",
			},
			cta: {
				title: "Prefer a live session?",
				description: "Book a 30-minute slot and we’ll walk through your current roadmap together.",
				button: "Book a meeting",
			},
		},
	},
} as const;


