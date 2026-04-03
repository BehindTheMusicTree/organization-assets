import type { CSSProperties, IframeHTMLAttributes } from "react";

/**
 * Env var name read when **this package** is built. The iframe **`src`** is **embedded in
 * published `dist/`** (like **`ORG_URL`** for **TheMusicTreeByline**); consuming apps do not set it
 * for a normal install from GitHub Packages.
 */
export const ORG_SPONSOR_BUTTON_URL = "ORG_SPONSOR_BUTTON_URL" as const;

function readSponsorButtonSrcFromProcess(): string | undefined {
  const v = process.env.ORG_SPONSOR_BUTTON_URL?.trim();
  return v || undefined;
}

export type BtmtSponsorButtonProps = {
  /** Defaults to **Sponsor BehindTheMusicTree**. */
  title?: string;
  className?: string;
  style?: CSSProperties;
} & Pick<IframeHTMLAttributes<HTMLIFrameElement>, "loading">;

/**
 * GitHub Sponsors (or other) embed **iframe**. **`src`** comes from **`ORG_SPONSOR_BUTTON_URL`**
 * at **package build** time, not from props. **`scripts/assert-org-url.mjs`** fails **`npm run build`**
 * when that variable is missing, so published **`dist/`** should always include a non-empty URL; this
 * component returns **`null`** only if a consumer bundles a non-standard build with an empty inlined
 * value.
 */
export function BtmtSponsorButton({
  title = "Sponsor BehindTheMusicTree",
  className,
  style,
  loading = "lazy",
  ...rest
}: BtmtSponsorButtonProps) {
  const src = readSponsorButtonSrcFromProcess();
  if (!src) return null;

  return (
    <iframe
      {...rest}
      src={src}
      title={title}
      height={32}
      width={114}
      loading={loading}
      className={className}
      style={{ border: 0, borderRadius: 6, ...style }}
    />
  );
}
