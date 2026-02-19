import Icon from "@/components/ui/icon";

const projects = [
  {
    image:
      "https://cdn.poehali.dev/projects/1784cba0-995e-476d-a60c-8938892d3ce6/files/27f67522-ee68-436c-92d0-b11888850b05.jpg",
    category: "Веб-сайт",
    title: "Корпоративный портал TechFlow",
    description:
      "Современный корпоративный сайт с личным кабинетом и интеграцией CRM-системы",
  },
  {
    image:
      "https://cdn.poehali.dev/projects/1784cba0-995e-476d-a60c-8938892d3ce6/files/3c6cc2ab-f661-4759-9407-5a9bd8db6efa.jpg",
    category: "Мобильное приложение",
    title: "FitTrack - трекер тренировок",
    description:
      "Кроссплатформенное мобильное приложение для отслеживания физической активности",
  },
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "Интернет-магазин",
    title: "StyleMarket - маркетплейс одежды",
    description:
      "Полнофункциональный маркетплейс с системой оплаты и логистики",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Корпоративный сайт",
    title: "FinanceHub - финансовый дашборд",
    description:
      "Аналитическая панель для мониторинга финансовых показателей в реальном времени",
  },
  {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    category: "Лендинг",
    title: "CryptoVault - криптокошелек",
    description:
      "Лендинг для продвижения криптовалютного кошелька с анимациями и 3D-элементами",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "SaaS-платформа",
    title: "DataPulse - аналитика данных",
    description:
      "SaaS-платформа для бизнес-аналитики с визуализацией и отчетами",
  },
];

const categoryColors: Record<string, string> = {
  "Веб-сайт": "bg-primary/20 text-primary",
  "Мобильное приложение": "bg-accent/20 text-accent",
  "Интернет-магазин": "bg-green-500/20 text-green-400",
  "Корпоративный сайт": "bg-orange-500/20 text-orange-400",
  "Лендинг": "bg-pink-500/20 text-pink-400",
  "SaaS-платформа": "bg-cyan-500/20 text-cyan-400",
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm text-primary font-medium tracking-wider uppercase mb-4">
            Работы
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            <span className="text-gradient">Портфолио</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Избранные проекты, которые демонстрируют мой подход к разработке и дизайну
          </p>
          <div className="line-gradient w-20 mx-auto mt-6" />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Link icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/20">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="ExternalLink" size={20} className="text-white" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      categoryColors[project.category] || "bg-primary/20 text-primary"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-white mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
