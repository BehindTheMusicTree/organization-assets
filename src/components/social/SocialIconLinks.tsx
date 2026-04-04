import type { ComponentType } from "react";
import {
  IconBookOpen,
  IconEmail,
  IconGithub,
  IconGitHubSponsors,
  IconLinkedIn,
  IconMastodon,
  IconPypi,
  IconTwitter,
  IconWebsite,
  IconYouTube,
} from "./SocialIcons";
import {
  IconBookOpenColored,
  IconEmailColored,
  IconGithubColored,
  IconGitHubSponsorsColored,
  IconLinkedInColored,
  IconMastodonColored,
  IconPypiColored,
  IconTwitterColored,
  IconWebsiteColored,
  IconYouTubeColored,
} from "./SocialIconsColored";
import { normalizeHttpUrl, normalizeMailtoHref } from "./socialHrefUtils";

export type SocialIconLinkProps = {
  /**
   * Link target. When omitted, uses the URL or email **inlined at package build** from the
   * matching **`ORG_*`**, **`CONTACT_EMAIL`**, or **`ORG_URL`** env var.
   * **`DocSocialLink`** / **`DocSocialLinkColored`** have no build default; without **`href`** they
   * render nothing.
   */
  href?: string;
  /**
   * Accessible name and default **`title`**. When **`showText`** is true, also rendered as visible
   * label beside the icon.
   */
  text?: string;
  className?: string;
  iconClassName?: string;
  /** Renders **`text`** (or the default label) next to the icon. */
  showText?: boolean;
  /** Overrides the tooltip; defaults to the resolved accessible name. */
  title?: string;
};

type Kind = "http" | "mailto";

function createSocialIconLink(
  kind: Kind,
  readDefaultRaw: () => string | undefined,
  defaultText: string,
  Icon: ComponentType<{ className?: string }>,
) {
  return function SocialIconLink({
    href: hrefProp,
    text,
    className,
    iconClassName,
    showText = false,
    title: titleProp,
  }: SocialIconLinkProps) {
    const raw = (hrefProp?.trim() || readDefaultRaw()?.trim()) ?? "";
    if (!raw) return null;

    const href =
      kind === "mailto" ? normalizeMailtoHref(raw) : normalizeHttpUrl(raw);
    if (!href) return null;

    const label = (text?.trim() || defaultText).trim() || defaultText;
    const linkTitle = titleProp?.trim() || label;
    const external = !href.startsWith("mailto:");

    return (
      <a
        href={href}
        className={className}
        aria-label={label}
        title={linkTitle}
        style={
          showText
            ? {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }
            : undefined
        }
        {...(external
          ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
          : {})}
      >
        <Icon className={iconClassName} />
        {showText ? <span>{label}</span> : null}
      </a>
    );
  };
}

export const GithubSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_GITHUB_URL?.trim() || undefined,
  "GitHub",
  IconGithub,
);

export const GithubSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_GITHUB_URL?.trim() || undefined,
  "GitHub",
  IconGithubColored,
);

export const SponsorSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_SPONSORS_URL?.trim() || undefined,
  "GitHub Sponsors",
  IconGitHubSponsors,
);

export const SponsorSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_SPONSORS_URL?.trim() || undefined,
  "GitHub Sponsors",
  IconGitHubSponsorsColored,
);

export const PypiSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_PYPI_URL?.trim() || undefined,
  "PyPI",
  IconPypi,
);

export const PypiSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_PYPI_URL?.trim() || undefined,
  "PyPI",
  IconPypiColored,
);

export const LinkedInSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_LINKEDIN_URL?.trim() || undefined,
  "LinkedIn",
  IconLinkedIn,
);

export const LinkedInSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_LINKEDIN_URL?.trim() || undefined,
  "LinkedIn",
  IconLinkedInColored,
);

export const XSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_X_URL?.trim() || undefined,
  "X (Twitter)",
  IconTwitter,
);

export const XSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_X_URL?.trim() || undefined,
  "X (Twitter)",
  IconTwitterColored,
);

export const MastodonSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_MASTODON_URL?.trim() || undefined,
  "Mastodon",
  IconMastodon,
);

export const MastodonSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_MASTODON_URL?.trim() || undefined,
  "Mastodon",
  IconMastodonColored,
);

export const YouTubeSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_YOUTUBE_URL?.trim() || undefined,
  "YouTube",
  IconYouTube,
);

export const YouTubeSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_YOUTUBE_URL?.trim() || undefined,
  "YouTube",
  IconYouTubeColored,
);

export const EmailSocialLink = createSocialIconLink(
  "mailto",
  () => process.env.CONTACT_EMAIL?.trim() || undefined,
  "Email",
  IconEmail,
);

export const EmailSocialLinkColored = createSocialIconLink(
  "mailto",
  () => process.env.CONTACT_EMAIL?.trim() || undefined,
  "Email",
  IconEmailColored,
);

export const WebsiteSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_URL?.trim() || undefined,
  "Website",
  IconWebsite,
);

export const WebsiteSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_URL?.trim() || undefined,
  "Website",
  IconWebsiteColored,
);

/** Documentation link; **`href`** must be supplied (no env default at package build). */
export const DocSocialLink = createSocialIconLink(
  "http",
  () => undefined,
  "Documentation",
  IconBookOpen,
);

export const DocSocialLinkColored = createSocialIconLink(
  "http",
  () => undefined,
  "Documentation",
  IconBookOpenColored,
);
