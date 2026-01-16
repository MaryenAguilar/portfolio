import { Globe, Github, Palette } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import lapmarly from "../assets/lapmarly2.png";

export default function Project() {
  const { t } = useLanguage();

  return (
    <section id="project" className="py-20 bg-white dark:bg-slate-900 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Lado Izquierdo: El texto se queda en su flex-1 original */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">{t.project.title}</h2>
            <h3 className="text-2xl font-semibold">{t.project.name}</h3>
            <p className="mb-4 text-slate-600 dark:text-slate-300">{t.project.subtitle}</p>

            <ul className="list-disc ml-6 space-y-2 text-slate-700 dark:text-slate-400">
              {t.project.responsibilitiesList.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mt-8">
              <a className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition-colors" href="https://marly.azurewebsites.net/">
                <Globe size={18} /> Live
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded bg-slate-800 text-white hover:bg-slate-950 transition-colors" href="#">
                <Github size={18} /> Code
              </a>
              <a className="flex items-center gap-2 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors" href="https://www.figma.com/design/OZDjwTiKaKADWdPBG2BPwC/Sin-t%C3%ADtulo?node-id=0-1&m=dev&t=URaaLZukMFVNskLw-1">
                <Palette size={18} /> Figma
              </a>
            </div>
          </div>

          {/* Lado Derecho: Contenedor rígido para que la imagen no empuje nada */}
          <div className="flex-1 flex justify-center items-center">
            <img 
              src={lapmarly} 
              alt="Preview Project" 
              /* md:scale-150: La agranda un 50% visualmente sin mover el texto.
                 origin-center: Asegura que crezca desde su propio centro.
              */
              className="w-full h-auto block transform md:scale-150 origin-center transition-transform duration-500 hover:scale-[1.6]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}