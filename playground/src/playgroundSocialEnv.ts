import type { ComponentType } from "react";
import {
  IconEmail,
  IconGithub,
  IconLinkedIn,
  IconMastodon,
  IconPypi,
  IconTwitter,
  IconWebsite,
  IconYouTube,
} from "@behindthemusictree/assets/components";

/** Injected by Vite `define` from `playground/.env` (see `vite.config.ts`). */
declare const __PLAYGROUND_ORG_URL__: string;
declare const __PLAYGROUND_ORG_GITHUB_URL__: string;
declare const __PLAYGROUND_ORG_PYPI_URL__: string;
declare const __PLAYGROUND_ORG_LINKEDIN_URL__: string;
declare const __PLAYGROUND_ORG_X_URL__: string;
declare const __PLAYGROUND_ORG_MASTODON_URL__: string;
declare const __PLAYGROUND_ORG_YOUTUBE_URL__: string;
declare const __PLAYGROUND_CONTACT_EMAIL__: string;

function normalizeHttpUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (/^mailto:/i.test(t)) return t;
  if (t.startsWith("//")) return `https:${t}`;
  if (!/^https?:\/\//i.test(t)) return `https://${t}`;
  return t;
}

function mailtoHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return /^mailto:/i.test(t) ? t : `mailto:${t}`;
}

export type PlaygroundSocialRow = {
  key: string;
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

/**
 * Social icon buttons for the playground; hrefs come from `playground/.env` at dev/build time.
 * Root **`npm run build`** requires every key (**`scripts/assert-org-url.mjs`**), so values here are always non-empty in normal workflows.
 */
export function getPlaygroundSocialLinks(): PlaygroundSocialRow[] {
  const orgUrl = normalizeHttpUrl(__PLAYGROUND_ORG_URL__);
  const github = normalizeHttpUrl(__PLAYGROUND_ORG_GITHUB_URL__);
  const pypi = normalizeHttpUrl(__PLAYGROUND_ORG_PYPI_URL__);
  const linkedin = normalizeHttpUrl(__PLAYGROUND_ORG_LINKEDIN_URL__);
  const x = normalizeHttpUrl(__PLAYGROUND_ORG_X_URL__);
  const mastodon = normalizeHttpUrl(__PLAYGROUND_ORG_MASTODON_URL__);
  const youtube = normalizeHttpUrl(__PLAYGROUND_ORG_YOUTUBE_URL__);
  const email = mailtoHref(__PLAYGROUND_CONTACT_EMAIL__);

  return [
    { key: "github", href: github, label: "GitHub", Icon: IconGithub },
    { key: "pypi", href: pypi, label: "PyPI", Icon: IconPypi },
    { key: "linkedin", href: linkedin, label: "LinkedIn", Icon: IconLinkedIn },
    { key: "x", href: x, label: "X (Twitter)", Icon: IconTwitter },
    { key: "mastodon", href: mastodon, label: "Mastodon", Icon: IconMastodon },
    { key: "youtube", href: youtube, label: "YouTube", Icon: IconYouTube },
    { key: "email", href: email, label: "Email", Icon: IconEmail },
    { key: "website", href: orgUrl, label: "Website", Icon: IconWebsite },
  ];
}
