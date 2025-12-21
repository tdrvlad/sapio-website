import type { CLIMessage } from "../types";

export const createDefaultMessages = (): CLIMessage[] => [
  {
    type: "banner",
    content: "Sapio AI",
  },
  {
    type: "info",
    content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
  },
];

