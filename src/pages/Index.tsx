import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LAWYER_PHOTO = "https://cdn.poehali.dev/projects/25282de1-4de7-45ea-9561-eafe344e5361/files/65586fc4-e335-4615-8e2a-ea51a9a5f5df.jpg";

const services = [
  {
    icon: "Scale",
    title: "Уголовные дела",
    desc: "Защита на всех стадиях уголовного процесса. Представление интересов в суде, работа со следователями и прокуратурой.",
  },
  {
    icon: "FileText",
    title: "Гражданские споры",
    desc: "Разрешение имущественных конфликтов, взыскание долгов, споры о праве собственности, наследственные дела.",
  },
  {
    icon: "Briefcase",
    title: "Корпоративное право",
    desc: "Сопровождение сделок, составление договоров, защита активов, разрешение корпоративных конфликтов.",
  },
  {
    icon: "Home",
    title: "Семейное право",
    desc: "Бракоразводные процессы, раздел имущества, алименты, определение места проживания детей.",
  },
  {
    icon: "Building2",
    title: "Арбитражные дела",
    desc: "Представление интересов бизнеса в арбитражных судах всех инстанций. Взыскание задолженностей.",
  },
  {
    icon: "ShieldCheck",
    title: "Административное право",
    desc: "Оспаривание решений государственных органов, защита при административных правонарушениях.",
  },
];

const stats = [
  { value: "18+", label: "лет практики" },
  { value: "500+", label: "выигранных дел" },
  { value: "97%", label: "успешных решений" },
  { value: "24/7", label: "доступность" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const aboutSection = useInView();
  const servicesSection = useInView();
  const statsSection = useInView();
  const contactSection = useInView();

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1C1C1C] font-ibm">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1C1C1C]/97 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center">
                <span className="text-[#D4AF37] font-cormorant text-sm font-semibold">А</span>
              </div>
              <span className={`font-cormorant text-lg font-semibold tracking-wider transition-colors ${scrolled ? "text-white" : "text-[#1C1C1C]"}`}>
                АДВОКАТ
              </span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              {[["hero", "Главная"], ["about", "Об адвокате"], ["services", "Услуги"], ["contact", "Контакты"]].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`nav-link text-xs uppercase tracking-widest font-ibm font-medium transition-colors ${scrolled ? "text-gray-300 hover:text-[#D4AF37]" : "text-[#3a3a3a] hover:text-[#B8960C]"}`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="ml-4 px-6 py-2.5 bg-[#B8960C] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#D4AF37] transition-colors"
              >
                Консультация
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} className={scrolled ? "text-white" : "text-[#1C1C1C]"} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#1C1C1C] border-t border-gray-800">
            <div className="px-6 py-6 flex flex-col gap-5">
              {[["hero", "Главная"], ["about", "Об адвокате"], ["services", "Услуги"], ["contact", "Контакты"]].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-gray-300 text-sm uppercase tracking-widest text-left hover:text-[#D4AF37] transition-colors"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 px-6 py-3 bg-[#B8960C] text-white text-sm uppercase tracking-widest text-center"
              >
                Записаться
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#141414]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 49px, #D4AF37 49px, #D4AF37 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #D4AF37 49px, #D4AF37 50px)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-8 animate-fade-in">
                <div className="w-10 h-px bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-ibm">Профессиональная защита</span>
              </div>

              <h1 className="font-cormorant text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-8 animate-fade-in animate-delay-100">
                Ваши права —<br />
                <span className="italic font-semibold text-[#D4AF37]">моя ответственность</span>
              </h1>

              <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-12 max-w-lg font-light animate-fade-in animate-delay-200">
                Более 18 лет практики в уголовном, гражданском и корпоративном праве. Индивидуальный подход к каждому делу.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-8 py-4 bg-[#B8960C] text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] transition-all duration-300"
                >
                  Записаться на консультацию
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  className="px-8 py-4 border border-gray-600 text-gray-300 text-sm uppercase tracking-[0.2em] font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                >
                  Услуги
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in animate-delay-200">
              <div className="relative">
                <div className="absolute -inset-3 border border-[#D4AF37]/20" />
                <div className="absolute -inset-1 border border-[#D4AF37]/10" />
                <img
                  src={LAWYER_PHOTO}
                  alt="Адвокат"
                  className="w-72 lg:w-96 h-96 lg:h-[520px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="h-px bg-[#D4AF37]/50 mb-3" />
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Адвокат · Член адвокатской палаты</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* STATS BAR */}
      <div ref={statsSection.ref} className="bg-[#1C1C1C] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#D4AF37]/15">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-8 px-8 text-center transition-all duration-700 ${statsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-cormorant text-4xl lg:text-5xl font-semibold text-[#D4AF37] mb-1">{s.value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-36 bg-[#F7F5F2]">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`transition-all duration-700 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="relative">
                <img
                  src={LAWYER_PHOTO}
                  alt="Адвокат"
                  className="w-full max-w-md h-[500px] object-cover object-top"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#1C1C1C] p-8 hidden lg:block">
                  <div className="font-cormorant text-5xl font-bold text-[#D4AF37]">18</div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">лет практики</div>
                </div>
                <div className="absolute top-6 -left-6 w-1 h-20 bg-[#D4AF37] hidden lg:block" />
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-line" />
                <span className="text-[#B8960C] text-xs uppercase tracking-[0.3em]">Об адвокате</span>
              </div>

              <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#1C1C1C] leading-tight mb-6">
                Профессионализм,<br />
                <span className="italic font-semibold">проверенный делами</span>
              </h2>

              <div className="w-16 h-px bg-[#D4AF37] mb-8" />

              <div className="space-y-5 text-[#5a5550] leading-relaxed">
                <p>
                  Окончил юридический факультет МГУ с отличием. Специализируюсь на уголовных, гражданских и корпоративных делах. Каждое дело требует индивидуального стратегического подхода.
                </p>
                <p>
                  За 18 лет практики я выработал методологию работы, которая позволяет достигать максимального результата даже в самых сложных правовых ситуациях.
                </p>
                <p>
                  Я не просто представляю ваши интересы в суде — я становлюсь вашим надёжным партнёром в решении любых правовых вопросов.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[#D4AF37]/30 grid grid-cols-2 gap-6">
                {[["Членство", "Адвокатская палата г. Москвы"], ["Образование", "МГУ, юридический факультет"], ["Специализация", "Уголовное и гражданское право"], ["Регион", "Москва и вся Россия"]].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-[#B8960C] text-xs uppercase tracking-widest mb-1">{label}</div>
                    <div className="text-[#1C1C1C] text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-36 bg-[#1C1C1C]">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-16 transition-all duration-700 ${servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em]">Услуги</span>
              <div className="w-12 h-px bg-[#D4AF37]" />
            </div>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-white">
              Области <span className="italic font-semibold text-[#D4AF37]">правовой защиты</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D4AF37]/10">
            {services.map((s, i) => (
              <div
                key={i}
                className={`bg-[#1C1C1C] p-8 lg:p-10 group hover:bg-[#242424] transition-all duration-500 cursor-default ${servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 border border-[#D4AF37]/40 flex items-center justify-center mb-6 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Icon name={s.icon} fallback="Scale" size={18} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {s.desc}
                </p>
                <div className="mt-6 w-0 group-hover:w-8 h-px bg-[#D4AF37] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-36 bg-[#F7F5F2]">
        <div ref={contactSection.ref} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div className={`transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-line" />
                <span className="text-[#B8960C] text-xs uppercase tracking-[0.3em]">Контакты</span>
              </div>
              <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#1C1C1C] mb-6">
                Запись на<br />
                <span className="italic font-semibold text-[#B8960C]">онлайн-консультацию</span>
              </h2>
              <div className="w-16 h-px bg-[#D4AF37] mb-8" />
              <p className="text-[#5a5550] leading-relaxed mb-12">
                Первичная консультация поможет оценить перспективы вашего дела. Свяжитесь любым удобным способом — я отвечу в течение часа.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@advokat.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 1, офис 101" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–20:00, Сб: 10:00–16:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={c.icon} fallback="Phone" size={16} className="text-[#B8960C]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#B8960C] mb-0.5">{c.label}</div>
                      <div className="text-[#1C1C1C] text-sm font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="bg-[#1C1C1C] p-8 lg:p-12">
                <div className="w-8 h-px bg-[#D4AF37] mb-6" />
                <h3 className="font-cormorant text-2xl font-semibold text-white mb-8">Форма записи</h3>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-14 h-14 border border-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                      <Icon name="Check" size={24} className="text-[#D4AF37]" />
                    </div>
                    <h4 className="font-cormorant text-2xl text-white mb-3">Заявка отправлена</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Я свяжусь с вами в течение часа для подтверждения времени консультации.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-[#D4AF37] text-xs uppercase tracking-widest border-b border-[#D4AF37]/40 pb-0.5 hover:border-[#D4AF37] transition-colors"
                    >
                      Отправить ещё одну
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full bg-transparent border border-gray-700 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-transparent border border-gray-700 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Тип консультации</label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#1C1C1C] border border-gray-700 text-gray-300 px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Выберите направление</option>
                        <option value="criminal">Уголовное дело</option>
                        <option value="civil">Гражданский спор</option>
                        <option value="corporate">Корпоративное право</option>
                        <option value="family">Семейное право</option>
                        <option value="arbitrage">Арбитражное дело</option>
                        <option value="admin">Административное</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Краткое описание ситуации</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Опишите суть вашего вопроса..."
                        className="w-full bg-transparent border border-gray-700 text-white px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-gray-600 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#B8960C] text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] transition-all duration-300 mt-2"
                    >
                      Записаться на консультацию
                    </button>
                    <p className="text-gray-600 text-xs text-center leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#141414] border-t border-[#D4AF37]/10 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[#D4AF37]/60 flex items-center justify-center">
              <span className="text-[#D4AF37] font-cormorant text-sm font-semibold">А</span>
            </div>
            <span className="font-cormorant text-white text-base tracking-wider">АДВОКАТ</span>
          </div>
          <div className="flex gap-8">
            {[["hero", "Главная"], ["about", "Об адвокате"], ["services", "Услуги"], ["contact", "Контакты"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-gray-600 text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-gray-700 text-xs">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}