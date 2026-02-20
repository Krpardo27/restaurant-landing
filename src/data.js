export const heroSlides = [
  {
    id: 1,
    title: "Las mejores pizzas artesanales",
    subtitle: "De la piedra a tu paladar",
    image: "pizzas/hero-1_wpoo1v",
  },
  {
    id: 2,
    title: "Ingredientes frescos todos los días",
    subtitle: "Directo del mercado a tu mesa",
    image: "pizzas/hero-2_velrr9",
  },
  {
    id: 3,
    title: "Salsas caseras y masa tradicional",
    subtitle: "Sabores que enamoran",
    image: "pizzas/hero-3_klbg0t",
  },
  {
    id: 4,
    title: "Recetas italianas con carácter",
    subtitle: "Tradición y fuego real",
    image: "pizzas/hero-4_mh6rsv",
  },
  {
    id: 5,
    title: "Una experiencia que se comparte",
    subtitle: "Pizzas hechas para disfrutar",
    image: "pizzas/hero-5_mp3iao",
  },
];

export const pizzas = [
  {
    id: 1,
    slug: "margherita-clasica",
    name: "Margherita Clásica",
    description: "Salsa de tomate, mozzarella fresca y albahaca.",
    longDescription:
      "La Margherita Clásica representa la esencia de la pizza italiana. Masa artesanal de fermentación lenta, salsa de tomate natural, mozzarella fresca y hojas de albahaca que aportan frescura y aroma.",
    ingredients: [
      "Salsa de tomate",
      "Mozzarella fresca",
      "Albahaca",
      "Aceite de oliva",
    ],
    price: "$8.990",
    image: "pizzas/margarita-clasica_w66vv1",
    category: "clasicas",
    spicy: false,
    vegan: false,
  },
  {
    id: 2,
    slug: "pepperoni-artesanal",
    name: "Pepperoni Artesanal",
    description: "Pepperoni premium, queso fundido y masa crujiente.",
    longDescription:
      "Nuestra pizza Pepperoni Artesanal combina un pepperoni seleccionado, queso mozzarella fundido y una base crujiente horneada a alta temperatura.",
    ingredients: ["Pepperoni", "Mozzarella", "Salsa de tomate"],
    price: "$10.990",
    image: "pizzas/pepperoni-artesanal_iab7ta",
    category: "especiales",
    spicy: true, // 🌶️
    vegan: false,
  },
  {
    id: 3,
    slug: "cuatro-quesos",
    name: "Cuatro Quesos",
    description: "Mozzarella, gorgonzola, parmesano y provolone.",
    longDescription:
      "Una combinación intensa y cremosa de cuatro quesos cuidadosamente seleccionados, perfecta para los amantes del sabor profundo y la textura fundida.",
    ingredients: ["Mozzarella", "Gorgonzola", "Parmesano", "Provolone"],
    price: "$11.990",
    image: "pizzas/pizza-cuatro-quesos_lhkmru",
    category: "clasicas",
    spicy: false,
    vegan: false,
  },
  {
    id: 4,
    slug: "prosciutto-rucula",
    name: "Prosciutto & Rúcula",
    description: "Jamón prosciutto, rúcula fresca y aceite de oliva.",
    longDescription:
      "Una pizza elegante y equilibrada: prosciutto de calidad, rúcula fresca y un toque de aceite de oliva sobre una base artesanal.",
    ingredients: ["Prosciutto", "Rúcula", "Mozzarella", "Aceite de oliva"],
    price: "$12.990",
    image: "pizzas/pizza-rucula_rtysov",
    category: "especiales",
    spicy: false,
    vegan: false,
  },
  {
    id: 5,
    slug: "aceitunas-alcaparras",
    name: "Aceitunas & Alcaparras",
    description: "Aceitunas negras, alcaparras y salsa de tomate.",
    longDescription:
      "Inspirada en sabores mediterráneos, esta pizza destaca por su carácter intenso y salino gracias a las aceitunas y alcaparras.",
    ingredients: ["Aceitunas", "Alcaparras", "Mozzarella", "Salsa de tomate"],
    price: "$12.990",
    image: "pizzas/pizza-aceitunas_w4gzxc",
    category: "especiales",
    spicy: false,
    vegan: false,
  },
  {
    id: 6,
    slug: "prosciutto-albahaca",
    name: "Prosciutto & Albahaca",
    description: "Prosciutto, mozzarella y albahaca fresca.",
    longDescription:
      "Una versión aromática del clásico prosciutto, combinada con mozzarella fundida y albahaca fresca.",
    ingredients: ["Prosciutto", "Mozzarella", "Albahaca"],
    price: "$12.990",
    image: "pizzas/pizza-albaca_veplo6",
    category: "especiales",
    spicy: false,
    vegan: false,
  },
  {
    id: 7,
    slug: "pizza-vegana",
    name: "Pizza Vegana",
    description: "Vegetales frescos y queso vegetal.",
    longDescription:
      "Pensada para quienes buscan una opción 100% vegetal, con ingredientes frescos y una base artesanal.",
    ingredients: [
      "Tomate",
      "Champiñones",
      "Pimentón",
      "Aceitunas",
      "Queso vegetal",
    ],
    price: "$12.990",
    image: "pizzas/pizza-2_agujte",
    category: "veganas",
    spicy: false,
    vegan: true, // 🌱
  },
  {
    id: 8,
    slug: "pizza-vegetariana",
    name: "Pizza Vegetariana",
    description: "Vegetales asados, mozzarella y salsa de tomate.",
    longDescription:
      "Una opción equilibrada y llena de color, con vegetales asados y mozzarella sobre nuestra clásica masa artesanal.",
    ingredients: ["Zapallo italiano", "Berenjena", "Pimentón", "Mozzarella"],
    price: "$12.990",
    image: "pizzas/pizza-vegetariana_qdtlqm",
    category: "clasicas",
    spicy: false,
    vegan: false,
  },
];

export const galleryImages = [
  {
    id: 1,
    image: "pizzas/hero-1_wpoo1v",
    alt: "Pizza artesanal recién horneada",
  },
  {
    id: 2,
    image: "pizzas/hero-2_velrr9",
    alt: "Detalle de masa y bordes crujientes",
  },
  {
    id: 3,
    image: "pizzas/hero-3_klbg0t",
    alt: "Ingredientes frescos sobre pizza",
  },
  {
    id: 4,
    image: "pizzas/hero-4",
    alt: "Pizza servida en mesa de madera",
  },
];
