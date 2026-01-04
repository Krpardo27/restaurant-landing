const About = () => {
  return (
    <section
      id="about"
      className="
        bg-[#161616]
        lg:py-28 
        py-12
      "
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <header className="max-w-3xl mb-20">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-accent">
            Nuestra historia
          </h2>

          <p className="text-muted text-lg leading-relaxed">
            Creemos que una buena pizza no necesita presentación, solo tiempo,
            respeto por los ingredientes y pasión por el oficio.
          </p>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Historia */}
          <div className="space-y-6 text-muted leading-relaxed text-base md:text-lg">
            <p>
              PIZZA<span className="text-accent">NOVA</span> nació en Chile con
              una idea simple: volver a la esencia de la pizza artesanal. Masa
              de fermentación lenta, horno de alta temperatura y recetas que
              respetan la tradición italiana, adaptadas al carácter local.
            </p>

            <p>
              Después de años probando masas, tiempos y combinaciones,
              entendimos que la diferencia no está en hacer más, sino en hacer
              mejor. Cada pizza que sale de nuestro horno es el resultado de
              procesos cuidados, ingredientes frescos y decisiones conscientes.
            </p>

            <p>
              No buscamos ser la pizzería más rápida ni la más grande. Queremos
              ser esa a la que vuelves porque recuerdas exactamente cómo sabía.
            </p>
          </div>

          {/* Valores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white relative pl-4">
                <span className="absolute left-0 top-1.5 h-4 w-[2px] bg-accent" />
                Masa con carácter
              </h3>

              <p className="text-muted text-sm leading-relaxed">
                Fermentación lenta de más de 48 horas, harina seleccionada y
                técnica precisa para lograr una base ligera, aireada y
                crujiente.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white relative pl-4">
                <span className="absolute left-0 top-1.5 h-4 w-[2px] bg-accent" />
                Ingredientes reales
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Trabajamos con productos frescos, proveedores locales y quesos
                de calidad. Nada innecesario, nada artificial.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white relative pl-4">
                <span className="absolute left-0 top-1.5 h-4 w-[2px] bg-accent" />
                Horno a alta temperatura
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                El calor correcto marca la diferencia. Nuestro horno permite una
                cocción rápida que sella sabores y respeta la textura.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white relative pl-4">
                <span className="absolute left-0 top-1.5 h-4 w-[2px] bg-accent" />
                Hecho en Chile
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Inspirados en Italia, creados en Chile. Cada receta tiene
                identidad, carácter y un toque local que nos representa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
