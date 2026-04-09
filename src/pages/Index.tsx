import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO   = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/56fccdd5-67c3-4389-99cb-36e86db45748.jpg";
const IMG_CABIN  = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/2c011a53-20b3-4408-b6de-c3163ba2e13c.jpg";
const IMG_BANYA  = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/24083aa8-cc22-4e30-845b-6109922f7346.jpg";
const IMG_REST   = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/6c6dab02-0594-4b1d-b5eb-3ede82c51d13.jpg";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLImageElement | null>) {
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    const handler = () => { img.style.transform = `translateY(${window.scrollY * 0.22}px)`; };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ref]);
}

const NAV_LINKS = [
  ["#services", "Услуги"], ["#story", "О нас"], ["#reviews", "Отзывы"],
  ["#promo", "Акции"], ["#booking", "Контакты"],
];

const FEATURES = [
  { icon: "🌊", title: "Море — в 50 метрах", desc: "Собственный пляж без посторонних. Шезлонги, тень, тишина. Закаты — каждый вечер. Зимой — штормящее море в полном одиночестве." },
  { icon: "🔥", title: "Открыты круглый год", desc: "Январь или август — неважно. Русская баня, тёплый бассейн, домики с камином ждут в любую погоду. Межсезонье — наше любимое время." },
  { icon: "🧖", title: "Персональный сервис", desc: "Мы знаем каждого гостя по имени. Ваши предпочтения, любимый столик, нужная температура в бане — всё готово до вашего приезда." },
];

const SERVICES_EXTRA = [
  ["🚤", "SUP, каяки, катер, рыбалка"],
  ["🏐", "Пляжный волейбол, теннис, велосипеды"],
  ["🎉", "Корпоративы и тимбилдинг"],
  ["🧒", "Детская анимация и площадки"],
  ["🗺️", "Экскурсии и джиптуры"],
  ["🐟", "Рыбалка: приготовим улов"],
];

const LOYALTY = [
  {
    tier: "Уровень 1", name: "🥉 Бронза", discount: "−5%", color: "#b87333",
    perks: ["Скидка 5% на проживание", "Приветственный напиток при заезде", "Ранняя регистрация (при наличии)", "Новостная рассылка со спецпредложениями"],
    gold: false,
  },
  {
    tier: "Уровень 2", name: "🥈 Серебро", discount: "−10%", color: "#8e9ba8",
    perks: ["Скидка 10% на проживание", "Бесплатный поздний выезд до 14:00", "Скидка 10% в ресторане", "Приоритет при выборе домика", "Доступ к закрытым акциям"],
    gold: false,
  },
  {
    tier: "Уровень 3", name: "🥇 Золото", discount: "−15%", color: "var(--color-gold)",
    perks: ["Скидка 15% на всё", "Персональный менеджер", "Бесплатная СПА-процедура за визит", "Гибкий заезд и выезд", "Подарок на день рождения"],
    gold: true,
  },
];

const REVIEWS = [
  { init: "А", name: "Анна Соколова", loc: "Москва · 4 визита", text: "Были уже четыре раза. Каждый раз находим что-то новое. Персонал знает нас по именам — это дорогого стоит. Зимой особенно хорошо: море штормит, баня топится, тишина абсолютная." },
  { init: "С", name: "Сергей и Ирина", loc: "Екатеринбург · 2 визита", text: "Приехали с детьми в ноябре — и не пожалели ни на секунду. Баня, море, тишина. Аниматоры с детьми нашли общий язык за 10 минут. Дети не хотели уезжать." },
  { init: "М", name: "Марина К.", loc: "HR-директор, IT-компания", text: "Провели корпоратив на 30 человек. Прошёл на высшем уровне. Команда до сих пор вспоминает — особенно ночную рыбалку и баню. Будем возвращаться каждый год." },
];

const PROMOS = [
  { badge: "Раннее бронирование", disc: "−15%", desc: "При бронировании за 30 и более дней до заезда. Действует на все категории домиков." },
  { badge: "Акция выходного дня", disc: "3-я ночь в подарок", desc: "2 ночи = 3-я бесплатно. Действует сентябрь – май. Для всех гостей без исключений." },
  { badge: "Семейный пакет", disc: "Дети до 7 лет — бесплатно", desc: "Дети до 7 лет проживают бесплатно. Детское меню в ресторане включено." },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useReveal();
  useParallax(heroImgRef);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: dark ? "rgba(17,16,9,0.92)" : "rgba(245,242,237,0.92)", backdropFilter: "blur(20px)", borderColor: "var(--color-border)" }}>
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <button onClick={() => scrollTo("#top")} className="flex items-center gap-3 font-display text-xl font-semibold" style={{ color: "var(--color-text)" }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
              <path d="M4 20 Q10 12 16 18 Q22 24 28 16" stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M4 24 Q10 16 16 22 Q22 28 28 20" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
              <circle cx="16" cy="10" r="4" fill="var(--color-primary)" opacity="0.9"/>
            </svg>
            Янтарная
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(([href, label]) => (
              <button key={href} onClick={() => scrollTo(href)}
                className="font-body text-sm transition-colors"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(d => !d)} className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", background: "transparent" }} aria-label="Тема">
              <Icon name={dark ? "Sun" : "Moon"} size={16} />
            </button>
            <button onClick={() => scrollTo("#booking")} className="btn-sea hidden md:inline-flex text-sm" style={{ padding: "0.6rem 1.4rem" }}>
              Забронировать
            </button>
            <button onClick={() => setMenuOpen(m => !m)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col p-6 pt-24" style={{ background: "var(--color-surface)" }}>
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map(([href, label]) => (
              <button key={href} onClick={() => scrollTo(href)} className="font-display text-3xl text-left" style={{ color: "var(--color-text)" }}>{label}</button>
            ))}
          </nav>
          <button onClick={() => scrollTo("#booking")} className="btn-sea mt-8 justify-center w-full">Забронировать</button>
        </div>
      )}

      {/* HERO */}
      <section id="top" className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0 z-0" style={{ background: "#0a3d4a" }}>
          <img ref={heroImgRef} src={IMG_HERO} alt="База отдыха у Японского моря" className="w-full h-full object-cover" style={{ filter: "brightness(0.55)" }} loading="eager" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,30,35,0.88) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-[860px] mx-auto" style={{ paddingTop: "6rem", paddingBottom: "9rem" }}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs tracking-[0.08em] uppercase" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.9)" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#4fb3c4" }} />
            Открыты 365 дней в году
          </div>
          <h1 className="font-display font-normal mb-6" style={{ fontSize: "clamp(2.8rem,1rem + 5.5vw,6rem)", color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Море. Тишина.<br /><em style={{ color: "#7dd4e0" }}>Ваше время.</em>
          </h1>
          <p className="mb-10 font-light mx-auto" style={{ fontSize: "clamp(1.125rem,1rem + 0.75vw,1.5rem)", color: "rgba(255,255,255,0.8)", maxWidth: "560px", lineHeight: 1.6 }}>
            База отдыха «Янтарная» — собственный пляж, СПА, баня и домики у самой воды
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("#booking")} className="btn-sea">Забронировать от 4 500 ₽/сут.</button>
            <button onClick={() => scrollTo("#services")} className="btn-sea-outline">Узнать об услугах</button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
            {[["365","дней в году"],["50 м","до пляжа"],["4.9★","средний рейтинг"],["12+","лет на рынке"]].map(([n, l]) => (
              <div key={l} className="text-center py-4 px-3" style={{ color: "#fff" }}>
                <div className="font-display font-semibold leading-none mb-1" style={{ fontSize: "clamp(1.5rem,1.2rem + 1.25vw,2.25rem)", color: "#7dd4e0" }}>{n}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute z-10 flex flex-col items-center gap-2" style={{ bottom: "5.5rem", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }} aria-hidden="true">
          <span>Листать</span>
          <div className="w-px h-10 scroll-arrow-anim" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </div>
      </section>

      {/* PAIN */}
      <section className="py-20 lg:py-28" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <span className="section-label">Момент честности</span>
              <h2 className="font-display font-normal mb-7" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)", lineHeight: 1.1 }}>
                Вы помните, когда<br />по-настоящему отдыхали?
              </h2>
              <p className="mb-4" style={{ fontSize: "1.0625rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                Не «уехал на выходные», а отдыхал — <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>без будильника, без рабочих чатов, без планов.</strong> Когда утро начинается с запаха моря.
              </p>
              <p className="mb-4" style={{ fontSize: "1.0625rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                Большинство откладывают годами. Находят причины: <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>не сезон, дорого, далеко, некогда.</strong>
              </p>
              <p className="mb-8" style={{ fontSize: "1.0625rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                Мы открыты круглый год. Нет «не сезона» — есть зимняя баня с видом на штормящее море, весенние рассветы на пустом пляже и осенний покой без толп.
              </p>
              <button onClick={() => scrollTo("#booking")} className="btn-sea">Найти своё время</button>
            </div>
            <div className="reveal" style={{ borderRadius: "0.875rem", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <img src={IMG_CABIN} alt="Уютный домик у моря" className="w-full object-cover" style={{ aspectRatio: "4/3" }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 lg:py-28" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="section-label">Почему возвращаются</span>
            <h2 className="font-display font-normal" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)" }}>
              Три причины, которые<br />меняют всё
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="reveal p-8 rounded-[0.875rem] border transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)", transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-center justify-center text-2xl mb-5 rounded-xl" style={{ width: 52, height: 52, background: "var(--color-primary-light)" }}>{f.icon}</div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>{f.title}</h3>
                <p className="text-sm leading-[1.75]" style={{ color: "var(--color-text-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-12 reveal">
            <span className="section-label">Что вас ждёт</span>
            <h2 className="font-display font-normal mb-4" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)" }}>
              Всё, что нужно<br />для настоящего отдыха
            </h2>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "58ch", lineHeight: 1.7 }}>
              От уединённых домиков у воды до корпоративных мероприятий — мы продумали каждую деталь.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="reveal md:col-span-2 rounded-[0.875rem] overflow-hidden relative group cursor-default" style={{ boxShadow: "var(--shadow-md)" }}>
              <img src={IMG_HERO} alt="Домики у воды" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ height: "340px" }} loading="lazy" />
              <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: "linear-gradient(to top, rgba(10,20,25,0.82) 0%, rgba(10,20,25,0.1) 60%, transparent 100%)" }}>
                <span className="text-xs tracking-[0.1em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>Размещение</span>
                <h3 className="font-display font-normal leading-[1.15]" style={{ fontSize: "clamp(1.5rem,1.2rem + 1.25vw,2.25rem)", color: "#fff" }}>Домики и коттеджи у воды</h3>
                <p className="text-sm mt-2 leading-[1.5]" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "40ch" }}>От уютного номера с видом на море до просторного коттеджа с частной верандой. 8 категорий.</p>
              </div>
            </div>
            <div className="reveal rounded-[0.875rem] overflow-hidden relative group cursor-default" style={{ boxShadow: "var(--shadow-md)" }}>
              <img src={IMG_BANYA} alt="Баня" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" style={{ height: "340px" }} loading="lazy" />
              <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ background: "linear-gradient(to top, rgba(10,20,25,0.82) 0%, rgba(10,20,25,0.1) 60%, transparent 100%)" }}>
                <span className="text-xs tracking-[0.1em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>СПА и оздоровление</span>
                <h3 className="font-display text-xl font-normal leading-[1.2]" style={{ color: "#fff" }}>Баня, хаммам, массаж</h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="reveal md:col-span-1 rounded-[0.875rem] overflow-hidden relative group cursor-default" style={{ boxShadow: "var(--shadow-md)" }}>
              <img src={IMG_REST} alt="Ресторан" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" style={{ height: "260px" }} loading="lazy" />
              <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "linear-gradient(to top, rgba(10,20,25,0.82) 0%, rgba(10,20,25,0.1) 60%, transparent 100%)" }}>
                <span className="text-xs tracking-[0.1em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>Ресторан</span>
                <h3 className="font-display text-xl font-normal leading-[1.2]" style={{ color: "#fff" }}>Кухня из местных продуктов</h3>
              </div>
            </div>
            <div className="reveal md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
              {SERVICES_EXTRA.map(([em, text]) => (
                <div key={text} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}>
                  <span className="text-xl shrink-0">{em}</span>
                  <span className="text-sm leading-[1.4]" style={{ color: "var(--color-text-muted)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-20 lg:py-28" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[5fr_4fr] gap-16 items-center">
            <div className="reveal relative rounded-[0.875rem] overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
              <img src={IMG_CABIN} alt="Отдых у моря" className="w-full object-cover" style={{ aspectRatio: "3/4" }} loading="lazy" />
              <div className="absolute bottom-6 left-6 rounded-xl px-5 py-4" style={{ background: "rgba(10,20,25,0.78)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="font-display text-2xl font-semibold" style={{ color: "#7dd4e0" }}>12+ лет</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>принимаем гостей</div>
              </div>
            </div>
            <div className="reveal">
              <span className="section-label">Представьте себе</span>
              <h2 className="font-display font-normal mb-6" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)", lineHeight: 1.1 }}>
                Так выглядит настоящий отдых
              </h2>
              <blockquote className="font-display text-xl italic leading-[1.5] my-7 pl-6" style={{ borderLeft: "3px solid var(--color-primary)", color: "var(--color-text)" }}>
                «Просыпаетесь не по будильнику — а потому что солнце уже светит в окно. За стеклом — море. Тихое, ваше.»
              </blockquote>
              <p className="mb-4 leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>На завтрак — свежая выпечка и кофе на открытой веранде. Дети уже убежали на пляж, вы не торопитесь никуда.</p>
              <p className="mb-4 leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>Вечером — баня, запах можжевельника, деревянная купель, звёзды над головой. Никаких планов. Только вы и море.</p>
              <p className="mb-8 leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>Именно так выглядит то, ради чего стоит приехать — не один раз, а каждый сезон.</p>
              <button onClick={() => scrollTo("#booking")} className="btn-sea">Хочу так же →</button>
            </div>
          </div>
        </div>
      </section>

      {/* LOYALTY */}
      <section className="py-20 lg:py-28" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="section-label">Возвращайтесь — получайте больше</span>
            <h2 className="font-display font-normal mb-4" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)" }}>Клуб постоянных гостей</h2>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "55ch", margin: "0 auto", lineHeight: 1.7 }}>
              Каждый гость автоматически участник программы. Чем чаще приезжаете — тем больше привилегий.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LOYALTY.map((l, i) => (
              <div key={l.name} className="reveal rounded-[0.875rem] overflow-hidden border" style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)", transitionDelay: `${i * 0.1}s` }}>
                <div className="px-6 py-5 border-b" style={{ borderColor: "var(--color-border)", background: l.gold ? "linear-gradient(135deg,rgba(201,137,13,0.08),rgba(245,195,82,0.05))" : undefined }}>
                  <div className="text-xs tracking-[0.1em] uppercase mb-2 font-body" style={{ color: "var(--color-text-muted)" }}>{l.tier}</div>
                  <div className="font-display text-2xl font-semibold" style={{ color: l.color }}>{l.name}</div>
                  <div className="font-display text-4xl font-semibold mt-1" style={{ color: l.color }}>{l.discount}</div>
                </div>
                <div className="p-6">
                  <ul className="flex flex-col gap-3">
                    {l.perks.map(p => (
                      <li key={p} className="flex items-start gap-3 text-sm leading-[1.5]" style={{ color: "var(--color-text-muted)" }}>
                        <span style={{ color: "var(--color-primary)", fontWeight: 600, flexShrink: 0, marginTop: "1px" }}>✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 lg:py-28" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <span className="section-label">Нам доверяют</span>
            <h2 className="font-display font-normal" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)" }}>Гости, которые возвращаются</h2>
          </div>
          <div className="flex items-center justify-center gap-8 mb-12 reveal">
            <div className="font-display leading-none" style={{ fontSize: "clamp(3rem,6vw,5rem)", color: "var(--color-text)" }}>4.9</div>
            <div>
              <div className="text-lg mb-1" style={{ color: "var(--color-gold)", letterSpacing: "3px" }}>★★★★★</div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>на основе 327 отзывов</div>
              <div className="text-xs mt-1" style={{ color: "var(--color-text-faint)" }}>TripAdvisor · Яндекс · Booking</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <article key={r.name} className="reveal p-6 rounded-[0.875rem] border" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", transitionDelay: `${i * 0.12}s` }}>
                <div className="text-sm mb-4" style={{ color: "var(--color-gold)", letterSpacing: "2px" }}>★★★★★</div>
                <p className="text-sm leading-[1.75] mb-5 italic" style={{ color: "var(--color-text-muted)" }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-semibold text-base" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>{r.init}</div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--color-text-faint)" }}>{r.loc}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="mb-12 reveal">
            <span className="section-label" style={{ color: "rgba(255,255,255,0.65)" }}>Специальные предложения</span>
            <h2 className="font-display font-normal mb-4" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "#fff" }}>
              Забронируйте сейчас —<br />сэкономьте до 25%
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>Лучшие цены при прямом бронировании. Без комиссий агрегаторов.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PROMOS.map((p, i) => (
              <div key={p.badge} className="reveal rounded-[0.875rem] p-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", transitionDelay: `${i * 0.1}s` }}>
                <div className="inline-block text-xs tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>{p.badge}</div>
                <div className="font-display font-semibold leading-none mb-2" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "#fff" }}>{p.disc}</div>
                <p className="text-sm leading-[1.6]" style={{ color: "rgba(255,255,255,0.75)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="booking" className="py-20 lg:py-28" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <span className="section-label">Связаться с нами</span>
            <h2 className="font-display font-normal mb-4" style={{ fontSize: "clamp(2rem,1.2rem + 2.5vw,3.5rem)", color: "var(--color-text)" }}>
              Готовы ответить<br />прямо сейчас
            </h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              Выберите удобный способ — ответим в течение нескольких минут
            </p>
          </div>

          <div className="reveal max-w-[700px] mx-auto">
            {/* Main contact cards */}
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              {/* Telegram */}
              <a
                href="https://t.me/yantarnaya_baza"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-[0.875rem] border transition-all duration-300 hover:-translate-y-1 text-decoration-none"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110" style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }}>
                  ✈️
                </div>
                <div className="text-center">
                  <div className="font-display text-xl font-semibold mb-1" style={{ color: "var(--color-text)" }}>Telegram</div>
                  <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>Написать в Telegram</div>
                </div>
                <div className="w-full py-3 rounded-xl text-center text-sm font-medium font-body transition-all" style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)", color: "#fff" }}>
                  Открыть чат →
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+79046299439"
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-[0.875rem] border transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))" }}>
                  📞
                </div>
                <div className="text-center">
                  <div className="font-display text-xl font-semibold mb-1" style={{ color: "var(--color-text)" }}>Телефон</div>
                  <div className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>+7 (904) 629-94-39</div>
                </div>
                <div className="w-full py-3 rounded-xl text-center text-sm font-medium font-body transition-all" style={{ background: "var(--color-primary)", color: "#fff" }}>
                  Позвонить →
                </div>
              </a>
            </div>

            {/* Working hours */}
            <div className="rounded-[0.875rem] border p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
              <div className="flex items-center gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <div className="text-sm font-medium font-body" style={{ color: "var(--color-text)" }}>Часы работы</div>
                  <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>Ежедневно, 9:00 — 21:00</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#22c55e" }} />
                <span className="text-sm font-medium font-body" style={{ color: "#22c55e" }}>Принимаем заявки</span>
              </div>
            </div>

            <p className="text-xs text-center mt-5" style={{ color: "var(--color-text-faint)" }}>
              🔒 Лучшая цена при прямом обращении · Без комиссий агрегаторов · Бесплатная отмена за 48 часов
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--color-text)" }} className="py-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14">
            <div>
              <div className="font-display text-2xl mb-4" style={{ color: "#fff" }}>Янтарная</div>
              <p className="text-sm leading-[1.7] mb-6" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "28ch" }}>
                База отдыха у Японского моря в Приморском крае. Собственный пляж, СПА, баня. Открыты 365 дней в году.
              </p>
              <div className="flex gap-3">
                {["VK","TG","WA","IG"].map(s => (
                  <a key={s} href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all font-body"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--color-primary)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}>{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5 font-body" style={{ color: "#fff" }}>Услуги</h4>
              <ul className="flex flex-col gap-3">
                {["Проживание","СПА и баня","Ресторан","Водные активности","Корпоративы"].map(s => (
                  <li key={s}><button onClick={() => scrollTo("#services")} className="text-sm font-body transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>{s}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5 font-body" style={{ color: "#fff" }}>Гостям</h4>
              <ul className="flex flex-col gap-3">
                {[["#booking","Бронирование"],["#reviews","Отзывы"],["#promo","Акции"],["#features","Программа лояльности"]].map(([href, label]) => (
                  <li key={label}><button onClick={() => scrollTo(href)} className="text-sm font-body transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>{label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5 font-body" style={{ color: "#fff" }}>Контакты</h4>
              {[["📍","Приморский край, Хасанский МО, с. Перевозное, ул. Карьерная д.8"],["📞","+7 (994) 101-69-22"],["💬","WhatsApp / Telegram"],["📧","info@yantarnaya-more.ru"]].map(([icon, text]) => (
                <div key={text} className="flex items-start gap-3 mb-3 text-sm font-body" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <span className="shrink-0">{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t flex flex-wrap items-center justify-between gap-4 pt-6 text-xs font-body" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>
            <span>© 2026 База отдыха «Янтарная». Все права защищены.</span>
            <span>Сделано с ❤ у моря</span>
          </div>
        </div>
      </footer>
    </div>
  );
}