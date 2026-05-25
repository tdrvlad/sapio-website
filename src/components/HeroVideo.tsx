"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getHeroVideoMeta } from "@/constants/heroVideoMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import './comp.css';

type VideoSource = {
  mp4: string;
  webm?: string;
  poster?: string;
};

const ALL_VIDEOS: VideoSource[] = [
  { mp4: "/videos/processed/alphago-1280.mp4", webm: "/videos/processed/alphago-1280.webm", poster: "/videos/processed/alphago-poster.jpg" },
  { mp4: "/videos/processed/andrew_ng-1280.mp4", webm: "/videos/processed/andrew_ng-1280.webm", poster: "/videos/processed/andrew_ng-poster.jpg" },
  { mp4: "/videos/processed/digit_recognition-1280.mp4", webm: "/videos/processed/digit_recognition-1280.webm", poster: "/videos/processed/digit_recognition-poster.jpg" },
  { mp4: "/videos/processed/face_detection-1280.mp4", webm: "/videos/processed/face_detection-1280.webm", poster: "/videos/processed/face_detection-poster.jpg" },
  { mp4: "/videos/processed/tesla_1-1280.mp4", webm: "/videos/processed/tesla_1-1280.webm", poster: "/videos/processed/tesla_1-poster.jpg" },
  { mp4: "/videos/processed/tesla_2-1280.mp4", webm: "/videos/processed/tesla_2-1280.webm", poster: "/videos/processed/tesla_2-poster.jpg" },
  { mp4: "/videos/processed/traffic_detection-1280.mp4", webm: "/videos/processed/traffic_detection-1280.webm", poster: "/videos/processed/traffic_detection-poster.jpg" },
  { mp4: "/videos/processed/turing_machine-1280.mp4", webm: "/videos/processed/turing_machine-1280.webm", poster: "/videos/processed/turing_machine-poster.jpg" },
  { mp4: "/videos/processed/writing_and_robot-1280.mp4", webm: "/videos/processed/writing_and_robot-1280.webm", poster: "/videos/processed/writing_and_robot-poster.jpg" },
  { mp4: "/videos/processed/digit_neural_net-1280.mp4", webm: "/videos/processed/digit_neural_net-1280.webm", poster: "/videos/processed/digit_neural_net-poster.jpg" },
  { mp4: "/videos/processed/eniac_1-1280.mp4", webm: "/videos/processed/eniac_1-1280.webm", poster: "/videos/processed/eniac_1-poster.jpg" },
  { mp4: "/videos/processed/eniac_2-1280.mp4", webm: "/videos/processed/eniac_2-1280.webm", poster: "/videos/processed/eniac_2-poster.jpg" },
  { mp4: "/videos/processed/retro_software_development-1280.mp4", webm: "/videos/processed/retro_software_development-1280.webm", poster: "/videos/processed/retro_software_development-poster.jpg" },
  { mp4: "/videos/processed/gpt_agent-1280.mp4", webm: "/videos/processed/gpt_agent-1280.webm", poster: "/videos/processed/gpt_agent-poster.jpg" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroVideo() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playlist, setPlaylist] = useState<VideoSource[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const preloadRefs = useRef<HTMLVideoElement[]>([]);
  const preloadLinksRef = useRef<HTMLLinkElement[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    setPlaylist(shuffle(ALL_VIDEOS));
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = playlist[currentIndex];
  const currentMeta = current ? getHeroVideoMeta(current.mp4) : undefined;

  const onEnded = () => {
    if (playlist.length === 0) return;
    const next = (currentIndex + 1) % playlist.length;
    if (next === 0) {
      setPlaylist((prev) => shuffle(prev));
    }
    setCurrentIndex(next);
  };

  useEffect(() => {
    if (playlist.length === 0) return;

    preloadRefs.current.forEach((vid) => {
      try { vid.removeAttribute("src"); vid.load(); } catch {}
    });
    preloadRefs.current = [];
    preloadLinksRef.current.forEach((lnk) => lnk.remove());
    preloadLinksRef.current = [];

    const createPreloadVideo = (src: string | undefined) => {
      if (!src) return;
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      v.setAttribute("playsinline", "");
      v.src = src;
      try { v.load(); } catch {}
      preloadRefs.current.push(v);
    };

    const appendPreloadLink = (href: string | undefined, type: string) => {
      if (!href) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = href;
      link.type = type;
      document.head.appendChild(link);
      preloadLinksRef.current.push(link);
    };

    const next1 = playlist[(currentIndex + 1) % playlist.length];
    const next2 = playlist[(currentIndex + 2) % playlist.length];

    [next1, next2].forEach((item) => {
      if (!item) return;
      createPreloadVideo(item.webm);
      createPreloadVideo(item.mp4);
      appendPreloadLink(item.webm, "video/webm");
      appendPreloadLink(item.mp4, "video/mp4");
      if (item.poster) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = item.poster;
        document.head.appendChild(link);
        preloadLinksRef.current.push(link);
      }
    });

    return () => {
      preloadRefs.current.forEach((vid) => {
        try { vid.removeAttribute("src"); vid.load(); } catch {}
      });
      preloadRefs.current = [];
      preloadLinksRef.current.forEach((lnk) => lnk.remove());
      preloadLinksRef.current = [];
    };
  }, [playlist, currentIndex]);

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden flex items-center">
      {/* Video / poster */}
      {!reducedMotion && current ? (
        <video
          key={current.mp4}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover scale-105 will-change-transform"
          muted
          playsInline
          autoPlay
          preload="auto"
          poster={current.poster}
          onEnded={onEnded}
          onLoadedData={() => {
            try { videoRef.current?.play().catch(() => {}); } catch {}
          }}
        >
          {current.webm && <source src={current.webm} type="video/webm" />}
          <source src={current.mp4} type="video/mp4" />
        </video>
      ) : current ? (
        <Image
          src={current.poster || "/videos/processed/alphago-poster.jpg"}
          alt="Historic to modern AI montage"
          fill
          className="object-cover"
          priority={false}
        />
      ) : (
        <div className="absolute inset-0 bg-black" aria-hidden />
      )}

      {/* Layered overlay — darker for readability, with subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
      {/* Subtle noise grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
      />

      {/* Video caption */}
      {currentMeta && (
        <div className="absolute bottom-3 left-3 z-30">
          {currentMeta.sourceUrl ? (
            <motion.a
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 2.0 }}
              href={currentMeta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-block max-w-[90vw] sm:max-w-md rounded-md bg-black/60 text-white/70 px-3 py-1.5 backdrop-blur-sm text-xs transition duration-200 hover:text-white hover:underline underline-offset-2"
            >
              {currentMeta.title}
            </motion.a>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 2.0 }}
              className="inline-block max-w-[90vw] sm:max-w-md rounded-md bg-black/60 text-white/60 px-3 py-1.5 backdrop-blur-sm text-xs"
            >
              {currentMeta.title}
            </motion.span>
          )}
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-20 sm:py-28 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-4 py-1.5">
            Sapio AI · Since 2021
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.05] text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
            {t("heroVideo.title")}
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="mt-5 sm:mt-6 text-base sm:text-xl text-white/60 max-w-xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {t("heroVideo.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <a
            href="/services"
            className="w-full sm:w-auto rounded-full bg-primary text-white px-7 py-3.5 text-sm font-semibold hover:bg-primary/90 transition duration-200 shadow-lg shadow-primary/30 text-center"
          >
            {t("heroVideo.button")}
          </a>
          <a
            href="/projects"
            className="w-full sm:w-auto rounded-full border border-white/25 text-white px-7 py-3.5 text-sm font-medium hover:border-white/50 hover:bg-white/5 transition duration-200 text-center backdrop-blur-sm"
          >
            {t("heroVideo.see_work")}
          </a>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.8, duration: 0.8 },
          y: { delay: 2.8, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-hidden
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* Fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
