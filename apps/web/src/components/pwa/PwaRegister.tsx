"use client";

import { Button } from "@ok/ui";
import { useEffect, useState } from "react";

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaRegister() {
  const [deferred, setDeferred] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.register("/sw.js");

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as PromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }

  if (installed) {
    return (
      <p data-testid="pwa-installed" className="sr-only">
        OutdoorKing is installed on this device.
      </p>
    );
  }

  if (!deferred) {
    return (
      <span data-testid="pwa-ready" className="sr-only">
        Offline trek info is available after install.
      </span>
    );
  }

  return (
    <div
      data-testid="pwa-install"
      className="fixed right-4 bottom-4 z-400 rounded-md border border-border bg-surface p-3 shadow-3"
    >
      <p className="text-small">Install OutdoorKing for offline trek info.</p>
      <Button className="mt-2" type="button" onClick={() => void install()}>
        Install app
      </Button>
    </div>
  );
}
