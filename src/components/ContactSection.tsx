import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const contactInfo = [
  {
    icon: "Mail",
    label: "Email",
    value: "asmgmd@mail.ru",
    href: "mailto:asmgmd@mail.ru",
  },
  {
    icon: "Phone",
    label: "Телефон",
    value: "+7 (928) 538-90-50",
    href: "tel:+79285389050",
  },
  {
    icon: "Send",
    label: "Telegram",
    value: "@devstudio05",
    href: "https://t.me/devstudio05",
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Пожалуйста, заполните обязательные поля");
      return;
    }

    setSending(true);

    // Store to localStorage
    const existing = JSON.parse(localStorage.getItem("site_requests") || "[]");
    existing.push({
      ...form,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("site_requests", JSON.stringify(existing));

    setTimeout(() => {
      setSending(false);
      toast.success("Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm text-primary font-medium tracking-wider uppercase mb-4">
            Контакты
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            <span className="text-gradient">Связаться со мной</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Готов обсудить ваш проект. Напишите мне, и я отвечу в течение 24 часов.
          </p>
          <div className="line-gradient w-20 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <div>
            <h3 className="font-heading font-semibold text-xl text-white mb-6">
              Контактная информация
            </h3>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Выберите удобный способ связи или заполните форму, и я свяжусь с
              вами в ближайшее время.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 group"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                    <Icon
                      name={item.icon}
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="font-body text-white group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Decorative */}
            <div className="mt-10 glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-sm text-green-400 font-medium">
                  Доступен для проектов
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                Среднее время ответа -- 2 часа в рабочее время
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-strong rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2">
                  Имя <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-body text-sm text-muted-foreground mb-2">
                  Сообщение <span className="text-primary">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Расскажите о вашем проекте..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-gradient-primary text-white font-heading font-semibold text-base hover:opacity-90 transition-all hover:shadow-[0_10px_40px_hsla(262,83%,58%,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Icon name="Send" size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;