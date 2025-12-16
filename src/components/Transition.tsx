"use client";

import { useEffect, useRef, useState } from "react";

export type TransitionItem = {
  number: string;
  title: string;
  description: string;
};

export type TransitionProps = {
  eyebrow?: string;
  heading?: string;
  items?: TransitionItem[];
};

export default function Transition({ 
  eyebrow = "The Future of AI",
  heading = "The New Transformation Agenda for the AI Era",
  items = [
    {
      number: "01",
      title: "AI-First Strategy",
      description: "Build intelligent systems that learn and adapt to your business needs, creating sustainable competitive advantages."
    },
    {
      number: "02",
      title: "Data Excellence",
      description: "Transform raw data into actionable insights with advanced analytics and machine learning capabilities."
    },
    {
      number: "03",
      title: "Intelligent Automation",
      description: "Streamline operations and unlock productivity with AI-powered automation across your organization."
    },
    {
      number: "04",
      title: "Ask Us Anything",
      description: "Got questions? Try our AI assistant below. Ask about pricing, timelines, technical capabilities, or describe your specific challenge—just like you'd talk to a colleague. No forms, no sales pitches, just direct answers."
    }
  ]
}: TransitionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [itemProgress, setItemProgress] = useState<Map<number, number>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accentColor = "#006beb";
  const grayColor = "#6b7280"; // gray-500

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportMiddle = window.innerHeight / 2;
      const transitionDistance = 200; // pixels over which to transition

      // Check which item is closest to the middle of the viewport
      let closestIndex: number | null = null;
      let closestDistance = Infinity;
      const newProgress = new Map<number, number>();

      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const itemMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(itemMiddle - viewportMiddle);

        // Calculate progress: 0 when at center, 1 when transitionDistance past center
        if (itemMiddle < viewportMiddle) {
          const distancePastCenter = viewportMiddle - itemMiddle;
          const progress = Math.min(distancePastCenter / transitionDistance, 1);
          newProgress.set(index, progress);
        } else {
          newProgress.set(index, 0);
        }

        if (distance < closestDistance && rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      setItemProgress(newProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background -mt-32 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#006beb]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#006beb]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Scrollable items */}
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 pt-20 sm:pt-32">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const progress = itemProgress.get(idx) ?? 0;
          
          // Interpolate between gray and blue
          const interpolateColor = (progress: number) => {
            const gray = { r: 107, g: 116, b: 128 }; // #6b7280
            const blue = { r: 0, g: 107, b: 235 }; // #006beb
            
            const r = Math.round(gray.r + (blue.r - gray.r) * progress);
            const g = Math.round(gray.g + (blue.g - gray.g) * progress);
            const b = Math.round(gray.b + (blue.b - gray.b) * progress);
            
            return `rgb(${r}, ${g}, ${b})`;
          };
          
          const currentColor = interpolateColor(progress);
          
          return (
            <div
              key={idx}
              ref={(el) => { itemRefs.current[idx] = el; }}
              className="min-h-[70vh] flex items-center py-8 sm:py-12"
            >
              <div 
                className={`w-full transition-all duration-700 ${
                  isActive 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-30 translate-y-8'
                }`}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-start">
                  {/* Number and title */}
                  <div className="flex flex-col items-start">
                    <div 
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold opacity-20 mb-3"
                      style={{ 
                        color: currentColor,
                        transition: 'color 0.3s ease-out'
                      }}
                    >
                      {item.number}
                    </div>
                    {/* Progress line */}
                    {idx < items.length - 1 && (
                      <div className="hidden md:block w-px h-24 bg-gradient-to-b from-foreground/10 to-transparent ml-8" />
                    )}
                  </div>
                  
                  <div>
                    <h3 
                      className="text-2xl sm:text-3xl font-bold mb-3"
                      style={{ 
                        color: currentColor,
                        transition: 'color 0.3s ease-out'
                      }}
                    >
                      {item.title}
                    </h3>
                    <div className="w-16 h-0.5 mb-4" style={{ backgroundColor: currentColor, transition: 'background-color 0.3s ease-out' }}></div>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Special CTA for the last item (step 4) */}
                    {idx === items.length - 1 && (
                      <div className="mt-6 space-y-3">
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="inline-block px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 hover:bg-foreground/10 transition-colors">
                            "Can you build a chatbot for us?"
                          </span>
                          <span className="inline-block px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 hover:bg-foreground/10 transition-colors">
                            "How long does an MVP take?"
                          </span>
                          <span className="inline-block px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/60 hover:bg-foreground/10 transition-colors">
                            "What's your tech stack?"
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#006beb] font-medium">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006beb] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006beb]"></span>
                          </span>
                          <span>Try it now ↓ Scroll down to chat</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="h-16 sm:h-20"></div>
    </section>
  );
}
