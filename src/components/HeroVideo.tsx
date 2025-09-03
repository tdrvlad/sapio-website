"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
        // @ts-ignore
        vid.load?.();
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
      v.playsInline = true as any;
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
          // @ts-ignore
          vid.load?.();
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
        >
          {current.webm && <source src={current.webm} type="video/webm" />}
          <source src={current.mp4} type="video/mp4" />
        </video>
      ) : current ? (
        <img
          src={current.poster}
          alt="Historic to modern AI montage"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-black" aria-hidden />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight max-w-3xl text-white">We’re in the business of problem-solving</h1>
        <p className="mt-6 text-lg text-white/85 max-w-2xl">Transform your ideas into state-of-the art AI solutions.</p>
        <div className="mt-10 flex items-center gap-4">
          <a href="#contact" className="rounded-full bg-white text-black px-5 py-3 text-sm font-medium">Start your project</a>
          <a href="#projects" className="text-sm underline underline-offset-4 text-white">See our work</a>
        </div>
      </div>
    </section>
  );
}


