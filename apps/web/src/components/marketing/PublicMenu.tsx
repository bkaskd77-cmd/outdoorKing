"use client";

import { cn, controlFocusClass, controlMotionClass, controlPressClass } from "@ok/ui";
import { useLocale } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { localizedPath } from "@/lib/site";

type MenuContextValue = {
  openId: string | null;
  setOpenId: Dispatch<SetStateAction<string | null>>;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function PublicMenuProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <MenuContext.Provider value={{ openId, setOpenId }}>
      <div className="contents">{children}</div>
    </MenuContext.Provider>
  );
}

function usePublicMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("PublicMenu must be used inside PublicMenuProvider");
  }
  return ctx;
}

const triggerBaseClass = cn(
  "inline-flex min-h-11 items-center text-small font-semibold",
  controlMotionClass,
  controlFocusClass,
  controlPressClass,
);

export function PublicMenu({
  id,
  label,
  children,
  align = "start",
  variant = "nav",
  ariaLabel,
}: {
  id: string;
  label: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  variant?: "nav" | "boxed";
  ariaLabel?: string;
}) {
  const { openId, setOpenId } = usePublicMenu();
  const open = openId === id;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const panelId = useId();

  const close = useCallback(() => {
    setOpenId((current) => (current === id ? null : current));
  }, [id, setOpenId]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={buttonId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ariaLabel}
        className={cn(
          triggerBaseClass,
          variant === "boxed"
            ? "rounded-md border border-border bg-surface px-2.5 hover:border-primary hover:bg-muted hover:shadow-1"
            : "rounded-sm px-1.5 hover:bg-muted hover:text-primary",
        )}
        onClick={() => setOpenId(open ? null : id)}
      >
        {label}
        <span
          aria-hidden="true"
          className={cn(
            "ml-1 text-caption text-muted-foreground transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]",
            open && "rotate-180",
          )}
        >
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={panelId}
          role="menu"
          aria-labelledby={buttonId}
          className={cn(
            "absolute top-full z-300 mt-2 min-w-56 rounded-md border border-border bg-surface p-2 shadow-3",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {children}
        </ul>
      ) : null}
    </div>
  );
}

const itemClass = cn(
  "flex min-h-11 w-full items-center rounded-sm px-3 text-left text-small",
  controlMotionClass,
  controlFocusClass,
  "hover:bg-muted hover:text-primary active:bg-accent",
);

export function PublicMenuLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const locale = useLocale();
  const { setOpenId } = usePublicMenu();
  return (
    <li role="none">
      <a
        role="menuitem"
        href={localizedPath(locale, href)}
        className={cn(itemClass, className)}
        onClick={() => setOpenId(null)}
      >
        {children}
      </a>
    </li>
  );
}

export function PublicMenuAction({
  children,
  current,
  onSelect,
}: {
  children: ReactNode;
  current?: boolean;
  onSelect: () => void;
}) {
  const { setOpenId } = usePublicMenu();
  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        className={cn(itemClass, current && "bg-muted font-semibold")}
        onClick={() => {
          onSelect();
          setOpenId(null);
        }}
      >
        {children}
      </button>
    </li>
  );
}
