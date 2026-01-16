import { useLanguage } from "../context/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Copy,
} from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { t } = useLanguage();
  if (!t?.contact) return null;

  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_y2szihq",       // Service ID
        "template_gem8xl8",      // Template ID
        e.target,
        "IfeJouV9A-MRvaq6F"      // Public Key
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          e.target.reset();
          setTimeout(() => setSent(false), 3000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="py-16 px-6 flex justify-center">
      <div
        className="
          max-w-5xl w-full
          bg-white dark:bg-zinc-900
          text-zinc-900 dark:text-zinc-100
          p-8 md:p-12
          rounded-2xl
          border border-zinc-200 dark:border-zinc-800
          transition-transform duration-500
          hover:scale-[1.02]
          grid grid-cols-1 md:grid-cols-2 gap-10
        "
      >
        {/* INFO */}
        <div className="space-y-5">
          <h2 className="text-4xl font-bold">
            {t.contact.title || "Connect With Me"}
          </h2>

          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {t.contact.subtitle ||
              "Have a project in mind? Reach out and let's turn your ideas into reality."}
          </p>

          <div className="space-y-4 pt-2">
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">
                maryenaguilarzuniga@gmail.com
              </span>
              <div className="relative">
                <Copy
                  className="w-3 h-3 cursor-pointer opacity-60 hover:opacity-100"
                  onClick={() =>
                    copyToClipboard("maryenaguilarzuniga@gmail.com", "email")
                  }
                />
                {copied === "email" && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {t?.contact?.copied || "Copied"}
                  </span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">
                +51 998 998 143
              </span>
              <div className="relative">
                <Copy
                  className="w-3 h-3 cursor-pointer opacity-60 hover:opacity-100"
                  onClick={() => copyToClipboard("+51998998143", "phone")}
                />
                {copied === "phone" && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {t?.contact?.copied || "Copied"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Lima, Perú</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-md py-3 pl-10 pr-4 text-sm"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-md py-3 pl-10 pr-4 text-sm"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-md py-3 pl-10 pr-4 text-sm"
            />
          </div>

          <textarea
            name="message"
            rows={4}
            required
            placeholder="Please drop your short message..."
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-md p-4 text-sm resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-zinc-900 text-white
              dark:bg-zinc-100 dark:text-zinc-950
              py-3 rounded-md font-bold
              flex items-center justify-center gap-2
              hover:opacity-90
              disabled:opacity-50
            "
          >
            <Send className="w-3.5 h-3.5" />
            <span className="text-sm">
              {loading
                ? "Sending..."
                : sent
                ? "Message sent"
                : t.contact.cta || "Send Message"}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
