import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "Globe",
    title: "Разработка сайтов",
    description:
      "Создание современных и адаптивных веб-сайтов любой сложности с использованием передовых технологий",
  },
  {
    icon: "Smartphone",
    title: "Мобильные приложения",
    description:
      "Кроссплатформенные мобильные приложения для iOS и Android на React Native и Flutter",
  },
  {
    icon: "ShoppingCart",
    title: "Интернет-магазины",
    description:
      "Полнофункциональные онлайн-магазины с системой оплаты, складом и аналитикой продаж",
  },
  {
    icon: "Palette",
    title: "UI/UX Дизайн",
    description:
      "Проектирование пользовательских интерфейсов и прототипирование в Figma для веб и мобильных приложений",
  },
  {
    icon: "Search",
    title: "SEO Оптимизация",
    description:
      "Техническая и контентная оптимизация сайтов для поисковых систем и повышения видимости",
  },
  {
    icon: "Wrench",
    title: "Техническая поддержка",
    description:
      "Обслуживание, обновление и мониторинг работоспособности ваших веб-проектов 24/7",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 md:py-32">
      {/* Subtle bg accent */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm text-accent font-medium tracking-wider uppercase mb-4">
            Что я делаю
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            <span className="text-gradient">Услуги</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Полный спектр услуг по созданию и развитию цифровых продуктов
          </p>
          <div className="line-gradient w-20 mx-auto mt-6" />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover-lift group cursor-default"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={service.icon} size={26} className="text-white" />
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-lg text-white mb-3">
                {service.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;