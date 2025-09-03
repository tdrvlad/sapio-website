export type IndustrySolution = {
    industry: string;
    challenges: Array<{
        label: string;
        solution: {
            type: string;
            description: string;
        };
    }>;
};

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
    {
        industry: "Healthcare, Pharma & Life Sciences",
        challenges: [
            {
                label: "Diagnostics & Imaging",
                solution: {
                    type: "Computer Vision",
                    description:
                        "AI models trained on medical scans detect anomalies (tumors, fractures, infections) with high accuracy, supporting doctors in faster and more consistent diagnoses.",
                },
            },
            {
                label: "Drug Discovery & Clinical Trials",
                solution: {
                    type: "Predictive Analytics",
                    description:
                        "AI analyzes molecular interactions and historical trial data to predict drug efficacy and optimize trial design, cutting time and costs.",
                },
            },
            {
                label: "Patient Experience & Care",
                solution: {
                    type: "Conversational AI (chatbots/assistants)",
                    description:
                        "Virtual assistants answer health queries, provide medication reminders, and triage symptoms, improving accessibility and patient engagement.",
                },
            },
            {
                label: "Operational Efficiency",
                solution: {
                    type: "NLP + Automated Workflows",
                    description:
                        "AI extracts insights from unstructured clinical notes and automates billing/scheduling, reducing administrative burden for staff.",
                },
            },
        ],
    },
    {
        industry: "Finance, Insurance & Legal",
        challenges: [
            {
                label: "Fraud & Risk Management",
                solution: {
                    type: "Anomaly Detection",
                    description:
                        "AI monitors transactions in real time, spotting unusual patterns that indicate fraud or money laundering.",
                },
            },
            {
                label: "Customer Interaction & Service",
                solution: {
                    type: "Chatbots / Virtual Advisors",
                    description:
                        "AI-powered assistants handle routine inquiries, claims, and advisory tasks, freeing human agents for complex cases.",
                },
            },
            {
                label: "Regulatory Compliance",
                solution: {
                    type: "NLP",
                    description:
                        "AI reads and interprets compliance documents, monitors communications, and flags potential violations automatically.",
                },
            },
            {
                label: "Decision Support (Credit, Legal Cases, Investments)",
                solution: {
                    type: "Decisional Agents",
                    description:
                        "AI models evaluate financial or legal data to provide recommendations, scoring, or case likelihoods.",
                },
            },
        ],
    },
    {
        industry: "Retail, E-commerce & Consumer Experience",
        challenges: [
            {
                label: "Personalization",
                solution: {
                    type: "Recommender Systems",
                    description:
                        "AI analyzes purchase and browsing history to suggest products, increasing sales and customer loyalty.",
                },
            },
            {
                label: "Customer Support",
                solution: {
                    type: "Conversational AI",
                    description:
                        "Chatbots handle returns, FAQs, and personalized product advice, improving customer experience at scale.",
                },
            },
            {
                label: "Inventory & Demand Forecasting",
                solution: {
                    type: "Predictive Analytics",
                    description:
                        "AI predicts demand spikes or supply shortages, enabling proactive inventory management.",
                },
            },
            {
                label: "Visual Experience",
                solution: {
                    type: "Computer Vision + Generative AI",
                    description:
                        "Customers can virtually try on clothes or generate lifestyle images of products, boosting engagement and conversions.",
                },
            },
        ],
    },
    {
        industry: "Manufacturing, Supply Chain & Logistics",
        challenges: [
            {
                label: "Predictive Maintenance",
                solution: {
                    type: "Predictive Modeling + IoT",
                    description:
                        "Sensors collect machine data, and AI predicts when a machine is likely to fail, reducing downtime.",
                },
            },
            {
                label: "Quality Control",
                solution: {
                    type: "Computer Vision",
                    description:
                        "AI-powered cameras detect defects on production lines faster and more consistently than human inspectors.",
                },
            },
            {
                label: "Supply Chain Optimization",
                solution: {
                    type: "Optimization Engines",
                    description:
                        "AI models simulate and optimize routing, demand planning, and inventory allocation, improving efficiency and reducing costs.",
                },
            },
            {
                label: "Workforce & Safety",
                solution: {
                    type: "Computer Vision",
                    description:
                        "Cameras track safety compliance (e.g., helmet use) and detect hazardous behavior, preventing accidents.",
                },
            },
        ],
    },
    {
        industry: "Energy, Environment & Utilities",
        challenges: [
            {
                label: "Energy Demand Forecasting",
                solution: {
                    type: "Predictive Analytics",
                    description:
                        "AI models anticipate consumption patterns, helping utilities balance grids and integrate renewables efficiently.",
                },
            },
            {
                label: "Infrastructure Monitoring",
                solution: {
                    type: "Computer Vision + IoT",
                    description:
                        "Drones or sensors inspect power lines, pipelines, or turbines, detecting damage before it escalates.",
                },
            },
            {
                label: "Sustainability & Emissions Tracking",
                solution: {
                    type: "Data Analysis + Dashboards",
                    description:
                        "AI aggregates carbon footprint data and provides optimization strategies to reduce environmental impact.",
                },
            },
            {
                label: "Customer Engagement",
                solution: {
                    type: "Conversational AI",
                    description:
                        "Smart assistants explain energy bills, give usage insights, and suggest cost-saving habits to consumers.",
                },
            },
        ],
    },
    {
        industry: "Education, Media & Entertainment",
        challenges: [
            {
                label: "Adaptive Learning",
                solution: {
                    type: "Recommender Systems + NLP",
                    description:
                        "AI assesses student progress and recommends tailored content, ensuring individualized learning journeys.",
                },
            },
            {
                label: "Content Creation",
                solution: {
                    type: "Generative AI (text, image, video, avatars)",
                    description:
                        "AI creates marketing copy, educational materials, or even synthetic characters, lowering production costs.",
                },
            },
            {
                label: "Search & Discovery",
                solution: {
                    type: "Semantic Search Engines",
                    description:
                        "NLP-powered engines understand meaning (not just keywords), making knowledge retrieval more intuitive.",
                },
            },
            {
                label: "Accessibility",
                solution: {
                    type: "Speech-to-Text + Voice Recognition",
                    description:
                        "AI transcribes lectures, translates content in real-time, and enables voice-controlled learning tools.",
                },
            },
        ],
    },
    {
        industry: "Government, Security & Smart Cities",
        challenges: [
            {
                label: "Public Safety & Security",
                solution: {
                    type: "Computer Vision + Anomaly Detection",
                    description:
                        "AI processes CCTV feeds to detect unusual behaviors, traffic violations, or security threats in real time.",
                },
            },
            {
                label: "Citizen Services",
                solution: {
                    type: "NLP + Chatbots",
                    description:
                        "Virtual assistants help citizens file requests, retrieve documents, or get multilingual service without waiting in queues.",
                },
            },
            {
                label: "Urban Infrastructure",
                solution: {
                    type: "Optimization Engines + Predictive Analytics",
                    description:
                        "AI optimizes traffic lights, energy distribution, and public transport scheduling, improving urban flow.",
                },
            },
            {
                label: "Defense & Cybersecurity",
                solution: {
                    type: "Cybersecurity AI (Anomaly Detection)",
                    description:
                        "AI monitors networks for suspicious activity, detecting intrusions faster than rule-based systems.",
                },
            },
        ],
    },
];

export function getIndustries(): string[] {
    return INDUSTRY_SOLUTIONS.map((x) => x.industry);
}

export function getChallengesForIndustry(industry?: string): string[] {
    if (!industry) return [];
    const item = INDUSTRY_SOLUTIONS.find((x) => x.industry === industry);
    return item ? item.challenges.map((c) => c.label) : [];
}

export function getSolution(industry?: string, challenge?: string): { type: string; description: string } | undefined {
    if (!industry || !challenge) return undefined;
    const item = INDUSTRY_SOLUTIONS.find((x) => x.industry === industry);
    const ch = item?.challenges.find((c) => c.label === challenge);
    return ch?.solution;
}


