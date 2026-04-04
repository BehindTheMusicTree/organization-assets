import { useState, type ComponentType } from "react";
import {
  bannerAssets,
  brandAssets,
  faviconAssets,
} from "./distAssetGlobs";
import { AssetFigure } from "./AssetFigure";
import {
  BTMT_ICON_LINK_DARK_CLASS,
  BtmtSponsorButton,
  Button,
  DiscussionLink,
  DiscussionLinkColored,
  DocLink,
  DocLinkColored,
  EmailSocialLink,
  EmailSocialLinkColored,
  GithubSocialLink,
  GithubSocialLinkColored,
  InformationLink,
  InformationLinkColored,
  LinkedInSocialLink,
  LinkedInSocialLinkColored,
  MastodonSocialLink,
  MastodonSocialLinkColored,
  PypiSocialLink,
  PypiSocialLinkColored,
  SponsorSocialLink,
  SponsorSocialLinkColored,
  TheMusicTreeHorizontalLink,
  WebsiteSocialLink,
  WebsiteSocialLinkColored,
  XSocialLink,
  XSocialLinkColored,
  YouTubeSocialLink,
  YouTubeSocialLinkColored,
  socialBrandIconClass,
  type SocialIconLinkProps,
} from "@behindthemusictree/assets/components";
import lockupDarkPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal-dark.png?url";
import lockupDefaultPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal.png?url";
type CatalogTab = "components" | "brand" | "banners" | "favicons";

type SocialLinkComponent = ComponentType<SocialIconLinkProps>;

const SOCIAL_LINK_DEMO: {
  key: string;
  Link: SocialLinkComponent;
  LinkColored: SocialLinkComponent;
}[] = [
  { key: "github", Link: GithubSocialLink, LinkColored: GithubSocialLinkColored },
  { key: "sponsors", Link: SponsorSocialLink, LinkColored: SponsorSocialLinkColored },
  { key: "pypi", Link: PypiSocialLink, LinkColored: PypiSocialLinkColored },
  { key: "linkedin", Link: LinkedInSocialLink, LinkColored: LinkedInSocialLinkColored },
  { key: "x", Link: XSocialLink, LinkColored: XSocialLinkColored },
  { key: "mastodon", Link: MastodonSocialLink, LinkColored: MastodonSocialLinkColored },
  { key: "youtube", Link: YouTubeSocialLink, LinkColored: YouTubeSocialLinkColored },
  { key: "email", Link: EmailSocialLink, LinkColored: EmailSocialLinkColored },
  { key: "website", Link: WebsiteSocialLink, LinkColored: WebsiteSocialLinkColored },
];

const TABS: { id: CatalogTab; label: string }[] = [
  { id: "components", label: "Components" },
  { id: "brand", label: "Brand" },
  { id: "banners", label: "Banners" },
  { id: "favicons", label: "Favicons" },
];

function labelFromGlobKey(key: string): string {
  const normalized = key.replace(/^\.\.\//, "");
  const marker = "/dist/";
  const idx = normalized.indexOf(marker);
  if (idx === -1) return normalized;
  return normalized.slice(idx + marker.length);
}

function sortedEntries(map: Record<string, string>) {
  return Object.entries(map)
    .map(([key, url]) => ({ key, url, label: labelFromGlobKey(key) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function AssetGrid({
  entries,
  variant,
}: {
  entries: { url: string; label: string }[];
  variant: "brand" | "banners" | "favicons";
}) {
  if (entries.length === 0) return null;
  return (
    <div className={`asset-grid asset-grid--${variant}`}>
      {entries.map(({ url, label }) => (
        <AssetFigure key={label} url={url} label={label} variant={variant} />
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<CatalogTab>("components");
  const brandEntries = sortedEntries(brandAssets);
  const bannerEntries = sortedEntries(bannerAssets);
  const faviconEntries = sortedEntries(faviconAssets);

  return (
    <div className="playground">
      <h1>@behindthemusictree/assets</h1>
      <p>
        Local catalog: npm pack contents under{" "}
        <code>node_modules/…/dist/</code>. After changing brand files or the
        library build, run <code>npm run build</code> at the repo root, then
        refresh this app (or restart <code>npm run dev</code> if the catalog
        still looks stale). The org link target is **embedded in `dist/`** when you run{" "}
        <code>npm run build</code> at the repo root (see <code>ORG_URL</code> in{" "}
        <code>playground/.env</code> for <code>npm run playground</code>). Social link defaults (
        <code>ORG_GITHUB_URL</code>, <code>ORG_LINKEDIN_URL</code>,{" "}
        <code>CONTACT_EMAIL</code>, etc.)
        are inlined into <code>dist/</code> when you run root <code>npm run build</code> (same keys in{" "}
        <code>playground/.env</code>); pass <code>href</code> / <code>text</code> props to override.{" "}
        <strong>DocLink</strong>, <strong>DiscussionLink</strong>, and{" "}
        <strong>InformationLink</strong> have no build default — supply <code>href</code>.
        **BtmtSponsorButton** and **SponsorSocialLink** use <code>ORG_SPONSOR_BUTTON_URL</code>{" "}
        from the package build. Raster and SVG previews use each file’s
        natural dimensions (wide assets scroll inside the card).
      </p>

      <ul className="playground-tablist" role="tablist" aria-label="Catalog">
        {TABS.map(({ id, label }) => (
          <li key={id} role="presentation">
            <button
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              tabIndex={0}
              className="playground-tab"
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {tab === "components" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-components"
          aria-labelledby="tab-components"
        >
          <section className="section" aria-labelledby="components-heading">
            <h2 id="components-heading">Components</h2>
            <div className="demo-row">
              <span className="demo-label">Button</span>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                BtmtSponsorButton — <code>ORG_SPONSOR_BUTTON_URL</code> inlined in{" "}
                <code>dist/</code> at package build
              </span>
              <div className="sponsor-demo">
                <BtmtSponsorButton />
                <code className="lockup-showcase__code sponsor-demo__code">
                  &lt;BtmtSponsorButton /&gt;
                </code>
                <p className="empty-note sponsor-demo__hint">
                  Root <code>npm run build</code> and playground <code>npm run build</code> /{" "}
                  <code>npm run dev</code> both run <code>scripts/assert-org-url.mjs</code> first—the
                  build fails if <code>ORG_SPONSOR_BUTTON_URL</code> or any other required key is
                  missing. If the iframe is still absent, <code>node_modules/@behindthemusictree/assets</code>{" "}
                  is probably stale: run <code>npm run build</code> at the repo root, then{" "}
                  <code>npm install --prefix playground</code>, and refresh.
                </p>
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Social*Link (<code>currentColor</code>) — defaults from package build env; optional{" "}
                <code>href</code> / <code>text</code> / <code>showText</code>
              </span>
              <div className="social-links-demo">
                {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                  <Link key={key} iconClassName={socialBrandIconClass} />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                *SocialLinkColored — same props; brand-tinted icons
              </span>
              <div className="social-links-demo social-links-demo--colored">
                {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                  <LinkColored key={key} iconClassName={socialBrandIconClass} />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Social*Link + <code>showText</code> — canonical pill from{" "}
                <code>@behindthemusictree/assets/styles/icon-links.css</code> (imported in{" "}
                <code>main.tsx</code>); SVG size in that sheet when not using Tailwind on icons
              </span>
              <div className="social-links-demo">
                {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                  <Link key={key} iconClassName={socialBrandIconClass} showText />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                *SocialLinkColored + <code>showText</code> — same pill styling
              </span>
              <div className="social-links-demo social-links-demo--colored">
                {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                  <LinkColored key={key} iconClassName={socialBrandIconClass} showText />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Dark surface — <code>{`className={BTMT_ICON_LINK_DARK_CLASS}`}</code> +{" "}
                <code>currentColor</code> icons
              </span>
              <div
                className="social-links-demo social-links-demo--on-dark"
                aria-label="Social links on dark background"
              >
                {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                  <Link
                    key={key}
                    className={BTMT_ICON_LINK_DARK_CLASS}
                    iconClassName={socialBrandIconClass}
                  />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Dark surface — <code>*SocialLinkColored</code> +{" "}
                <code>{`className={BTMT_ICON_LINK_DARK_CLASS}`}</code>
              </span>
              <div className="social-links-demo social-links-demo--on-dark social-links-demo--colored">
                {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                  <LinkColored
                    key={key}
                    className={BTMT_ICON_LINK_DARK_CLASS}
                    iconClassName={socialBrandIconClass}
                  />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Dark surface + <code>showText</code> — dark pill from{" "}
                <code>icon-links.css</code>
              </span>
              <div className="social-links-demo social-links-demo--on-dark">
                {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                  <Link
                    key={key}
                    className={BTMT_ICON_LINK_DARK_CLASS}
                    iconClassName={socialBrandIconClass}
                    showText
                  />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Dark surface — colored + <code>showText</code>
              </span>
              <div className="social-links-demo social-links-demo--on-dark social-links-demo--colored">
                {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                  <LinkColored
                    key={key}
                    className={BTMT_ICON_LINK_DARK_CLASS}
                    iconClassName={socialBrandIconClass}
                    showText
                  />
                ))}
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                Custom <code>href</code> + <code>text</code> + <code>showText</code>
              </span>
              <div className="social-links-demo">
                <GithubSocialLink
                  iconClassName={socialBrandIconClass}
                  href="https://github.com/octocat"
                  text="Octocat (demo)"
                  showText
                />
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                DocLink, DiscussionLink, InformationLink — no package-build default; require{" "}
                <code>href</code> (demo URLs are arbitrary)
              </span>
              <div className="social-links-demo">
                <DocLink
                  iconClassName={socialBrandIconClass}
                  href="https://example.com/docs"
                  text="Documentation (demo)"
                  showText
                />
                <DocLinkColored
                  iconClassName={socialBrandIconClass}
                  href="https://example.com/docs"
                  text="Documentation (demo)"
                  showText
                />
                <DiscussionLink
                  iconClassName={socialBrandIconClass}
                  href="https://example.com/discuss"
                  text="Discussion (demo)"
                  showText
                />
                <DiscussionLinkColored
                  iconClassName={socialBrandIconClass}
                  href="https://example.com/discuss"
                  text="Discussion (demo)"
                  showText
                />
                <InformationLink
                  iconClassName={socialBrandIconClass}
                  href="https://example.com/info"
                  text="Information (demo)"
                  showText
                />
                <InformationLinkColored
                  iconClassName={socialBrandIconClass}
                  href="https://example.com/info"
                  text="Information (demo)"
                  showText
                />
              </div>
            </div>
            <div className="lockup-showcase">
              <span className="demo-label">
                TheMusicTreeHorizontalLink (TheMusicTreeByline — same component)
              </span>
              <p className="lockup-showcase__intro">
                SVG knockouts; <code>href</code> is baked into published <code>dist/</code> when
                the package is built (not a prop). TheMusicTreeByline is an export alias with
                the same props and behavior. Hover or tab for focus styles.
              </p>
              <div className="lockup-showcase__grid">
                <div className="lockup-showcase__tile lockup-showcase__tile--light">
                  <span className="lockup-showcase__tile-label">
                    default — light UI
                  </span>
                  <code className="lockup-showcase__code">
                    &lt;TheMusicTreeHorizontalLink /&gt;
                  </code>
                  <div className="lockup-showcase__sample">
                    <TheMusicTreeHorizontalLink />
                  </div>
                </div>
                <div className="lockup-showcase__tile lockup-showcase__tile--dark">
                  <span className="lockup-showcase__tile-label">
                    variant onDark — dark UI
                  </span>
                  <code className="lockup-showcase__code">
                    variant=&quot;onDark&quot;
                  </code>
                  <div className="lockup-showcase__sample">
                    <TheMusicTreeHorizontalLink variant="onDark" />
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-row lockup-raster-preview">
              <span className="demo-label">
                Brand lockup PNGs (dist — raster knockouts for non-React)
              </span>
              <div className="lockup-raster-preview__pair">
                <figure className="lockup-raster-preview__figure">
                  <figcaption className="asset-card-title">
                    the-music-tree-lockup-horizontal.png
                  </figcaption>
                  <div className="lockup-raster-preview__plate lockup-raster-preview__plate--light">
                    <img
                      src={lockupDefaultPng}
                      alt=""
                      decoding="async"
                    />
                  </div>
                </figure>
                <figure className="lockup-raster-preview__figure">
                  <figcaption className="asset-card-title">
                    the-music-tree-lockup-horizontal-dark.png
                  </figcaption>
                  <div className="lockup-raster-preview__plate lockup-raster-preview__plate--dark">
                    <img
                      src={lockupDarkPng}
                      alt=""
                      decoding="async"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </section>
        </div>
      )}

      {tab === "brand" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-brand"
          aria-labelledby="tab-brand"
        >
          <section className="section" aria-labelledby="brand-heading">
            <h2 id="brand-heading">Brand (dist/brand)</h2>
            {brandEntries.length === 0 ? (
              <p className="empty-note">
                No files matched. Run <code>npm run build</code> at the repository
                root so <code>dist/brand</code> exists.
              </p>
            ) : (
              <AssetGrid entries={brandEntries} variant="brand" />
            )}
          </section>
        </div>
      )}

      {tab === "banners" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-banners"
          aria-labelledby="tab-banners"
        >
          <section className="section" aria-labelledby="banners-heading">
            <h2 id="banners-heading">Banners (dist/banners)</h2>
            {bannerEntries.length === 0 ? (
              <p className="empty-note">
                No banner files in dist yet. Add rasters under{" "}
                <code>src/banners/&lt;project-slug&gt;/</code>, run a full library
                build, then refresh.
              </p>
            ) : (
              <AssetGrid entries={bannerEntries} variant="banners" />
            )}
          </section>
        </div>
      )}

      {tab === "favicons" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-favicons"
          aria-labelledby="tab-favicons"
        >
          <section className="section" aria-labelledby="favicons-heading">
            <h2 id="favicons-heading">Favicons (dist/favicons)</h2>
            {faviconEntries.length === 0 ? (
              <p className="empty-note">
                No favicon files matched. Run <code>npm run build</code> at the
                repository root.
              </p>
            ) : (
              <AssetGrid entries={faviconEntries} variant="favicons" />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
