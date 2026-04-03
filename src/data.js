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
    image: "pizzas/hero-4_mh6rsv",
    alt: "Pizza servida en mesa de madera",
  },
];

export const MENU_CATEGORIES = [
  { label: "Antipasti", key: "antipasti" },
  { label: "Pizzas", key: "pizzas" },
  { label: "Pastas", key: "pastas" },
  { label: "Risottos", key: "risottos" },
  { label: "Postres", key: "postres" },
  { label: "Bebidas", key: "bebidas" },
  { label: "Adicionales", key: "adicionales" },
  { label: "Peri Bambini", key: "bambini" },
];

export const CATEGORY_META = {
  pizzas: {
    title: "Pizzas 🍕",
    description:
      "Pizzas artesanales con masa de fermentación lenta e ingredientes frescos.",
  },
  antipasti: {
    title: "Antipasti 🧀",
    description:
      "Entradas italianas perfectas para comenzar tu experiencia.",
  },
  pastas: {
    title: "Pastas 🍝",
    description:
      "Pastas frescas con recetas tradicionales italianas.",
  },
  risottos: {
    title: "Risottos 🍚",
    description:
      "Cremosos risottos preparados al estilo clásico italiano.",
  },
  postres: {
    title: "Postres 🍰",
    description:
      "El final perfecto con dulces irresistibles.",
  },
  bebidas: {
    title: "Bebidas 🥤",
    description:
      "Refrescos y acompañamientos para tu comida.",
  },
  adicionales: {
    title: "Adicionales ➕",
    description:
      "Complementos para personalizar tu pedido.",
  },
  bambini: {
    title: "Peri Bambini 👶",
    description:
      "Opciones pensadas especialmente para los más pequeños.",
  },
};

// PIZZAS - Convertidas a string IDs
export const pizzas = [
  {
    id: "margherita-clasica",
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
    category: "pizzas",
    spicy: false,
    vegan: false,
  },
  {
    id: "pepperoni-artesanal",
    slug: "pepperoni-artesanal",
    name: "Pepperoni Artesanal",
    description: "Pepperoni premium, queso fundido y masa crujiente.",
    longDescription:
      "Nuestra pizza Pepperoni Artesanal combina un pepperoni seleccionado, queso mozzarella fundido y una base crujiente horneada a alta temperatura.",
    ingredients: ["Pepperoni", "Mozzarella", "Salsa de tomate"],
    price: "$10.990",
    image: "pizzas/pepperoni-artesanal_iab7ta",
    category: "pizzas",
    spicy: true,
    vegan: false,
  },
  {
    id: "cuatro-quesos",
    slug: "cuatro-quesos",
    name: "Cuatro Quesos",
    description: "Mozzarella, gorgonzola, parmesano y provolone.",
    longDescription:
      "Una combinación intensa y cremosa de cuatro quesos cuidadosamente seleccionados, perfecta para los amantes del sabor profundo y la textura fundida.",
    ingredients: ["Mozzarella", "Gorgonzola", "Parmesano", "Provolone"],
    price: "$11.990",
    image: "pizzas/pizza-cuatro-quesos_lhkmru",
    category: "pizzas",
    spicy: false,
    vegan: false,
  },
  {
    id: "prosciutto-rucula",
    slug: "prosciutto-rucula",
    name: "Prosciutto & Rúcula",
    description: "Jamón prosciutto, rúcula fresca y aceite de oliva.",
    longDescription:
      "Una pizza elegante y equilibrada: prosciutto de calidad, rúcula fresca y un toque de aceite de oliva sobre una base artesanal.",
    ingredients: ["Prosciutto", "Rúcula", "Mozzarella", "Aceite de oliva"],
    price: "$12.990",
    image: "pizzas/pizza-rucula_rtysov",
    category: "pizzas",
    spicy: false,
    vegan: false,
  },
  {
    id: "aceitunas-alcaparras",
    slug: "aceitunas-alcaparras",
    name: "Aceitunas & Alcaparras",
    description: "Aceitunas negras, alcaparras y salsa de tomate.",
    longDescription:
      "Inspirada en sabores mediterráneos, esta pizza destaca por su carácter intenso y salino gracias a las aceitunas y alcaparras.",
    ingredients: ["Aceitunas", "Alcaparras", "Mozzarella", "Salsa de tomate"],
    price: "$12.990",
    image: "pizzas/pizza-aceitunas_w4gzxc",
    category: "pizzas",
    spicy: false,
    vegan: false,
  },
  {
    id: "prosciutto-albahaca",
    slug: "prosciutto-albahaca",
    name: "Prosciutto & Albahaca",
    description: "Prosciutto, mozzarella y albahaca fresca.",
    longDescription:
      "Una versión aromática del clásico prosciutto, combinada con mozzarella fundida y albahaca fresca.",
    ingredients: ["Prosciutto", "Mozzarella", "Albahaca"],
    price: "$12.990",
    image: "pizzas/pizza-albaca_veplo6",
    category: "pizzas",
    spicy: false,
    vegan: false,
  },
  {
    id: "pizza-vegana",
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
    category: "pizzas",
    spicy: false,
    vegan: true,
  },
  {
    id: "pizza-vegetariana",
    slug: "pizza-vegetariana",
    name: "Pizza Vegetariana",
    description: "Vegetales asados, mozzarella y salsa de tomate.",
    longDescription:
      "Una opción equilibrada y llena de color, con vegetales asados y mozzarella sobre nuestra clásica masa artesanal.",
    ingredients: ["Zapallo italiano", "Berenjena", "Pimentón", "Mozzarella"],
    price: "$12.990",
    image: "pizzas/pizza-vegetariana_qdtlqm",
    category: "pizzas",
    spicy: false,
    vegan: false,
  },
];

// POSTRES - Unificados
export const postres = [
  {
    id: "angioletti-nutella",
    slug: "angioletti-nutella",
    name: "Angioletti Fritti con Nutella",
    description:
      "Masa de pizza frita cubierta de Nutella, azúcar flor y pistacho granulado (12 unid)",
    longDescription:
      "Nuestros tradicionales angioletti fritos, cubiertos con Nutella, espolvoreados con azúcar flor y pistacho granulado. Perfectos para compartir.",
    ingredients: [
      "Masa de pizza",
      "Nutella",
      "Azúcar flor",
      "Pistacho granulado",
    ],
    price: "$13.900",
    image: "postres/angioletti-nutella",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "mini-angioletti-nutella",
    slug: "mini-angioletti-nutella",
    name: "MINI Angioletti Fritti con Nutella",
    description:
      "Masa de pizza cubierta de Nutella, azúcar flor y pistacho granulado (6 unid)",
    longDescription:
      "Versión mini de nuestros angioletti fritos, ideales para una porción individual.",
    ingredients: [
      "Masa de pizza",
      "Nutella",
      "Azúcar flor",
      "Pistacho granulado",
    ],
    price: "$6.900",
    image: "postres/mini-angioletti-nutella",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "cannoli-alleria",
    slug: "cannoli-alleria",
    name: "Cannoli Alleria",
    description:
      "Masa dulce con vino Marsala y canela, relleno de tiramisú y Nutella, decorado con cacao y chocolate",
    longDescription:
      "Nuestra versión especial del cannoli siciliano, relleno con una deliciosa combinación de tiramisú y Nutella.",
    ingredients: [
      "Masa de cannoli",
      "Tiramisú",
      "Nutella",
      "Cacao",
      "Chocolate",
    ],
    price: "$9.900",
    image: "postres/cannoli-alleria",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "cannoli-pistacho",
    slug: "cannoli-pistacho",
    name: "Cannoli di Pistacho",
    description:
      "Masa dulce con vino Marsala y canela, relleno de crema de pistacho",
    longDescription:
      "Cannoli siciliano relleno con una crema suave de pistacho, decorado con pistacho granulado.",
    ingredients: ["Masa de cannoli", "Crema de pistacho", "Pistacho granulado"],
    price: "$9.900",
    image: "postres/cannoli-pistacho",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "cannoli-mixto",
    slug: "cannoli-mixto",
    name: "Cannolis 2 Sabores",
    description: "Un cannoli di Pistacho y un cannoli Alleria",
    longDescription:
      "La mejor combinación para probar ambos sabores: pistacho y Alleria en un solo pedido.",
    ingredients: ["Cannoli de pistacho", "Cannoli Alleria"],
    price: "$9.900",
    image: "postres/cannoli-mixto",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "gelato-frutos-rojos",
    slug: "gelato-frutos-rojos",
    name: "Gelato Fior di Latte",
    description: "Helado artesanal con mermelada de frutos rojos",
    longDescription:
      "Cremoso helado de leche artesanal acompañado de mermelada casera de frutos rojos.",
    ingredients: ["Helado de leche", "Mermelada de frutos rojos"],
    price: "$4.700",
    image: "postres/gelato-frutos-rojos",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "gelato-amaretto",
    slug: "gelato-amaretto",
    name: "Gelato de Amaretto",
    description:
      "Helado artesanal con caramelo salado y pralines de frutos secos",
    longDescription:
      "Helado con licor Amaretto, bañado en caramelo salado y decorado con pralines de frutos secos.",
    ingredients: [
      "Helado de Amaretto",
      "Caramelo salado",
      "Pralines de frutos secos",
    ],
    price: "$4.700",
    image: "postres/gelato-amaretto",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "gelato-vainilla",
    slug: "gelato-vainilla",
    name: "Helado de Vainilla Francesa",
    description: "Helado artesanal de vainilla",
    longDescription:
      "Clásico helado de vainilla francesa, elaborado con extracto natural de vainilla.",
    ingredients: ["Helado de vainilla"],
    price: "$4.500",
    image: "postres/gelato-vainilla",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "gelato-pistacho",
    slug: "gelato-pistacho",
    name: "Gelato de Pistacho",
    description: "Gelato de pistacho con frutillas y pistacho granulado",
    longDescription:
      "Helado cremoso de pistacho acompañado de frutillas frescas y pistacho granulado.",
    ingredients: ["Helado de pistacho", "Frutillas", "Pistacho granulado"],
    price: "$4.700",
    image: "postres/gelato-pistacho",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "gelato-menta",
    slug: "gelato-menta",
    name: "Gelato Menta Cioccolato",
    description: "Helado cremoso de menta, chocolate y Nutella",
    longDescription:
      "Refrescante helado de menta con trozos de chocolate y un toque de Nutella.",
    ingredients: ["Helado de menta", "Chocolate", "Nutella"],
    price: "$4.700",
    image: "postres/gelato-menta",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "gelato-caramelo",
    slug: "gelato-caramelo",
    name: "Gelato Caramello Salato",
    description: "Helado artesanal de caramelo salado con nueces",
    longDescription:
      "Helado con caramelo salado artesanal y trozos de nueces crocantes.",
    ingredients: ["Helado de caramelo", "Caramelo salado", "Nueces"],
    price: "$4.700",
    image: "postres/gelato-caramelo",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "tiramisu-clasico",
    slug: "tiramisu-clasico",
    name: "Tiramisú clásico",
    description: "Postre italiano con mascarpone, café y cacao (1 persona)",
    longDescription:
      "El auténtico tiramisú italiano con capas de mascarpone, café y cacao en polvo.",
    ingredients: ["Mascarpone", "Café", "Cacao", "Savoiardi"],
    price: "$6.400",
    image: "postres/tiramisu-clasico",
    category: "postres",
    spicy: false,
    vegan: false,
  },
  {
    id: "tiramisu-alleria",
    slug: "tiramisu-alleria",
    name: "Tiramisú Alleria",
    description: "Tiramisú clásico con Nutella y galletas savoiardi",
    longDescription:
      "Nuestra versión especial del tiramisú, con Nutella y galletas savoiardi.",
    ingredients: ["Mascarpone", "Café", "Nutella", "Savoiardi", "Cacao"],
    price: "$6.400",
    image: "postres/tiramisu-alleria",
    category: "postres",
    spicy: false,
    vegan: false,
  },
];

// ANTIPASTI - Unificados
export const antipasti = [
  {
    id: "arancini",
    slug: "arancini",
    name: "Arancini di Riso",
    description:
      "Albóndiga de risotto apanada, rellena con carne premium en salsa Ragú Bolognesa, Mozzarella Fior di Latte y vegetales (4 und)",
    longDescription:
      "Nuestros arancini son bolas de risotto rellenas con ragú bolognesa, mozzarella y vegetales, empanizadas y fritas hasta obtener un exterior crocante.",
    ingredients: [
      "Risotto",
      "Ragú Bolognesa",
      "Mozzarella",
      "Vegetales",
      "Pan rallado",
    ],
    price: "$13.400",
    image: "antipasti/arancini",
    category: "antipasti",
    spicy: false,
    vegan: false,
  },
  {
    id: "montanara",
    slug: "montanara",
    name: "Montanara Napolitana",
    description:
      "Masa de pizza frita con pomodoro San Marzano, ajo, albahaca, Grana Padano, pesto genovese y albahaca fresca (2 unid)",
    longDescription:
      "Pizza frita al estilo napolitano, cubierta con tomate San Marzano, pesto genovese y queso Grana Padano.",
    ingredients: [
      "Masa de pizza",
      "Tomate San Marzano",
      "Ajo",
      "Albahaca",
      "Grana Padano",
      "Pesto genovese",
    ],
    price: "$9.400",
    image: "antipasti/montanara",
    category: "antipasti",
    spicy: false,
    vegan: false,
  },
  {
    id: "bruschetta-mortadella",
    slug: "bruschetta-mortadella",
    name: "Bruschetta di Mortadella",
    description:
      "Pan artesanal con mortadella de pistacho, mozzarella de búfala, pesto, tomate deshidratado y Grana Padano (2 und)",
    longDescription:
      "Bruschetta artesanal con mortadella de pistacho, mozzarella de búfala y tomates deshidratados.",
    ingredients: [
      "Pan artesanal",
      "Mortadella de pistacho",
      "Mozzarella de búfala",
      "Pesto",
      "Tomate deshidratado",
      "Grana Padano",
    ],
    price: "$11.200",
    image: "antipasti/bruschetta-mortadella",
    category: "antipasti",
    spicy: false,
    vegan: false,
  },
  {
    id: "bruschetta-fiorentina",
    slug: "bruschetta-fiorentina",
    name: "Bruschetta Fiorentina",
    description:
      "Pan artesanal con ricota, coppa italiana crocante, champiñón y pimienta",
    longDescription:
      "Bruschetta toscana con ricota cremosa, coppa crocante y champiñones salteados.",
    ingredients: [
      "Pan artesanal",
      "Ricota",
      "Coppa italiana",
      "Champiñón",
      "Pimienta",
    ],
    price: "$11.200",
    image: "antipasti/bruschetta-fiorentina",
    category: "antipasti",
    spicy: false,
    vegan: false,
  },
  {
    id: "rosticceria",
    slug: "rosticceria",
    name: "Rosticceria para dos personas",
    description:
      "Incluye croquetas de papa y arancini rellenos con mozzarella y ragú bolognesa",
    longDescription:
      "Selección de nuestros mejores antipasti para compartir: croquetas de papa y arancini rellenos.",
    ingredients: [
      "Croquetas de papa",
      "Arancini con mozzarella",
      "Arancini con ragú",
    ],
    price: "$12.700",
    image: "antipasti/rosticceria",
    category: "antipasti",
    spicy: false,
    vegan: false,
  },
  {
    id: "antipasti-tabla",
    slug: "antipasti-tabla",
    name: "Antipasti para dos",
    description:
      "Tabla italiana con rúcula, mortadella, prosciutto, gorgonzola, burrata, nueces, miel, vegetales y aceite de oliva",
    longDescription:
      "Una experiencia completa de sabores italianos: tabla con embutidos, quesos, vegetales y acompañamientos.",
    ingredients: [
      "Rúcula",
      "Mortadella",
      "Prosciutto",
      "Gorgonzola",
      "Burrata",
      "Nueces",
      "Miel",
      "Vegetales",
      "Aceite de oliva",
    ],
    price: "$24.390",
    image: "antipasti/antipasti-tabla",
    category: "antipasti",
    spicy: false,
    vegan: false,
  },
];

// PASTAS - Ya están bien, solo ajustamos IDs como string
export const pastas = [
  {
    id: "gnocchi-sorrentina",
    slug: "gnocchi-sorrentina",
    name: "Gnocchi alla Sorrentina",
    description:
      "Gnocchi de papa en salsa Ragú con Mozzarella Fior Di Latte y Grana Padano.",
    longDescription:
      "Deliciosos gnocchi de papa caseros bañados en nuestra salsa Ragú tradicional, gratinados con Mozzarella Fior Di Latte y espolvoreados con Grana Padano. Un clásico italiano que reconforta el alma.",
    ingredients: [
      "Gnocchi de papa",
      "Salsa Ragú",
      "Mozzarella Fior Di Latte",
      "Grana Padano",
    ],
    price: "$21.400",
    image: "pastas/gnocchi-sorrentina",
    category: "pastas",
    spicy: false,
    vegan: false,
  },
  {
    id: "gnocchi-pesto",
    slug: "gnocchi-pesto",
    name: "Gnocchi alla Pesto",
    description:
      "Masa de papa en pesto genovese, mozzarella fundida y hongos porcini.",
    longDescription:
      "Gnocchi de papa acompañados de nuestro pesto genovese artesanal, mozzarella fundida y hongos porcini salteados. Una explosión de sabores mediterráneos.",
    ingredients: [
      "Gnocchi de papa",
      "Pesto genovese",
      "Mozzarella",
      "Hongos porcini",
    ],
    price: "$21.400",
    image: "pastas/gnocchi-pesto",
    category: "pastas",
    spicy: false,
    vegan: false,
  },
  {
    id: "gnocchi-formaggi",
    slug: "gnocchi-quatro-formaggi",
    name: "Gnocchi quattro formaggi",
    description:
      "Gnocchi con gorgonzola, provolone, grana padano y mozzarella.",
    longDescription:
      "Una combinación irresistible de cuatro quesos fundidos sobre nuestros gnocchi de papa: gorgonzola, provolone, grana padano y mozzarella. Para los amantes del queso.",
    ingredients: [
      "Gnocchi de papa",
      "Gorgonzola",
      "Provolone",
      "Grana Padano",
      "Mozzarella",
    ],
    price: "$21.400",
    image: "pastas/gnocchi-quatro-formaggi",
    category: "pastas",
    spicy: false,
    vegan: false,
  },
  {
    id: "puttanesca",
    slug: "pasta-puttanesca",
    name: "Pasta alla puttanesca",
    description:
      "Salsa napolitana con alcaparras, aceitunas, peperoncino y pomodoro.",
    longDescription:
      "Espaguetis con una intensa salsa napolitana que combina alcaparras, aceitunas negras, peperoncino y tomates frescos. Un plato lleno de carácter mediterráneo.",
    ingredients: [
      "Espaguetis",
      "Alcaparras",
      "Aceitunas negras",
      "Peperoncino",
      "Tomate",
      "Ajo",
    ],
    price: "$21.400",
    image: "pastas/puttanesca",
    category: "pastas",
    spicy: true,
    vegan: true,
  },
  {
    id: "carbonara",
    slug: "pasta-carbonara",
    name: "Pasta Carbonara",
    description: "Pasta con huevo, pecorino romano y guanciale tostado.",
    longDescription:
      "La auténtica Carbonara romana: pasta fresca con una cremosa salsa de huevo, queso pecorino romano y crujiente guanciale tostado. Sin crema, solo tradición.",
    ingredients: [
      "Pasta",
      "Huevo",
      "Pecorino Romano",
      "Guanciale",
      "Pimienta negra",
    ],
    price: "$21.400",
    image: "pastas/carbonara",
    category: "pastas",
    spicy: false,
    vegan: false,
  },
  {
    id: "lasagna",
    slug: "lasagna-artesanal",
    name: "Lasagna artesanal",
    description: "Ragú napolitano, bechamel, mozzarella y grana padano.",
    longDescription:
      "Nuestra lasagna casera con capas de pasta fresca, ragú napolitano de cocción lenta, cremosa bechamel, mozzarella fundida y un toque de grana padano gratinado.",
    ingredients: [
      "Pasta de lasagna",
      "Ragú napolitano",
      "Bechamel",
      "Mozzarella",
      "Grana Padano",
    ],
    price: "$16.990",
    image: "pastas/lasagna",
    category: "pastas",
    spicy: false,
    vegan: false,
  },
];

// RISOTTOS - Unificados
export const risottos = [
  {
    id: "risotto-porcini",
    slug: "risotto-porcini",
    name: "Risotto Porcini",
    description:
      "Arroz arborio con hongos porcini, notas de trufa blanca y nueces.",
    longDescription:
      "Risotto cremoso con hongos porcini, un toque de trufa blanca y nueces crocantes. Una experiencia gourmet.",
    ingredients: [
      "Arroz arborio",
      "Hongos porcini",
      "Trufa blanca",
      "Nueces",
      "Caldo de verduras",
    ],
    price: "$21.990",
    image: "risottos/risotto-porcini",
    category: "risottos",
    spicy: false,
    vegan: true,
  },
];

// BEBIDAS - Unificados
export const bebidas = [
  {
    id: "coca-cola",
    slug: "coca-cola",
    name: "Coca-Cola",
    description: "Lata 350ml",
    longDescription: "Refresco Coca-Cola original en lata de 350ml, bien fría.",
    ingredients: ["Agua carbonatada", "Azúcar", "Extracto de cola"],
    price: "$2.600",
    image: "bebidas/coca-cola",
    category: "bebidas",
    spicy: false,
    vegan: true,
  },
  {
    id: "sprite",
    slug: "sprite",
    name: "Sprite",
    description: "Lata 350ml",
    longDescription:
      "Refresco de lima-limón Sprite en lata de 350ml, refrescante y sin cafeína.",
    ingredients: ["Agua carbonatada", "Azúcar", "Limón", "Lima"],
    price: "$2.600",
    image: "bebidas/sprite",
    category: "bebidas",
    spicy: false,
    vegan: true,
  },
  {
    id: "limonada",
    slug: "limonada",
    name: "Limonada tradicional",
    description: "Limonada fresca del día",
    longDescription:
      "Limonada preparada con limones naturales, agua y un toque de azúcar. Refrescante y natural.",
    ingredients: ["Limón", "Agua", "Azúcar", "Hielo"],
    price: "$4.300",
    image: "bebidas/limonada",
    category: "bebidas",
    spicy: false,
    vegan: true,
  },
  {
    id: "jugo-mango",
    slug: "jugo-mango",
    name: "Jugo de Mango",
    description: "Jugo natural de mango",
    longDescription:
      "Jugo natural de mango fresco, sin conservantes. Dulce y tropical.",
    ingredients: ["Mango", "Agua", "Azúcar (opcional)"],
    price: "$5.700",
    image: "bebidas/jugo-mango",
    category: "bebidas",
    spicy: false,
    vegan: true,
  },
];

// ADICIONALES - Unificados
export const adicionales = [
  {
    id: "extra-verdura",
    slug: "extra-verdura",
    name: "Adicional de Verdura",
    description: "Champiñón, pimentón, berenjena, tomate, etc.",
    longDescription:
      "Elige tus vegetales favoritos para agregar a tu pizza o pasta: champiñones, pimentón, berenjena, tomate y más.",
    ingredients: ["Champiñón", "Pimentón", "Berenjena", "Tomate", "Cebolla"],
    price: "$3.000",
    image: "adicionales/extra-verdura",
    category: "adicionales",
    spicy: false,
    vegan: true,
  },
  {
    id: "extra-queso",
    slug: "extra-queso",
    name: "Adicional de Queso Italiano",
    description: "Gorgonzola, provolone, ricotta, bufala, etc.",
    longDescription:
      "Dale un toque extra de sabor con nuestros quesos italianos premium: gorgonzola, provolone, ricotta o mozzarella di bufala.",
    ingredients: ["Gorgonzola", "Provolone", "Ricotta", "Mozzarella di bufala"],
    price: "$4.500",
    image: "adicionales/extra-queso",
    category: "adicionales",
    spicy: false,
    vegan: false,
  },
  {
    id: "extra-burrata",
    slug: "extra-burrata",
    name: "Burrata D.O.C",
    description: "Burrata italiana fresca",
    longDescription:
      "Burrata italiana D.O.C, cremosa por dentro y suave por fuera. Un lujo para tu pizza o ensalada.",
    ingredients: ["Burrata D.O.C"],
    price: "$9.000",
    image: "adicionales/extra-burrata",
    category: "adicionales",
    spicy: false,
    vegan: false,
  },
];

// BAMBINI - Unificados
export const bambini = [
  {
    id: "sorrentino-kids",
    slug: "sorrentino-kids",
    name: "Sorrentino",
    description: "Espaguetis con bebida + postre (helado o mini angioletti)",
    longDescription:
      "Menú especial para los más pequeños: espaguetis con salsa a elección, bebida y postre (helado o mini angioletti).",
    ingredients: [
      "Espaguetis",
      "Salsa a elección",
      "Bebida",
      "Helado o mini angioletti",
    ],
    price: "$16.900",
    image: "bambini/sorrentino",
    category: "bambini",
    spicy: false,
    vegan: false,
  },
  {
    id: "diavoletta-kids",
    slug: "diavoletta-kids",
    name: "Diavoletta",
    description: "Pizza kids con bebida + postre",
    longDescription:
      "Mini pizza especialmente diseñada para niños, acompañada de bebida y postre.",
    ingredients: [
      "Masa de pizza",
      "Salsa de tomate",
      "Mozzarella",
      "Bebida",
      "Postre",
    ],
    price: "$16.900",
    image: "bambini/diavoletta",
    category: "bambini",
    spicy: false,
    vegan: false,
  },
];

export const menuSections = {
  pizzas: {
    title: "Pizzas 🍕",
    items: pizzas,
  },
  antipasti: {
    title: "Antipasti 🧀",
    items: antipasti,
  },
  pastas: {
    title: "Pastas 🍝",
    items: pastas,
  },
  risottos: {
    title: "Risottos 🍚",
    items: risottos,
  },
  postres: {
    title: "Postres 🍰",
    items: postres,
  },
  bebidas: {
    title: "Bebidas 🥤",
    items: bebidas,
  },
  adicionales: {
    title: "Adicionales ➕",
    items: adicionales,
  },
  bambini: {
    title: "Peri Bambini 👶",
    items: bambini,
  },
};
