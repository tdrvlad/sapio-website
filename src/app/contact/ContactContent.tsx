'use client'
import { Linkedin } from "lucide-react";
import Image from "next/image";
import "@/components/comp.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactContent() {
    const { t } = useLanguage();
    
   
    const TEAM_MEMBERS = [
        {
            id: "vlad",
            name: t('teamPage.members.vlad.name'),
            role: t('teamPage.members.vlad.role'),
            image: "/team/pic-Vlad-Tudor.png",
            bio: t('teamPage.members.vlad.bio'),
            linkedin: "https://www.linkedin.com/in/vlad-tudor-18090a1a2/",
            expertise: [
                "Machine Learning", 
                "Product Strategy", 
                "Team Leadership"
            ],
        },
    ];
    
    const cta = {
        title: t('contactPage.cta.title'),
        description: t('contactPage.cta.description'),
    };
    
    return (
        <div className="font-sans">
  

            {/* Contact Options */}
              <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
                           <h2
                               className="text-3xl sm:text-4xl font-semibold mb-12 text-center"
                           >
                               {t('teamPage.membersTitle')}
                           </h2>
           
                           <div className="flex justify-center">
                               {TEAM_MEMBERS.map((member) => (
                                   <div
                                       key={member.id}
                                       className="bg-white dark:bg-white/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-black/5 dark:border-white/10 max-w-md w-full"
                                   >
                                       <div className="relative h-96 bg-foreground/5">
                                           <Image
                                               src={member.image}
                                               alt={member.name}
                                               fill
                                               className="object-cover object-center"
                                               style={{ objectPosition: 'center 20%' }}
                                           />
                                       </div>
                                       
                                       <div className="p-8">
                                           <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                                           <p className="text-sm text-foreground/60 mb-4">{member.role}</p>
                                           <p className="text-base text-foreground/80 leading-relaxed mb-6">
                                               {member.bio}
                                           </p>
           
                                           <div className="flex flex-wrap gap-2 mb-6">
                                               {member.expertise.map((skill) => (
                                                   <span
                                                       key={skill}
                                                       className="px-3 py-1 rounded-full bg-foreground/10 text-xs font-medium"
                                                   >
                                                       {skill}
                                                   </span>
                                               ))}
                                           </div>
           
                                           <a
                                               href={member.linkedin}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition w-full"
                                           >
                                               <Linkedin className="h-4 w-4" />
                                               Connect on LinkedIn
                                           </a>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </section>
            <div className="section-divider" />

            {/* Additional Info */}
            <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24 text-center">
                <h2
                    className="text-2xl sm:text-3xl font-semibold mb-4"
                >
                    {cta.title}
                </h2>
                <div
                    className="text-foreground/70 text-sm sm:text-base max-w-2xl mx-auto"
                >
                    {cta.description}
                </div>
                
            </section>  
        </div>
    );
}
