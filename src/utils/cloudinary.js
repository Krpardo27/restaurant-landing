const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD;

<<<<<<< HEAD
export const cld = (id, w = 800) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,q_auto:eco,w_${w}/${id}`;

export const cldThumb = (id, w = 200) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,q_auto:eco,w_${w},h_${w}/${id}`;

export const cldDetail = (id, w = 1200) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,q_auto:eco,w_${w},h_800/${id}`;
=======
const BASE = (id, opts) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,dpr_auto,q_auto:eco,c_fill,g_auto/${opts}/${id}`;
export const cldHero = (id, w = 1600) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,dpr_auto,q_auto:eco,c_fill,g_auto,ar_16:9,w_${w}/${id}`;

export const cldThumb = (id, w = 160) => BASE(id, `w_${w},h_${w},q_auto:low`);

export const cldDetail = (id, w = 1200) =>
  BASE(id, `w_${w},ar_4:3,q_auto:good`);
>>>>>>> ab482a67f33b30ec482af3d610f94ae2a2d5ce28

export const cldCard = (id, w = 360) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,g_auto,ar_4:3,w_${w}/${id}`;

export const cldCardSrcSet = (id) => `
${cldCard(id, 240)} 240w,
${cldCard(id, 320)} 320w,
${cldCard(id, 480)} 480w,
${cldCard(id, 640)} 640w
`;

export const cldHeroSrcSet = (id) => `
${cldHero(id, 800)} 800w,
${cldHero(id, 1200)} 1200w,
${cldHero(id, 1600)} 1600w,
${cldHero(id, 2000)} 2000w
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
