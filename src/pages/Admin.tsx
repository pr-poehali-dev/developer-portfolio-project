import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SiteRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status?: "new" | "processed" | "rejected";
}

interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  contactTelegram: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  priceRange: string;
}

type Tab = "requests" | "settings" | "portfolio" | "services";

const DEFAULT_PASSWORD = "admin123";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "requests", label: "Заявки", icon: "Inbox" },
  { key: "settings", label: "Настройки сайта", icon: "Settings" },
  { key: "portfolio", label: "Портфолио", icon: "Briefcase" },
  { key: "services", label: "Услуги", icon: "Layers" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ------------------------------------------------------------------ */
/*  Login form                                                         */
/* ------------------------------------------------------------------ */

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem("admin_password") || DEFAULT_PASSWORD;
    if (pw === stored) {
      sessionStorage.setItem("admin_auth", "1");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center px-4">
      <div className="glass-strong rounded-2xl p-8 w-full max-w-sm animate-slide-up">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Icon name="Lock" size={20} className="text-white" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">
            Админ-панель
          </h1>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block font-body text-sm text-muted-foreground mb-2">
              Пароль
            </label>
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Введите пароль"
              className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
            />
            {error && (
              <p className="text-destructive text-xs mt-2 font-body">
                Неверный пароль
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 text-white font-heading font-semibold"
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Requests tab                                                       */
/* ------------------------------------------------------------------ */

function RequestsTab() {
  const [requests, setRequests] = useState<SiteRequest[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setRequests(readLS<SiteRequest[]>("site_requests", []));
  }, []);

  const save = (next: SiteRequest[]) => {
    setRequests(next);
    writeLS("site_requests", next);
  };

  const setStatus = (idx: number, status: SiteRequest["status"]) => {
    const next = [...requests];
    next[idx] = { ...next[idx], status };
    save(next);
    toast.success("Статус обновлен");
  };

  const remove = (idx: number) => {
    const next = requests.filter((_, i) => i !== idx);
    save(next);
    setExpanded(null);
    toast.success("Заявка удалена");
  };

  const newCount = requests.filter(
    (r) => !r.status || r.status === "new"
  ).length;

  const statusBadge = (status?: string) => {
    switch (status) {
      case "processed":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
            Обработана
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">
            Отклонена
          </Badge>
        );
      default:
        return (
          <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
            Новая
          </Badge>
        );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
          Заявки
          {newCount > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">
              {newCount}
            </span>
          )}
        </h2>
      </div>

      {requests.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Icon
            name="Inbox"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="font-body text-muted-foreground">Заявок пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req, idx) => (
            <div key={idx} className="glass rounded-xl overflow-hidden">
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full flex flex-wrap items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex-1 min-w-[120px]">
                  <p className="font-heading font-semibold text-sm text-white truncate">
                    {req.name}
                  </p>
                </div>
                <div className="flex-1 min-w-[140px] hidden sm:block">
                  <p className="font-body text-sm text-muted-foreground truncate">
                    {req.email}
                  </p>
                </div>
                <div className="flex-1 min-w-[120px] hidden md:block">
                  <p className="font-body text-sm text-muted-foreground truncate">
                    {req.phone || "---"}
                  </p>
                </div>
                <div className="hidden lg:block min-w-[130px]">
                  <p className="font-body text-xs text-muted-foreground">
                    {req.timestamp
                      ? new Date(req.timestamp).toLocaleString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "---"}
                  </p>
                </div>
                <div>{statusBadge(req.status)}</div>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-muted-foreground transition-transform ${
                    expanded === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded */}
              {expanded === idx && (
                <div className="border-t border-white/5 px-5 py-4 space-y-4 animate-slide-up">
                  <div className="sm:hidden space-y-1 text-sm font-body text-muted-foreground">
                    <p>
                      <span className="text-white">Email:</span> {req.email}
                    </p>
                    <p>
                      <span className="text-white">Телефон:</span>{" "}
                      {req.phone || "---"}
                    </p>
                    <p>
                      <span className="text-white">Дата:</span>{" "}
                      {req.timestamp
                        ? new Date(req.timestamp).toLocaleString("ru-RU")
                        : "---"}
                    </p>
                  </div>

                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Сообщение
                    </p>
                    <p className="font-body text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                      {req.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      size="sm"
                      className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                      onClick={() => setStatus(idx, "processed")}
                    >
                      <Icon name="Check" size={14} />
                      Обработана
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30"
                      onClick={() => setStatus(idx, "rejected")}
                    >
                      <Icon name="X" size={14} />
                      Отклонена
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
                      onClick={() => setStatus(idx, "new")}
                    >
                      <Icon name="RotateCcw" size={14} />
                      Новая
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => remove(idx)}
                    >
                      <Icon name="Trash2" size={14} />
                      Удалить
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings tab                                                       */
/* ------------------------------------------------------------------ */

const DEFAULT_SETTINGS: SiteSettings = {
  heroTitle: "Создаю цифровые продукты",
  heroSubtitle:
    "Full-stack разработка веб-приложений, мобильных решений и современных интерфейсов.",
  aboutText:
    "Привет! Я full-stack разработчик с более чем 5-летним опытом создания современных веб-приложений и цифровых продуктов.",
  contactEmail: "hello@devstudio.ru",
  contactPhone: "+7 (999) 123-45-67",
  contactTelegram: "@devstudio",
};

function SettingsTab() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(readLS<SiteSettings>("site_settings", DEFAULT_SETTINGS));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const save = () => {
    writeLS("site_settings", settings);
    toast.success("Настройки сохранены");
  };

  const fields: {
    name: keyof SiteSettings;
    label: string;
    type: "input" | "textarea";
    icon: string;
  }[] = [
    { name: "heroTitle", label: "Заголовок Hero", type: "input", icon: "Type" },
    {
      name: "heroSubtitle",
      label: "Подзаголовок Hero",
      type: "textarea",
      icon: "AlignLeft",
    },
    {
      name: "aboutText",
      label: 'Текст "Обо мне"',
      type: "textarea",
      icon: "User",
    },
    {
      name: "contactEmail",
      label: "Email для связи",
      type: "input",
      icon: "Mail",
    },
    {
      name: "contactPhone",
      label: "Телефон",
      type: "input",
      icon: "Phone",
    },
    {
      name: "contactTelegram",
      label: "Telegram",
      type: "input",
      icon: "Send",
    },
  ];

  return (
    <div>
      <h2 className="font-heading font-bold text-xl text-white mb-6">
        Настройки сайта
      </h2>

      <div className="glass rounded-2xl p-6 space-y-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="flex items-center gap-2 font-body text-sm text-muted-foreground mb-2">
              <Icon name={f.icon} size={14} />
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <Textarea
                name={f.name}
                value={settings[f.name]}
                onChange={handleChange}
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 resize-none"
              />
            ) : (
              <Input
                name={f.name}
                value={settings[f.name]}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
              />
            )}
          </div>
        ))}

        <Button
          onClick={save}
          className="bg-gradient-primary hover:opacity-90 text-white font-heading font-semibold"
        >
          <Icon name="Save" size={16} />
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio tab                                                      */
/* ------------------------------------------------------------------ */

const EMPTY_PORTFOLIO: PortfolioItem = {
  id: "",
  title: "",
  category: "",
  description: "",
  imageUrl: "",
};

function PortfolioTab() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setItems(readLS<PortfolioItem[]>("site_portfolio", []));
  }, []);

  const save = (next: PortfolioItem[]) => {
    setItems(next);
    writeLS("site_portfolio", next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error("Введите название проекта");
      return;
    }

    if (editing.id) {
      // update
      save(items.map((it) => (it.id === editing.id ? editing : it)));
      toast.success("Проект обновлен");
    } else {
      // create
      save([...items, { ...editing, id: uid() }]);
      toast.success("Проект добавлен");
    }
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (item: PortfolioItem) => {
    setEditing({ ...item });
    setShowForm(true);
  };

  const startAdd = () => {
    setEditing({ ...EMPTY_PORTFOLIO });
    setShowForm(true);
  };

  const remove = (id: string) => {
    save(items.filter((it) => it.id !== id));
    toast.success("Проект удален");
  };

  const cancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editing) return;
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-white">
          Портфолио
        </h2>
        {!showForm && (
          <Button
            onClick={startAdd}
            className="bg-gradient-primary hover:opacity-90 text-white font-heading font-semibold"
            size="sm"
          >
            <Icon name="Plus" size={16} />
            Добавить
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && editing && (
        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 mb-6 space-y-4 animate-slide-up"
        >
          <h3 className="font-heading font-semibold text-white">
            {editing.id ? "Редактировать проект" : "Новый проект"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs text-muted-foreground mb-1">
                Название
              </label>
              <Input
                name="title"
                value={editing.title}
                onChange={handleChange}
                placeholder="Название проекта"
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="block font-body text-xs text-muted-foreground mb-1">
                Категория
              </label>
              <Input
                name="category"
                value={editing.category}
                onChange={handleChange}
                placeholder="Веб-сайт, Лендинг..."
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-muted-foreground mb-1">
              URL изображения
            </label>
            <Input
              name="imageUrl"
              value={editing.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
            />
          </div>
          <div>
            <label className="block font-body text-xs text-muted-foreground mb-1">
              Описание
            </label>
            <Textarea
              name="description"
              value={editing.description}
              onChange={handleChange}
              placeholder="Описание проекта"
              rows={3}
              className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90 text-white font-heading font-semibold"
              size="sm"
            >
              <Icon name="Save" size={14} />
              {editing.id ? "Сохранить" : "Добавить"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancel}
              className="text-muted-foreground hover:text-white"
            >
              Отмена
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      {items.length === 0 && !showForm ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Icon
            name="Briefcase"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="font-body text-muted-foreground">
            Проектов пока нет. Добавьте первый!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Thumbnail */}
              {item.imageUrl && (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-semibold text-sm text-white truncate">
                  {item.title}
                </h4>
                <p className="font-body text-xs text-primary">
                  {item.category}
                </p>
                <p className="font-body text-xs text-muted-foreground truncate mt-0.5">
                  {item.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10"
                  onClick={() => startEdit(item)}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => remove(item.id)}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Services tab                                                       */
/* ------------------------------------------------------------------ */

const EMPTY_SERVICE: ServiceItem = {
  id: "",
  icon: "Globe",
  title: "",
  description: "",
  priceRange: "",
};

function ServicesTab() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setItems(readLS<ServiceItem[]>("site_services", []));
  }, []);

  const save = (next: ServiceItem[]) => {
    setItems(next);
    writeLS("site_services", next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error("Введите название услуги");
      return;
    }

    if (editing.id) {
      save(items.map((it) => (it.id === editing.id ? editing : it)));
      toast.success("Услуга обновлена");
    } else {
      save([...items, { ...editing, id: uid() }]);
      toast.success("Услуга добавлена");
    }
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (item: ServiceItem) => {
    setEditing({ ...item });
    setShowForm(true);
  };

  const startAdd = () => {
    setEditing({ ...EMPTY_SERVICE });
    setShowForm(true);
  };

  const remove = (id: string) => {
    save(items.filter((it) => it.id !== id));
    toast.success("Услуга удалена");
  };

  const cancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editing) return;
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-white">Услуги</h2>
        {!showForm && (
          <Button
            onClick={startAdd}
            className="bg-gradient-primary hover:opacity-90 text-white font-heading font-semibold"
            size="sm"
          >
            <Icon name="Plus" size={16} />
            Добавить
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && editing && (
        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 mb-6 space-y-4 animate-slide-up"
        >
          <h3 className="font-heading font-semibold text-white">
            {editing.id ? "Редактировать услугу" : "Новая услуга"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs text-muted-foreground mb-1">
                Название
              </label>
              <Input
                name="title"
                value={editing.title}
                onChange={handleChange}
                placeholder="Название услуги"
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="block font-body text-xs text-muted-foreground mb-1">
                Иконка (Lucide)
              </label>
              <div className="flex gap-2">
                <Input
                  name="icon"
                  value={editing.icon}
                  onChange={handleChange}
                  placeholder="Globe, Code, Smartphone..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 flex-1"
                />
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={editing.icon}
                    size={18}
                    className="text-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-muted-foreground mb-1">
              Ценовой диапазон
            </label>
            <Input
              name="priceRange"
              value={editing.priceRange}
              onChange={handleChange}
              placeholder="от 50 000 руб."
              className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50"
            />
          </div>
          <div>
            <label className="block font-body text-xs text-muted-foreground mb-1">
              Описание
            </label>
            <Textarea
              name="description"
              value={editing.description}
              onChange={handleChange}
              placeholder="Описание услуги"
              rows={3}
              className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90 text-white font-heading font-semibold"
              size="sm"
            >
              <Icon name="Save" size={14} />
              {editing.id ? "Сохранить" : "Добавить"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancel}
              className="text-muted-foreground hover:text-white"
            >
              Отмена
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      {items.length === 0 && !showForm ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Icon
            name="Layers"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="font-body text-muted-foreground">
            Услуг пока нет. Добавьте первую!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={22} className="text-white" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-semibold text-sm text-white">
                  {item.title}
                </h4>
                <p className="font-body text-xs text-muted-foreground truncate mt-0.5">
                  {item.description}
                </p>
                <p className="font-body text-xs text-gradient font-semibold mt-1">
                  {item.priceRange}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10"
                  onClick={() => startEdit(item)}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => remove(item.id)}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Admin component                                               */
/* ------------------------------------------------------------------ */

const Admin = () => {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_auth") === "1"
  );
  const [tab, setTab] = useState<Tab>("requests");

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return <LoginGate onAuth={() => setAuthed(true)} />;
  }

  const renderTab = () => {
    switch (tab) {
      case "requests":
        return <RequestsTab />;
      case "settings":
        return <SettingsTab />;
      case "portfolio":
        return <PortfolioTab />;
      case "services":
        return <ServicesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Mobile top tabs */}
      <div className="lg:hidden glass-strong border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Icon name="Code2" size={16} className="text-white" />
            </div>
            <span className="font-heading font-bold text-sm text-white">
              Админ
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={logout}
            className="text-muted-foreground hover:text-white"
          >
            <Icon name="LogOut" size={16} />
          </Button>
        </div>
        <div className="flex overflow-x-auto px-2 pb-2 gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                tab === t.key
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-strong border-r border-white/5 sticky top-0 h-screen">
          {/* Sidebar header */}
          <div className="px-6 h-16 flex items-center gap-3 border-b border-white/5">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Icon name="Code2" size={18} className="text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-white text-sm">
                Dev<span className="text-gradient">Studio</span>
              </span>
              <p className="font-body text-[10px] text-muted-foreground">
                Панель управления
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === t.key
                    ? "bg-primary/15 text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={t.icon} size={18} />
                {t.label}
                {t.key === "requests" && (
                  <RequestCountBadge />
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-white/5">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon name="LogOut" size={18} />
              Выйти
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-5xl">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};

/* Small helper component for sidebar badge */
function RequestCountBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const reqs = readLS<SiteRequest[]>("site_requests", []);
    setCount(reqs.filter((r) => !r.status || r.status === "new").length);
  }, []);

  if (count === 0) return null;
  return (
    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold">
      {count}
    </span>
  );
}

export default Admin;
