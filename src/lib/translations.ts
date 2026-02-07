export type Language = "en" | "ro";

const currentYear = new Date().getFullYear()

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
		cli: {
			suggestions: [
				"Cu ce tipuri de soluții AI lucrați?",
				"Puteți integra soluții on-premise, fără cloud?",
				"Arată-mi un proiect Sapio din zona legal tech.",
				"Cât de repede poate fi dezvoltat un MVP?",
				"Cum decurge un audit tehnic?",
			]
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
			copyright: `© ${currentYear} Sapio AI Systems. Toate drepturile rezervate.`,
			privacy: "Politica de confidențialitate",
		},
		// Hero Video Section
		heroVideo: {
			title: "Suntem în afacerea rezolvării problemelor",
			description: "Transformă-ți ideile în soluții de ultimă oră de inteligență artificială.",
			button: "Începe-ți proiectul",
			see_work: "Vezi proiectele noastre",
		},
		// Home Page
		home: {
			projects: {
				title: "Proiecte",
				aiAflat: {
					title: "ai-aflat.ro",
					description: "Proiect civic flagship: Asistent juridic gratuit pentru legislația română. Tech for Good.",
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
			sapioConsole: {
				eyebrow: "",
				title: "Întreabă-ne orice – direct!",
				subtitle: "",
				consoleLabel: "Sapio Assistant v0.1",
				systemPrefix: "[SISTEM]",
				statusOnline: "activ",
				modelLabel: "proprietar",
				latencyLabel: "optimă",
				systemMessage:
					"Sapio: Nu ai nevoie de comenzi; vorbește în cuvintele tale. De exemplu: „Puteți construi un asistent AI pentru documentele interne?”",
				sapioLabel: "Sapio",
				userLabel: "Utilizator",
				typingLabel: "Sapio procesează",
				inputPlaceholder: "Scrie întrebarea ta…",
				sendLabel: "Trimite mesajul",
				errorMessage: "Sapio: A apărut o eroare. Te rugăm să încerci din nou.",
				stickyPrompt: "Revenire la Sapio Console",
				bootLogs: [
					">> inițializare nucleu inference...",
					">> sincronizare module Sapio...",
					">> încarc capabilități personalizate...",
					">> status: pregătit pentru întrebări.",
				],
				statusLinePrefix: "status sistem:",
				statusLine: "OK | model=proprietar | latență=optimă",
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
				eyebrow: "Ce facem",
				title: "Soluții AI personalizate",
				subtitle: "De la audit tehnic la software personalizat și training — construim soluții practice care rezolvă provocările tale specifice.",
			},
			services: {
				audit: {
					title: "Audit Tehnic",
					description: "Brainstorm de idei și descoperă cum AI poate rezolva blocajele din pipeline-ul tău. Discutăm soluții practice și eficiente pentru piața și contextul tău specific sau oferim o evaluare a performanței setup-ului actual.",
				},
				software: {
					title: "Software AI Personalizat",
					description: "Dezvoltăm soluții personalizate pentru nevoile afacerii tale, acoperind o gamă largă de aplicații de la viziune computerizată la procesare limbaj natural și asistenți inteligenți.",
				},
				workshops: {
					title: "Workshop-uri și Training",
					description: "Ridică echipa ta în era AI cu workshop-uri practice care vor ajuta afacerea ta să crească și să se adapteze alături de tehnologia de ultimă oră. Învață cum să valorifici tehnologia cea mai recentă în avantajul tău.",
				},
			},
			industries: {
				title: "Tipuri de produse și industrii",
				items: [
					"Agenți AI & Asistenți",
					"Viziune Computerizată, Detectare Obiecte",
					"Automatizări și Workflow-uri",
					"Integrare cu Platforme Legacy",
					"Baze de Date Semantice / RAG",
				],
			},
			cta: {
				title: "Hai să discutăm despre proiectul tău",
				description: "Contactează-ne pentru a afla cum putem ajuta afacerea ta cu soluții AI personalizate.",
				button: "Contactează-ne",
				linkedin: "Conectează-te pe LinkedIn",
			},
		},
		teamPage: {
			hero: {
				title: "Cunoaște echipa",
				subtitle: "Construim soluții AI care fac diferența",
			},
			membersTitle: "Fondator",
			members: {
				vlad: {
					name: "Vlad Tudor",
					role: "Fondator & CEO",
					bio: "Cercetător AI și antreprenor, recunoscut în Forbes 30 under 30. O voce proeminentă în inovația tehnologică, dedicat transformării afacerilor prin inteligență artificială.",
					expertise: ["Machine Learning", "Strategie Produs", "Leadership Echipă"],
				},
			},
			cta: {
				title: "Vrei să lucrezi cu noi?",
				description: "Contactează-ne pentru a discuta despre proiectul tău AI",
				button: "Contactează-ne",
			},
		},
		projectsPage: {
			hero: {
				eyebrow: "Proiecte",
				title: "Studii de caz AI",
				subtitle: "Soluții AI din lumea reală care oferă impact măsurabil",
				featuredButton: "Proiect Recomandat",
				startButton: "Începe Proiectul Tău",
			},
			caseStudies: {
				title: "Studii de Caz",
			},
			modal: {
				technologies: "Tehnologii",
				metrics: "Metrici Cheie",
				viewButton: "Vezi Studiul de Caz",
				startButton: "Începe Proiect",
			},
			projects: {
				aiAflat: {
					subtitle: "Tech for Good: Legislația României accesibilă tuturor",
					shortDescription: "Proiect civic flagship: Asistent juridic gratuit pentru legislația română. Căutare semantică în ~500k texte.",
					fullDescription: "ai-aflat.ro este un proiect civic flagship lansat de Sapio AI ca parte a angajamentului nostru 'Tech for Good'. Am construit cea mai avansată platformă de căutare juridică din România, oferind acces gratuit la legislație prin căutare semantică în peste 500.000 de documente. Sistemul democratizează accesul la informații juridice complexe.",
				},
				publicTenders: {
					title: "AI pentru Licitații Publice",
					subtitle: "Monitorizare și Selecție Automată",
					shortDescription: "AI care verifică listările publice și selectează proiecte relevante bazate pe activitatea anterioară.",
					fullDescription: "Un sistem inteligent care monitorizează și filtrează licitațiile publice, identificând oportunitățile cele mai relevante pentru clienți pe baza istoricului și preferințelor lor.",
				},
				healthcare: {
					title: "Healthtech AI",
					subtitle: "Analiză Conversații Medicale",
					shortDescription: "Pipeline de procesare pentru analiza și extragerea de insights din conversații medicale.",
					fullDescription: "Platformă avansată care analizează conversațiile medicale, generând rapoarte structurate și insights valoroase pentru profesioniștii din domeniul sănătății.",
				},
				legaltech: {
					title: "Legaltech AI",
					subtitle: "Analiză Contracte și Conformitate",
					shortDescription: "Analiza contractelor și documentelor legale pentru asigurarea conformității.",
					fullDescription: "Soluție AI pentru analiza automată a documentelor juridice, identificarea clauzelor critice și asigurarea conformității cu reglementările în vigoare.",
				},
				media: {
					title: "Media AI",
					subtitle: "Generare Avatar pentru Știri",
					shortDescription: "Generare de avatare pentru segmente de știri și prezentări media.",
					fullDescription: "Tehnologie de ultimă oră pentru crearea de prezentatori virtuali și conținut video automatizat pentru industria media.",
				},
				audio: {
					title: "Analiză Audio",
					subtitle: "Recunoaștere Muzică și Gen",
					shortDescription: "Sistem de analiză audio pentru recunoașterea muzicii și clasificarea genurilor.",
					fullDescription: "Algoritmi avansați de procesare a semnalului audio pentru identificarea, clasificarea și analiza conținutului muzical.",
				},
				customerSupport: {
					title: "Asistenți Suport Clienți",
					subtitle: "Automatizare și Eficiență",
					shortDescription: "Asistenți inteligenți pentru automatizarea suportului clienți.",
					fullDescription: "Sisteme conversaționale care preiau și rezolvă solicitările clienților, îmbunătățind timpul de răspuns și satisfacția utilizatorilor.",
				},
				robotics: {
					title: "Control Robotic AI",
					subtitle: "Inteligență pentru Roboți",
					shortDescription: "Sisteme AI pentru controlul și coordonarea roboților.",
					fullDescription: "Soluții de inteligență artificială aplicate în robotică pentru navigație, manipulare și luarea deciziilor în timp real.",
				},
				voice: {
					title: "Transcriere Voce",
					subtitle: "Modele Customizate",
					shortDescription: "Software de transcriere voce antrenat pe date personalizate.",
					fullDescription: "Sisteme de recunoaștere vocală de înaltă precizie, adaptate la terminologia și accentele specifice domeniului clientului.",
				},
				semanticRAG: {
					title: "Baze de Date Semantice",
					subtitle: "Motor de Căutare Inteligent (RAG)",
					shortDescription: "Baze de date semantice cu motor de căutare inteligent (Retrieval-Augmented Generation).",
					fullDescription: "Sisteme avansate de căutare și regăsire a informațiilor care înțeleg contextul și sensul interogărilor, oferind răspunsuri precise din baze de date vaste.",
				},
			},
			featured: [
				{
					slug: "ai-aflat",
					title: "ai-aflat.ro",
					description: "Asistent juridic cu căutare semantică peste legislația românească. Proiect Civic.",
					tags: ["NLP", "RAG", "Tech for Good"],
					href: "/projects/ai-aflat",
				},
			],
			stats: {
				title: "Indicatori",
				items: [
					{ label: "Proiecte Livrate", value: "50+" },
					{ label: "Industrii", value: "10+" },
					{ label: "Impact", value: "Maxim" },
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
					subtitle: "Tech for Good: Legislația României accesibilă tuturor",
					description: "Proiect civic flagship oferind acces gratuit la legislație prin AI.",
				},
				overview: {
					challengeTitle: "Provocarea",
					challengeDescription: "Accesul la legislație era dificil și costisitor pentru cetățeni și profesioniști.",
					solutionTitle: "Soluția",
					solutionDescription: "O platformă gratuită, alimentată de AI, care indexează și explică legislația.",
					impactTitle: "Impact",
					impactDescription: "Democratizarea accesului la informații juridice pentru toți românii.",
				},
				metrics: [
					"500k+ documente",
					"Acces Gratuit",
					"Tech for Good",
				],
				sections: [],
				techTitle: "Tehnologii",
				tech: ["Azure Cognitive Search", "Azure OpenAI", "Python", "Next.js"],
				cta: {
					title: "Vrei să susții proiecte similare?",
					button: "Contactează-ne",
				},
			},
			// Generic fallback for others in RO
		},
		contactPage: {
			hero: {
				title: "Contactează-ne",
				subtitle: "Hai să discutăm cum AI poate transforma afacerea ta",
			},
			infoTitle: "Informații de contact",
			linkedin: {
				title: "LinkedIn",
				description: "Conectează-te cu Vlad Tudor pe LinkedIn",
				cta: "Click pentru a te conecta →",
			},
			email: {
				title: "",
				description: "",
			},
			cta: {
				title: "Pregătit să începi călătoria ta AI?",
				description: "Fie că ai un proiect specific în minte sau doar vrei să explorezi posibilitățile, suntem aici să te ajutăm.",
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
		cli: {
			suggestions: [
				"What kind of AI solutions do you build?",
				"Can you integrate with on-premise systems?",
				"Show me a Sapio project in legal tech.",
				"How fast can an MVP be developed?",
				"How does a technical audit work?",
			]
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
			copyright: `© ${currentYear} Sapio AI Systems. All rights reserved.`,
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
					description: "Flagship civic project: Free AI legal assistant for Romanian legislation. Tech for Good.",
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
			sapioConsole: {
				eyebrow: "",
				title: "Ask us anything - directly!",
				subtitle: "",
				consoleLabel: "Sapio Assistant v0.1",
				systemPrefix: "[SYSTEM]",
				statusOnline: "online",
				modelLabel: "proprietary",
				latencyLabel: "optimal",
				systemMessage:
					'Sapio: You don’t need commands; ask in your own words. For example: “Can you build an AI assistant for internal documents?”',
				sapioLabel: "Sapio",
				userLabel: "User",
				typingLabel: "Sapio is thinking",
				inputPlaceholder: "Ask your question…",
				sendLabel: "Send message",
				errorMessage: "Sapio: Something went wrong. Please try again.",
				stickyPrompt: "Jump back to the Sapio console",
				bootLogs: [
					">> loading Sapio modules...",
					">> syncing proprietary weights...",
					">> warming inference kernels...",
					">> ready for natural language queries.",
				],
				statusLinePrefix: "system_status:",
				statusLine: "OK | model=proprietary | latency=optimal",
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
				eyebrow: "What can we do",
				title: "What can we do",
				subtitle: "and how we can help you",
			},
			services: {
				audit: {
					title: "Technical Audit",
					description: "Brainstorm ideas and find out how AI can solve bottlenecks in your pipeline. We discuss solutions that are practical and efficient for your specific market and context or provide an assessment of the current setup's performance.",
				},
				software: {
					title: "Custom AI Software",
					description: "We develop tailor-made solutions for your business needs, spanning a wide range of applications from computer vision to natural language processing and intelligent assistants.",
				},
				workshops: {
					title: "Workshops and Training",
					description: "Elevate your team into the age of AI with practical workshops that will help your business grow and adapt alongside state-of-the-art technology. Learn how to leverage the latest technology to your advantage.",
				},
			},
			industries: {
				title: "Product Types & Industries",
				items: [
					"AI Agents & Assistants",
					"Computer Vision, Object Detection",
					"Automations and Workflows",
					"Integration with Legacy Platforms",
					"Semantic Databases / RAG",
				],
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
				button: "Get in touch",
				linkedin: "Connect on LinkedIn",
			},
		},
		teamPage: {
			hero: {
				title: "Meet the Team",
				subtitle: "Building AI solutions that make a difference",
			},
			membersTitle: "Founder",
			members: {
				vlad: {
					name: "Vlad Tudor",
					role: "Founder & CEO",
					bio: "AI researcher and entrepreneur, featured in Forbes 30 under 30. A prominent voice in technological innovation, dedicated to transforming businesses through artificial intelligence.",
					expertise: ["Machine Learning", "Product Strategy", "Team Leadership"],
				},
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
				title: "Our AI Case Studies",
				subtitle: "Real-world AI solutions delivering measurable impact",
				featuredButton: "Featured Project",
				startButton: "Start Your Project",
			},
			caseStudies: {
				title: "Case Studies",
			},
			modal: {
				technologies: "Technologies",
				metrics: "Key Metrics",
				viewButton: "View Case Study",
				startButton: "Start Project",
			},
			projects: {
				aiAflat: {
					subtitle: "Tech for Good: Romania's Legislation Accessible to All",
					shortDescription: "Flagship civic project: Free AI legal assistant for Romanian legislation. Semantic search across ~500k texts.",
					fullDescription: "ai-aflat.ro is a flagship civic project launched by Sapio AI as part of our 'Tech for Good' commitment. We built Romania's most advanced legal search platform, offering free access to legislation through semantic search across over 500,000 documents. The system democratizes access to complex legal information.",
				},
				publicTenders: {
					title: "Public Tenders AI",
					subtitle: "Automated Tender Monitoring",
					shortDescription: "AI that checks public listings and selects relevant projects based on past activity and preferences.",
					fullDescription: "An intelligent system that monitors and filters public tenders, identifying the most relevant opportunities for clients based on their history and preferences.",
				},
				healthcare: {
					title: "Healthtech AI",
					subtitle: "Medical Conversation Analysis",
					shortDescription: "Processing pipeline for analyzing and inferring insights from medical conversations.",
					fullDescription: "Advanced platform that analyzes medical conversations, generating structured reports and valuable insights for healthcare professionals.",
				},
				legaltech: {
					title: "Legaltech AI",
					subtitle: "Contract Analysis & Compliance",
					shortDescription: "Analyzing contracts and legal documents to ensure compliance.",
					fullDescription: "AI solution for automated analysis of legal documents, identifying critical clauses and ensuring compliance with current regulations.",
				},
				media: {
					title: "Media AI",
					subtitle: "Avatar Generation for News",
					shortDescription: "Avatar generation for news segments and media presentations.",
					fullDescription: "State-of-the-art technology for creating virtual presenters and automated video content for the media industry.",
				},
				audio: {
					title: "Audio Analysis",
					subtitle: "Music & Genre Recognition",
					shortDescription: "Audio analysis system for music recognition and genre classification.",
					fullDescription: "Advanced signal processing algorithms for identifying, classifying, and analyzing musical content.",
				},
				customerSupport: {
					title: "Customer Support Assistants",
					subtitle: "Automation & Efficiency",
					shortDescription: "Intelligent assistants for customer support automation.",
					fullDescription: "Conversational systems that handle and resolve customer inquiries, improving response times and user satisfaction.",
				},
				robotics: {
					title: "Robotics Control AI",
					subtitle: "Intelligence for Robots",
					shortDescription: "AI systems for robot control and coordination.",
					fullDescription: "Artificial intelligence solutions applied in robotics for navigation, manipulation, and real-time decision making.",
				},
				voice: {
					title: "Voice Transcription",
					subtitle: "Custom Models",
					shortDescription: "Voice transcription software trained on custom data.",
					fullDescription: "High-precision voice recognition systems, adapted to the client's specific terminology and accents.",
				},
				semanticRAG: {
					title: "Semantic Databases",
					subtitle: "Intelligent Search Engine (RAG)",
					shortDescription: "Semantic databases with intelligent search engine (Retrieval-Augmented Generation).",
					fullDescription: "Advanced information retrieval systems that understand context and meaning, providing precise answers from vast databases.",
				},
			},
			featured: [
				{
					slug: "ai-aflat",
					title: "ai-aflat.ro",
					description: "Legal assistant with semantic search across Romanian legislation. Civic Project.",
					tags: ["NLP", "RAG", "Tech for Good"],
					href: "/projects/ai-aflat",
				},
			],
			stats: {
				title: "By the numbers",
				items: [
					{ label: "Projects Delivered", value: "50+" },
					{ label: "Industries", value: "10+" },
					{ label: "Impact", value: "Maximized" },
				],
			},
			cta: {
				title: "Have a project brief?",
				description: "Send a short overview and we’ll return with suggested next steps within 48 hours.",
				button: "Contact us",
				linkedin: "Connect on LinkedIn"
			},
		},
		projectDetails: {
			aiAflat: {
				hero: {
					title: "ai-aflat.ro",
					subtitle: "Tech for Good: Romania's Legislation Accessible to All",
					description: "Flagship civic project offering free access to legislation through AI.",
				},
				overview: {
					challengeTitle: "Challenge",
					challengeDescription: "Access to legislation was difficult and costly for citizens and professionals.",
					solutionTitle: "Solution",
					solutionDescription: "A free, AI-powered platform that indexes and explains legislation.",
					impactTitle: "Impact",
					impactDescription: "Democratizing access to legal information for all Romanians.",
				},
				metrics: [
					"500k+ documents",
					"Free Access",
					"Tech for Good",
				],
				sections: [],
				techTitle: "Tech stack",
				tech: ["Azure Cognitive Search", "Azure OpenAI", "Python", "Next.js"],
				cta: {
					title: "Want to support similar projects?",
					button: "Contact us",
				},
			},
			// Generic fallback for others
		},
		contactPage: {
			hero: {
				title: "Meet the Founder",
				subtitle: "Let's discuss how AI can change your business",
			},
			infoTitle: "Contact Info",
			linkedin: {
				title: "LinkedIn",
				description: "Talk to Vlad Tudor on LinkedIn",
				cta: "Click to talk →",
			},
			email: {
				title: "",
				description: "",
			},
			cta: {
				title: "Ready to start your jorney with AI?",
				description: "We are here to help you build what you have in mind",
				button: "Get stared on your jorney"
			},
		},
	},
} as const;
