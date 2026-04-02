export const brandAssets = import.meta.glob(
  "../node_modules/@behindthemusictree/assets/dist/brand/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export const bannerAssets = import.meta.glob(
  "../node_modules/@behindthemusictree/assets/dist/banners/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export const faviconAssets = import.meta.glob(
  "../node_modules/@behindthemusictree/assets/dist/favicons/**/*.{svg,png,ico,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
