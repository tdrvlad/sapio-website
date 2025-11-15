import fs from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';

import { Capabilities } from '@/components/Capabilities';
import HeroVideo from '@/components/HeroVideo';
import { SapioWidgetWrapper } from '@/components/SapioWidgetWrapper';
import { SolutionFinder } from '@/components/SolutionFinder';

export default function Home() {
  const getPublicImages = (dir: string): string[] => {
    try {
      const abs = path.join(process.cwd(), "public", dir);
      const files = fs.readdirSync(abs);
      return files
        .filter((f) => /\.(png|jpe?g|svg|webp)$/i.test(f))
        .map((f) => `/${dir}/${f}`);
    } catch {
      return [];
    }
  };

  const clientLogos = getPublicImages("clients_logos");
  const techLogos = getPublicImages("tech_logos");

  const toAlt = (src: string) => {
    const base = src.split("/").pop() || "logo";
    const name = base.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
    return `${name} logo`;
  };

  return (
    <div className="font-sans">
      <HeroVideo />

      {/* Flagship projects */}
      <section
        id="projects"
        className="mx-auto max-w-[1280px] px-6 py-20 grid gap-10 md:grid-cols-2"
      >
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
          <div className="aspect-square rounded bg-foreground/10 mb-5 relative overflow-hidden">
            <Image
              src="/brand/ai-aflat_thumbnail.png"
              alt="ai-aflat thumbnail"
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 600px, 100vw"
            />
          </div>
          <h3 className="text-xl font-semibold">ai-aflat.ro</h3>
          <p className="text-foreground/70 mt-2">
            AI-powered legal assistant for Romanian legislation. Semantic search
            across ~500k texts with verifiable sources.
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href="https://ai-aflat.ro"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Visit ai-aflat.ro
            </a>
            <Link
              href="/projects/ai-aflat"
              className="underline underline-offset-4"
            >
              View case study
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 hover:shadow-lg transition">
          <div className="aspect-square rounded bg-foreground/10 mb-5 relative overflow-hidden">
            <Image
              src="/brand/knowledge-assistant_thumbnail.png"
              alt="Knowledge Assistant thumbnail"
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 600px, 100vw"
            />
          </div>
          <h3 className="text-xl font-semibold">Knowledge Assistant</h3>
          <p className="text-foreground/70 mt-2">
            Configurable proprietary chatbot integrating business knowledge for
            instant answers and support.
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href="https://assistant.sapio.ro"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Explore the Assistant
            </a>
            <Link
              href="/projects/knowledge-assistant"
              className="underline underline-offset-4"
            >
              View case study
            </Link>
          </div>
        </div>
      </section>

      {/* Clients logos */}
      {clientLogos.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="mb-3 text-sm uppercase tracking-wide text-foreground/60 text-center">
              Trusted by forward-thinking teams
            </div>
            <div className="relative rounded-2xl bg-white/95 shadow-sm ring-1 ring-black/5 px-4 py-4 marquee-container">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent rounded-l-2xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent rounded-r-2xl" />
              <div className="overflow-hidden">
                <div
                  className="marquee-track flex items-center gap-10 sm:gap-14"
                  style={{ width: "max-content" }}
                >
                  <div className="flex items-center">
                    {clientLogos.map((src, i) => (
                      <a
                        key={`client-a-${i}`}
                        href="#clients"
                        className="inline-flex items-center justify-center mr-10 sm:mr-14"
                      >
                        <Image
                          src={src}
                          alt={`Client: ${toAlt(src)}`}
                          width={200}
                          height={80}
                          className="h-20 sm:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                        />
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center">
                    {clientLogos.map((src, i) => (
                      <a
                        key={`client-b-${i}`}
                        href="#clients"
                        className="inline-flex items-center justify-center mr-10 sm:mr-14"
                      >
                        <Image
                          src={src}
                          alt={`Client: ${toAlt(src)}`}
                          width={200}
                          height={80}
                          className="h-20 sm:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Capabilities />

      <SolutionFinder />

      {/* Chat Widget */}
      <SapioWidgetWrapper apiKey={process.env.NEXT_PUBLIC_CHAT_API_KEY || ""} />

      {/* Chat demo */}
      {/* <section className="mx-auto max-w-[900px] px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center leading-tight">
          Got a question?
        </h2>
        <div className="mx-auto max-w-[800px]">
          <ChatInvitation />
        </div>
      </section> */}

      {/* Technologies logos */}
      {techLogos.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="mb-3 text-sm uppercase tracking-wide text-foreground/60 text-center">
              Technologies we work with
            </div>
            <div className="relative rounded-2xl bg-white/95 shadow-sm ring-1 ring-black/5 px-4 py-4 marquee-container">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent rounded-l-2xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent rounded-r-2xl" />
              <div className="overflow-hidden">
                <div
                  className="marquee-track-reverse flex items-center gap-10 sm:gap-14"
                  style={{ width: "max-content" }}
                >
                  <div className="flex items-center">
                    {techLogos.map((src, i) => (
                      <a
                        key={`tech-a-${i}`}
                        href="#tech"
                        className="inline-flex items-center justify-center mr-10 sm:mr-14"
                      >
                        <Image
                          src={src}
                          alt={`Technology: ${toAlt(src)}`}
                          width={200}
                          height={80}
                          className="h-20 sm:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                        />
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center">
                    {techLogos.map((src, i) => (
                      <a
                        key={`tech-b-${i}`}
                        href="#tech"
                        className="inline-flex items-center justify-center mr-10 sm:mr-14"
                      >
                        <Image
                          src={src}
                          alt={`Technology: ${toAlt(src)}`}
                          width={200}
                          height={80}
                          className="h-20 sm:h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold">Let’s build your solution</h2>
        <p className="text-foreground/70 mt-3">
          Do you want to see what an AI solution tailored for your business
          would look like? Let’s talk.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium"
          >
            Get a free consultation
          </Link>
        </div>
        <div className="mt-4 text-sm text-foreground/60">
          Contact: Vlad Tudor — Manager, Sapio AI
        </div>
      </section>
    </div>
  );
}
