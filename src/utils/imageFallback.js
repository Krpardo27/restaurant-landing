export const imageFallback = (event) => {
  const image = event.currentTarget;
  // Remove srcset too, otherwise the browser retries the broken remote source.
  if (image.dataset.fallback === "true") return;
  image.dataset.fallback = "true";
  image.removeAttribute("srcset");
  image.removeAttribute("sizes");
  image.src = "/images/placeholder.svg";
};