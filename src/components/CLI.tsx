"use client";

import { useState, useEffect, useRef } from "react";

type CLIMessage = {
  type: "command" | "output" | "error" | "info" | "banner";
  content: string;
  timestamp?: string;
};

type CLIProps = {
  messages?: CLIMessage[];
  prompt?: string;
  accentColor?: string;
  showTimestamp?: boolean;
  maxHeight?: string;
  suggestions?: string[];
  onCommand?: (command: string) => void;
};


export function CLI({
  messages = [],
  prompt = "$",
  accentColor = "#006beb",
  showTimestamp = false,
  maxHeight = "600px",
  suggestions = [
    "What kind of AI solutions do you build?",
    "Can you integrate with on-premise systems?",
    "Show me a Sapio project in legal tech.",
    "How fast can an MVP be developed?",
    "How does a technical audit work?",
  ],
  onCommand,
}: CLIProps) {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [ghostText, setGhostText] = useState("");
  const [ghostIndex, setGhostIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ghostPhase, setGhostPhase] = useState<"typing" | "hold" | "fade">("typing");
  const [isLoading, setIsLoading] = useState(() => {
    // Check if loading animation has already been shown in this session
    if (typeof window !== 'undefined') {
      const hasShownLoading = sessionStorage.getItem('sapio-cli-loaded');
      return !hasShownLoading;
    }
    return true;
  });
  const [ghostTypingText, setGhostTypingText] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial sequence: typing "sapio . " -> loading bar -> logo -> ghost writer
  useEffect(() => {
    // Skip if it's already been shown
    if (typeof window !== 'undefined' && sessionStorage.getItem('sapio-cli-loaded')) {
      setIsLoading(false);
      return;
    }

    const targetText = "sapio . ";
    let currentIndex = 0;

    // Phase 1: Ghost typing "sapio . "
    const typingInterval = setInterval(() => {
      if (currentIndex < targetText.length) {
        setGhostTypingText(targetText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait a bit, then show loading bar
        setTimeout(() => {
          setShowLoading(true);
          
          // Phase 2: Loading bar with stars
          const loadingSteps = [
            { message: "Initializing terminal...", progress: 20 },
            { message: "Loading system modules...", progress: 40 },
            { message: "Connecting to Sapio AI...", progress: 60 },
            { message: "Loading language models...", progress: 80 },
            { message: "Preparing interface...", progress: 95 },
            { message: "Ready", progress: 100 },
          ];

          let currentStep = 0;
          const loadingInterval = setInterval(() => {
            if (currentStep < loadingSteps.length) {
              setLoadingMessage(loadingSteps[currentStep].message);
              setLoadingProgress(loadingSteps[currentStep].progress);
              currentStep++;
            } else {
              clearInterval(loadingInterval);
              // Phase 3: Show logo
              setTimeout(() => {
                setShowLogo(true);
                // Mark as loaded in sessionStorage
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('sapio-cli-loaded', 'true');
                }
                // Phase 4: Show main interface with ghost writer
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }, 500);
            }
          }, 400);
        }, 800);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Ghost typing effect
  useEffect(() => {
    if (isInputFocused || inputValue.length > 0 || suggestions.length === 0) {
      setGhostText("");
      return;
    }

    const current = suggestions[ghostIndex % suggestions.length];
    const delay = isDeleting ? 40 : 70;
    let timer: NodeJS.Timeout;

    if (!isDeleting && ghostText === current) {
      setGhostPhase("hold");
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && ghostText === "") {
      setGhostPhase("typing");
      timer = setTimeout(() => {
        setIsDeleting(false);
        setGhostIndex((prev) => (prev + 1) % suggestions.length);
      }, 420);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? current.slice(0, ghostText.length - 1)
          : current.slice(0, ghostText.length + 1);

        setGhostText(nextText);
        if (isDeleting) setGhostPhase("fade");
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [ghostText, isDeleting, ghostIndex, suggestions, isInputFocused, inputValue]);

  useEffect(() => {
    setGhostText("");
    setGhostIndex(0);
    setIsDeleting(false);
  }, [suggestions]);

  const defaultMessages: CLIMessage[] = [
    {
      type: "banner",
      content: "Sapio AI",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      type: "info",
      content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ];

  const displayMessages = messages.length > 0 ? messages : defaultMessages;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (inputValue.trim() && onCommand) {
        onCommand(inputValue.trim());
        setInputValue("");
      }
    }
  };

  return (
    <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 shadow-2xl">
      {/* Terminal Window Title Bar */}
      <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Window Controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-3 text-xs text-gray-400 font-mono">Terminal</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">sapio-ai@terminal</div>
      </div>

      {/* Messages Container */}
      <div
        className="custom-scrollbar overflow-y-auto px-6 py-4 text-left font-mono"
        style={{ maxHeight, backgroundColor: "#1e1e1e", color: "#d4d4d4" }}
      >
        {isLoading ? (
          /* Loading Screen */
          <div className="space-y-4 py-8">
            {/* Phase 1: Ghost typing "sapio . " */}
            {!showLoading && (
              <div className="flex items-center gap-2 text-sm">
                <span style={{ color: accentColor }} className="select-none font-medium">
                  {prompt}
                </span>
                <span className="text-green-400">
                  {ghostTypingText}
                  <span className="border-r border-green-400 pr-1 animate-blink" />
                </span>
              </div>
            )}

            {/* Phase 2: Loading bar with stars */}
            {showLoading && !showLogo && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: accentColor }}>{loadingMessage}</span>
                  <span className="text-gray-500 text-sm">[{loadingProgress}%]</span>
                </div>
                {/* Progress Bar with Stars */}
                <div className="w-full font-mono text-sm">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 50 }).map((_, i) => {
                      const filled = i < (loadingProgress / 2);
                      return (
                        <span
                          key={i}
                          style={{ color: filled ? accentColor : "#4a5568" }}
                        >
                          {filled ? "★" : "☆"}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  {loadingProgress < 100 ? "Please wait..." : "Initialization complete"}
                </div>
              </div>
            )}

            {/* Phase 3: Logo appears */}
            {showLogo && (
              <div className="mb-8">
                <pre className="text-xs leading-tight whitespace-pre" style={{ color: accentColor }}>
{`╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     ███████╗ █████╗ ██████╗ ██╗ ██████╗                  ║
║     ██╔════╝██╔══██╗██╔══██╗██║██╔═══██╗                 ║
║     ███████╗███████║██████╔╝██║██║   ██║                 ║
║     ╚════██║██╔══██║██╔═══╝ ██║██║   ██║                 ║
║     ███████║██║  ██║██║     ██║╚██████╔╝                 ║
║     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝                  ║
║                                                           ║
║              █████╗ ██╗                                   ║
║             ██╔══██╗██║                                   ║
║             ███████║██║                                   ║
║             ██╔══██║██║                                   ║
║             ██║  ██║██║                                   ║
║             ╚═╝  ╚═╝╚═╝                                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝`}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {displayMessages.map((message, index) => (
            <div key={index} className="message-block">
              {/* Timestamp */}
              {showTimestamp && message.timestamp && (
                <div className="text-xs text-gray-500 mb-1">
                  {message.timestamp}
                </div>
              )}

              {/* Command */}
              {message.type === "command" && (
                <div className="flex items-start gap-2 text-sm">
                  <span style={{ color: accentColor }} className="select-none font-medium">
                    {prompt}
                  </span>
                  <span className="text-green-400">{message.content}</span>
                </div>
              )}

              {/* Output */}
              {message.type === "output" && (
                <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
              )}

              {/* Error */}
              {message.type === "error" && (
                <div className="text-red-400 whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
              )}

              {/* Info */}
              {message.type === "info" && (
                <div className="italic text-sm" style={{ color: accentColor }}>{message.content}</div>
              )}

              {/* Banner - Retro ASCII Art */}
              {message.type === "banner" && (
                <div className="my-6 py-6 border-b border-gray-700">
                  <pre className="text-xs leading-tight whitespace-pre" style={{ color: accentColor }}>
{`╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     ███████╗ █████╗ ██████╗ ██╗ ██████╗                  ║
║     ██╔════╝██╔══██╗██╔══██╗██║██╔═══██╗                 ║
║     ███████╗███████║██████╔╝██║██║   ██║                 ║
║     ╚════██║██╔══██║██╔═══╝ ██║██║   ██║                 ║
║     ███████║██║  ██║██║     ██║╚██████╔╝                 ║
║     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝                  ║
║                                                           ║
║              █████╗ ██╗                                   ║
║             ██╔══██╗██║                                   ║
║             ███████║██║                                   ║
║             ██╔══██║██║                                   ║
║             ██║  ██║██║                                   ║
║             ╚═╝  ╚═╝╚═╝                                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝`}
                  </pre>
                </div>
              )}
            </div>
          ))}
          </div>
        )}

        {/* Input Area - Only show when not loading */}
        {!isLoading && (
        <div className="relative flex items-center gap-2 mt-4 text-sm border-t border-gray-700 pt-4">
          <span style={{ color: accentColor }} className="select-none font-medium">
            {prompt}
          </span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="w-full bg-transparent text-green-400 focus:outline-none text-sm relative z-10 caret-green-400"
            />
            {/* Ghost typing overlay */}
            {!isInputFocused && inputValue.length === 0 && ghostText.length > 0 && (
              <div
                className="absolute inset-0 pointer-events-none text-gray-500 text-sm"
                style={{
                  opacity: ghostPhase === "typing" ? 0.6 : ghostPhase === "hold" ? 0.5 : 0.4,
                }}
              >
                {ghostText}
                <span className="border-r border-gray-500 pr-1 animate-blink" />
              </div>
            )}
          </div>
          {!inputValue && !ghostText && (
            <span className="w-2 h-4 bg-green-400 animate-blink" />
          )}
        </div>
        )}
      </div>
    </div>
  );
}
