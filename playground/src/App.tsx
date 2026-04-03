import {
  bannerAssets,
  brandAssets,
  faviconAssets,
} from "./distAssetGlobs";
import { AssetFigure } from "./AssetFigure";
import { Button, TheMusicTreeHorizontalLink } from "@behindthemusictree/assets/components";
import lockupDarkPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal-dark.png?url";
import lockupDefaultPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal.png?url";

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
        <code>playground/.env</code> for <code>npm run playground</code>). Raster and SVG previews
        use each file’s natural dimensions (wide assets scroll inside the card).
      </p>

      <section className="section" aria-labelledby="components-heading">
        <h2 id="components-heading">Components</h2>
        <div className="demo-row">
          <span className="demo-label">Button</span>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
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
  );
}
