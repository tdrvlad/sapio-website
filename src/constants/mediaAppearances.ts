export type MediaType = "podcast" | "workshop" | "presentation" | "award";

export type MediaAppearance = {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  year: number;
  mp4: string;
  webm?: string;
  poster: string;
};

export const MEDIA_APPEARANCES: MediaAppearance[] = [
  {
    id: "business-room",
    title: "The Business Room Podcast",
    description: "Vlad Tudor joins The Business Room to discuss how AI is reshaping Romanian businesses and what founders need to know about building with artificial intelligence.",
    type: "podcast",
    year: 2025,
    mp4: "/videos/processed_media_aparitions/business-room.mp4",
    webm: "/videos/processed_media_aparitions/business-room.webm",
    poster: "/videos/processed_media_aparitions/business-room-poster.jpg",
  },
  {
    id: "cegeka",
    title: "Cegeka Workshop",
    description: "Sapio AI led a hands-on AI workshop for Cegeka's engineering teams, covering practical applications of large language models and RAG pipelines in enterprise contexts.",
    type: "workshop",
    year: 2025,
    mp4: "/videos/processed_media_aparitions/cegeka.mp4",
    webm: "/videos/processed_media_aparitions/cegeka.webm",
    poster: "/videos/processed_media_aparitions/cegeka-poster.jpg",
  },
  {
    id: "fomo",
    title: "Festival of Modern Owners",
    description: "Presentation at the Festival of Modern Owners on how AI-driven automation is creating new competitive advantages for small and mid-size businesses in Romania.",
    type: "presentation",
    year: 2025,
    mp4: "/videos/processed_media_aparitions/fomo.mp4",
    webm: "/videos/processed_media_aparitions/fomo.webm",
    poster: "/videos/processed_media_aparitions/fomo-poster.jpg",
  },
  {
    id: "forbes",
    title: "Forbes 30 Under 30 Award",
    description: "Vlad Tudor recognized in Forbes Romania's 30 Under 30 list for his contributions to AI innovation and entrepreneurship in the Romanian tech ecosystem.",
    type: "award",
    year: 2025,
    mp4: "/videos/processed_media_aparitions/forbes.mp4",
    webm: "/videos/processed_media_aparitions/forbes.webm",
    poster: "/videos/processed_media_aparitions/forbes-poster.jpg",
  },
  {
    id: "ilikeit",
    title: "iLike IT",
    description: "Interview on iLike IT exploring the current state of AI adoption in Romania, the gap between hype and practical deployment, and Sapio's approach to real-world AI.",
    type: "podcast",
    year: 2024,
    mp4: "/videos/processed_media_aparitions/ilikeit.mp4",
    webm: "/videos/processed_media_aparitions/ilikeit.webm",
    poster: "/videos/processed_media_aparitions/ilikeit-poster.jpg",
  },
  {
    id: "podcast-rfi",
    title: "RFI România Podcast",
    description: "Discussion on RFI România about the societal implications of AI, Romania's position in the European AI landscape, and the civic technology projects Sapio is building.",
    type: "podcast",
    year: 2026,
    mp4: "/videos/processed_media_aparitions/podcast-rfi.mp4",
    webm: "/videos/processed_media_aparitions/podcast-rfi.webm",
    poster: "/videos/processed_media_aparitions/podcast-rfi-poster.jpg",
  },
];
