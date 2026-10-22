# OutdoorKing motion guidelines (implementation)

Durations: 150/250/400/700 ms in the spec map to tokens `fast` (160), `base` (240), `moderate` (360), `slow` (600). CSS tokens live in `src/styles/globals.css`; JS tokens live in `src/motion/tokens.ts`.

## Ownership

- **Motion** owns component, hover, layout and page enter.
- **GSAP + ScrollTrigger** owns scroll-scrubbed sequences (`useScrollScene`).
- **Lenis** owns smooth scrolling and is synced to the GSAP ticker.

Never animate the same property on the same node with both libraries.

## Reduced motion

`SmoothScroll` is disabled when `prefers-reduced-motion: reduce` or when the site motion toggle is `reduced` / `off`. `Reveal` / `Stagger` / `Parallax` skip translation in those modes. `document.documentElement.dataset.lenis` is `"on"` only when Lenis is active.

## Forms

Lenis is not attached inside long forms or when `data-lenis-prevent` is present. No scroll-jacking on quote or login flows.
