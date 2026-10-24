"use client";

import { Button } from "@ok/ui";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "ok-cookie-consent";

type CookieConsentValue = {
  accepted: boolean;
  accept: () => void;
};

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    setAccepted(window.localStorage.getItem(KEY) === "essential");
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        accepted,
        accept: () => {
          window.localStorage.setItem(KEY, "essential");
          setAccepted(true);
        },
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }
  return ctx;
}

export function CookieBanner() {
  const { accepted, accept } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || accepted) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-400 max-w-sm rounded-lg border border-border bg-surface p-4 shadow-4"
    >
      <p className="text-small">
        Essential cookies only. We do not run third-party ad trackers. Analytics on Vercel
        is cookieless.
      </p>
      <Button className="mt-3" type="button" onClick={accept}>
        Continue with essential cookies
      </Button>
    </div>
  );
}
