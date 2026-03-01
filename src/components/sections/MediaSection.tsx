"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MEDIA_APPEARANCES } from "@/constants/mediaAppearances";
import "@/components/comp.css";

export default function MediaSection() {
  const { t } = useLanguage();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const preloadRefs = useRef<HTMLVideoElement[]>([]);
  const preloadLinksRef = useRef<HTMLLinkElement[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // IntersectionObserver — play/pause
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
  }, [currentIndex]);

  const onEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % MEDIA_APPEARANCES.length);
  };

  // Preload next video
  useEffect(() => {
    preloadRefs.current.forEach((vid) => {
      try { vid.removeAttribute("src"); vid.load(); } catch {}
    });
    preloadRefs.current = [];
    preloadLinksRef.current.forEach((lnk) => lnk.remove());
    preloadLinksRef.current = [];

    const next = MEDIA_APPEARANCES[(currentIndex + 1) % MEDIA_APPEARANCES.length];
    if (!next) return;

    const addVideo = (src: string | undefined) => {
      if (!src) return;
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      v.setAttribute("playsinline", "");
      v.src = src;
      try { v.load(); } catch {}
      preloadRefs.current.push(v);
    };
    const addLink = (href: string | undefined, type: string) => {
      if (!href) return;
      const link = document.createElement("link");
      link.rel = "preload"; link.as = "video"; link.href = href; link.type = type;
      document.head.appendChild(link);
      preloadLinksRef.current.push(link);
    };

    addVideo(next.webm); addVideo(next.mp4);
    addLink(next.webm, "video/webm"); addLink(next.mp4, "video/mp4");

    return () => {
      preloadRefs.current.forEach((vid) => {
        try { vid.removeAttribute("src"); vid.load(); } catch {}
      });
      preloadRefs.current = [];
      preloadLinksRef.current.forEach((lnk) => lnk.remove());
      preloadLinksRef.current = [];
    };
  }, [currentIndex]);

  const current = MEDIA_APPEARANCES[currentIndex];

  return (
    <div className="font-sans">
      {/* Page header */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pt-28 pb-10 sm:pt-36 sm:pb-14">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-widest text-[#006beb] mb-3"
        >
          {t("mediaPage.eyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-semibold tracking-tight"
        >
          {t("mediaPage.title")}
        </motion.h1>
      </section>

      {/* Video section — mirrors HeroVideo */}
      <section className="relative isolate min-h-[70vh] sm:min-h-[80vh] overflow-hidden flex items-center">
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
            src={current.poster}
            alt={current.title}
            fill
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-black" aria-hidden />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

        {/* Caption — appearance title in corner */}
        {current && (
          <div className="absolute bottom-3 left-3 z-30">
            <motion.span
              key={current.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="inline-block max-w-[90vw] sm:max-w-md rounded-md bg-black/70 text-white px-3 py-2 backdrop-blur-sm shadow-md text-xs sm:text-sm"
            >
              {current.title}
            </motion.span>
          </div>
        )}

        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
      </section>

      <div className="section-divider" />
    </div>
  );
}
