"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getHeroVideoMeta } from "@/constants/heroVideoMeta";

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
    // Reshuffle on wrap to keep randomness across cycles
    if (next === 0) {
      setPlaylist((prev) => shuffle(prev));
    }
    setCurrentIndex(next);
  };

  // Preload next 1-2 videos (HTMLVideo + <link rel="preload">)
  useEffect(() => {
    if (playlist.length === 0) return;

    // Clean up previous preloads
    preloadRefs.current.forEach((vid) => {
      try {
        vid.removeAttribute("src");
        vid.load();
      } catch {}
    });
    preloadRefs.current = [];
    preloadLinksRef.current.forEach((lnk) => lnk.remove());
    preloadLinksRef.current = [];

    const createPreloadVideo = (src: string | undefined) => {
      if (!src) return;
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      // Use attribute to avoid TS lib compatibility issues
      v.setAttribute("playsinline", "");
      v.src = src;
      try {
        v.load();
      } catch {}
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
      // Preload both formats to maximize cache hits across browsers
      createPreloadVideo(item.webm);
      createPreloadVideo(item.mp4);
      appendPreloadLink(item.webm, "video/webm");
      appendPreloadLink(item.mp4, "video/mp4");
      // Also hint the poster
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
        try {
          vid.removeAttribute("src");
          vid.load();
        } catch {}
      });
      preloadRefs.current = [];
      preloadLinksRef.current.forEach((lnk) => lnk.remove());
      preloadLinksRef.current = [];
    };
  }, [playlist, currentIndex]);

  return (
    <section className="relative isolate min-h-[80vh] sm:min-h-[88vh] overflow-hidden flex items-center">
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
            try {
              videoRef.current?.play().catch(() => {});
            } catch {}
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Caption overlay (always visible) */}
      {currentMeta && (
        <div className="absolute bottom-3 left-3 z-30">
          {currentMeta.sourceUrl ? (
            <a
              href={currentMeta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-block max-w-[90vw] sm:max-w-md rounded-md bg-black/70 text-white px-3 py-2 backdrop-blur-sm shadow-md underline-offset-2 hover:underline text-xs sm:text-sm"
            >
              {currentMeta.title}
            </a>
          ) : (
            <span className="pointer-events-auto inline-block max-w-[90vw] sm:max-w-md rounded-md bg-black/70 text-white px-3 py-2 backdrop-blur-sm shadow-md text-xs sm:text-sm">
              {currentMeta.title}
            </span>
          )}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 text-center">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight max-w-3xl mx-auto text-white">We’re in the business of problem-solving</h1>
        <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto">Transform your ideas into state-of-the art AI solutions.</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href="#contact" className="rounded-full bg-white text-black px-5 py-3 text-sm font-medium">Start your project</a>
          <a href="#projects" className="text-sm underline underline-offset-4 text-white">See our work</a>
        </div>
      </div>
    </section>
  );
}


