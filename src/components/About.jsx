import { useLanguage } from "../context/LanguageContext";
import Meitalyhd2 from "../assets/meitalyhd2.webp";

export default function About() {
  const { t } = useLanguage();

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img 
          src={Meitalyhd2} 
          alt="Background" 
          className="w-full h-full object-cover object-right"
        />
        {/* Un gradiente muy sutil solo detrás del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent dark:from-black/60 dark:via-black/20" />
      </div>

      {/* Contenedor del texto pegado a la izquierda */}
      <div className="relative z-10 w-full max-w-4xl ml-12 px-32 md:px-12">
        <div className="max-w-2xl"> 
          <h2 className="text-4xl font-bold mb-6">
            {t.about.title}
          </h2>
          
          <div className="space-y-4">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}