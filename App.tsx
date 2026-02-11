import React, { useState, useEffect } from 'react';
import brainIcon from "./gnr1.jpeg"; // ícone do app (fica só na seção saúde mental)
import logo from "./logo.png";       // logo corporativa (site todo)

import { 
  ChevronRight, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Phone,
  MapPin,
  Compass,
  Zap,
  Award,
  Heart,
  BarChart3,
  Smartphone,
  ShieldAlert,
  BrainCircuit
} from 'lucide-react';

/**
 * Faz scroll suave até um elemento por id
 * e remove o hash da URL (para não ficar /#contato).
 */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Remove hash da URL sem recarregar
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

/**
 * Quando alguém abrir direto com /#contato (ou outro),
 * rola até a seção e depois remove o hash.
 */
function useHandleInitialHash() {
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (!hash) return;

    // espera um tick para garantir que o DOM montou
    const t = window.setTimeout(() => {
      scrollToId(hash);
    }, 50);

    return () => window.clearTimeout(t);
  }, []);
}

// --- Header Component ---
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useHandleInitialHash();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Quem Somos', id: 'sobre' },
    { name: 'Saúde Mental', id: 'saude-mental' },
    { name: 'Soluções', id: 'solucoes' },
    { name: 'Diferenciais', id: 'diferenciais' },
    { name: 'Metodologia', id: 'metodologia' },
    { name: 'Contato', id: 'contato' },
  ];

  const onNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo (corporativa) */}
        <a
          href="/"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.location.hash) {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
          }}
        >
          <img
            src={logo}
            alt="Grupo Goto"
            className="h-9 w-auto transition-transform group-hover:scale-105"
            draggable={false}
          />
          <span className={`text-2xl font-bold font-heading tracking-tight ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}>
            GRUPO GOTO
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={onNavClick(link.id)}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b absolute top-full left-0 right-0 p-4 shadow-xl animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.id}`}
                className="text-slate-800 text-lg font-medium hover:text-slate-950"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  scrollToId(link.id);
                }}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                scrollToId('contato');
              }}
              className="bg-slate-900 text-white px-6 py-3 rounded font-bold text-center block hover:bg-slate-800 transition-colors"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Hero Section ---
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Office" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/15 text-white rounded-full text-xs font-bold mb-6 tracking-widest uppercase animate-pulse">
            Inovação e Inteligência Corporativa
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-heading">
            Grupo Goto
          </h1>

          <h2 className="text-2xl md:text-3xl font-light text-white/80 mb-8">
            Soluções integradas para impulsionar negócios
          </h2>

          <p className="text-lg text-white/70 mb-10 leading-relaxed">
            Unimos expertises em múltiplos setores para entregar resultados sustentáveis. Do bem-estar corporativo à gestão estratégica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contato"
              onClick={(e) => { e.preventDefault(); scrollToId('contato'); }}
              className="bg-white text-slate-950 hover:bg-white/90 transition-all px-8 py-4 rounded font-bold text-center flex items-center justify-center gap-2"
            >
              Fale Conosco
              <ChevronRight className="w-5 h-5" />
            </a>

            {/* Mantém paleta do app (diferenciar) */}
            <a 
              href="#saude-mental"
              onClick={(e) => { e.preventDefault(); scrollToId('saude-mental'); }}
              className="bg-brain-gradient px-8 py-4 rounded font-bold text-center flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              Conheça nosso App de Saúde
            </a>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        onClick={(e) => { e.preventDefault(); scrollToId('sobre'); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block group cursor-pointer"
      >
        <div className="w-8 h-12 border-2 border-white/25 group-hover:border-white transition-colors rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </a>
    </section>
  );
};

// --- Mental Health Product Section (MANTÉM paleta do app) ---
const MentalHealthSection: React.FC = () => {
  return (
    <section id="saude-mental" className="py-24 bg-white scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Ícone do app (não troca por logo corporativa) */}
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-brain-gradient rounded-2xl shadow-xl animate-bounce">
            <img
              src={brainIcon}
              alt="Ícone do app"
              className="w-12 h-12 object-contain rounded-xl"
              draggable={false}
            />
          </div>

          <span className="text-health-teal font-bold text-sm tracking-widest uppercase block mb-2">
            Inovação em Saúde Mental
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading bg-brain-gradient bg-clip-text text-transparent">
            Nossa Solução Corporativa
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Monitoramento preventivo e gestão de riscos psicossociais para empresas que valorizam o ESG e o capital humano.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* App side */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-6">
                <Smartphone size={14} /> Aplicativo do Colaborador
              </div>
              <h3 className="text-2xl font-bold mb-6 font-heading">Cuidado Individual e Protegido</h3>
              <ul className="space-y-4 mb-12">
                <li className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                    <Heart className="text-health-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold">Registro de Humor e Bem-estar</h4>
                    <p className="text-slate-500 text-sm">Acompanhamento diário para autoconhecimento e prevenção.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                    <BrainCircuit className="text-health-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold">Questionários Psicológicos</h4>
                    <p className="text-slate-500 text-sm">Avaliação de estresse, carga mental e clima organizacional.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                    <ShieldAlert className="text-health-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold">Alertas de Risco</h4>
                    <p className="text-slate-500 text-sm">Identificação precoce de sinais de burnout e adoecimento.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-inner border border-slate-100 text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-bold italic">Privacidade Garantida</p>
              <p className="text-slate-600 text-sm font-medium">Dados individuais protegidos sob sigilo ético.</p>
            </div>
          </div>

          {/* Dashboard side */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-health-green/20 text-health-green rounded-full text-xs font-bold mb-6 border border-health-green/30">
                <BarChart3 size={14} /> Dashboard para Gestores / RH
              </div>
              <h3 className="text-2xl font-bold mb-6 font-heading">Inteligência Estratégica para o RH</h3>
              <ul className="space-y-4 mb-12">
                <li className="flex gap-4">
                  <div className="bg-white/10 p-2 rounded-lg shrink-0">
                    <Users className="text-health-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Visão Agregada e Anônima</h4>
                    <p className="text-slate-400 text-sm">Entenda o panorama da empresa sem expor o colaborador.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white/10 p-2 rounded-lg shrink-0">
                    <Target className="text-health-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Relatórios de Riscos Psicossociais</h4>
                    <p className="text-slate-400 text-sm">Análise por equipe e setor para intervenções assertivas.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white/10 p-2 rounded-lg shrink-0">
                    <Award className="text-health-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Compliance e ESG</h4>
                    <p className="text-slate-400 text-sm">Apoio direto às métricas de responsabilidade social e NR-01.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-health-green/10 p-6 rounded-2xl border border-health-green/20">
              <p className="text-health-green text-sm font-bold flex items-center gap-2">
                <CheckCircle2 size={16} /> Transformando dados em insights práticos.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-8 max-w-3xl mx-auto italic">
            "Nosso objetivo central é transformar o monitoramento de saúde mental em uma jornada de acolhimento e eficiência organizacional."
          </p>
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); scrollToId('contato'); }}
            className="bg-brain-gradient text-white px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
          >
             Teste nosso sistema
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- About Section ---
const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-slate-900/5 -z-10 rounded"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
              alt="Team Meeting" 
              className="rounded-lg shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-8 -right-8 bg-slate-900 p-8 rounded shadow-lg text-white hidden lg:block z-20">
              <span className="block text-4xl font-bold mb-1">High Standard</span>
              <span className="text-sm uppercase tracking-widest opacity-80">Qualidade Garantida</span>
            </div>
          </div>
          <div>
            <span className="text-slate-700 font-bold text-sm tracking-widest uppercase block mb-2">Quem Somos</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-950 font-heading">
              Sobre o Grupo Goto
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              O <strong className="text-slate-950">Grupo Goto</strong> é um grupo empresarial que atua em múltiplos segmentos, oferecendo uma ampla gama de produtos e serviços desenvolvidos para atender às demandas de um mercado cada vez mais dinâmico e exigente.
            </p>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Nossa atuação é pautada pela qualidade, pela eficiência e pela busca constante por soluções inteligentes. Acreditamos que cada cliente é único e, por isso, trabalhamos de forma personalizada, entendendo suas necessidades para entregar resultados consistentes e sustentáveis.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {["Eficiência", "Inovação", "Qualidade", "Resultados"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="text-slate-900 w-6 h-6" />
                  <span className="font-semibold text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Solutions Section ---
const Solutions: React.FC = () => {
  const features = [
    "Produtos e serviços desenvolvidos com alto padrão",
    "Soluções personalizadas de acordo com cada necessidade",
    "Atuação estratégica e operacional integrada",
    "Suporte especializado em todas as etapas"
  ];

  return (
    <section id="solucoes" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-slate-700 font-bold text-sm tracking-widest uppercase block mb-2">O que fazemos</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-slate-950">Nossas Soluções</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Oferecemos soluções completas, integrando diferentes áreas de atuação para gerar mais valor aos nossos clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
            <div className="w-14 h-14 bg-slate-900/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <TrendingUp className="text-slate-900 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading text-slate-950">Atuação Estratégica</h3>
            <p className="text-slate-600">Planejamento focado no crescimento sustentável e na otimização de recursos.</p>
          </div>

          <div className="bg-slate-50 p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
            <div className="w-14 h-14 bg-slate-900/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <ShieldCheck className="text-slate-900 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading text-slate-950">Alto Padrão</h3>
            <p className="text-slate-600">Garantia de qualidade em todos os processos, do desenvolvimento à entrega final.</p>
          </div>

          <div className="bg-slate-50 p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
            <div className="w-14 h-14 bg-slate-900/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Zap className="text-slate-900 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading text-slate-950">Soluções Ágeis</h3>
            <p className="text-slate-600">Implementação rápida e eficiente adaptada ao dinamismo do mercado atual.</p>
          </div>
        </div>

        <div className="bg-slate-950 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8 font-heading">Por que escolher nossas soluções?</h3>
              <ul className="space-y-6">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-white/15 rounded-full p-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-white/75">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <p className="text-xl italic text-white/80 leading-relaxed mb-6">
                "Nossa abordagem vai além da entrega: acompanhamos, ajustamos e evoluímos junto com o cliente."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10"></div>
                <div>
                  <span className="block font-bold">Diretoria Executiva</span>
                  <span className="text-sm text-white/60">Grupo Goto</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Differentials Section ---
const Differentials: React.FC = () => {
  const diffs = [
    { title: "Integração de expertises", desc: "Diversas áreas atuando de forma conjunta.", icon: <Users /> },
    { title: "Visão estratégica", desc: "Soluções pensadas para o presente e o futuro.", icon: <Compass /> },
    { title: "Qualidade e confiabilidade", desc: "Padrões elevados em tudo o que fazemos.", icon: <Award /> },
    { title: "Personalização", desc: "Soluções adaptadas à realidade de cada cliente.", icon: <Lightbulb /> },
    { title: "Parceria", desc: "Relacionamento próximo e transparente.", icon: <Briefcase /> }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
          <div className="md:w-2/3">
            <span className="text-slate-700 font-bold text-sm tracking-widest uppercase block mb-2">Nossos Diferenciais</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-950">O que nos torna únicos?</h2>
          </div>
          <div className="md:w-1/3">
            <p className="text-slate-600">
              Nossa força está na união de conhecimentos que se complementam para gerar resultados superiores.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {diffs.map((diff, i) => (
            <div
              key={i}
              className="p-8 border border-slate-200 bg-white rounded-xl hover:bg-slate-950 hover:text-white transition-all duration-300 group cursor-default"
            >
              <div className="text-slate-900 mb-6 group-hover:text-white transition-colors">
                {React.cloneElement(diff.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-lg font-bold mb-3 font-heading leading-tight">{diff.title}</h3>
              <p className="text-sm opacity-80">{diff.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Methodology Section ---
const Methodology: React.FC = () => {
  const steps = [
    { title: "Diagnóstico", desc: "Entendimento profundo das necessidades do cliente" },
    { title: "Planejamento", desc: "Definição da melhor estratégia e solução" },
    { title: "Execução", desc: "Implementação com qualidade e eficiência" },
    { title: "Acompanhamento", desc: "Monitoramento contínuo e ajustes necessários" }
  ];

  return (
    <section id="metodologia" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-slate-950">Nossa Metodologia</h2>
          <p className="text-slate-600">Um processo estruturado que garante soluções mais assertivas.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl shadow-sm text-center relative border border-slate-100">
                <div className="w-12 h-12 bg-slate-950 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading text-slate-950">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Missions / Values ---
const Missions: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-10 border-t-4 border-slate-950 bg-white rounded-b-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4 font-heading text-slate-950">Missão</h3>
            <p className="text-slate-700 leading-relaxed">
              Oferecer soluções integradas com excelência, gerando valor e resultados reais para nossos clientes.
            </p>
          </div>

          <div className="p-10 border-t-4 border-slate-700 bg-white rounded-b-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4 font-heading text-slate-950">Visão</h3>
            <p className="text-slate-700 leading-relaxed">
              Ser referência em soluções multissetoriais, reconhecida pela qualidade, inovação e parceria com seus clientes.
            </p>
          </div>

          <div className="p-10 border-t-4 border-slate-950 bg-slate-950 text-white rounded-b-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4 font-heading">Valores</h3>
            <ul className="space-y-3">
              {["Qualidade", "Compromisso com resultados", "Ética e transparência", "Inovação", "Foco no cliente"].map((v, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/90" />
                  <span className="text-white/90">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer Section ---
const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-slate-950 text-white pt-20 pb-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              {/* Logo (corporativa) */}
              <img
                src={logo}
                alt="Grupo Goto"
                className="h-9 w-auto"
                draggable={false}
              />
              <span className="text-2xl font-bold font-heading tracking-tight">GRUPO GOTO</span>
            </div>

            <h3 className="text-2xl font-bold mb-6 font-heading">Vamos construir a solução ideal para o seu negócio?</h3>
            <p className="text-white/60 mb-8 max-w-md">
              Entre em contato com o Grupo Goto e descubra como nossas soluções integradas podem impulsionar seus resultados.
            </p>

            <a 
              href="mailto:contato@grupogoto.com.br"
              className="bg-white text-slate-950 hover:bg-white/90 transition-all px-10 py-4 rounded-full font-bold inline-flex items-center gap-3 group"
            >
              Fale conosco agora
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 font-heading">Atalhos</h4>
            <ul className="space-y-4 text-white/65">
              <li><a href="#sobre" onClick={(e)=>{e.preventDefault();scrollToId('sobre')}} className="hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#saude-mental" onClick={(e)=>{e.preventDefault();scrollToId('saude-mental')}} className="hover:text-white transition-colors">Saúde Mental (App)</a></li>
              <li><a href="#solucoes" onClick={(e)=>{e.preventDefault();scrollToId('solucoes')}} className="hover:text-white transition-colors">Nossas Soluções</a></li>
              <li><a href="#diferenciais" onClick={(e)=>{e.preventDefault();scrollToId('diferenciais')}} className="hover:text-white transition-colors">Diferenciais</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 font-heading">Contato</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-white/85 shrink-0" />
                <span className="text-white/65">Brasilia-DF</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-white/85 shrink-0" />
                <span className="text-white/65">+55 (61) 98196-0225</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Grupo Goto. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  useHandleInitialHash();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <MentalHealthSection />
        <Solutions />
        <Differentials />
        
        {/* Multisector Banner (corporativo: paleta logo) */}
        <section className="py-20 bg-slate-950 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Atuação Multissetorial</h2>
            <p className="text-xl text-white/75 max-w-3xl mx-auto">
              Atendemos empresas de diferentes segmentos, respeitando as particularidades de cada mercado e os objetivos estratégicos de cada cliente.
            </p>
          </div>
          <div className="absolute inset-0 bg-white/5 opacity-20 -skew-y-3 translate-y-20"></div>
        </section>

        <Methodology />
        <Missions />

        {/* Closing CTA Section (corporativo) */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-slate-950">
              Por que escolher o <span className="text-slate-950">Grupo Goto?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Porque mais do que oferecer produtos e serviços, entregamos <strong>soluções completas</strong>, construídas a partir da integração de conhecimentos, experiência e visão estratégica. Trabalhamos lado a lado com nossos clientes para superar desafios e alcançar objetivos.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-6">
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
