import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Send, X, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Se ejecuta cuando el usuario cambia el idioma en el Nav
  useEffect(() => {
    const welcomeMsg = language === "es" 
      ? "¡Hola! Soy la IA de Maryen. ¿En qué puedo ayudarte hoy?" 
      : "Hi! I'm Maryen's AI. How can I help you today?";
    
    setMessages([{ role: "assistant", content: welcomeMsg }]);
  }, [language]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://ai-worker.maryen-ai-worker.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: input,
          lang: language // Enviamos el idioma actual al Worker
        }),
      });

      const data = await response.json();
      const aiContent = data.response || (language === "es" ? "Lo siento, hubo un error." : "Sorry, an error occurred.");
      
      setMessages((prev) => [...prev, { role: "assistant", content: aiContent }]);
    } catch (error) {
      const errorMsg = language === "es" ? "Error de conexión." : "Connection error.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-20 text-center px-6 relative">
      <h1 className="text-5xl font-bold">{t.hero.greeting} Maryen</h1>
      <h2 className="text-3xl text-yellow-600 mt-2">{t.hero.role}</h2>
      <p className="max-w-xl mx-auto mt-4 text-slate-600 dark:text-slate-300">
        {t.hero.description}
      </p>

      <div className="flex justify-center gap-6 mt-6">
        <a href="https://github.com/MaryenAguilar" className="hover:text-yellow-600 transition-colors"><Github /></a>
        <a href="https://linkedin.com/in/maryen-aguilar-zuñiga" className="hover:text-yellow-600 transition-colors"><Linkedin /></a>
        <a href="mailto:maryenaguilarzuniga@gmail.com" className="hover:text-yellow-600 transition-colors"><Mail /></a>
      </div>

      <button
        className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-full shadow-lg hover:bg-yellow-700 transition flex items-center mx-auto gap-2"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={20} /> 
        {t.hero.cta} {/* Ahora usa el texto del archivo de contenido */}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
            
            <div className="p-4 border-b flex justify-between items-center bg-yellow-600 text-white shrink-0">
              <span className="font-bold">Maryen AI Assistant</span>
              <button onClick={() => setIsOpen(false)} className="hover:bg-yellow-700 p-1 rounded transition-colors text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-yellow-600 text-white rounded-tr-none shadow-md" 
                      : "bg-white dark:bg-slate-800 dark:text-white shadow-sm border dark:border-slate-700 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-200 dark:bg-slate-800 animate-pulse p-3 rounded-2xl text-xs dark:text-white">
                    {language === "es" ? "Escribiendo..." : "Typing..."}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white dark:bg-slate-900 shrink-0">
              <div className="flex gap-2">
                <input
                  className="flex-1 border rounded-xl px-4 py-2 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 dark:text-white"
                  placeholder={language === "es" ? "Pregúntame algo..." : "Ask me anything..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="bg-yellow-600 p-2 rounded-xl text-white hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  <Send size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}