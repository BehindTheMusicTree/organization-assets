import type { CSSProperties } from "react";
/** `src/brand/the-music-tree/the-music-tree-lockup-horizontal.png` — do not swap for another mark. */
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
 */
export type TheMusicTreeBylineProps = {
  /** Organization site URL (no default — set **`NEXT_PUBLIC_DOMAIN_NAME`** / **`DOMAIN_NAME`**). */
  href: string;
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Lockup image sizing (default height **44px**, width **auto**). */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /**
   * `onDark`: invert monochrome/black lockups for dark backgrounds. Omit for full-color lockup artwork.
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
  height: "44px",
  width: "auto",
};

export function TheMusicTreeByline({
  href,
  className,
  imageClassName,
  imageStyle,
  variant = "default",
}: TheMusicTreeBylineProps) {
  const filter =
    variant === "onDark" ? "brightness(0) invert(1)" : undefined;

  return (
    <a
      href={href}
      className={className}
      style={anchorStyle}
      aria-label="TheMusicTree — open ecosystem site"
    >
      <img
        src={theMusicTreeLockupHorizontal}
        alt=""
        className={imageClassName}
        style={{
          ...defaultImgStyle,
          ...imageStyle,
          ...(filter ? { filter } : {}),
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
