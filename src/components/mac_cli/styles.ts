export const STYLES = {
  cli: {
    inline: {
      container: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      shineOverlay: {
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 15%, transparent 85%, rgba(0, 0, 0, 0.3) 100%)',
        zIndex: 1,
      },
      messagesContainer: (maxHeight: string) => ({
        maxHeight,
        background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)',
        color: "#d4d4d4",
      }),
    },
    classes: {
      container: "relative w-full rounded-lg overflow-hidden border-2 border-gray-800 shadow-2xl",
      shineOverlay: "absolute inset-0 pointer-events-none rounded-lg",
      messagesContainer: "custom-scrollbar overflow-y-auto px-6 py-4 text-left font-mono relative z-10",
      messagesList: "space-y-3",
    },
  },
  titleBar: {
    inline: {
      container: {
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.5)',
      },
    },
    classes: {
      container: "flex items-center justify-between border-b px-4 py-2 relative z-10",
      leftSection: "flex items-center gap-2",
      controls: "flex gap-1.5",
      closeButton: "w-3 h-3 rounded-full bg-red-500",
      minimizeButton: "w-3 h-3 rounded-full bg-yellow-500",
      maximizeButton: "w-3 h-3 rounded-full bg-green-500",
      terminalLabel: "ml-3 text-xs text-gray-400 font-mono",
      username: "text-xs text-gray-500 font-mono",
    },
  },
  messageItem: {
    inline: {
      prompt: (accentColor: string) => ({ color: accentColor }),
      info: (accentColor: string) => ({ color: accentColor }),
      banner: (accentColor: string) => ({ color: accentColor }),
    },
    classes: {
      container: "message-block",
      timestamp: "text-xs text-gray-500 mb-1",
      command: {
        container: "flex items-start gap-2 text-sm",
        prompt: "select-none font-medium",
        text: "text-green-400",
      },
      output: "text-white whitespace-pre-wrap text-sm leading-relaxed",
      error: "text-red-400 whitespace-pre-wrap text-sm leading-relaxed",
      info: "italic text-sm",
      banner: {
        container: "my-6 py-6 border-b border-gray-700",
        pre: "text-xs leading-tight whitespace-pre",
      },
    },
  },
  ghostOverlay: {
    inline: {
      container: (opacity: number) => ({ opacity }),
    },
    classes: {
      container: "absolute inset-0 pointer-events-none text-gray-400 text-sm",
      cursor: "border-r border-gray-400 pr-1 animate-blink",
    },
  },
  inputArea: {
    inline: {
      prompt: (accentColor: string) => ({ color: accentColor }),
    },
    classes: {
      container: "relative flex items-center gap-2 mt-4 text-sm border-t border-gray-700 pt-4",
      prompt: "select-none font-medium",
      inputWrapper: "flex-1 relative",
      input: "w-full bg-transparent text-green-400 focus:outline-none text-sm relative z-10 caret-green-400",
    },
  },
} as const;

