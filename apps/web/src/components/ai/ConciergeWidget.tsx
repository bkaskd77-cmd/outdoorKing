"use client";

import { Button, cn } from "@ok/ui";
import { useLocale, useTranslations } from "next-intl";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { useCookieConsent } from "@/components/marketing/CookieBanner";

type Citation = { chunkId: string; title: string; url: string };

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  citations?: Citation[];
  emergency?: boolean;
  offerWhatsApp?: boolean;
};

type ConciergeContextValue = {
  enabled: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  whatsappHref: string | null;
};

const ConciergeContext = createContext<ConciergeContextValue | null>(null);

function useConcierge() {
  const ctx = useContext(ConciergeContext);
  if (!ctx) {
    throw new Error("Concierge launcher/panel must be used inside ConciergeProvider");
  }
  return ctx;
}

export function ConciergeProvider({
  enabled,
  whatsappHref,
  children,
}: {
  enabled: boolean;
  whatsappHref: string | null;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ConciergeContext.Provider value={{ enabled, open, setOpen, whatsappHref }}>
      {children}
    </ConciergeContext.Provider>
  );
}

function ChatGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9.4L5 20.6A1 1 0 0 1 3.4 19.8L4.7 17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      />
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24ZM8.53 7.53c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.12.17 1.76 2.67 4.25 3.73 2.05.88 2.47.72 2.92.67.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.45-.28-.24-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.25-.64.79-.78.95-.14.17-.29.19-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.25-.01-.38.11-.5.11-.11.24-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.01Z"
      />
    </svg>
  );
}

function WhatsAppHandoff({ href }: { href: string | null }) {
  const t = useTranslations();
  if (!href) return null;
  return (
    <a
      data-testid="whatsapp-handoff"
      className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-pill bg-[#25D366] px-4 text-small font-semibold text-white shadow-1"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("conciergeWhatsApp")}
    >
      <WhatsAppLogo />
      <span>{t("conciergeWhatsApp")}</span>
    </a>
  );
}

export function ConciergeLauncher() {
  const t = useTranslations();
  const { enabled, open, setOpen } = useConcierge();
  const { accepted } = useCookieConsent();
  if (!enabled) return null;
  return (
    <Button
      variant="magnetic"
      type="button"
      data-testid="concierge-launcher"
      className={cn(
        "fixed left-4 z-400 h-12 min-h-12 gap-2 rounded-pill px-4 shadow-3",
        accepted ? "bottom-4" : "bottom-[13.75rem]",
      )}
      aria-expanded={open}
      aria-label={t("conciergeTitle")}
      onClick={() => setOpen((value) => !value)}
    >
      <ChatGlyph />
      <span>{t("conciergeTitle")}</span>
    </Button>
  );
}

export function ConciergePanel() {
  const t = useTranslations();
  const locale = useLocale();
  const titleId = useId();
  const { enabled, open, setOpen, whatsappHref } = useConcierge();
  const { accepted } = useCookieConsent();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  if (!enabled || !open) return null;

  async function send() {
    const message = input.trim();
    if (!message || pending) return;
    setInput("");
    setPending(true);
    setMessages((current) => [...current, { role: "user", text: message }]);
    const assistant: ChatMessage = { role: "assistant", text: "" };
    setMessages((current) => [...current, assistant]);
    try {
      const response = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, locale, conversationId }),
      });
      if (!response.ok || !response.body) {
        setMessages((current) => {
          const next = [...current];
          next[next.length - 1] = {
            role: "assistant",
            text: "I could not reach the concierge. Write to the team from Contact.",
          };
          return next;
        });
        return;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let citations: Citation[] = [];
      let emergency = false;
      let offerWhatsApp = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const event = /event: (\w+)/.exec(part)?.[1];
          const dataLine = part
            .split("\n")
            .filter((line) => line.startsWith("data: "))
            .map((line) => line.slice(6))
            .join("");
          if (!event || !dataLine) continue;
          const data = JSON.parse(dataLine) as {
            text?: string;
            conversationId?: string;
            citations?: Citation[];
            emergency?: boolean;
            intent?: string;
            handoff?: boolean;
          };
          if (event === "meta") {
            if (data.conversationId) setConversationId(data.conversationId);
            citations = data.citations ?? [];
            emergency = Boolean(data.emergency);
            offerWhatsApp = data.intent === "human";
          }
          if (event === "delta" && data.text) {
            acc += data.text;
            const snapshot = acc;
            const citeSnap = citations;
            const emergencySnap = emergency;
            const whatsappSnap = offerWhatsApp;
            setMessages((current) => {
              const next = [...current];
              next[next.length - 1] = {
                role: "assistant",
                text: snapshot,
                citations: citeSnap,
                emergency: emergencySnap,
                offerWhatsApp: whatsappSnap,
              };
              return next;
            });
          }
          if (event === "done") {
            if (data.conversationId) setConversationId(data.conversationId);
            if (data.intent === "human") offerWhatsApp = true;
          }
        }
      }
    } catch {
      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = {
          role: "assistant",
          text: "I could not reach the concierge. Write to the team from Contact.",
        };
        return next;
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      data-testid="concierge-panel"
      className={cn(
        "fixed left-3 z-400 flex w-[calc(100vw-1.5rem)] flex-col sm:left-4 sm:w-[min(32rem,calc(100vw-2rem))]",
        "h-[min(88svh,calc(100svh-5.5rem))] sm:h-[min(36rem,70svh)]",
        accepted ? "bottom-[4.75rem]" : "bottom-[17.5rem]",
      )}
    >
      <section
        role="dialog"
        aria-labelledby={titleId}
        aria-modal="false"
        className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-3"
      >
        <header className="flex items-center justify-between gap-2 border-b border-border bg-surface px-4 py-3">
          <h2 id={titleId} className="font-display text-h3">
            {t("conciergeTitle")}
          </h2>
          <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
            {t("conciergeClose")}
          </Button>
        </header>
        <p className="bg-surface px-4 pt-3 text-caption text-muted-foreground">
          {t("conciergeDisclaimer")}
        </p>
        <div
          ref={logRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
          aria-live="polite"
        >
          {messages.map((msg, index) => (
            <article
              key={`${msg.role}-${String(index)}`}
              className={
                msg.role === "user"
                  ? "self-end rounded-md bg-muted px-3 py-2 text-small"
                  : "self-start rounded-md bg-surface-sunken px-3 py-2 text-small"
              }
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.citations && msg.citations.length > 0 ? (
                <p className="mt-2 text-caption">
                  {t("conciergeSources")}:{" "}
                  {msg.citations.slice(0, 4).map((c) => (
                    <a key={c.chunkId} className="mr-2 underline" href={c.url}>
                      {c.title}
                    </a>
                  ))}
                </p>
              ) : null}
              {msg.offerWhatsApp && whatsappHref ? (
                <WhatsAppHandoff href={whatsappHref} />
              ) : null}
            </article>
          ))}
        </div>
        <form
          className="flex shrink-0 gap-2 border-t border-border bg-surface p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
        >
          <label className="sr-only" htmlFor="concierge-input">
            {t("conciergePlaceholder")}
          </label>
          <input
            id="concierge-input"
            className="min-h-11 min-w-0 flex-1 rounded-md border border-border px-3 text-small"
            value={input}
            maxLength={2000}
            placeholder={t("conciergePlaceholder")}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" disabled={pending}>
            {t("conciergeSend")}
          </Button>
        </form>
      </section>
    </div>
  );
}
