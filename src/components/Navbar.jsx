import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    if (!t || !t.nav) return null;

    const ThemeIcon = () => {
        if (theme === "dark") return "🌙";
        if (theme === "light") return "☀️";
        return "💻";
    };

    return (
        // Contenedor principal sin fondo
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-fit">
            <div className="flex items-center gap-3">

                {/* Logo "MA" como una cajita independiente */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-serif italic font-bold text-xl px-5 py-2 rounded-full shadow-sm bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-white/5 cursor-pointer hover:scale-105 transition-transform"
                >
                    MA
                </a>

                {/* Links de Navegación */}
                <div className="hidden md:flex gap-3 items-center">
                    {[
                        { href: "#experience", label: t.nav.experience },
                        { href: "#project", label: t.nav.project },
                        { href: "#skills", label: t.nav.skills },
                        { href: "#about", label: t.nav.about },
                        { href: "#contact", label: t.nav.contact }
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            // 'whitespace-nowrap' evita que el texto se ponga en dos líneas
                            // 'min-w-fit' asegura que la cajita crezca según el texto
                            className="px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] shadow-sm transition-all duration-300 whitespace-nowrap min-w-fit
                                       bg-white text-zinc-800 
                                       hover:bg-[#7b161c] hover:text-white 
                                       dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-white dark:hover:text-black"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Botón de Idioma */}
                <button
                    onClick={() => setLang(lang === "en" ? "es" : "en")}
                    className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-[10px] font-black shadow-sm border border-zinc-100 dark:border-white/5 whitespace-nowrap"
                >
                    {lang === "en" ? "ES" : "EN"}
                </button>

                {/* Selector de Tema */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-white/5 transition-transform active:scale-95"
                    >
                        <ThemeIcon />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-3 w-32 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-100 dark:border-white/5 py-2 z-50 overflow-hidden">
                            {['light', 'dark', 'system'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => { setTheme(mode); setIsOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    {mode === 'light' ? '☀️ Light' : mode === 'dark' ? '🌙 Dark' : '💻 System'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;