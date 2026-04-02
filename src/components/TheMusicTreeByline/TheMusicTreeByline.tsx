import type { CSSProperties } from "react";
import markSvg from "../../brand/the-music-tree/the-music-tree-mark.svg";

/**
 * Rectangular “By TheMusicTree” lockup: one clickable block, mark + label.
 *
 * Suggested sizing (defaults below): **~36px tall**, **24×24px mark**, **8px / 12px** padding,
 * **~8px** gap — total width typically **~170–200px** at 13px label text.
 */
export type TheMusicTreeBylineProps = {
  /** Defaults to `https://themusictree.org/`. */
  href?: string;
  /** Applied to the outer `<a>` (layout, border, colors, hover). */
  className?: string;
  /** Mark image; default 24×24. On `variant="onDark"`, the mark is inverted for contrast. */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /** Label next to the mark (default: “By TheMusicTree”). */
  label?: string;
  labelClassName?: string;
  /**
   * `onDark`: black SVG mark is inverted so it reads on dark backgrounds (e.g. black/slate headers).
   */
  variant?: "default" | "onDark";
};

const DEFAULT_HREF = "https://themusictree.org/";

/** Default lockup: min height 36px, padding 8px 12px, 8px gap, 8px corner radius. */
const anchorStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  minHeight: "36px",
  padding: "8px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  boxSizing: "border-box",
};

const labelStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: 1.2,
  whiteSpace: "nowrap",
};

export function TheMusicTreeByline({
  href = DEFAULT_HREF,
  className,
  imageClassName,
  imageStyle,
  label = "By TheMusicTree",
  labelClassName,
  variant = "default",
}: TheMusicTreeBylineProps) {
  const markFilter =
    variant === "onDark"
      ? "brightness(0) invert(1)"
      : undefined;

  return (
    <a href={href} className={className} style={anchorStyle}>
      <img
        src={markSvg}
        alt=""
        width={24}
        height={24}
        className={imageClassName}
        style={{
          flexShrink: 0,
          ...imageStyle,
          ...(markFilter ? { filter: markFilter } : {}),
        }}
        aria-hidden
      />
      <span className={labelClassName} style={labelStyle}>
        {label}
      </span>
    </a>
  );
}
