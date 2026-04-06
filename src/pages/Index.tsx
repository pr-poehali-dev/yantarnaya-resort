import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/647e387a-2630-425a-bf1f-3e519a6524c6.jpg";
const CABIN_IMG = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/e1f19dc3-4801-4176-809e-df5b4bf91241.jpg";
const SPA_IMG = "https://cdn.poehali.dev/projects/00459ce7-4eaf-407e-8b0b-a35e0148bc22/files/2d26d400-5c4c-4736-9a38-16be49745185.jpg";

const rooms = [
  {
    id: 1,
    name: "Уютный сруб",
    desc: "Небольшой деревянный домик для двоих. Печное отопление, своя веранда с видом на лес.",
    price: "4 200",
    guests: 2,
    area: "28 м²",
    img: CABIN_IMG,
    tag: "Популярный",
  },
  {
    id: 2,
    name: "Семейный дом",
    desc: "Просторный дом для большой компании. Две спальни, общая гостиная с камином, кухня.",
    price: "8 900",
    guests: 6,
    area: "65 м²",
    img: HERO_IMG,
    tag: "Для семьи",
  },
  {
    id: 3,
    name: "Баня с купелью",
    desc: "Русская баня с отдельной зоной отдыха, купелью с чистой ключевой водой и беседкой.",
    price: "3 500",
    guests: 4,
    area: "40 м²",
    img: SPA_IMG,
    tag: "Хит",
  },
];

const services = [
  { icon: "Flame", title: "Русская баня", desc: "Настоящая топка по-чёрному, берёзовые и дубовые веники, купель с ключевой водой" },
  { icon: "Fish", title: "Рыбалка", desc: "Собственный пруд с карпом, окунем и щукой. Снасти и инвентарь в аренду" },
  { icon: "UtensilsCrossed", title: "Своя кухня", desc: "Приготовим блюда из местных продуктов на открытом огне или в печи" },
  { icon: "TreePine", title: "Прогулки в лесу", desc: "Пешие маршруты по смешанному лесу, сбор грибов и ягод по сезону" },
  { icon: "Tent", title: "Летний лагерь", desc: "Площадка для барбекю, шатёр для торжеств, прокат мангалов" },
  { icon: "Bike", title: "Активный отдых", desc: "Прокат велосипедов, SUP-досок, лодок и квадроциклов" },
];

const reviews = [
  {
    name: "Марина Соколова",
    date: "Март 2025",
    text: "Удивительное место! Приезжали всей семьёй на три дня. Дети в восторге от рыбалки, а баня — просто сказка. Уезжать не хотелось.",
    stars: 5,
  },
  {
    name: "Алексей Кравцов",
    date: "Февраль 2025",
    text: "Провели здесь новогодние праздники. Тишина, снег, баня и горячая купель — идеальный отдых от городского шума. Вернёмся обязательно!",
    stars: 5,
  },
  {
    name: "Ольга и Дмитрий",
    date: "Январь 2025",
    text: "Романтические выходные в срубе. Всё было идеально — уют, тишина, вкусная еда. Персонал очень внимательный и приветливый.",
    stars: 5,
  },
];

const promos = [
  {
    title: "Ранняя бронь",
    desc: "Забронируйте за 30 дней и получите скидку 20% на любой тип жилья",
    badge: "−20%",
    valid: "Действует до 31 мая 2025",
  },
  {
    title: "Будни дешевле",
    desc: "Заезд с понедельника по четверг — специальная цена. Больше тишины, меньше стоимость",
    badge: "−15%",
    valid: "Действует постоянно",
  },
  {
    title: "Три ночи — четвёртая в подарок",
    desc: "При бронировании от 3 ночей четвёртая ночь бесплатно. Идеально для длинного отдыха",
    badge: "4=3",
    valid: "Действует в межсезонье",
  },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    checkin: "",
    checkout: "",
    guests: "2",
    room: "",
    name: "",
    phone: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--earth-cream)", color: "var(--earth-dark)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(44,31,20,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-xl font-light tracking-widest" style={{ color: "var(--earth-light)" }}>
            Лесная Заимка
          </button>
          <div className="hidden md:flex items-center gap-8">
            {[["rooms", "Номера"], ["services", "Услуги"], ["about", "О нас"], ["reviews", "Отзывы"], ["promos", "Акции"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
            ))}
          </div>
          <button onClick={() => scrollTo("booking")} className="btn-primary text-sm hidden md:block" style={{ borderRadius: "var(--radius)" }}>
            Забронировать
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--earth-light)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3" style={{ background: "rgba(44,31,20,0.98)" }}>
            {[["rooms", "Номера"], ["services", "Услуги"], ["about", "О нас"], ["reviews", "Отзывы"], ["promos", "Акции"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-left py-1">{label}</button>
            ))}
            <button onClick={() => scrollTo("booking")} className="btn-primary text-sm mt-2" style={{ borderRadius: "var(--radius)", textAlign: "center" }}>
              Забронировать
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={HERO_IMG} alt="База отдыха Лесная Заимка" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(44,31,20,0.55) 0%, rgba(44,31,20,0.3) 50%, rgba(44,31,20,0.7) 100%)" }} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <p className="font-body text-sm tracking-[0.3em] uppercase mb-6 opacity-80" style={{ color: "var(--earth-light)" }}>
            База отдыха в сердце природы
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light mb-6 leading-none" style={{ color: "var(--earth-cream)" }}>
            Лесная<br /><em>Заимка</em>
          </h1>
          <p className="font-body text-lg md:text-xl mb-10 opacity-85 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--earth-light)" }}>
            Уютные домики в старом лесу. Баня, тишина и чистый воздух — всего 90 минут от города.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("booking")} className="btn-primary" style={{ borderRadius: "var(--radius)", fontSize: "1rem" }}>
              Забронировать
            </button>
            <button onClick={() => scrollTo("rooms")} className="btn-outline" style={{ borderRadius: "var(--radius)", fontSize: "1rem" }}>
              Посмотреть домики
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "var(--earth-light)" }}>
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* QUICK STATS */}
      <section style={{ backgroundColor: "var(--earth-dark)" }} className="py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["12", "Уютных домиков"],
            ["5 га", "Территория"],
            ["8+", "Активностей"],
            ["4.9 ★", "Средняя оценка"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display text-4xl md:text-5xl font-light mb-1" style={{ color: "var(--terracotta)" }}>{num}</div>
              <div className="font-body text-sm opacity-70" style={{ color: "var(--earth-light)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-divider" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Выбор жилья</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--earth-dark)" }}>
              Наши номера
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <div key={room.id} className="card-nature rounded-xl overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}>
                <div className="relative h-56 overflow-hidden">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <span className="absolute top-4 left-4 font-body text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "var(--terracotta)", color: "var(--earth-cream)" }}>
                    {room.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-medium mb-2" style={{ color: "var(--earth-dark)" }}>{room.name}</h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--earth-medium)" }}>{room.desc}</p>
                  <div className="flex items-center gap-4 mb-5 text-sm" style={{ color: "var(--earth-medium)" }}>
                    <span className="flex items-center gap-1"><Icon name="Users" size={15} />{room.guests} гостей</span>
                    <span className="flex items-center gap-1"><Icon name="SquareCheck" size={15} />{room.area}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-3xl font-semibold" style={{ color: "var(--terracotta)" }}>{room.price} ₽</span>
                      <span className="font-body text-xs ml-1" style={{ color: "var(--earth-medium)" }}>/ночь</span>
                    </div>
                    <button onClick={() => scrollTo("booking")} className="btn-primary text-sm" style={{ borderRadius: "var(--radius)", padding: "0.5rem 1.25rem" }}>
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6" style={{ backgroundColor: "rgba(107,127,94,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-divider" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Что включено</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--earth-dark)" }}>
              Услуги
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="p-6 rounded-xl animate-fade-up" style={{ background: "rgba(245,239,230,0.8)", border: "1px solid rgba(196,168,130,0.3)", animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(181,98,42,0.12)" }}>
                  <Icon name={s.icon} fallback="Star" size={22} style={{ color: "var(--terracotta)" }} />
                </div>
                <h3 className="font-display text-xl font-medium mb-2" style={{ color: "var(--earth-dark)" }}>{s.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--earth-medium)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={SPA_IMG} alt="О базе отдыха" className="rounded-2xl w-full object-cover h-[480px]" style={{ boxShadow: "12px 16px 40px rgba(61,43,31,0.2)" }} />
            <div className="absolute -bottom-6 -right-6 rounded-2xl p-6 hidden md:block" style={{ backgroundColor: "var(--terracotta)", color: "var(--earth-cream)", width: "160px" }}>
              <p className="font-display text-4xl font-light">12+</p>
              <p className="font-body text-xs mt-1 opacity-90">лет принимаем гостей</p>
            </div>
          </div>
          <div>
            <span className="section-divider-left" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Наша история</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ color: "var(--earth-dark)" }}>
              О нас
            </h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--earth-medium)" }}>
              Лесная Заимка — семейная база отдыха, которую мы создали в 2012 году в сосново-берёзовом лесу Подмосковья. Всё началось с одного домика и мечты о настоящем отдыхе вдали от городской суеты.
            </p>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--earth-medium)" }}>
              Сегодня это 5 гектаров живой природы, 12 уютных домиков, русская баня с купелью, собственный пруд и маршруты для прогулок. Мы принимаем гостей круглый год и знаем, что каждый сезон по-своему прекрасен.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[["🌲", "Старый смешанный лес"], ["🐟", "Собственный пруд"], ["🔥", "Топим баню каждый день"], ["🧺", "Домашняя еда"]].map(([em, text]) => (
                <div key={text} className="flex items-center gap-2 font-body text-sm" style={{ color: "var(--earth-dark)" }}>
                  <span className="text-xl">{em}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6" style={{ backgroundColor: "var(--earth-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-divider" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Что говорят гости</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--earth-cream)" }}>
              Отзывы
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={r.name} className="rounded-xl p-7 animate-fade-up" style={{ background: "rgba(245,239,230,0.06)", border: "1px solid rgba(196,168,130,0.15)", animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}>
                <div className="flex gap-1 mb-4">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <span key={j} style={{ color: "var(--terracotta)" }}>★</span>
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed mb-5 italic" style={{ color: "var(--earth-light)" }}>«{r.text}»</p>
                <div>
                  <p className="font-body font-medium text-sm" style={{ color: "var(--earth-cream)" }}>{r.name}</p>
                  <p className="font-body text-xs opacity-50 mt-0.5" style={{ color: "var(--earth-light)" }}>{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOS */}
      <section id="promos" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-divider" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Специальные предложения</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--earth-dark)" }}>
              Акции
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {promos.map((p, i) => (
              <div key={p.title} className="rounded-xl overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both", border: "1px solid rgba(196,168,130,0.3)" }}>
                <div className="p-6 flex items-start gap-4" style={{ backgroundColor: "rgba(181,98,42,0.07)" }}>
                  <div className="font-display font-bold w-20 h-20 rounded-full flex items-center justify-center shrink-0 text-center leading-none" style={{ backgroundColor: "var(--terracotta)", color: "var(--earth-cream)", fontSize: "1.2rem" }}>
                    {p.badge}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium mb-1" style={{ color: "var(--earth-dark)" }}>{p.title}</h3>
                    <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "var(--earth-medium)" }}>{p.desc}</p>
                    <p className="font-body text-xs" style={{ color: "var(--moss)" }}>🌿 {p.valid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6" style={{ backgroundColor: "rgba(107,127,94,0.1)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-divider" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Онлайн-заявка</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-4" style={{ color: "var(--earth-dark)" }}>
              Бронирование
            </h2>
            <p className="font-body text-base" style={{ color: "var(--earth-medium)" }}>Заполните форму — мы свяжемся с вами в течение 30 минут</p>
          </div>

          <form onSubmit={handleBooking} className="rounded-2xl p-8 md:p-10" style={{ background: "rgba(245,239,230,0.85)", border: "1px solid rgba(196,168,130,0.4)", boxShadow: "0 8px 40px rgba(61,43,31,0.1)" }}>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: "var(--earth-medium)" }}>Дата заезда</label>
                <input
                  type="date"
                  required
                  value={bookingForm.checkin}
                  onChange={e => setBookingForm(f => ({ ...f, checkin: e.target.value }))}
                  className="w-full font-body text-sm px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ background: "white", border: "1px solid rgba(196,168,130,0.5)", color: "var(--earth-dark)" }}
                />
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: "var(--earth-medium)" }}>Дата выезда</label>
                <input
                  type="date"
                  required
                  value={bookingForm.checkout}
                  onChange={e => setBookingForm(f => ({ ...f, checkout: e.target.value }))}
                  className="w-full font-body text-sm px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ background: "white", border: "1px solid rgba(196,168,130,0.5)", color: "var(--earth-dark)" }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: "var(--earth-medium)" }}>Тип жилья</label>
                <select
                  required
                  value={bookingForm.room}
                  onChange={e => setBookingForm(f => ({ ...f, room: e.target.value }))}
                  className="w-full font-body text-sm px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ background: "white", border: "1px solid rgba(196,168,130,0.5)", color: "var(--earth-dark)" }}
                >
                  <option value="">Выберите...</option>
                  <option value="srub">Уютный сруб — от 4 200 ₽/ночь</option>
                  <option value="family">Семейный дом — от 8 900 ₽/ночь</option>
                  <option value="banya">Баня с купелью — от 3 500 ₽/ночь</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: "var(--earth-medium)" }}>Количество гостей</label>
                <select
                  value={bookingForm.guests}
                  onChange={e => setBookingForm(f => ({ ...f, guests: e.target.value }))}
                  className="w-full font-body text-sm px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ background: "white", border: "1px solid rgba(196,168,130,0.5)", color: "var(--earth-dark)" }}
                >
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-7">
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: "var(--earth-medium)" }}>Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван Петров"
                  value={bookingForm.name}
                  onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full font-body text-sm px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ background: "white", border: "1px solid rgba(196,168,130,0.5)", color: "var(--earth-dark)" }}
                />
              </div>
              <div>
                <label className="font-body text-xs font-medium uppercase tracking-wider mb-2 block" style={{ color: "var(--earth-medium)" }}>Телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={bookingForm.phone}
                  onChange={e => setBookingForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full font-body text-sm px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ background: "white", border: "1px solid rgba(196,168,130,0.5)", color: "var(--earth-dark)" }}
                />
              </div>
            </div>

            {bookingSuccess && (
              <div className="mb-5 rounded-lg p-4 text-center font-body text-sm font-medium animate-fade-in" style={{ backgroundColor: "rgba(107,127,94,0.15)", border: "1px solid var(--moss-light)", color: "var(--moss)" }}>
                🌿 Заявка принята! Мы позвоним вам в течение 30 минут.
              </div>
            )}

            <button type="submit" className="btn-primary w-full text-base" style={{ borderRadius: "var(--radius)", padding: "1rem" }}>
              Отправить заявку
            </button>
            <p className="font-body text-xs text-center mt-4" style={{ color: "var(--earth-medium)" }}>
              Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
            </p>
          </form>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6" style={{ backgroundColor: "var(--earth-dark)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-divider-left" />
            <p className="font-body text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "var(--terracotta)" }}>Как нас найти</p>
            <h2 className="font-display text-5xl font-light mb-8" style={{ color: "var(--earth-cream)" }}>Контакты</h2>
            <div className="space-y-5">
              {[
                { icon: "MapPin", label: "Адрес", val: "Московская обл., Дмитровский р-н, д. Лесное, ул. Заимочная, 1" },
                { icon: "Phone", label: "Телефон", val: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", val: "hello@lesnaya-zaimka.ru" },
                { icon: "Clock", label: "Заезд / выезд", val: "Заезд с 14:00 · Выезд до 12:00" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(181,98,42,0.2)" }}>
                    <Icon name={icon} fallback="MapPin" size={18} style={{ color: "var(--terracotta)" }} />
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--earth-medium)" }}>{label}</p>
                    <p className="font-body text-sm" style={{ color: "var(--earth-light)" }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-2xl overflow-hidden h-80" style={{ border: "1px solid rgba(196,168,130,0.15)" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.522068,56.340000&z=10&l=map&pt=37.522068,56.340000,pm2rdl"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта"
                className="w-full h-full"
              />
            </div>
            <div className="mt-5 rounded-xl p-5 flex items-center gap-4" style={{ background: "rgba(181,98,42,0.12)", border: "1px solid rgba(181,98,42,0.2)" }}>
              <span className="text-3xl">🚗</span>
              <div>
                <p className="font-body text-sm font-medium" style={{ color: "var(--earth-cream)" }}>90 минут от МКАД</p>
                <p className="font-body text-xs mt-0.5" style={{ color: "var(--earth-medium)" }}>Трасса Дмитров — Талдом, поворот у д. Синьково</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center font-body text-xs" style={{ backgroundColor: "var(--bark)", color: "var(--earth-medium)" }}>
        <p className="font-display text-xl mb-2" style={{ color: "var(--earth-light)" }}>Лесная Заимка</p>
        <p>© 2025 База отдыха «Лесная Заимка». Все права защищены.</p>
      </footer>
    </div>
  );
}