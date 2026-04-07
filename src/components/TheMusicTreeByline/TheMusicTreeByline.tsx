import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
/**
 * Renders **SVG knockouts** (transparent outside the artwork). Raster exports for email/CMS: **`the-music-tree-lockup-horizontal.png`** / **`-dark.png`**; full master: **`the-music-tree-lockup-horizontal-full.png`**. Do not swap for another mark.
 */
import theMusicTreeLockupHorizontalDark from "../../brand/the-music-tree/the-music-tree-lockup-horizontal-dark.svg";
import theMusicTreeLockupHorizontal from "../../brand/the-music-tree/the-music-tree-lockup-horizontal.svg";
import theMusicTreeLockupStacked from "../../brand/the-music-tree/the-music-tree-lockup-stacked.svg";

/**
 * Environment variable name read when **this package** is built (`npm run build` / publish).
 * The value is **embedded in published `dist/`**; consuming apps do not set **`ORG_URL`** unless they bundle a **local checkout** of this repo without a normal build.
 */
export const ORG_URL = "ORG_URL" as const;

/**
 * Normalize a hostname or full URL to an **`https://…/`** href.
 * Use **`resolveOrgSiteHref()`** for the link target; keep this for tests or custom strings.
 */
export function parseOrgSiteHref(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) {
    throw new Error(
      `Missing organization site URL: set environment variable ${ORG_URL} when building @behindthemusictree/assets (e.g. map GitHub repository variable DOMAIN_NAME into ORG_URL in the publish workflow).`,
    );
  }
  return raw.startsWith("http")
    ? raw
    : `https://${raw.replace(/\/$/, "")}/`;
}

function readOrgUrlFromProcess(): string | undefined {
  // Use `process.env.ORG_URL` literally so tsup/esbuild can replace it when this package is built.
  const v = process.env.ORG_URL?.trim();
  return v || undefined;
}

/**
 * Organization site **`href`**. In **published** installs the URL is already inlined from **`ORG_URL`** at package build time.
 */
export function resolveOrgSiteHref(): string {
  return parseOrgSiteHref(readOrgUrlFromProcess());
}

/**
 * Clickable **`the-music-tree-lockup-horizontal`** artwork only (no separate text node).
 * **`href`** is fixed in published **`dist/`** (from **`ORG_URL`** when the package was built) — not a prop.
 * Transparent knockout only — **`backgroundColor: transparent`** on the link and image so host CSS cannot paint a plate behind the lockup.
 * Hover and keyboard **`:focus-visible`** slightly change the image aspect (**`transform`**); focus uses a **2px** ring (**`currentColor`**).
 */
export type TheMusicTreeBylineProps = {
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Lockup image sizing (default height **56px**, width **auto**). */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /**
   * `onDark`: light ink, transparent knockout (**`the-music-tree-lockup-horizontal-dark.svg`**). Raster **`-dark.png`** ships for non-SVG contexts.
   */
  variant?: "default" | "onDark";
};

const anchorStyle: CSSProperties = {
  display: "inline-block",
  lineHeight: 0,
  textDecoration: "none",
  borderRadius: "8px",
  backgroundColor: "transparent",
};

const defaultImgStyle: CSSProperties = {
  display: "block",
  height: "56px",
  width: "auto",
  transformOrigin: "center",
  backgroundColor: "transparent",
};

/** Slightly wider vs tall on hover/focus — non-uniform scale changes perceived aspect ratio. */
const imgTransformHover: CSSProperties = {
  transform: "scale(1.06, 1.025)",
};

export function TheMusicTreeByline({
  className,
  imageClassName,
  imageStyle,
  variant = "default",
}: TheMusicTreeBylineProps) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  const href = useMemo(() => resolveOrgSiteHref(), []);

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

export type TheMusicTreeMarkLinkProps = {
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Stacked lockup image sizing (default height **56px**, width **auto**). */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /**
   * `onDark`: invert the default dark-ink lockup for dark UIs while keeping knockout transparency.
   */
  variant?: "default" | "onDark";
};

/**
 * Clickable **the-music-tree-lockup-stacked** artwork (vertical symbol + wordmark).
 * Uses the same baked `ORG_URL` href behavior as `TheMusicTreeHorizontalLink`.
 */
export function TheMusicTreeMarkLink({
  className,
  imageClassName,
  imageStyle,
  variant = "default",
}: TheMusicTreeMarkLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const href = useMemo(() => resolveOrgSiteHref(), []);
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
      aria-label="TheMusicTree stacked lockup — open ecosystem site"
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
        src={theMusicTreeLockupStacked}
        alt=""
        className={imageClassName}
        style={{
          ...defaultImgStyle,
          ...imageStyle,
          ...(variant === "onDark" ? { filter: "invert(1)" } : {}),
          ...(transformActive ? imgTransformHover : {}),
          transition: "transform 0.2s ease",
        }}
        aria-hidden
      />
    </a>
  );
}
