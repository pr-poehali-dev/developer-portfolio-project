import Icon from "@/components/ui/icon";

const stats = [
  { value: "50+", label: "проектов" },
  { value: "5", label: "лет опыта" },
  { value: "100%", label: "гарантия" },
];

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://cdn.poehali.dev/projects/1784cba0-995e-476d-a60c-8938892d3ce6/files/1bd3fe58-cfe1-46a0-9bff-dac3169809ea.jpg)",
          opacity: 0.08,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-primary/20 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-accent/15 blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

      {/* Small floating circles */}
      <div className="absolute top-[20%] right-[20%] w-3 h-3 rounded-full bg-primary/60 animate-float" />
      <div className="absolute top-[60%] left-[15%] w-2 h-2 rounded-full bg-accent/60 animate-float-delayed" />
      <div className="absolute bottom-[30%] right-[25%] w-4 h-4 rounded-full bg-primary/40 animate-pulse-glow" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground font-body">
              Открыт для новых проектов
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-slide-up font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Создаю{" "}
            <span className="text-gradient">цифровые продукты</span>
            <br />
            которые работают
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up-delayed font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Full-stack разработка веб-приложений, мобильных решений и
            современных интерфейсов. Превращаю идеи в качественный код.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up-delayed-2 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-heading font-semibold text-base hover:opacity-90 transition-all hover:scale-105 hover:shadow-[0_10px_40px_hsla(262,83%,58%,0.4)]"
            >
              Обсудить проект
              <Icon
                name="ArrowRight"
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white font-heading font-semibold text-base hover:bg-white/5 transition-all hover:border-white/30"
            >
              <Icon name="Briefcase" size={18} />
              Портфолио
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in flex items-center justify-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-bold text-2xl md:text-3xl text-gradient">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
