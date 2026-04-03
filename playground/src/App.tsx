import { useState } from "react";
import {
  bannerAssets,
  brandAssets,
  faviconAssets,
} from "./distAssetGlobs";
import { AssetFigure } from "./AssetFigure";
import {
  BtmtSponsorButton,
  Button,
  TheMusicTreeHorizontalLink,
  socialBrandIconClass,
} from "@behindthemusictree/assets/components";
import lockupDarkPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal-dark.png?url";
import lockupDefaultPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal.png?url";
import { getPlaygroundSocialLinks } from "./playgroundSocialEnv";

type CatalogTab = "components" | "brand" | "banners" | "favicons";

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
  const socialLinks = getPlaygroundSocialLinks();
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
        <code>playground/.env</code> for <code>npm run playground</code>). Social icon targets (
        <code>ORG_GITHUB_URL</code>, <code>ORG_LINKEDIN_URL</code>, <code>ORG_MASTODON_URL</code>,{" "}
        <code>CONTACT_EMAIL</code>, <code>ORG_PYPI_URL</code>, etc.) are required in{" "}
        <code>playground/.env</code> (or the shell) for root <code>npm run build</code> and are
        inlined by Vite for this catalog. **BtmtSponsorButton** uses <code>ORG_SPONSOR_BUTTON_URL</code>{" "}
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
                  If the iframe is missing, the linked package was built without{" "}
                  <code>ORG_SPONSOR_BUTTON_URL</code>; set it in <code>playground/.env</code> and run{" "}
                  <code>npm run build</code> at the repo root (or <code>npm run playground</code>),
                  then refresh.
                </p>
              </div>
            </div>
            <div className="demo-row">
              <span className="demo-label">
                SocialIcons — required URLs from <code>playground/.env</code> (Vite dev/build)
              </span>
              <div className="social-links-demo">
                {socialLinks.map(({ key, href, label, Icon }) => {
                  const external = !href.startsWith("mailto:");
                  return (
                    <a
                      key={key}
                      className="social-link-btn"
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" as const }
                        : {})}
                      aria-label={label}
                      title={label}
                    >
                      <Icon className={socialBrandIconClass} />
                    </a>
                  );
                })}
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
