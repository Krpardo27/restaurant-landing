import { getImageCreditsUrl } from "../utils/menuImageSources";

const ImageCredit = ({ image }) => {
  const href = getImageCreditsUrl(image);
  if (!href) return null;
  return (
    <p className="image-credit">
      Foto ilustrativa · <a href={href} target="_blank" rel="noopener noreferrer">Fuente y licencia</a>
    </p>
  );
};

export default ImageCredit;
