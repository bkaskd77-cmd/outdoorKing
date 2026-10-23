"use client";

import { Button } from "@ok/ui";
import { useLocale, useTranslations } from "next-intl";
import {
  createContext,
  useContext,
  useId,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type Citation = { chunkId: string; title: string; url: string };

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  citations?: Citation[];
  emergency?: boolean;
};

type ConciergeContextValue = {
  enabled: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ConciergeContext = createContext<ConciergeContextValue | null>(null);

function useConcierge() {
  const ctx = useContext(ConciergeContext);
  if (!ctx) {
    throw new Error("ConciergeTrigger/Panel must be used inside ConciergeProvider");
  }
  return ctx;
}

export function ConciergeProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ConciergeContext.Provider value={{ enabled, open, setOpen }}>
      {children}
    </ConciergeContext.Provider>
  );
}

export function ConciergeTrigger() {
  const t = useTranslations();
  const { enabled, open, setOpen } = useConcierge();
  if (!enabled) return null;
  return (
    <Button
      variant="secondary"
      type="button"
      className="shrink-0 px-2.5 text-[0.8125rem] leading-[1.4] whitespace-nowrap sm:px-4 sm:text-small"
      aria-expanded={open}
      aria-label={t("conciergeTitle")}
      onClick={() => setOpen((value) => !value)}
    >
      <span className="sm:hidden">{open ? t("conciergeClose") : "Ask"}</span>
      <span className="hidden sm:inline">
        {open ? t("conciergeClose") : t("conciergeTitle")}
      </span>
    </Button>
  );
}

export function ConciergePanel() {
  const t = useTranslations();
  const locale = useLocale();
  const titleId = useId();
  const { enabled, open, setOpen } = useConcierge();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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
          };
          if (event === "meta") {
            if (data.conversationId) setConversationId(data.conversationId);
            citations = data.citations ?? [];
            emergency = Boolean(data.emergency);
          }
          if (event === "delta" && data.text) {
            acc += data.text;
            const snapshot = acc;
            const citeSnap = citations;
            const emergencySnap = emergency;
            setMessages((current) => {
              const next = [...current];
              next[next.length - 1] = {
                role: "assistant",
                text: snapshot,
                citations: citeSnap,
                emergency: emergencySnap,
              };
              return next;
            });
          }
          if (event === "done") {
            if (data.conversationId) setConversationId(data.conversationId);
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
    <div className="fixed top-[calc(var(--header-h)+0.75rem)] right-4 z-400 max-h-[min(70svh,32rem)]">
      <section
        role="dialog"
        aria-labelledby={titleId}
        aria-modal="false"
        className="flex max-h-[min(70svh,32rem)] w-[min(100vw-2rem,24rem)] flex-col rounded-xl border border-border bg-surface shadow-3"
      >
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <h2 id={titleId} className="font-display text-h3">
            {t("conciergeTitle")}
          </h2>
          <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
            {t("conciergeClose")}
          </Button>
        </header>
        <p className="px-4 pt-3 text-caption text-muted-foreground">
          {t("conciergeDisclaimer")}
        </p>
        <div
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
            </article>
          ))}
        </div>
        <form
          className="flex gap-2 border-t border-border p-3"
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
            className="min-h-11 flex-1 rounded-md border border-border px-3 text-small"
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
