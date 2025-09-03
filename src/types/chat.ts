export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export type ChatHookReturn = {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  recaptchaError: string | null;
  sendMessage: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
};

export type ChatWidgetState = {
  isOpen: boolean;
  message: string;
  isVisible: boolean;
  showGreeting: boolean;
  showPing: boolean;
  greetingIndex: number;
  hasInteracted: boolean;
};


