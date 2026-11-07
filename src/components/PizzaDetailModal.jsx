import { useEffect, useId, useRef } from "react";
import { FiArrowUpRight, FiHash, FiList, FiX } from "react-icons/fi";
import { FaLeaf, FaPepperHot, FaWhatsapp } from "react-icons/fa";
import { cldDetail, cldDetailSrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";
import { getImageAlt } from "../utils/menuImageSources";
import ImageCredit from "./ImageCredit";
import "../styles/product-modal.css";

const PHONE = "56912345678";

const isBackdropPointer = (event) => {
  if (event.target !== event.currentTarget) return false;
  const bounds = event.currentTarget.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
};

const ProductBadges = ({ product }) => {
  if (!product.spicy && !product.vegan) return null;
  return (
    <ul className="product-modal-badges" aria-label="Características del producto">
      {product.spicy && <li className="product-badge-spicy"><FaPepperHot aria-hidden="true" /> Picante</li>}
      {product.vegan && <li className="product-badge-vegan"><FaLeaf aria-hidden="true" /> Vegano</li>}
    </ul>
  );
};

const PizzaDetailModal = ({ pizza, mesa, onClose }) => {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const closeCallbackRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => { closeCallbackRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!pizza || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    const activeElement = document.activeElement;
    const trigger = activeElement !== document.body ? activeElement : document.querySelector('[role="tab"][aria-selected="true"]');
    let backdropStart = false;
    const handlePointerDown = (event) => { backdropStart = isBackdropPointer(event); };
    const handlePointerCancel = () => { backdropStart = false; };
    const handleBackdropClick = (event) => {
      const startedOutside = backdropStart;
      backdropStart = false;
      if (startedOutside && isBackdropPointer(event)) closeCallbackRef.current?.();
    };
    dialog.addEventListener("pointerdown", handlePointerDown);
    dialog.addEventListener("pointercancel", handlePointerCancel);
    dialog.addEventListener("click", handleBackdropClick);
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    if (contentRef.current) contentRef.current.scrollTop = 0;
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.removeEventListener("pointerdown", handlePointerDown);
      dialog.removeEventListener("pointercancel", handlePointerCancel);
      dialog.removeEventListener("click", handleBackdropClick);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
      else document.querySelector('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
    };
  }, [pizza]);

  if (!pizza) return null;

  const name = pizza.name || "Detalle del producto";
  const table = mesa == null ? "" : String(mesa).trim();
  const description = pizza.longDescription || pizza.description;
  const ingredients = Array.isArray(pizza.ingredients) ? pizza.ingredients.filter(Boolean) : [];
  const isDrink = pizza.category === "bebidas";
  const message = table
    ? `Hola, estoy en la mesa ${table} y quiero pedir ${name}.`
    : `Hola, quiero pedir ${name}.`;

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  const handleClose = () => {
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className="menu-product-dialog product-modal"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-modal="true"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          handleClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
    >
      <header className="product-modal-header">
        <div className="product-modal-heading">
          <p className="product-modal-eyebrow">Detalle de la carta</p>
          <h2 id={titleId} ref={titleRef} tabIndex={-1} className="product-modal-title">{name}</h2>
          {table && <p className="product-modal-table"><FiHash aria-hidden="true" /> Mesa {table}</p>}
        </div>
        <button
          type="button"
          aria-label="Cerrar detalle del producto"
          onClick={handleClose}
          className="product-modal-close"
        >
          <FiX aria-hidden="true" />
        </button>
      </header>

      <div ref={contentRef} className="product-modal-body">
        <div className={`product-modal-photo${isDrink ? " product-modal-photo-drink" : ""}`}>
          <img
            onError={imageFallback}
            src={cldDetail(pizza.image, 960)}
            srcSet={cldDetailSrcSet(pizza.image)}
            sizes="(max-width: 640px) calc(100vw - 24px), 560px"
            width={960}
            height={720}
            alt={getImageAlt(pizza.image, pizza.image ? `Imagen de ${name}` : `Imagen no disponible para ${name}`)}
            decoding="async"
          />
        </div>
        <div className="product-modal-content">
          <ImageCredit image={pizza.image} />
          {description && <p id={descriptionId} className="product-modal-description">{description}</p>}
          <ProductBadges product={pizza} />
          {ingredients.length > 0 && (
            <section className="product-modal-ingredients" aria-label="Ingredientes del producto">
              <h3><FiList aria-hidden="true" /> Ingredientes</h3>
              <ul>{ingredients.map((ingredient, index) => <li key={`${index}-${ingredient}`}>{ingredient}</li>)}</ul>
            </section>
          )}
        </div>
      </div>

      <footer className="product-modal-footer">
        <p className="product-modal-price"><span>Precio</span><strong>{pizza.price || "Consultar"}</strong></p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="product-modal-order" aria-label={`Pedir ${name} por WhatsApp (abre otra pestaña)`}>
          <FaWhatsapp aria-hidden="true" /> Pedir por WhatsApp <FiArrowUpRight aria-hidden="true" />
        </a>
      </footer>
    </dialog>
  );
};

export default PizzaDetailModal;