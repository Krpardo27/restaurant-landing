import { isLocalImage, localImageSrcSet, resolveLocalImage } from "./menuImageSources.js";

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD;

const BASE = (id, opts, width) => {
  if (!id) return "/images/placeholder.svg";
  return resolveLocalImage(id, width) || `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:eco,dpr_auto/${opts}/${id}`;
};

const sourceSet = (id, widths, build) => {
  if (!id || isLocalImage(id)) return localImageSrcSet(id);
  return widths.map((width) => `${build(id, width)} ${width}w`).join(", ");
};

export const cldHero = (id, w = 1600) =>
  BASE(id, `c_fill,g_auto,ar_16:9,w_${w}`, w);

export const cldHeroSrcSet = (id) => sourceSet(id, [640, 960, 1280, 1600], cldHero);

export const cldCard = (id, w = 360) =>
  BASE(id, `c_fill,g_auto,ar_4:3,w_${w}`, w);

export const cldCardSrcSet = (id) => sourceSet(id, [240, 320, 480, 640], cldCard);

export const cldThumb = (id, w = 160) =>
  BASE(id, `c_fill,g_auto,w_${w},h_${w}`, w);

export const cldThumbSrcSet = (id) => sourceSet(id, [80, 120, 160, 240], cldThumb);

export const cldGallery = (id, w = 1200) =>
  BASE(id, `c_fill,g_auto,ar_4:3,w_${w}`, w);

export const cldGallerySrcSet = (id) => sourceSet(id, [480, 800, 1200, 1600], cldGallery);

export const cldDetail = (id, w = 1200) =>
  BASE(id, `c_fill,g_auto,ar_4:3,w_${w}`, w);

export const cldDetailSrcSet = (id) => sourceSet(id, [600, 900, 1200, 1600], cldDetail);