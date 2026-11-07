import { menuImages } from "../data/menuImages.js";

export const isLocalImage = (source) => typeof source === "string" && source.startsWith("/") && !source.startsWith("//");

export const resolveLocalImage = (source, width = Infinity) => {
  if (!isLocalImage(source)) return undefined;
  const image = menuImages[source];
  if (!image) return source;
  const variants = image.variants;
  const requestedWidth = Number.isFinite(width) && width > 0 ? width : Infinity;
  return (variants.find((variant) => variant.width >= requestedWidth) || variants[variants.length - 1]).src;
};

export const localImageSrcSet = (source) => {
  const image = menuImages[source];
  return image?.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
};

export const getImageAlt = (source, fallback) => menuImages[source]?.alt || fallback;

export const getImageCreditsUrl = (source) => {
  const image = menuImages[source];
  return image ? `/menu/credits.html#${image.creditId}` : undefined;
};
