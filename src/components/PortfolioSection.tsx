import Icon from "@/components/ui/icon";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm text-primary font-medium tracking-wider uppercase mb-4">
            Работы
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            <span className="text-gradient">Портфолио</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Здесь скоро появятся мои лучшие проекты
          </p>
          <div className="line-gradient w-20 mx-auto mt-6" />
        </div>

        <div className="glass rounded-2xl p-12 md:p-16 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Icon name="Rocket" size={36} className="text-white" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-white mb-3">
            Проекты в разработке
          </h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            Раздел наполняется. Свяжитесь со мной, чтобы обсудить ваш проект и увидеть примеры работ.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-heading font-semibold text-sm hover:opacity-90 transition-all hover:scale-105"
          >
            Обсудить проект
            <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;