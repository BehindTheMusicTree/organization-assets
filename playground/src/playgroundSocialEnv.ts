import type { ComponentType } from "react";
import {
  IconBookOpen,
  IconEmail,
  IconGithub,
  IconGitHubConversation,
  IconHeart,
  IconIssue,
  IconLinkedIn,
  IconMastodon,
  IconPypi,
  IconTwitter,
  IconWebsite,
  IconYouTube,
} from "@behindthemusictree/assets/components";

/** Injected by Vite `define` from `playground/.env` (see `vite.config.ts`). */
declare const __PLAYGROUND_ORG_URL__: string;
declare const __PLAYGROUND_BTMT_DOCS_URL__: string;
declare const __PLAYGROUND_BTMT_GITHUB_LINK__: string;
declare const __PLAYGROUND_BTMT_GITHUB_REPO__: string;
declare const __PLAYGROUND_BTMT_PYPI_LINK__: string;
declare const __PLAYGROUND_LINKEDIN_URL__: string;
declare const __PLAYGROUND_BTMT_X_URL__: string;
declare const __PLAYGROUND_MASTODON_URL__: string;
declare const __PLAYGROUND_BTMT_YOUTUBE_URL__: string;
declare const __PLAYGROUND_CONTACT_EMAIL__: string;
declare const __PLAYGROUND_BTMT_SUPPORT_URL__: string;

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

/** Social icon buttons for the playground; hrefs come from `playground/.env` at dev/build time. */
export function getPlaygroundSocialLinks(): PlaygroundSocialRow[] {
  const orgUrl = normalizeHttpUrl(__PLAYGROUND_ORG_URL__);
  const docsUrl = normalizeHttpUrl(__PLAYGROUND_BTMT_DOCS_URL__);
  const github = normalizeHttpUrl(__PLAYGROUND_BTMT_GITHUB_LINK__);
  const repoBase = normalizeHttpUrl(__PLAYGROUND_BTMT_GITHUB_REPO__).replace(/\/$/, "");
  const pypi = normalizeHttpUrl(__PLAYGROUND_BTMT_PYPI_LINK__);
  const linkedin = normalizeHttpUrl(__PLAYGROUND_LINKEDIN_URL__);
  const x = normalizeHttpUrl(__PLAYGROUND_BTMT_X_URL__);
  const mastodon = normalizeHttpUrl(__PLAYGROUND_MASTODON_URL__);
  const youtube = normalizeHttpUrl(__PLAYGROUND_BTMT_YOUTUBE_URL__);
  const email = mailtoHref(__PLAYGROUND_CONTACT_EMAIL__);
  const support = normalizeHttpUrl(__PLAYGROUND_BTMT_SUPPORT_URL__);

  const rows: PlaygroundSocialRow[] = [];

  if (docsUrl) {
    rows.push({ key: "docs", href: docsUrl, label: "Documentation", Icon: IconBookOpen });
  }
  if (github) {
    rows.push({ key: "github", href: github, label: "GitHub", Icon: IconGithub });
  }
  if (pypi) {
    rows.push({ key: "pypi", href: pypi, label: "PyPI", Icon: IconPypi });
  }
  if (linkedin) {
    rows.push({ key: "linkedin", href: linkedin, label: "LinkedIn", Icon: IconLinkedIn });
  }
  if (x) {
    rows.push({ key: "x", href: x, label: "X (Twitter)", Icon: IconTwitter });
  }
  if (mastodon) {
    rows.push({ key: "mastodon", href: mastodon, label: "Mastodon", Icon: IconMastodon });
  }
  if (youtube) {
    rows.push({ key: "youtube", href: youtube, label: "YouTube", Icon: IconYouTube });
  }
  if (email) {
    rows.push({ key: "email", href: email, label: "Email", Icon: IconEmail });
  }
  if (orgUrl) {
    rows.push({ key: "website", href: orgUrl, label: "Website", Icon: IconWebsite });
  }
  if (repoBase) {
    rows.push({
      key: "issues",
      href: `${repoBase}/issues`,
      label: "Issues",
      Icon: IconIssue,
    });
    rows.push({
      key: "discussions",
      href: `${repoBase}/discussions`,
      label: "GitHub discussions",
      Icon: IconGitHubConversation,
    });
  }
  if (support) {
    rows.push({ key: "support", href: support, label: "Support", Icon: IconHeart });
  }

  return rows;
}
