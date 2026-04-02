import {
  bannerAssets,
  brandAssets,
  faviconAssets,
} from "./distAssetGlobs";
import { AssetFigure } from "./AssetFigure";
import {
  Button,
  getOrgSiteHref,
  TheMusicTreeByline,
} from "@behindthemusictree/assets/components";

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
  const orgHref = getOrgSiteHref();

  return (
    <div className="playground">
      <h1>@behindthemusictree/assets</h1>
      <p>
        Local catalog: npm pack contents under{" "}
        <code>node_modules/…/dist/</code>. Run <code>npm run build</code> at
        the repo root, then refresh. Raster and SVG previews use each file’s
        natural dimensions (wide assets scroll inside the card).
      </p>

      <section className="section" aria-labelledby="components-heading">
        <h2 id="components-heading">Components</h2>
        <div className="demo-row">
          <span className="demo-label">Button</span>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
        <div className="demo-row">
          <span className="demo-label">TheMusicTreeByline</span>
          <TheMusicTreeByline href={orgHref} />
        </div>
        <div className="asset-strip-dark">
          <span className="demo-label">TheMusicTreeByline on dark</span>
          <div className="demo-row">
            <TheMusicTreeByline href={orgHref} variant="onDark" />
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
