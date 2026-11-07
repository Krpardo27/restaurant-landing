import { FaWhatsapp } from "react-icons/fa";
import { CATEGORY_META, menuSections } from "../data";
import { cldCard, cldCardSrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";
import { getImageAlt } from "../utils/menuImageSources";
import ImageCredit from "../components/ImageCredit";

const PHONE = "56912345678";
const BADGES = [
  { key: "vegan", label: "Vegano", className: "text-emerald-300" },
  { key: "spicy", label: "Picante", className: "text-red-300" },
  { key: "popular", label: "Popular", className: "text-amber-200" },
];

const MenuSection = ({
  type,
  mesa,
  onSelectItem,
  hideHeader = false,
  items: providedItems,
}) => {
  const original = menuSections[type]?.items ?? [];
  const items = providedItems ?? original;

  if (!items.length) return null;

  const currentCategory = !hideHeader ? CATEGORY_META[type] : null;

  return (
    <section className="bg-[#11100f] text-stone-100">
      {!hideHeader && currentCategory && (
        <header className="max-w-2xl pb-6 pt-8 sm:pb-8 sm:pt-12">
          <h2 className="mb-3 font-serif text-3xl leading-tight sm:text-4xl">
            {currentCategory.title}
          </h2>
          <p className="border-l-2 border-red-600 pl-4 text-sm leading-relaxed text-stone-400 sm:text-base">
            {currentCategory.description}
          </p>
        </header>
      )}

      <div className="grid auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((product) => {
          const hasMesa = mesa !== undefined && mesa !== null && mesa !== "";
          const message = hasMesa
            ? `Hola, estoy en la mesa ${mesa} y quiero ${product.name}`
            : `Hola, quiero ${product.name}`;
          const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
          const summary =
            product.description || product.ingredients?.join(" · ");

          return (
            <article
              key={product.id}
              className="flex h-full min-w-0 flex-col rounded-lg border border-stone-800 bg-[#1b1917] p-4 sm:p-5"
            >
              <div className="flex flex-1 items-start gap-4">
                <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-md border border-stone-800 bg-stone-800/40 sm:h-28 sm:w-28">
                  <img
                    src={
                      product.image
                        ? cldCard(product.image, 320)
                        : "/images/placeholder.svg"
                    }
                    srcSet={
                      product.image ? cldCardSrcSet(product.image) : undefined
                    }
                    sizes="(min-width: 640px) 112px, 88px"
                    width={112}
                    height={112}
                    onError={imageFallback}
                    alt={getImageAlt(product.image, product.name)}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${product.category === "bebidas" ? "product-image--contain" : "object-cover"}`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-serif text-lg leading-snug text-stone-100 sm:text-xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 break-words text-base font-semibold tabular-nums text-red-400">
                    {product.price}
                  </p>
                  {summary && (
                    <p className="mt-2 line-clamp-3 break-words text-sm leading-relaxed text-stone-400">
                      {summary}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium empty:hidden">
                    {BADGES.filter((badge) => product[badge.key]).map((badge) => (
                      <span key={badge.key} className={badge.className}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ImageCredit image={product.image} />
              <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800 pt-3">
                <button
                  type="button"
                  onClick={() => onSelectItem(product)}
                  aria-label={`Ver detalle de ${product.name}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-700 px-3 py-2 text-sm font-medium text-stone-200 hover:border-stone-500 hover:bg-stone-800 hover:text-white"
                >
                  Ver detalle
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  <FaWhatsapp aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Pedir
                </a>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MenuSection;
