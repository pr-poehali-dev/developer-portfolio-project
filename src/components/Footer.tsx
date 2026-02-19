import Icon from "@/components/ui/icon";

const quickLinks = [
  { label: "Главная", href: "#hero" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Услуги", href: "#services" },
  { label: "Обо мне", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const socialLinks = [
  { icon: "Github", href: "https://github.com", label: "GitHub" },
  { icon: "Send", href: "https://t.me/devstudio", label: "Telegram" },
  { icon: "MessageCircle", href: "https://vk.com", label: "VK" },
];

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-8">
      {/* Top gradient line */}
      <div className="line-gradient w-full absolute top-0 left-0" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo & description */}
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Code2" size={20} className="text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                Dev<span className="text-gradient">Studio</span>
              </span>
            </a>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Создаю современные цифровые продукты, которые помогают бизнесу
              расти и развиваться в онлайн-пространстве.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Социальные сети
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors group"
                >
                  <Icon
                    name={link.icon}
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevStudio. Все права защищены.
          </p>
          <p className="font-body text-xs text-muted-foreground/50">
            Сделано с{" "}
            <Icon
              name="Heart"
              size={12}
              className="inline text-primary mx-0.5"
            />{" "}
            и много кофе
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
