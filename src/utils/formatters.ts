export const generateMessageId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};


