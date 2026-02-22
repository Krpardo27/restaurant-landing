const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD;

const BASE = (id, opts) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,dpr_auto,c_fill,g_auto/${opts}/${id}`;

export const cldHero = (id, w = 1600) => BASE(id, `ar_16:9,w_${w},q_auto:good`);

export const cldThumb = (id, w = 160) => BASE(id, `w_${w},h_${w},q_auto:low`);

export const cldDetail = (id, w = 1200) =>
  BASE(id, `w_${w},ar_4:3,q_auto:good`);

export const cldCard = (id, w = 360) => BASE(id, `ar_4:3,w_${w}`);

export const cldCardSrcSet = (id) => `
${cldCard(id, 240)} 240w,
${cldCard(id, 320)} 320w,
${cldCard(id, 480)} 480w,
${cldCard(id, 640)} 640w
`;

export const cldHeroSrcSet = (id) => `
${cldHero(id, 640)} 640w,
${cldHero(id, 960)} 960w,
${cldHero(id, 1280)} 1280w,
${cldHero(id, 1600)} 1600w
`;

export const cldThumbSrcSet = (id) => `
  ${cldThumb(id, 80)} 80w,
  ${cldThumb(id, 160)} 160w,
  ${cldThumb(id, 240)} 240w
`;

export const cldGallery = (id, w = 800) =>
  BASE(id, `w_${w},ar_4:3,q_auto:good`);

export const cldGallerySrcSet = (id) => `
${cldGallery(id, 480)} 480w,
${cldGallery(id, 800)} 800w,
${cldGallery(id, 1200)} 1200w,
${cldGallery(id, 1600)} 1600w
`;

export const cldDetailSrcSet = (id) => `
  ${cldDetail(id, 600)} 600w,
  ${cldDetail(id, 900)} 900w,
  ${cldDetail(id, 1200)} 1200w,
  ${cldDetail(id, 1600)} 1600w
`;
