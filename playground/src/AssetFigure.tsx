import { useState } from "react";

type AssetFigureProps = {
  url: string;
  label: string;
  variant: "brand" | "banners" | "favicons";
};

export function AssetFigure({ url, label, variant }: AssetFigureProps) {
  const [dims, setDims] = useState<string | null>(null);

  return (
    <figure className={`asset-card asset-card--${variant}`}>
      <div className="asset-card-preview">
        <img
          src={url}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={(e) => {
            const el = e.currentTarget;
            setDims(`${el.naturalWidth} × ${el.naturalHeight} px`);
          }}
        />
      </div>
      <figcaption>
        <div className="asset-card-title">{label}</div>
        {dims ? <div className="asset-card-dims">{dims}</div> : null}
      </figcaption>
    </figure>
  );
}
