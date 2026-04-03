#!/usr/bin/env node
/**
 * Ensures ORG_URL is set for `npm run build` (hostname or https URL).
 * CI should map GitHub repository variable DOMAIN_NAME into ORG_URL (see publish workflow).
 */
const v = process.env.ORG_URL?.trim();
if (!v) {
  console.error(
    "Error: ORG_URL is required for this build (organization site hostname or URL).\n" +
      "  Local:  ORG_URL=themusictree.org npm run build\n" +
      "  GitHub: set repository variable DOMAIN_NAME and pass ORG_URL in the workflow env.",
  );
  process.exit(1);
}
