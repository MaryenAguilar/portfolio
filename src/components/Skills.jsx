import { useLanguage } from "../context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold mb-6">{t.skills.title}</h2>
      <div className="flex flex-wrap gap-3">
        {[...t.skills.frontend, ...t.skills.tools, ...t.skills.soft].map(
          (s) => (
            <span key={s} className="text-black px-4 py-2 bg-yellow-100 rounded">
              {s}
            </span>
          )
        )}
      </div>
    </section>
  );
}
