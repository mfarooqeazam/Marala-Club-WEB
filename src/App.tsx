import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import InteractiveRacketX from '@/components/InteractiveRacketX';
import { ContactInfo, FloatingWhatsApp } from '@/components/SocialContact';
import {
  ExportIcon,
  GlobeMarkIcon,
  HockeyStickIcon,
  HoneycombIcon,
  PaddleIcon,
  PressIcon,
} from '@/components/MaralaIcons';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

const productGroups = [
  {
    number: '01',
    category: 'Hockey Equipment',
    products: [
      { name: 'Hockey Sticks', detail: 'All playing styles, materials, profiles, and custom constructions.' },
      { name: 'Hockey Balls', detail: 'Match, training, and custom colour options for every playing surface.' },
      { name: 'All Hockey Varieties', detail: 'Complete hockey ranges developed for field, indoor, and training use.' },
    ],
  },
  {
    number: '02',
    category: 'Pickleball Equipment',
    products: [
      { name: 'Pickleball Rackets', detail: 'Performance paddles with configurable shapes, cores, and surface finishes.' },
      { name: 'Pickleballs', detail: 'Indoor and outdoor ball options for training, clubs, and competition.' },
    ],
  },
  {
    number: '03',
    category: 'Goalkeeper Protection',
    products: [
      { name: 'Goalkeeper Kit Bags', detail: 'High-capacity carry systems made for complete goalkeeper equipment.' },
      { name: 'Goalkeeper Helmets', detail: 'Protective headgear with custom fit, finish, and ventilation options.' },
      { name: 'Goalkeeper Shin & Leg Pads', detail: 'Full protection systems engineered for movement, impact, and control.' },
      { name: 'Thigh Pads', detail: 'Lightweight protective coverage designed to work with goalkeeper kits.' },
      { name: 'Face Masks', detail: 'Protective face coverage developed for confidence under pressure.' },
    ],
  },
  {
    number: '04',
    category: 'Bags & Carry Systems',
    products: [
      { name: 'Shoulder Bags', detail: 'Versatile everyday carry formats for players, clubs, and teams.' },
      { name: 'Player Bags', detail: 'Durable team-ready storage with configurable compartments and branding.' },
    ],
  },
];

function ProductPage({ onBack, onConsult }: { onBack: () => void; onConsult: () => void }) {
  const [activeCategory, setActiveCategory] = useState('All products');
  const categories = ['All products', ...productGroups.map((group) => group.category)];
  const visibleGroups = activeCategory === 'All products'
    ? productGroups
    : productGroups.filter((group) => group.category === activeCategory);

  return (
    <div className="min-h-screen bg-marala-white text-marala-navy">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-marala-navy/10 bg-marala-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <button type="button" onClick={onBack} className="group flex items-center gap-3 font-display text-xl font-bold uppercase tracking-[0.12em]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marala-navy text-xl text-white">M</span>
            <span>Marala Club</span>
          </button>
          <button type="button" onClick={onConsult} className="group inline-flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-marala-orange">
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:pt-36 lg:px-12 lg:pt-48">
        <div className="mb-16 sm:mb-24 grid gap-10 lg:gap-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <button type="button" onClick={onBack} className="mb-10 inline-flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-marala-gray transition-colors hover:text-marala-orange">
              <ChevronRight className="h-4 w-4 rotate-180" /> Back to home
            </button>
            <span className="mb-8 block border-l-2 border-marala-orange pl-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-marala-orange">Marala Club / Product index</span>
            <h1 className="max-w-5xl text-[2.75rem] font-display font-bold uppercase leading-[0.85] tracking-tighter text-marala-navy sm:text-7xl md:text-8xl lg:text-[10rem] lg:leading-[0.82]">Equipment<br /><span className="text-marala-teal">without limits.</span></h1>
          </div>
          <p className="max-w-sm text-lg font-light leading-relaxed text-marala-gray">A working catalogue of hockey, pickleball, protection, and carry systems. Select a category to explore the range.</p>
        </div>

        <div className="mb-12 flex flex-wrap gap-x-8 gap-y-4 border-y border-marala-navy/15 py-5">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className={cn('relative pb-2 font-display text-xs font-bold uppercase tracking-[0.14em] transition-colors', activeCategory === category ? 'text-marala-orange' : 'text-marala-gray hover:text-marala-navy')}>
              {category}
              <span className={cn('absolute bottom-0 left-0 h-px bg-marala-orange transition-all duration-300', activeCategory === category ? 'w-full' : 'w-0')} />
            </button>
          ))}
        </div>

        <div className="border-t border-marala-navy/20">
          {visibleGroups.map((group) => (
            <motion.section key={group.number} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-8 border-b border-marala-navy/20 py-12 lg:grid-cols-[120px_280px_1fr] lg:gap-12 lg:py-16">
              <span className="font-display text-lg font-bold text-marala-orange">{group.number}</span>
              <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-wide">{group.category}</h2>
              <div className="divide-y divide-marala-navy/15">
                {group.products.map((product, index) => (
                  <div key={product.name} className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[minmax(220px,0.8fr)_1fr] sm:gap-8">
                    <div className="flex items-start gap-4">
                      <span className="pt-1 font-display text-xs text-marala-teal">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="font-display text-2xl font-bold uppercase leading-tight transition-colors hover:text-marala-orange">{product.name}</h3>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-marala-gray">{product.detail}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-8 bg-marala-navy px-8 py-10 text-white sm:flex-row sm:items-center lg:px-12">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-marala-lime">Catalogue in development</span>
            <p className="mt-3 max-w-lg text-lg font-light text-white/65">Full imagery, technical specifications, and private-label options are coming next.</p>
          </div>
          <button type="button" onClick={onConsult} className="group inline-flex shrink-0 items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-marala-orange">
            Request details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}

// Premium Pill Button Component
const PillButton = ({ 
  children, 
  variant = 'primary', 
  className,
  onClick
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'white',
  className?: string,
  onClick?: () => void
}) => {
  const base = "group relative inline-flex items-center justify-between gap-4 pl-8 pr-2 py-2 rounded-full font-display font-bold uppercase tracking-widest text-sm transition-all duration-500 overflow-hidden";
  const variants = {
    primary: "bg-marala-orange text-white hover:bg-orange-600",
    secondary: "bg-marala-teal text-white hover:bg-teal-500",
    outline: "bg-transparent border border-marala-white/30 text-marala-white hover:border-marala-white",
    white: "bg-marala-white text-marala-navy hover:bg-gray-100"
  };
  const iconBase = "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 transform group-hover:scale-110";
  const iconVariants = {
    primary: "bg-white/20 text-white group-hover:bg-white group-hover:text-marala-orange",
    secondary: "bg-white/20 text-white group-hover:bg-white group-hover:text-marala-teal",
    outline: "bg-marala-white/10 text-marala-white group-hover:bg-marala-white group-hover:text-marala-navy",
    white: "bg-marala-navy/10 text-marala-navy group-hover:bg-marala-navy group-hover:text-marala-white"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      <span className="relative z-10">{children}</span>
      <span className={cn(iconBase, iconVariants[variant])}>
        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
      </span>
    </motion.button>
  );
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<'hockey' | 'pickleball'>('hockey');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('consult') === '1') {
      setIsConsultationOpen(true);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = document.querySelector('[data-hero]');
    const heroImage = document.querySelector('[data-hero-image]');
    const heroContent = document.querySelector('[data-hero-content]');

    if (!hero || !heroImage || !heroContent) return;

    const context = gsap.context(() => {
      gsap.to(heroImage, {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(heroContent, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, hero);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentPath === '/products') {
    return (
      <ProductPage
        onBack={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }}
        onConsult={() => { window.location.href = '/?consult=1'; }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-marala-white text-marala-black selection:bg-marala-teal selection:text-marala-white overflow-x-hidden">
      <AnimatePresence>
        {isConsultationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-marala-navy/80 p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="relative max-h-[88svh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-marala-white p-6 shadow-2xl sm:p-12"
            >
              <button
                type="button"
                onClick={() => setIsConsultationOpen(false)}
                className="absolute right-6 top-6 rounded-full p-2 text-marala-gray transition-colors hover:bg-marala-navy/5 hover:text-marala-navy"
                aria-label="Close consultation form"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="mb-5 inline-flex border-l-2 border-marala-orange pl-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-marala-orange">Start a conversation</span>
              <h2 id="consultation-title" className="mb-4 pr-8 text-4xl font-display font-bold uppercase leading-none text-marala-navy">Build your next line.</h2>
              <p className="mb-8 text-marala-gray">Tell us what you are developing and our export team will respond within one business day.</p>
              {isSubmitted ? (
                <div className="rounded-2xl bg-marala-teal/10 p-6 text-marala-navy">
                  <p className="font-display text-xl font-bold uppercase">Request received.</p>
                  <p className="mt-2 text-sm text-marala-gray">We will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={(event) => { event.preventDefault(); setIsSubmitted(true); }} className="space-y-4">
                  <input required placeholder="Name" className="w-full rounded-xl border border-marala-navy/10 bg-white px-5 py-4 outline-none transition focus:border-marala-teal" />
                  <input required type="email" placeholder="Work email" className="w-full rounded-xl border border-marala-navy/10 bg-white px-5 py-4 outline-none transition focus:border-marala-teal" />
                  <select className="w-full rounded-xl border border-marala-navy/10 bg-white px-5 py-4 outline-none transition focus:border-marala-teal" defaultValue="">
                    <option value="" disabled>What are you developing?</option>
                    <option>Field hockey equipment</option>
                    <option>Pickleball paddles</option>
                    <option>Custom sports line</option>
                  </select>
                  <textarea required placeholder="Tell us about your project" rows={4} className="w-full resize-none rounded-xl border border-marala-navy/10 bg-white px-5 py-4 outline-none transition focus:border-marala-teal" />
                  <button type="submit" className="w-full rounded-full bg-marala-orange px-6 py-4 font-display font-bold uppercase tracking-[0.16em] text-white transition hover:bg-marala-navy">Send inquiry</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed w-full z-50 transition-all duration-500",
          isScrolled ? "bg-marala-white/95 backdrop-blur-lg py-4 shadow-sm" : "bg-transparent py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-marala-navy rounded-full flex items-center justify-center shadow-lg">
                <span className="text-marala-white font-display font-bold text-2xl leading-none">M</span>
              </div>
              <span className={cn(
                "font-display font-bold text-lg sm:text-2xl uppercase tracking-widest transition-colors duration-300",
                isScrolled ? "text-marala-navy" : "text-marala-white"
              )}>
                Marala Club
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-12">
              {['Expertise', 'Equipment', 'Products', 'Manufacturing'].map((item) => (
                <a 
                  key={item}
                  href={item === 'Products' ? '/products' : `#${item.toLowerCase()}`} 
                  className={cn(
                    "font-medium text-xs tracking-[0.2em] uppercase hover:text-marala-teal transition-colors relative group pb-2",
                    isScrolled ? "text-marala-navy" : "text-marala-white"
                  )}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-marala-teal transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="hidden md:block">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setIsConsultationOpen(true)}
                 className={cn(
                   "px-8 py-3 rounded-full font-display font-bold uppercase tracking-widest text-sm transition-all duration-300",
                   isScrolled ? "bg-marala-navy text-white hover:bg-marala-teal" : "bg-white text-marala-navy hover:bg-marala-teal hover:text-white"
                 )}
               >
                 Book Consult
               </motion.button>
            </div>

            <button 
              className={cn("md:hidden", isScrolled ? "text-marala-navy" : "text-marala-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100dvh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-marala-navy text-marala-white absolute w-full top-0 left-0 flex flex-col items-center justify-center space-y-8 z-40"
            >
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-6">
                 <X className="w-10 h-10" />
              </button>
              {['Expertise', 'Equipment', 'Products', 'Manufacturing'].map((item) => (
                <a 
                  key={item}
                  href={item === 'Products' ? '/products' : `#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-4xl font-display font-bold uppercase tracking-widest hover:text-marala-teal transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-8">
                 <PillButton variant="primary" onClick={() => setIsConsultationOpen(true)}>Book Consult</PillButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section data-hero className="relative min-h-[88svh] sm:min-h-[95vh] flex items-center justify-center pt-24 sm:pt-20 pb-10 overflow-hidden bg-marala-navy rounded-b-[3rem] lg:rounded-b-[4rem]">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          data-hero-image
          className="absolute inset-0 z-0"
        >
           <img 
              src="https://images.unsplash.com/photo-1734159319354-b9ead78dd441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWVsZCUyMGhvY2tleXxlbnwxfHx8fDE3ODc2NzY2OTB8MA&ixlib=rb-4.1.0&q=80&w=1920" 
              alt="Field Hockey" 
              className="w-full h-full object-cover object-center opacity-40"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-marala-navy/40 via-marala-navy/70 to-marala-navy/90 mix-blend-multiply"></div>
        </motion.div>
        
        <div data-hero-content className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mt-6 sm:mt-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            <motion.button
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="group mb-6 sm:mb-10 inline-flex max-w-3xl items-start px-2 py-2 text-left transition-transform duration-500 hover:-translate-y-1"
              aria-label="Marala Club motto"
            >
              <span className="font-display text-lg font-semibold italic leading-tight tracking-[0.04em] text-white sm:text-2xl">
                &ldquo;Competition is an ordinary performance on a special day.&rdquo;
              </span>
            </motion.button>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-bold text-marala-white leading-[0.85] mb-6 sm:mb-8 uppercase tracking-tighter"
            >
              Precision <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-marala-teal via-white to-marala-teal bg-[length:200%_auto] animate-gradient">Engineered</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-xl md:text-2xl text-marala-white/80 mb-8 sm:mb-12 max-w-2xl font-light leading-relaxed"
            >
              We manufacture professional-grade Field Hockey and Pickleball gear for elite international brands.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
              <PillButton variant="primary" className="w-full sm:w-auto" onClick={() => setIsConsultationOpen(true)}>Become a Partner</PillButton>
              <PillButton variant="outline" className="w-full sm:w-auto">View Capabilities</PillButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Expertise */}
      <section id="expertise" className="relative py-20 sm:py-28 lg:py-48 bg-gradient-to-b from-marala-white via-[#EAF0F6] to-marala-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-14 sm:mb-20 lg:mb-24 flex flex-col md:flex-row gap-8 md:gap-10 justify-between items-start md:items-end"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-marala-navy uppercase leading-[0.9] tracking-tighter md:w-1/2">
              The Marala <br/><span className="text-marala-teal">Standard.</span>
            </h2>
            <p className="text-lg sm:text-xl text-marala-gray font-light leading-relaxed md:w-1/3">
              Decades of craftsmanship merged with cutting-edge manufacturing technology. We set the benchmark for global sports equipment export.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: <PressIcon className="w-8 h-8" />,
                title: "Vertical Mfg",
                desc: "End-to-end production control in our state-of-the-art facility ensures uncompromising quality.",
                bar: "bg-marala-teal",
                wash: "from-marala-teal/[0.10]",
                ring: "border-marala-teal/30 bg-marala-teal/[0.07] text-marala-teal",
                ringHover: "group-hover:border-marala-teal group-hover:bg-marala-teal group-hover:text-white",
                edge: "hover:border-marala-teal/40 hover:shadow-marala-teal/20",
                label: "group-hover:text-marala-teal"
              },
              {
                icon: <ExportIcon className="w-8 h-8" />,
                title: "Export Ready",
                desc: "Meeting and exceeding international sporting goods standards for markets globally.",
                bar: "bg-marala-orange",
                wash: "from-marala-orange/[0.10]",
                ring: "border-marala-orange/30 bg-marala-orange/[0.07] text-marala-orange",
                ringHover: "group-hover:border-marala-orange group-hover:bg-marala-orange group-hover:text-white",
                edge: "hover:border-marala-orange/40 hover:shadow-marala-orange/20",
                label: "group-hover:text-marala-orange"
              },
              {
                icon: <HoneycombIcon className="w-8 h-8" />,
                title: "Innovation First",
                desc: "Advanced composite materials, ergonomic designs, and continuous R&D.",
                bar: "bg-marala-lime",
                wash: "from-marala-lime/[0.16]",
                ring: "border-lime-500/40 bg-lime-500/[0.08] text-lime-600",
                ringHover: "group-hover:border-marala-lime group-hover:bg-marala-lime group-hover:text-marala-navy",
                edge: "hover:border-lime-500/50 hover:shadow-lime-500/20",
                label: "group-hover:text-lime-600"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
                }}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className={cn(
                  "group relative overflow-hidden rounded-[2.5rem] border border-marala-navy/[0.07] bg-white",
                  "shadow-[0_2px_12px_-6px_rgba(11,31,58,0.14)] transition-[border-color,box-shadow] duration-500",
                  "hover:shadow-2xl",
                  feature.edge
                )}
              >
                {/* accent wash fades in on hover */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent",
                    "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    feature.wash
                  )}
                />
                {/* accent rule draws across the top */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-0 top-0 h-[3px] w-0 rounded-full",
                    "transition-[width] duration-700 ease-out group-hover:w-full",
                    feature.bar
                  )}
                />

                <div className="relative p-8 sm:p-10 lg:p-12">
                  <div className={cn(
                    "mb-8 sm:mb-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border",
                    "transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                    feature.ring, feature.ringHover
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className={cn(
                    "mb-4 font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-marala-navy",
                    "transition-colors duration-500", feature.label
                  )}>
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg font-light leading-relaxed text-marala-gray transition-colors duration-500 group-hover:text-marala-navy/75">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Products - Large Full Bleed Cards */}
      <section id="equipment" className="pb-20 lg:pb-32 bg-marala-white text-marala-navy overflow-hidden">

        {/* Full-bleed interactive cross */}
        <InteractiveRacketX />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto mt-12 mb-16 max-w-3xl text-center lg:mt-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase leading-none tracking-tighter mb-5 sm:mb-6">
              Elite <span className="text-marala-teal text-transparent bg-clip-text bg-gradient-to-r from-marala-teal to-marala-navy">Equipment</span>
            </h2>
            <p className="text-lg sm:text-xl text-marala-gray font-light">
              Engineered for elite performance and handling. Available for private label manufacturing and bulk export.
            </p>
          </motion.div>

          <div className="space-y-8 md:space-y-12">
            {/* Hockey - Horizontal Layout Desktop */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="group relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-marala-navy text-white min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex flex-col lg:flex-row items-center"
            >
              <div className="absolute inset-0 w-full lg:w-1/2 h-full z-0 lg:order-last lg:left-auto lg:right-0">
                <motion.img 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1734159319354-b9ead78dd441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWVsZCUyMGhvY2tleXxlbnwxfHx8fDE3ODc2NzY2OTB8MA&ixlib=rb-4.1.0&q=80&w=1920" 
                  alt="Field Hockey Equipment" 
                  className="w-full h-full object-cover opacity-60 lg:opacity-100 object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-marala-navy via-marala-navy/80 lg:via-transparent to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-7 sm:p-10 lg:p-20 w-full lg:w-1/2 h-full flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 border-l-2 border-marala-lime pl-4 text-marala-lime mb-6 sm:mb-8 w-max">
                  <HockeyStickIcon className="w-4 h-4" /> 
                  <span className="font-display font-bold tracking-[0.2em] uppercase text-xs">Pro Series</span>
                </div>
                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold uppercase mb-5 sm:mb-6 tracking-tight leading-[0.9]">Field <br/>Hockey</h3>
                <p className="text-marala-white/70 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-md font-light leading-relaxed">
                  Carbon fiber composites, fiberglass blends, and premium wooden sticks engineered for maximum power transfer and control.
                </p>
                <div>
                   <PillButton variant="white" onClick={() => setSelectedProduct('hockey')}>Explore Specs</PillButton>
                </div>
              </div>
            </motion.div>

            {/* Pickleball */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="group relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-[#0A1118] text-white min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex flex-col lg:flex-row items-center"
            >
              <div className="absolute inset-0 w-full lg:w-1/2 h-full z-0">
                <motion.img 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1693142518820-78d7a05f1546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwaWNrbGViYWxsfGVufDF8fHx8MTc4NzY3NjY5MHww&ixlib=rb-4.1.0&q=80&w=1920" 
                  alt="Pickleball Paddles" 
                  className="w-full h-full object-cover opacity-60 lg:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#0A1118] via-[#0A1118]/80 lg:via-transparent to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-7 sm:p-10 lg:p-20 w-full lg:w-1/2 lg:ml-auto h-full flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 border-l-2 border-marala-teal pl-4 text-marala-teal mb-6 sm:mb-8 w-max">
                  <PaddleIcon className="w-4 h-4" /> 
                  <span className="font-display font-bold tracking-[0.2em] uppercase text-xs">High-Performance</span>
                </div>
                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold uppercase mb-5 sm:mb-6 tracking-tight leading-[0.9]">Pickleball <br/>Paddles</h3>
                <p className="text-marala-white/70 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-md font-light leading-relaxed">
                  Carbon friction surfaces and polymer honeycomb cores designed for massive spin and expanded sweet spots.
                </p>
                <div>
                  <PillButton variant="secondary" onClick={() => setSelectedProduct('pickleball')}>Explore Specs</PillButton>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 border-t border-marala-navy/10 pt-10"
          >
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-marala-orange">Technical index</span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-display font-bold uppercase text-marala-navy">Compare the build.</h3>
              </div>
              <div className="flex rounded-full border border-marala-navy/10 p-1" role="tablist" aria-label="Product specifications">
                {(['hockey', 'pickleball'] as const).map((product) => (
                  <button
                    key={product}
                    type="button"
                    role="tab"
                    aria-selected={selectedProduct === product}
                    onClick={() => setSelectedProduct(product)}
                    className={cn('rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] transition-colors', selectedProduct === product ? 'bg-marala-navy text-white' : 'text-marala-gray hover:text-marala-navy')}
                  >
                    {product}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={selectedProduct} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="grid gap-4 sm:grid-cols-3">
                {(selectedProduct === 'hockey'
                  ? [['01', 'Carbon layup', 'High modulus composite construction'], ['02', 'Power profile', 'Designed for maximum transfer'], ['03', 'Export standard', 'Tested for global competition']]
                  : [['01', 'Honeycomb core', 'Responsive polymer impact layer'], ['02', 'Spin surface', 'Textured carbon friction face'], ['03', 'Sweet spot', 'Expanded control geometry']]
                ).map(([index, title, description]) => (
                  <div key={index} className="rounded-2xl bg-marala-navy p-6 text-white">
                    <span className="font-display text-sm text-marala-lime">{index}</span>
                    <h4 className="mt-8 font-display text-xl font-bold uppercase text-white">{title}</h4>
                    <p className="mt-2 text-sm text-white/60">{description}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Manufacturing */}
      <section id="manufacturing" className="py-20 sm:py-28 lg:py-48 bg-marala-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-[320px] sm:h-[440px] lg:h-[700px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden order-last lg:order-first"
            >
              <img 
                src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYW51ZmFjdHVyaW5nJTIwZmFjaWxpdHl8ZW58MXx8fHwxNzg3Njc2NjkzfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Manufacturing Facility" 
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-marala-navy/10 mix-blend-overlay"></div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 border-l-2 border-marala-orange pl-4 mb-8 sm:mb-10">
                <GlobeMarkIcon className="w-4 h-4 text-marala-orange" />
                <span className="text-marala-navy font-display font-bold text-xs tracking-[0.2em] uppercase">
                  Global Reach
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-marala-navy uppercase tracking-tighter mb-6 sm:mb-8 leading-[0.9]">
                Crafted in <br/>Sialkot.
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-marala-gray mb-8 sm:mb-12 font-light leading-relaxed">
                Operating out of Pakistan—the world's premier hub for sporting goods manufacturing—Marala Club combines generations of craftsmanship with modern automated technology.
              </motion.p>
              
              <ul className="space-y-4 sm:space-y-6">
                {[
                  { title: "OEM & ODM Services", desc: "Full custom manufacturing for international brands." },
                  { title: "Stringent Quality Control", desc: "Multi-stage testing ensuring 0% defect rates for export." },
                  { title: "Scalable Capacity", desc: "Equipped to handle high-volume orders." }
                ].map((item, i) => (
                  <motion.li variants={fadeInUp} key={i} className="flex items-center gap-4 sm:gap-6 group p-3 sm:p-4 rounded-2xl hover:bg-marala-gray/5 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-marala-navy text-white flex items-center justify-center flex-shrink-0 group-hover:bg-marala-teal transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-display font-bold text-marala-navy uppercase tracking-wide">{item.title}</h4>
                      <p className="text-marala-gray font-light text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Giant CTA Section - Fully Rounded Aesthetic */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
         <motion.div 
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="py-20 sm:py-28 lg:py-48 bg-marala-orange relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem]"
         >
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
              <motion.h2 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-6xl lg:text-9xl font-display font-bold text-white uppercase leading-[0.85] tracking-tighter mb-8 sm:mb-10"
              >
                Elevate <br/>Your Brand.
              </motion.h2>
              <p className="text-base sm:text-xl lg:text-2xl text-white/90 mb-10 sm:mb-14 font-light max-w-2xl leading-relaxed">
                Partner with Marala Club for premium sporting goods manufacturing. Request a custom quote or sample kit today.
              </p>
              
                 <PillButton variant="white" onClick={() => setIsConsultationOpen(true)} className="!text-lg !py-4 !pl-10 !pr-4">
                 Get in Touch
              </PillButton>
            </div>
         </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-marala-white text-marala-navy py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ContactInfo />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-12 border-b border-marala-gray/20">
             
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-marala-navy text-white rounded-full flex items-center justify-center shadow-lg">
                <span className="font-display font-bold text-xl leading-none">M</span>
              </div>
              <span className="font-display font-bold text-xl uppercase tracking-widest">
                Marala Club
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-sm font-display font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-marala-teal transition-colors">Expertise</a>
              <a href="#" className="hover:text-marala-teal transition-colors">Equipment</a>
              <a href="#" className="hover:text-marala-teal transition-colors">Manufacturing</a>
              <a href="#contact" className="hover:text-marala-teal transition-colors">Contact</a>
            </div>

          </div>
          
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-light text-marala-gray">
            <p>&copy; {new Date().getFullYear()} Marala Club. Based in Sialkot, Pakistan.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-marala-navy transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-marala-navy transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}