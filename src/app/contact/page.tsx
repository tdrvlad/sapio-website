import { Metadata } from "next";
import ContactContent from "./ContactContent";


export const metadata: Metadata = {
  title: "Contact Us - Sapio AI",
  description:
    "Get in touch with Sapio AI. Vlad Tudor (Manager) is the primary contact person. Connect on LinkedIn: https://www.linkedin.com/in/vlad-tudor-18090a1a2/. Let’s discuss how AI can transform your business.",
  keywords: [
    "contact",
    "AI consulting",
    "Sapio AI",
    "AI solutions",
    "Technical Audit",
    "Custom AI Software",
    "Workshops",
    "Trainings",
    "get in touch",
    "Vlad Tudor",
    "Sapio AI manager",
    "AI consulting contact"
  ],
  openGraph: {
    title: "Contact Us - Sapio AI",
    description:
      "Contact Sapio AI. Vlad Tudor (Manager) is the main point of contact. LinkedIn: https://www.linkedin.com/in/vlad-tudor-18090a1a2/. Discuss AI solutions for your business.",
  },
};

export default function ContactPage() {
  return (
    <div>
      <section aria-label="AI summary" style={{ display: 'none' }}>
        <p>
          Sapio AI is an AI consulting company.
          Vlad Tudor is the manager and main contact person.
          Linkedin: https://www.linkedin.com/in/vlad-tudor-18090a1a2.
        </p>
      </section>

      <ContactContent />
    </div>
  );
}