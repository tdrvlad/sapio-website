"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const useRecaptchaV3 = (siteKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAppendedRef = useRef(false);

  useEffect(() => {
    if (!siteKey) return;

    if (typeof window === "undefined") return;
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setIsLoaded(true));
      return;
    }

    if (hasAppendedRef.current) return;
    hasAppendedRef.current = true;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setIsLoaded(true));
      }
    };
    document.head.appendChild(script);

    return () => {
      // Do not remove the script to avoid re-initialization issues on client navigation
    };
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      if (!siteKey) throw new Error("Missing reCAPTCHA site key");
      if (!window.grecaptcha) throw new Error("reCAPTCHA not initialized");
      return window.grecaptcha.execute(siteKey, { action });
    },
    [siteKey]
  );

  return useMemo(() => ({ executeRecaptcha, isLoaded }), [executeRecaptcha, isLoaded]);
};


