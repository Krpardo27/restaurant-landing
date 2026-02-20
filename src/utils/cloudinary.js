const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD;
console.log(CLOUD);

export const cld = (id, w = 800) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w}/${id}`;

export const cldThumb = (id, w = 200) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w},h_${w}/${id}`;

export const cldDetail = (id, w = 1200) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w},h_800/${id}`;

export const cldSrcSet = (id) => `
  ${cld(id, 400)} 400w,
  ${cld(id, 600)} 600w,
  ${cld(id, 900)} 900w,
  ${cld(id, 1200)} 1200w,
  ${cld(id, 1600)} 1600w
`;

export const cldCardSrcSet = (id) => `
  ${cld(id, 300)} 300w,
  ${cld(id, 600)} 600w,
  ${cld(id, 900)} 900w
`;

export const cldSrcSetHero = (id) => `
  ${cld(id, 800)} 800w,
  ${cld(id, 1200)} 1200w,
  ${cld(id, 1600)} 1600w,
  ${cld(id, 2000)} 2000w,
  ${cld(id, 2600)} 2600w
`;

export const cldThumbSrcSet = (id) => `
  ${cldThumb(id, 80)} 80w,
  ${cldThumb(id, 160)} 160w,
  ${cldThumb(id, 240)} 240w
`;

export const cldDetailSrcSet = (id) => `
  ${cld(id, 600)} 600w,
  ${cld(id, 900)} 900w,
  ${cld(id, 1200)} 1200w,
  ${cld(id, 1600)} 1600w
`;
