import { useLanguage } from "../context/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();

  // Si t.experience no existe, esto evita que la app explote
  if (!t || !t.experience) {
    return <div className="py-20 text-center">Loading Experience...</div>;
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <h2 className="text-4xl font-bold dark:text-white">{t.experience.title}</h2>
        </div>

        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3">
          {t.experience.items.map((item, index) => (
            <div key={index} className="mb-12 ml-8 relative">
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-yellow-400 rounded-full border-4 border-white dark:border-slate-900"></div>
              
              <div className="grid md:grid-cols-5 gap-4 text-black dark:text-white">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-yellow-500">{item.role}</h3>
                  <h4 className="text-lg font-semibold">{item.company}</h4>
                  <p className="text-sm text-zinc-500 mt-1 uppercase">{item.date}</p>
                </div>
                <div className="md:col-span-3 text-zinc-700 dark:text-zinc-400">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}