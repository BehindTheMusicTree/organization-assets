import { useState } from "react";
import type { CSSProperties } from "react";
/**
 * Web-sized rasters (`800×250`, RGBA knockout); full-resolution master: `the-music-tree-lockup-horizontal-full.png`.
 * Vector dark variant: `the-music-tree-lockup-horizontal-dark.svg`. Do not swap for another mark.
 */
import theMusicTreeLockupHorizontalDark from "../../brand/the-music-tree/the-music-tree-lockup-horizontal-dark.png";
import theMusicTreeLockupHorizontal from "../../brand/the-music-tree/the-music-tree-lockup-horizontal.png";

/**
 * Env var name for the org site (Next.js: must be `NEXT_PUBLIC_*`).
 * Mirror GitHub **`DOMAIN_NAME`** into **`NEXT_PUBLIC_DOMAIN_NAME`** for client bundles.
 */
export const ORG_URL = "NEXT_PUBLIC_DOMAIN_NAME" as const;

/**
 * Build **`href`** from a hostname or full URL string. Throws if empty.
 * In **Vite**, read the value from **`import.meta.env`** (with `define` in `vite.config`) — not **`getOrgSiteHref()`**, because dependency code often keeps `process.env` and **`process` is undefined** in the browser.
 */
export function parseOrgSiteHref(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) {
    throw new Error(
      `Missing required environment variable ${ORG_URL} (set from GitHub DOMAIN_NAME in CI).`,
    );
  }
  return raw.startsWith("http")
    ? raw
    : `https://${raw.replace(/\/$/, "")}/`;
}

/** Reads **`NEXT_PUBLIC_DOMAIN_NAME`** via **`process.env`** (works with Next.js inlining). Vite: use **`parseOrgSiteHref`** instead. */
export function getOrgSiteHref(): string {
  return parseOrgSiteHref(process.env.NEXT_PUBLIC_DOMAIN_NAME);
}

/**
 * Clickable **`the-music-tree-lockup-horizontal`** artwork only (no separate text node).
 * **`href`** must be the organization site URL — use **`getOrgSiteHref()`** (Next) or **`parseOrgSiteHref(…)`** (Vite).
 * Hover and keyboard **`:focus-visible`** slightly change the image aspect (**`transform`**); focus uses a **2px** ring (**`currentColor`**).
 */
export type TheMusicTreeBylineProps = {
  /** Organization site URL (no default — set **`NEXT_PUBLIC_DOMAIN_NAME`** / **`DOMAIN_NAME`**). */
  href: string;
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Lockup image sizing (default height **56px**, width **auto**). */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /**
   * `onDark`: light ink, transparent knockout (**`the-music-tree-lockup-horizontal-dark.png`**; SVG also ships).
   */
  variant?: "default" | "onDark";
};

const anchorStyle: CSSProperties = {
  display: "inline-block",
  lineHeight: 0,
  textDecoration: "none",
  borderRadius: "8px",
};

const defaultImgStyle: CSSProperties = {
  display: "block",
  height: "56px",
  width: "auto",
  transformOrigin: "center",
};

/** Slightly wider vs tall on hover/focus — non-uniform scale changes perceived aspect ratio. */
const imgTransformHover: CSSProperties = {
  transform: "scale(1.06, 1.025)",
};

export function TheMusicTreeByline({
  href,
  className,
  imageClassName,
  imageStyle,
  variant = "default",
}: TheMusicTreeBylineProps) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  const src =
    variant === "onDark"
      ? theMusicTreeLockupHorizontalDark
      : theMusicTreeLockupHorizontal;

  const transformActive = hovered || focusVisible;

  return (
    <a
      href={href}
      className={className}
      style={{
        ...anchorStyle,
        outline: "none",
        boxShadow: focusVisible ? "0 0 0 2px currentColor" : undefined,
      }}
      aria-label="TheMusicTree — open ecosystem site"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) {
          setFocusVisible(true);
        }
      }}
      onBlur={() => setFocusVisible(false)}
    >
      <img
        src={src}
        alt=""
        className={imageClassName}
        style={{
          ...defaultImgStyle,
          ...imageStyle,
          ...(transformActive ? imgTransformHover : {}),
          transition: "transform 0.2s ease",
        }}
        aria-hidden
      />
    </a>
  );
}

/**
 * Horizontal **the-music-tree-lockup-horizontal** linking to the org site.
 * Same implementation as {@link TheMusicTreeByline}; use whichever name fits your UI copy.
 */
export const TheMusicTreeHorizontalLink = TheMusicTreeByline;

/** Props for {@link TheMusicTreeHorizontalLink} (same as {@link TheMusicTreeBylineProps}). */
export type TheMusicTreeHorizontalLinkProps = TheMusicTreeBylineProps;
