export type HeroVideoMetadata = {
  title: string;
  sourceUrl: string;
};

// Keyed by the exact mp4 path used in the hero playlist, so we can match reliably
export const HERO_VIDEO_META: Record<string, HeroVideoMetadata> = {
  "/videos/processed/alphago-1280.mp4": {
    title: "AlphaFold Protein Structure Identification",
    sourceUrl: "https://youtu.be/4b4MUYve_U8?si=wBHRhvruLpQJMVrF",
  },
  "/videos/processed/andrew_ng-1280.mp4": {
    title: "Andrew Ng on AI/ML Lecturing",
    sourceUrl: "https://youtu.be/4b4MUYve_U8?si=wBHRhvruLpQJMVrF",
  },
  "/videos/processed/digit_recognition-1280.mp4": {
    title: "Yann LeCun Demonstrating Digit Recognittion in 1989",
    sourceUrl: "https://youtu.be/FwFduRA_L6Q?si=vdIUl8E_8YrJvkxB",
  },
  "/videos/processed/face_detection-1280.mp4": {
    title: "Face Detection Demo",
    sourceUrl: "https://youtu.be/PL3xJErjEgU?si=HvvfoKN29Ujw5OIU",
  },
  "/videos/processed/tesla_1-1280.mp4": {
    title: "Tesla Optimus Robot",
    sourceUrl: "https://youtu.be/DrNcXgoFv20?si=-o5kuuHhQnw57UcC",
  },
  "/videos/processed/tesla_2-1280.mp4": {
    title: "Tesla Optimus Robot",
    sourceUrl: "https://youtu.be/DrNcXgoFv20?si=-o5kuuHhQnw57UcC",
  },
  "/videos/processed/traffic_detection-1280.mp4": {
    title: "Traffic Object Detection",
    sourceUrl: "https://youtu.be/Avpce9ouYJQ?si=n_LJtBPI3sm6Yy77",
  },
  "/videos/processed/turing_machine-1280.mp4": {
    title: "Turing Machine Visualization",
    sourceUrl: "https://youtu.be/gtRLmL70TH0?si=FC31F0qdSOVkO6e5",
  },
  "/videos/processed/writing_and_robot-1280.mp4": {
    title: "Shakey the Robot, 1972",
    sourceUrl: "https://youtu.be/4b4MUYve_U8?si=wBHRhvruLpQJMVrF",
  },
  "/videos/processed/digit_neural_net-1280.mp4": {
    title: "How a Neural Network Recognizes Digits",
    sourceUrl: "https://youtu.be/WQYCK1YpsjE?si=-Tzz-5028TNtVcmb",
  },
  "/videos/processed/eniac_1-1280.mp4": {
    title: "ENIAC, 1946, The First Digital Computer",
    sourceUrl: "https://youtu.be/nITFvyBI72Y?si=HB5qr1kF6jPSH87x",
  },
  "/videos/processed/eniac_2-1280.mp4": {
    title: "ENIAC, 1946, The First Digital Computer",
    sourceUrl: "https://youtu.be/nITFvyBI72Y?si=HB5qr1kF6jPSH87x",
  },
  "/videos/processed/retro_software_development-1280.mp4": {
    title: "Retro Software Development",
    sourceUrl: "https://youtu.be/MQtRrfeSFZU?si=gpT4iFk1WLexartt",
  },
  "/videos/processed/gpt_agent-1280.mp4": {
    title: "GPT Agent in Action",
    sourceUrl: "https://youtu.be/Wgn4JeYI9lY?si=zdXPS2nEQZ2KvBuf",
  },
};

export function getHeroVideoMeta(key: string | { mp4: string }): HeroVideoMetadata | undefined {
  const path = typeof key === "string" ? key : key.mp4;
  return HERO_VIDEO_META[path];
}


