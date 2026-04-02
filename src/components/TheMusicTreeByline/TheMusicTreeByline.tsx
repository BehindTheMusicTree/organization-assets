import type { CSSProperties } from "react";
import lockupSvg from "../../brand/the-music-tree/the-music-tree-lockup-horizontal.svg";

/**
 * Env var name for the org site (Next.js: must be `NEXT_PUBLIC_*`).
 * Mirror GitHub **`DOMAIN_NAME`** into **`NEXT_PUBLIC_DOMAIN_NAME`** for client bundles.
 */
export const ORG_URL = "NEXT_PUBLIC_DOMAIN_NAME" as const;

/**
 * Resolves the org site URL from **`process.env[ORG_URL]`** (mirror GitHub **`DOMAIN_NAME`** into **`NEXT_PUBLIC_DOMAIN_NAME`** for Next).
 * Throws if unset so production builds fail instead of shipping a silent fallback.
 */
export function getOrgSiteHref(): string {
  const raw = process.env[ORG_URL]?.trim();
  if (!raw) {
    throw new Error(
      `Missing required environment variable ${ORG_URL} (set from GitHub DOMAIN_NAME in CI).`,
    );
  }
  return raw.startsWith("http")
    ? raw
    : `https://${raw.replace(/\/$/, "")}/`;
}

/**
 * Clickable **the-music-tree-lockup-horizontal** only (no separate text node).
 * Pass **`href`** from the app, typically **`getOrgSiteHref()`** so missing env fails the build.
 */
export type TheMusicTreeBylineProps = {
  /** Portfolio / ecosystem URL. Apps: **`getOrgSiteHref()`** or equivalent (no default — env must be set). */
  href: string;
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Lockup image sizing (default height **36px**, width **auto**). */
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
  height: "36px",
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
        src={lockupSvg}
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
