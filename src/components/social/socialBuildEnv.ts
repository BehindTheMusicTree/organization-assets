/**
 * Names of environment variables read when **this package** is built; values are **inlined into
 * published `dist/`** for **`Social*Link`** defaults (same pattern as **`ORG_URL`** /
 * **`GithubSponsorButtonUrl`**). **`SponsorSocialLink`** also uses **`GithubSponsorButtonUrl`**
 * (same as **`GithubSponsorButton`**).
 */
/** Build env key (value: **`ORG_GITHUB_SPONSOR_BUTTON_URL`**) for **`GithubSponsorButton`** iframe **`src`** and **`SponsorSocialLink`** defaults. */
export const GithubSponsorButtonUrl = "ORG_GITHUB_SPONSOR_BUTTON_URL" as const;
export const ORG_GITHUB_URL = "ORG_GITHUB_URL" as const;
export const ORG_PYPI_URL = "ORG_PYPI_URL" as const;
export const ORG_LINKEDIN_URL = "ORG_LINKEDIN_URL" as const;
export const ORG_X_URL = "ORG_X_URL" as const;
export const ORG_MASTODON_URL = "ORG_MASTODON_URL" as const;
export const ORG_YOUTUBE_URL = "ORG_YOUTUBE_URL" as const;
/** Inlined at package build for **`SpotifySocialLink`** / **`SpotifySocialLinkColored`** defaults. */
export const ORG_SPOTIFY_URL = "ORG_SPOTIFY_URL" as const;
/** Inlined at package build for **`DiscordSocialLink`** / **`DiscordSocialLinkColored`** defaults. */
export const ORG_DISCORD_URL = "ORG_DISCORD_URL" as const;
/** Inlined at package build for **`TipeeeSocialLink`** / **`TipeeeSocialLinkColored`** defaults. */
export const ORG_TIPEEE_URL = "ORG_TIPEEE_URL" as const;
export const CONTACT_EMAIL = "CONTACT_EMAIL" as const;
