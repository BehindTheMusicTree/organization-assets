/**
 * Build-time env keys and inlined values used by social components.
 * Values are replaced in published `dist/` at package build time.
 */
const readBuildEnv = (name: string): string | undefined =>
  process.env[name]?.trim() || undefined;

// Build env keys
export const GithubSponsorButtonUrl = "ORG_GITHUB_SPONSOR_BUTTON_URL" as const;
export const ORG_GITHUB_URL = "ORG_GITHUB_URL" as const;
export const ORG_PYPI_URL = "ORG_PYPI_URL" as const;
export const ORG_LINKEDIN_URL = "ORG_LINKEDIN_URL" as const;
export const ORG_X_URL = "ORG_X_URL" as const;
export const ORG_MASTODON_URL = "ORG_MASTODON_URL" as const;
export const ORG_YOUTUBE_URL = "ORG_YOUTUBE_URL" as const;
export const ORG_SPOTIFY_URL = "ORG_SPOTIFY_URL" as const;
export const ORG_DISCORD_URL = "ORG_DISCORD_URL" as const;
export const ORG_TIPEEE_URL = "ORG_TIPEEE_URL" as const;
export const CONTACT_EMAIL = "CONTACT_EMAIL" as const;

// Inlined build-time values
export const ORG_GITHUB_PROFILE_URL = readBuildEnv(ORG_GITHUB_URL);
export const ORG_PYPI_PROFILE_URL = readBuildEnv(ORG_PYPI_URL);
export const ORG_LINKEDIN_PROFILE_URL = readBuildEnv(ORG_LINKEDIN_URL);
export const ORG_X_PROFILE_URL = readBuildEnv(ORG_X_URL);
export const ORG_MASTODON_PROFILE_URL = readBuildEnv(ORG_MASTODON_URL);
export const ORG_YOUTUBE_PROFILE_URL = readBuildEnv(ORG_YOUTUBE_URL);
export const ORG_SPOTIFY_PROFILE_URL = readBuildEnv(ORG_SPOTIFY_URL);
export const ORG_DISCORD_INVITE_URL = readBuildEnv(ORG_DISCORD_URL);
export const ORG_TIPEEE_PROFILE_URL = readBuildEnv(ORG_TIPEEE_URL);
export const CONTACT_EMAIL_ADDRESS = readBuildEnv(CONTACT_EMAIL);
