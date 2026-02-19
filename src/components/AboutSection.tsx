import Icon from "@/components/ui/icon";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Figma",
];

const workSteps = [
  {
    num: "01",
    title: "Обсуждение",
    description: "Выясняю задачи, цели и пожелания по проекту",
    icon: "MessageSquare",
  },
  {
    num: "02",
    title: "Проектирование",
    description: "Создаю прототип и согласовываю дизайн",
    icon: "PenTool",
  },
  {
    num: "03",
    title: "Разработка",
    description: "Пишу чистый код и собираю проект",
    icon: "Code2",
  },
  {
    num: "04",
    title: "Запуск",
    description: "Тестирую, публикую и обеспечиваю поддержку",
    icon: "Rocket",
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

            <div>
              <h3 className="font-heading font-semibold text-white text-sm mb-6 uppercase tracking-wider">
                Как я работаю
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {workSteps.map((step) => (
                  <div key={step.num} className="glass rounded-xl p-4 hover-lift group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon name={step.icon} size={16} className="text-white" />
                      </div>
                      <span className="font-heading font-bold text-xs text-primary">
                        {step.num}
                      </span>
                    </div>
                    <h4 className="font-heading font-semibold text-white text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
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