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
			membersTitle: "Echipa noastră",
			members: {
				vlad: {
					name: "Vlad Tudor",
					role: "Fondator & CEO",
					bio: "Cercetător AI și antreprenor cu peste 10 ani de experiență în construirea sistemelor AI de producție. Pasionat de a face AI accesibil și practic pentru afaceri.",
					expertise: ["Machine Learning", "Strategie Produs", "Leadership Echipă"],
				},
				mihai: {
					name: "Mihai Marinescu",
					role: "Produs & Design",
					bio: "Designer de produs cu experiență în crearea interfețelor intuitive pentru aplicații AI complexe. Specializat în UX research și design de sisteme.",
					expertise: ["UX Design", "Design de Produs", "Prototipare"],
				},
				andrei: {
					name: "Andrei Pata",
					role: "Frontend & Apps",
					bio: "Dezvoltator frontend specializat în aplicații web moderne și mobile. Expert în React, Next.js și arhitecturi scalabile.",
					expertise: ["React", "Next.js", "Mobile Development"],
				},
				ana: {
					name: "Ana-Maria Stanescu",
					role: "Community Manager",
					bio: "Specialist în comunicare și construirea comunității. Gestionează relațiile cu clienții și coordonează inițiativele de outreach.",
					expertise: ["Comunicare", "Community Building", "Content Strategy"],
				},
				luminita: {
					name: "Luminița Ștefan",
					role: "UX Designer",
					bio: "Designer UX cu focus pe accesibilitate și design centrat pe utilizator. Creează experiențe care simplifică tehnologia complexă.",
					expertise: ["UX Design", "Accesibilitate", "User Research"],
				},
				flavius: {
					name: "Flavius Moldovan",
					role: "AI Engineer",
					bio: "Inginer AI specializat în modele lingvistice și sisteme RAG. Experiență în implementarea soluțiilor AI la scară.",
					expertise: ["NLP", "RAG", "Model Training"],
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
					subtitle: "Cel mai bun sistem de căutare juridică din România",
					shortDescription: "Asistent juridic alimentat de AI cu căutare semantică în peste 500k documente legislative românești.",
					fullDescription: "Am construit cea mai avansată platformă de căutare juridică din România, cu capabilități de căutare semantică în peste 500.000 de documente legislative. Sistemul folosește RAG (Retrieval-Augmented Generation) pentru a oferi răspunsuri precise și citate la întrebări juridice, reducând dramatic timpul de cercetare pentru profesioniștii din domeniul juridic. Actualizări automate zilnice asigură că baza de date rămâne actualizată cu noua legislație.",
				},
				healthcare: {
					title: "AI pentru Sănătate",
					subtitle: "Analiză și Insights din Date Medicale",
					shortDescription: "Analiză avansată și extragere de insights din date complexe de sănătate folosind machine learning.",
					fullDescription: "Am dezvoltat o platformă comprehensivă de analiză pentru sănătate care procesează și analizează dosare medicale, date despre pacienți și rezultate clinice. Sistemul folosește procesare limbaj natural pentru a extrage insights semnificative din notițe medicale nestructurate, identifică pattern-uri în îngrijirea pacienților și oferă recomandări acționabile pentru furnizorii de servicii medicale. Arhitectura conformă HIPAA asigură securitatea și confidențialitatea datelor.",
				},
				personalAssistant: {
					title: "Asistent AI Personal",
					subtitle: "Manager de Sarcini Adaptiv",
					shortDescription: "Asistent personal inteligent care învață din comportamentul utilizatorului și se adaptează la workflow-uri individuale.",
					fullDescription: "Am creat un asistent AI adaptiv alimentat de modele lingvistice mari care gestionează sarcini, programări și workflow-uri personale. Sistemul învață din interacțiunile utilizatorului pentru a oferi recomandări din ce în ce mai personalizate și automatizează sarcinile de rutină. Funcționalitățile includ crearea de sarcini în limbaj natural, programare inteligentă cu detectare conflicte și integrare cu instrumente populare de productivitate.",
				},
				publicTenders: {
					title: "AI pentru Licitații Publice",
					subtitle: "Monitorizare Automată Licitații",
					shortDescription: "Sistem automat de monitorizare și raportare pentru licitații publice relevante pentru industrii specifice.",
					fullDescription: "Am construit un sistem inteligent de monitorizare care urmărește oportunitățile de achiziții publice pe multiple platforme guvernamentale. AI-ul analizează documentele de licitație, extrage cerințele cheie și le potrivește cu profilurile clienților pentru a identifica oportunitățile relevante. Alertele automate și rapoartele detaliate ajută afacerile să rămână informate despre oportunitățile de licitare fără monitorizare manuală.",
				},
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
				title: "Email",
				description: "Trimite-ne un email direct",
			},
			cta: {
				title: "Pregătit să începi călătoria ta AI?",
				description: "Fie că ai un proiect specific în minte sau doar vrei să explorezi posibilitățile, suntem aici să te ajutăm. Contactează-ne și hai să construim ceva extraordinar împreună.",
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
			membersTitle: "Our Team",
			members: {
				vlad: {
					name: "Vlad Tudor",
					role: "Founder & CEO",
					bio: "AI researcher and entrepreneur with 10+ years of experience building production AI systems. Passionate about making AI accessible and practical for businesses.",
					expertise: ["Machine Learning", "Product Strategy", "Team Leadership"],
				},
				mihai: {
					name: "Mihai Marinescu",
					role: "Product & Design",
					bio: "Product designer with experience creating intuitive interfaces for complex AI applications. Specialized in UX research and systems design.",
					expertise: ["UX Design", "Product Design", "Prototyping"],
				},
				andrei: {
					name: "Andrei Pata",
					role: "Frontend & Apps",
					bio: "Frontend developer specialized in modern web and mobile applications. Expert in React, Next.js, and scalable architectures.",
					expertise: ["React", "Next.js", "Mobile Development"],
				},
				ana: {
					name: "Ana-Maria Stanescu",
					role: "Community Manager",
					bio: "Communication specialist and community builder. Manages client relationships and coordinates outreach initiatives.",
					expertise: ["Communication", "Community Building", "Content Strategy"],
				},
				luminita: {
					name: "Luminița Ștefan",
					role: "UX Designer",
					bio: "UX designer focused on accessibility and user-centered design. Creates experiences that simplify complex technology.",
					expertise: ["UX Design", "Accessibility", "User Research"],
				},
				flavius: {
					name: "Flavius Moldovan",
					role: "AI Engineer",
			},
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
					subtitle: "Romania's Best Legal Search System",
					shortDescription: "AI-powered legal assistant with semantic search across 500k+ Romanian legislative documents.",
					fullDescription: "We built Romania's most advanced legal search platform, featuring semantic search capabilities across over 500,000 legislative documents. The system uses RAG (Retrieval-Augmented Generation) to provide accurate, cited answers to legal queries, dramatically reducing research time for legal professionals. Daily automated updates ensure the database stays current with new legislation.",
				},
				healthcare: {
					title: "Healthcare AI",
					subtitle: "Medical Data Analysis & Insights",
					shortDescription: "Advanced analysis and insights extraction from complex healthcare data using machine learning.",
					fullDescription: "Developed a comprehensive healthcare analytics platform that processes and analyzes medical records, patient data, and clinical outcomes. The system employs natural language processing to extract meaningful insights from unstructured medical notes, identifies patterns in patient care, and provides actionable recommendations for healthcare providers. HIPAA-compliant architecture ensures data security and privacy.",
				},
				personalAssistant: {
					title: "Personal AI Assistant",
					subtitle: "Adaptive Task Manager",
					shortDescription: "Intelligent personal assistant that learns from user behavior and adapts to individual workflows.",
					fullDescription: "Created an adaptive AI assistant powered by large language models that manages tasks, schedules, and personal workflows. The system learns from user interactions to provide increasingly personalized recommendations and automates routine tasks. Features include natural language task creation, smart scheduling with conflict detection, and integration with popular productivity tools.",
				},
				publicTenders: {
					title: "Public Tenders AI",
					subtitle: "Automated Tender Monitoring",
					shortDescription: "Automated monitoring and reporting system for public tenders relevant to specific industries.",
					fullDescription: "Built an intelligent monitoring system that tracks public procurement opportunities across multiple government platforms. The AI analyzes tender documents, extracts key requirements, and matches them against client profiles to identify relevant opportunities. Automated alerts and detailed reports help businesses stay informed about bidding opportunities without manual monitoring.",
				},
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
				linkedin: "Connect on LinkedIn"
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
				title: "Email",
				description: "Send us a direct Email",
			},
			cta: {
				title: "Ready to start your jorney with AI?",
				description: "We are here to help you build what you have in mind",
				button: "Get stared on your jorney"
			},
		},
	},
} as const;


