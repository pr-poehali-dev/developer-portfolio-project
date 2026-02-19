import Icon from "@/components/ui/icon";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Figma",
];

const timeline = [
  {
    year: "2024 - н.в.",
    role: "Senior Full-Stack Developer",
    company: "Freelance / DevStudio",
    description:
      "Ведение собственных проектов и консалтинг для крупных компаний",
  },
  {
    year: "2021 - 2024",
    role: "Full-Stack Developer",
    company: "Digital Agency Pro",
    description:
      "Разработка высоконагруженных веб-приложений и корпоративных систем",
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "WebCraft Studio",
    description:
      "Создание SPA-приложений на React и верстка адаптивных интерфейсов",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden p-[2px] bg-gradient-primary">
              <div className="rounded-2xl overflow-hidden bg-card">
                <img
                  src="https://cdn.poehali.dev/projects/1784cba0-995e-476d-a60c-8938892d3ce6/files/1bd3fe58-cfe1-46a0-9bff-dac3169809ea.jpg"
                  alt="Developer workspace"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-primary opacity-20 blur-xl animate-float" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent/20 blur-xl animate-float-delayed" />

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Icon name="Award" size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-heading font-bold text-xl text-white">
                    5+
                  </div>
                  <div className="font-body text-xs text-muted-foreground">
                    лет опыта
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="inline-block font-body text-sm text-primary font-medium tracking-wider uppercase mb-4">
              Знакомство
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              <span className="text-gradient">Обо мне</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-body text-muted-foreground leading-relaxed">
                Привет! Я full-stack разработчик с более чем 5-летним опытом
                создания современных веб-приложений и цифровых продуктов.
                Специализируюсь на React, TypeScript и Node.js.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Моя цель -- создавать не просто красивые интерфейсы, а
                полноценные решения, которые помогают бизнесу расти. Каждый
                проект для меня -- это возможность применить лучшие практики и
                инновационные подходы.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-10">
              <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Технологии
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-4 py-2 rounded-lg text-sm font-body font-medium text-white/80 border border-primary/30 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-heading font-semibold text-white text-sm mb-6 uppercase tracking-wider">
                Опыт
              </h3>
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline dot and line */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-primary flex-shrink-0 mt-1.5" />
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-white/10 mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6">
                      <span className="font-body text-xs text-primary font-medium">
                        {item.year}
                      </span>
                      <h4 className="font-heading font-semibold text-white mt-1">
                        {item.role}
                      </h4>
                      <p className="font-body text-sm text-accent mb-1">
                        {item.company}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
