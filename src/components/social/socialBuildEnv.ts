/**
 * Build-time env keys and inlined values used by social components and related services.
 * Values are replaced in published `dist/` at package build time.
 */
const readBuildEnv = (read: () => string | undefined): string | undefined => {
  try {
    return read()?.trim() || undefined;
  } catch {
    // Browser runtime without `process` should degrade to undefined.
    return undefined;
  }
};

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
export const HTMT_API_SUBDOMAIN = "HTMT_API_SUBDOMAIN" as const;
export const GTMT_FRONT_SUBDOMAIN = "GTMT_FRONT_SUBDOMAIN" as const;
export const AUDIOMETA_SUBDOMAIN = "AUDIOMETA_SUBDOMAIN" as const;

// Inlined build-time values
export const ORG_GITHUB_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_GITHUB_URL,
);
export const ORG_PYPI_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_PYPI_URL,
);
export const ORG_LINKEDIN_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_LINKEDIN_URL,
);
export const ORG_X_PROFILE_URL = readBuildEnv(() => process.env.ORG_X_URL);
export const ORG_MASTODON_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_MASTODON_URL,
);
export const ORG_YOUTUBE_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_YOUTUBE_URL,
);
export const ORG_SPOTIFY_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_SPOTIFY_URL,
);
export const ORG_DISCORD_INVITE_URL = readBuildEnv(
  () => process.env.ORG_DISCORD_URL,
);
export const ORG_TIPEEE_PROFILE_URL = readBuildEnv(
  () => process.env.ORG_TIPEEE_URL,
);
export const CONTACT_EMAIL_ADDRESS = readBuildEnv(
  () => process.env.CONTACT_EMAIL,
);
export const HTMT_API_SUBDOMAIN_VALUE = readBuildEnv(
  () => process.env.HTMT_API_SUBDOMAIN,
);
export const GTMT_FRONT_SUBDOMAIN_VALUE = readBuildEnv(
  () => process.env.GTMT_FRONT_SUBDOMAIN,
);
export const AUDIOMETA_SUBDOMAIN_VALUE = readBuildEnv(
  () => process.env.AUDIOMETA_SUBDOMAIN,
);
