'use client';

import { Footer } from './components/Footer';

import { useMemo, useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Star, Menu, X, Award, Clock, Check, ClipboardList, Hammer, ArrowRight } from 'lucide-react';
import NextImage from 'next/image';

import { ComparisonSlider } from './components/ComparisonSlider';
import { ImagePlaceholder } from './components/ImagePlaceholder';

// Inline configuration for standalone usage
const config = {
  businessName: 'Landeros Electrical Services LLC',
  city: 'Houston, TX',
  phone: '832 812 0189',
  primaryService: 'Panel Upgrades',
  services: ['Generator Installation', 'Emergency Repairs', 'Preventative Maintenance', 'Lighting Installation'],
  rating: 4.8,
  reviewCount: 48,
  yearsInBusiness: 15, // Keeping 15 as per previous context or generic, unless specified otherwise (user didn't specify years, will leave as is or generic)
  ctaPrimary: 'Request a Quote',

  // Theme: Soft Dark (Black/Silver)
  theme: {
    isDark: true,
    colors: {
      pageBg: '#09090b', // Zinc 950
      cardBg: '#18181b', // Zinc 900
      surfaceBg: '#09090b', // Zinc 950
      textPrimary: '#f4f4f5', // Zinc 100 - White/Silver
      textSecondary: '#a1a1aa', // Zinc 400 - Silver/Grey
      textMuted: '#52525b', // Zinc 600
      border: '#27272a', // Zinc 800
      borderLight: '#3f3f46', // Zinc 700 - Silver Accent
      darkBg: '#000000', // True Black
      darkText: '#fafafa', // Zinc 50
      darkTextMuted: '#a1a1aa',
    }
  },

  // Accent: Blue
  accent: {
    name: 'Blue',
    hex: '#3b82f6', // Blue 500
    hoverHex: '#2563eb' // Blue 600
  },

  imagePlaceholders: [
    { label: 'Before Photo', hint: 'Old panel or wiring' },
    { label: 'After Photo', hint: 'New detailed panel install' },
    { label: 'Crew Photo', hint: 'Professional electrician team' },
  ],

  testimonials: [
    {
      name: 'David Siceluff',
      quote: "We hired these guys to come out for a full electrical panel replacement and relocation of our weather head. They went above and beyond for us making sure everything looked really clean and better than it looked before. Will definitely be using them for any other electrical services!",
      date: "a year ago",
      reviews: "7 reviews",
      photo: true,
      highlight: "Went above and beyond for us."
    },
    {
      name: 'Hannah M',
      quote: "I got an outlet switched for my dryer, he also hooked the dryer duct up for me and turned it on and waited to make sure everything was working properly. Will definitely use them again.",
      date: "a year ago",
      reviews: "Local Guide • 18 reviews",
      photo: true,
      highlight: "Waited to make sure everything was working properly."
    },
    {
      name: 'Erin',
      quote: "Juan and his associate worked meticulously, making sure all the switches in our new home worked properly and made some changes to improve the order on the some of the plates. They also took out some time to correct broken or bent plates that the previous owners had left. We now have nice consistent paddle switches all throughout the house, including a few Smart WiFi ones that give us peace of mind. We hope to hire them again soon to do the same on our outlets!",
      date: "2 years ago",
      reviews: "7 reviews",
      photo: true,
      highlight: "Worked meticulously... nice consistent paddle switches."
    },
    {
      name: 'G A',
      quote: "Just wrapped up with Juan Landeros. Did a whole kitchen rewire with new dedicated appliance circuits... Juan provided information from beginning to end and included us in decision making... Also, Landeros Electric quoted a fair cost for this work and did not play any games with the costs or scope.",
      date: "3 years ago",
      reviews: "Local Guide • 97 reviews",
      photo: true,
      highlight: "Quoted a fair cost... did not play any games."
    },
    {
      name: 'L John',
      quote: "We had Juan come out to fix our damaged power line. He was able to fix the problem and explained everything very clearly. The situation was a bit complicated but he has the expertise and did everything professionally and properly. I plan to use Juan for future electrical needs for my home.",
      date: "4 years ago",
      reviews: "6 reviews",
      photo: false,
      highlight: "Has the expertise... did everything professionally."
    },
    {
      name: 'Bill Kelley',
      quote: "Juan did a great job working on my electric panel this morning. He was on time, kepted to his bid and did what he said he would do. I will use him again if needed.",
      date: "5 years ago",
      reviews: "7 reviews",
      photo: false,
      highlight: "On time, kept to his bid."
    },
    {
      name: 'Norah Gharala',
      quote: "The team from Landeros was professional, punctual, affordable, and polite. I hired this company for a small, indoor job and was quoted a price and work completed very quickly. Highly recommended",
      date: "3 years ago",
      reviews: "Local Guide • 173 reviews",
      photo: true,
      highlight: "Professional, punctual, affordable, and polite."
    },
    {
      name: 'Aaron Steven Mendoza',
      quote: "They were punctual, quick and give you recommendations on any and all electrical issues/concerns. I recommend this business to everyone in the Houston area.",
      date: "2 years ago",
      reviews: "9 reviews",
      photo: false,
      highlight: "Punctual, quick... recommend to everyone."
    },
    {
      name: 'Andrea Groves',
      quote: "Juan was on time, professional, knowledgeable and affordable. Definitely would use his service again and recommend.",
      date: "5 years ago",
      reviews: "Local Guide • 99 reviews",
      photo: true,
      highlight: "On time, professional, knowledgeable and affordable."
    },
    {
      name: 'CRYSTAL MORALES',
      quote: "Great Service!",
      date: "9 years ago",
      reviews: "13 reviews",
      photo: false,
      highlight: "Great Service!"
    },
  ],

  faqs: [
    {
      q: 'Do you offer free estimates?',
      a: 'Yes! We provide free in-home estimates for all residential projects. You\'ll get an honest, written quote upfront with no hidden fees — ever.',
    },
    {
      q: 'What areas do you service?',
      a: 'We serve Houston and all surrounding communities including Katy, Sugar Land, Richmond, Cypress, and The Woodlands.',
    },
    {
      q: 'Do you handle emergency repairs?',
      a: 'Absolutely. We offer same-day emergency service for Houston homeowners. Power outage? Sparking outlet? Call us immediately — we respond fast.',
    },
    {
      q: 'Can you install a whole-home generator?',
      a: 'Yes, we specialize in residential generator installation. Keep your family safe and comfortable when Houston storms knock out the grid.',
    },
    {
      q: 'My breaker panel is old. Should I upgrade it?',
      a: 'If your panel is over 20 years old or can\'t keep up with modern appliances, upgrading to 200A service is a smart investment in your home\'s safety and value.',
    },
    {
      q: 'Are you licensed and insured?',
      a: 'Yes, we are a fully licensed and insured Texas LLC. All our work meets local electrical codes and is backed by our satisfaction guarantee.',
    },
    {
      q: 'What are your hours?',
      a: 'We\'re available Monday through Friday 8am to 5pm, and Saturdays 8am to 12pm. For emergencies, call any time.',
    },
  ],
};

const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const fadeInSoft = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const staggerSoft = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function LanderosElectrical() {
  const accent = config.accent.hex;
  const t = config.theme.colors;
  const isDark = config.theme.isDark;
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), []);
  const services = config.services;
  const ratingText = config.rating ? config.rating.toFixed(1) : '5.0';
  const reviewCount = config.reviewCount ?? 50;
  const years = config.yearsInBusiness ?? 15;
  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [selectedService, setSelectedService] = useState('');



  const recentJobs = [
    { title: 'Main Panel Upgrade', meta: 'Houston', result: 'Upgraded to 200A service for modern capacity', image: '/images/gallery/20230320_094641 - Landeros Electrical.jpg', alt: 'Electrical panel upgrade', orientation: 'horizontal' },
    { title: 'Whole Home Generator', meta: 'Katy', result: 'Full backup power installation', image: '/images/gallery/20240130_143047 - Landeros Electrical.jpg', alt: 'Standby generator installation', orientation: 'horizontal' },
    { title: 'Kitchen Lighting Remodel', meta: 'Sugar Land', result: 'Modern LED recessed lighting install', image: '/images/gallery/20250315_142330 - Landeros Electrical.jpg', alt: 'Recessed lighting installation', orientation: 'horizontal' },
    { title: 'Commercial Service Call', meta: 'Houston', result: 'Troubleshooting and repair of parking lot lights', image: '/images/gallery/20250408_113509 - Landeros Electrical.jpg', alt: 'Commercial electrical repair', orientation: 'vertical' },
    { title: 'New Construction Wiring', meta: 'Richmond', result: 'Complete home wiring from rough-in to trim', image: '/images/gallery/20250522_120741 - Landeros Electrical.jpg', alt: 'New home electrical wiring', orientation: 'horizontal' },
    { title: 'Landscape Lighting', meta: 'The Woodlands', result: 'Enhanced curb appeal with pathway lighting', image: '/images/gallery/20250731_150404 - Landeros Electrical.jpg', alt: 'Landscape lighting installation', orientation: 'horizontal' },
    { title: 'EV Charger Install', meta: 'Cypress', result: 'Level 2 charger installation for Tesla', image: '/images/gallery/20251229_151027 - Landeros Electrical.jpg', alt: 'EV Job', orientation: 'vertical' },
    { title: 'Office Retrofit', meta: 'Houston', result: 'LED upgrades for improved efficiency', image: '/images/gallery/20260122_151001 - Landeros Electrical.jpg', alt: 'Office lighting retrofit', orientation: 'horizontal' },
  ];

  // Lightbox State
  const [selectedJob, setSelectedJob] = useState<typeof recentJobs[0] | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  // Scroll State
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag Constraints
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [recentJobs]);

  // Smooth scroll to the quote form in the hero section
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form');
    if (quoteSection) {
      const yOffset = -100; // Offset to account for sticky header if needed, or just breathing room
      const y = quoteSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const honeypot = String(formData.get('website') || '').trim();

    if (honeypot) {
      form.reset();
      setFormStatus('success');
      return;
    }

    if (!name || !phone || !email || !service) {
      setFormStatus('error');
      setFormError('Please provide your name, phone, email, and service needed.');
      return;
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) {
        setFormStatus('error');
        setFormError(payload?.error || 'Something went wrong. Please try again.');
        return;
      }

      form.reset();
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
      setFormError('Something went wrong. Please try again.');
    }
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Our Work', href: '#work' },
    { label: 'Reviews', href: '#proof' },
    { label: 'FAQ', href: '#faq' },
  ];

  const benefits = [
    'Upfront, Honest Pricing — No Hidden Fees',
    'Free In-Home Estimates',
    'Licensed & Fully Insured',
    'Your Safety is Our Priority',
  ];


  const allServices = [
    {
      name: 'Residential Service & Repair',
      image: '/images/service-panel.png',
      desc: 'Complete electrical solutions for Houston homeowners — from quick fixes to major upgrades.',
      alt: 'Residential electrical service',
      subItems: ['Premium Emergency Service', 'Preventative Maintenance Contracts', 'Panel Upgrades']
    },
    {
      name: 'Generator Services',
      image: '/images/service-generator.png',
      desc: 'Keep your family safe and comfortable when Houston storms knock out the power.',
      alt: 'Home standby generator installation',
      subItems: ['Whole-Home Generator Installation', 'Backup Power Systems', 'Generator Maintenance']
    },
    {
      name: 'Commercial Electrical',
      image: '/images/service-troubleshooting.png',
      desc: 'Professional electrical services for Houston businesses — safe, code-compliant, and reliable.',
      alt: 'Commercial electrical service',
      subItems: ['Office & Retail Wiring', 'Lighting Retrofits', 'Electrical Code Compliance']
    }
  ];

  const steps = [
    { title: 'Request a Quote', body: 'Call or text any time. We respond in minutes, not days.' },
    { title: 'Honest Estimate', body: 'We give you an upfront quote — no surprises, no pressure, no hidden fees.' },
    { title: 'Job Done Right', body: 'Your problem solved, your home safe, and your budget respected.' },
  ];

  const reviewCardBg = isDark ? t.cardBg : 'rgba(255,255,255,0.95)';
  const reviewCardBorder = isDark ? t.border : 'rgba(255,255,255,0.3)';
  const promiseBg = isDark ? t.surfaceBg : t.cardBg;
  const promiseDivider = isDark ? t.borderLight : t.border;

  return (
    <div className="relative" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER - Transparent over hero, solid on scroll
      ═══════════════════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? `${t.cardBg}f8` : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
        }}
      >
        <div className={`${shellClass} flex items-center justify-between py-2`}>
          <a href="#" className="flex items-center gap-0">
            <img src="/images/reallaredo.svg" alt={config.businessName} className="h-13 w-auto object-contain" />
            <div className="-ml-2">
              <span className="text-lg font-bold uppercase tracking-tight" style={{ color: scrolled ? t.textPrimary : 'white' }}>Landeros</span>
              <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: scrolled ? t.textMuted : 'rgba(255,255,255,0.7)' }}>Electrical Services</div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold transition-colors" style={{ color: scrolled ? t.textSecondary : 'rgba(255,255,255,0.85)' }}>{link.label}</a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a href={`tel:${cleanPhone}`} className="flex items-center gap-2 text-sm font-bold" style={{ color: scrolled ? t.textPrimary : 'white' }}><Phone className="h-4 w-4" />{config.phone}</a>
            <button onClick={scrollToQuote} className="px-5 py-2.5 text-sm font-bold text-white rounded" style={{ backgroundColor: accent }}>{config.ctaPrimary}</button>
          </div>

          <button className="md:hidden" style={{ color: scrolled ? t.textPrimary : 'white' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t px-6 py-4" style={{ backgroundColor: t.cardBg, borderColor: t.border }}>
              <div className="flex flex-col gap-3">
                {navLinks.map(l => <a key={l.href} href={l.href} className="py-2 font-semibold" style={{ color: t.textPrimary }} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>)}
                <button onClick={() => { scrollToQuote(); setMobileMenuOpen(false); }} className="mt-2 py-3 text-white font-bold rounded" style={{ backgroundColor: accent }}>{config.ctaPrimary}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - Full Background with Quote Form
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden -mt-[72px] pt-[72px]">
        {/* Hero background image */}
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/laredohero.jpg)', backgroundPosition: 'center 35%', backgroundSize: 'cover' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.75) 100%)' }} />

        <div className={`${shellClass} relative z-10 py-20 lg:py-28`}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center px-4 md:px-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8">
              {/* Top Rated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm" style={{ backgroundColor: accent }}>
                <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3.5 w-3.5 fill-white text-white" />)}</div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">Top Rated in {config.city}</span>
              </div>

              {/* Headline */}
              <div className="space-y-2 md:space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white uppercase">
                  Landeros<br />Electrical
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none" style={{ color: accent }}>
                  Houston's Trusted Electrician
                </p>
                <p className="text-lg text-slate-300 max-w-lg pt-2 leading-relaxed">
                  Honest Pricing. No Surprises. Expert Service.<br />
                  <span className="text-slate-400">Emergency Repairs • Panel Upgrades • Maintenance</span>
                </p>
              </div>

              {/* Trust Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div><div className="text-4xl font-black text-white">M-F</div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">8am - 5pm</div></div>
                <div><div className="text-4xl font-black" style={{ color: accent }}>{ratingText}</div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Star Rating</div></div>
                <div><div className="text-4xl font-black text-white">{years}+</div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Years Exp</div></div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300"><ShieldCheck className="h-5 w-5" style={{ color: accent }} />Licensed & Insured</div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300"><Award className="h-5 w-5" style={{ color: accent }} />Honest, Upfront Pricing</div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300"><Clock className="h-5 w-5" style={{ color: accent }} />Same-Day Emergency Service</div>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div id="quote-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl p-8 shadow-xl border-t-4" style={{ backgroundColor: t.cardBg, borderColor: accent }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold" style={{ color: t.textPrimary }}>Request a Quote</h2>
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <p className="text-sm mb-6 font-medium" style={{ color: t.textSecondary }}>No obligation. 100% Secure.</p>
              <form className="space-y-4" action="/api/lead" method="POST" onSubmit={handleLeadSubmit}>
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="hidden" name="page" value={pageUrl} />
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold mb-1" style={{ color: t.textSecondary }}>Name *</label><input required name="name" type="text" placeholder="Your Name" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ backgroundColor: t.surfaceBg, borderColor: t.border, color: t.textPrimary, '--tw-ring-color': accent } as React.CSSProperties} /></div>
                  <div><label className="block text-xs font-semibold mb-1" style={{ color: t.textSecondary }}>Phone *</label><input required name="phone" type="tel" placeholder="(281) 555-0123" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ backgroundColor: t.surfaceBg, borderColor: t.border, color: t.textPrimary, '--tw-ring-color': accent } as React.CSSProperties} /></div>
                </div>
                <div><label className="block text-xs font-semibold mb-1" style={{ color: t.textSecondary }}>Email *</label><input required name="email" type="email" placeholder="you@email.com" className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ backgroundColor: t.surfaceBg, borderColor: t.border, color: t.textPrimary, '--tw-ring-color': accent } as React.CSSProperties} /></div>
                <div><label className="block text-xs font-semibold mb-1" style={{ color: t.textSecondary }}>Service Needed *</label><select required name="service" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ backgroundColor: t.surfaceBg, borderColor: t.border, color: t.textPrimary, '--tw-ring-color': accent } as React.CSSProperties}><option value="">Select a service...</option>{allServices.map(category => (<optgroup key={category.name} label={category.name}>{category.subItems.map(item => (<option key={item} value={item}>{item}</option>))}</optgroup>))}<option value="Other">Other</option></select></div>
                <div><label className="block text-xs font-semibold mb-1" style={{ color: t.textSecondary }}>Project Details{selectedService === 'Other' ? ' *' : ''}</label><textarea name="message" required={selectedService === 'Other'} rows={3} placeholder={selectedService === 'Other' ? 'Please describe your electrical needs...' : 'Describe your issue (e.g. flickering lights, need generator)...'} className="w-full rounded-lg border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2" style={{ backgroundColor: t.surfaceBg, borderColor: t.border, color: t.textPrimary, '--tw-ring-color': accent } as React.CSSProperties} /></div>
                <button type="submit" disabled={formStatus === 'sending'} className="w-full rounded-lg py-4 text-base font-bold text-white shadow-lg disabled:opacity-70" style={{ backgroundColor: accent }}>
                  {formStatus === 'sending' ? 'Sending...' : 'Request a Quote'}
                </button>
                {formStatus === 'success' && (
                  <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    Thanks! We received your request and will reach out shortly.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {formError || 'Something went wrong. Please try again.'}
                  </div>
                )}
              </form>
              <div className="mt-6 flex items-center justify-center gap-3 pt-4 border-t" style={{ borderColor: t.border }}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-sm font-bold" style={{ color: t.textPrimary }}>{ratingText}</span><span style={{ color: t.border }}>|</span><span className="text-sm font-medium" style={{ color: t.textMuted }}>{reviewCount}+ Jobs Done</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Reviews Ticker - Liquid Glass Effect */}
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-lg py-3 overflow-hidden border-t border-white/20 shadow-lg z-20" style={{ backgroundColor: `${accent}40` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" /> {/* Gloss sheen */}
          <div className="flex animate-marquee whitespace-nowrap relative z-10">
            {config.testimonials.concat(config.testimonials).map((review, i) => (
              <div key={i} className="mx-8 flex items-center gap-3">
                <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3 w-3 fill-yellow-400 text-yellow-400 drop-shadow-sm" />)}</div>
                <span className="text-sm font-medium text-white drop-shadow-md">"{review.highlight || review.quote}"</span>
                <span className="text-sm text-white/90 font-medium drop-shadow-md">- {review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }` }} />

      {/* ═══════════════════════════════════════════════════════════════════════
          ORIGINAL SECTIONS BELOW (Stats, Why Us, Services, etc.)
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Services - Clean card list */}
      <section id="services" className="py-20 scroll-mt-20" style={{ backgroundColor: t.surfaceBg, borderTop: `1px solid ${t.border}` }}>
        <div className={shellClass}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-1 w-8" style={{ backgroundColor: accent }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>Our Capabilities</p>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight" style={{ color: t.textPrimary }}>Our Services</h2>
            </div>
            <p className="text-sm font-medium font-mono border-l-2 pl-4 py-1 max-w-sm" style={{ color: t.textSecondary, borderColor: accent }}>
              Trusted by Houston homeowners.<br />Honest pricing on every job.
            </p>
          </div>
          <motion.div variants={staggerSoft} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="grid gap-8 md:grid-cols-3">
            {allServices.map((service, i) => (
              <motion.div key={service.name} className="group flex flex-col justify-between overflow-hidden shadow-sm transition-all hover:shadow-xl hover:-translate-y-1" style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}` }}>
                {/* Service Image Area */}
                <div className="aspect-[16/9] w-full relative bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img src={service.image} alt={service.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />

                  {/* Overlay title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-xs font-mono font-bold text-white opacity-80">SERVICE 0{i + 1}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="text-lg font-black uppercase mb-2 leading-tight" style={{ color: t.textPrimary }}>{service.name}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: t.textSecondary }}>{service.desc}</p>

                    {/* Sub-items */}
                    <ul className="space-y-2">
                      {service.subItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-medium" style={{ color: t.textSecondary }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 border-t" style={{ borderColor: t.border }}>
                    <button type="button" className="w-full py-2 text-xs font-black uppercase tracking-widest flex items-center justify-between group-hover:gap-4 transition-all" style={{ color: accent }} onClick={scrollToQuote}>
                      <span>Request a Quote</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us - Clean with flow line */}
      <section id="why-us" className="relative scroll-mt-20 overflow-hidden" style={{ borderTop: `4px solid ${accent}`, borderBottom: `4px solid ${accent}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/why-us-electrical.png)', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="relative py-16 z-10">
          <div className={shellClass}>
            <div className="grid gap-16 md:grid-cols-2 md:items-start" style={{ alignItems: 'center' }}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border-l-4" style={{ borderColor: accent, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white">Why Choose Us</p>
                </div>
                <h2 className="text-3xl font-black text-white md:text-5xl leading-[1.1] uppercase tracking-tight">Why Choose Us</h2>
                <div className="mt-10 space-y-px bg-white/10 border border-white/10">
                  {benefits.map((benefit, i) => (
                    <div key={benefit} className="flex items-center gap-4 p-5 bg-black/40 backdrop-blur-sm group hover:bg-white/5 transition-colors">
                      <div className="flex bg-white/10 h-8 w-8 shrink-0 items-center justify-center font-mono text-sm font-bold text-white/50 group-hover:bg-white group-hover:text-black transition-colors">0{i + 1}</div>
                      <span className="text-sm font-bold text-white uppercase tracking-wide pt-0.5">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Cleaner, Open Layout */}
              <div className="pl-4 border-l-2 md:pl-10" style={{ borderColor: accent }}>
                <div className="mb-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-2">Our Standard</h3>
                  <p className="text-white/60 font-medium">We don't just quote the job. We verify the scope, confirm the schedule, and guarantee the result.</p>
                </div>

                <div className="space-y-8">
                  {[{ label: 'Response Speed', value: 'Fast', desc: 'Quick scheduling' }, { label: 'Estimates', value: 'Always Written', desc: 'Detailed PDF breakdown' }, { label: 'Site Safety', value: '100% Insured', desc: 'Liability & Workers Comp' }].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-end justify-between mb-2 border-b border-white/10 pb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/50">{item.label}</span>
                        <span className="text-xl font-black font-mono" style={{ color: accent }}>{item.value}</span>
                      </div>
                      <div className="text-right text-xs font-bold text-white/40 uppercase">{item.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded bg-white/5 border border-white/10">
                  <ShieldCheck className="h-5 w-5" style={{ color: accent }} />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Quality Materials & Craftsmanship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section - Better flow, full width accent */}
      <section className="py-16 text-white" style={{ backgroundColor: accent }}>
        <div className={shellClass}>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0 bg-white/20 p-6 rounded-full">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">100% Satisfaction Guarantee</h3>
              <p className="text-lg font-medium text-white/90 max-w-2xl">
                We're committed to quality. If you're not happy with our work, we'll make it right - no questions asked.
                Backed by {years}+ years of service in {config.city}.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button type="button" onClick={scrollToQuote} className="bg-white text-black rounded px-8 py-4 text-sm font-black shadow-xl uppercase tracking-wide hover:scale-105 transition-transform">
                Get Guaranteed Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase - Industrial Gallery with Lightbox */}
      <section id="work" className="py-24 overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className={shellClass}>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="h-[2px] w-8 bg-blue-500" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Our Portfolio</span>
              </div>
              <h2 className="text-4xl font-black text-white md:text-5xl uppercase tracking-tight">Gallery</h2>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex gap-4">
              <button
                onClick={() => {
                  const container = document.getElementById('gallery-container');
                  if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                disabled={!canScrollLeft}
                className={`p-4 border border-zinc-800 transition-all duration-300 group ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'hover:border-blue-500 hover:bg-zinc-900'}`}
              >
                <ArrowRight className="h-6 w-6 text-white rotate-180 group-hover:text-blue-500 transition-colors" />
              </button>
              <button
                onClick={() => {
                  const container = document.getElementById('gallery-container');
                  if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                disabled={!canScrollRight}
                className={`p-4 border border-zinc-800 transition-all duration-300 group ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'hover:border-blue-500 hover:bg-zinc-900'}`}
              >
                <ArrowRight className="h-6 w-6 text-white group-hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Gallery with Edge Fades */}
        <div className="relative group/gallery">
          {/* Left Fade */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-32 lg:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${!canScrollLeft ? 'opacity-0' : 'opacity-100'}`} />
          {/* Right Fade */}
          <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-32 lg:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${!canScrollRight ? 'opacity-0' : 'opacity-100'}`} />

          {/* Scrollable Container */}
          <div
            id="gallery-container"
            className="overflow-x-auto pb-8 scrollbar-hide flex gap-4 md:gap-6 px-4 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => {
              const target = e.currentTarget;
              setCanScrollLeft(target.scrollLeft > 20);
              const maxScroll = target.scrollWidth - target.clientWidth;
              setCanScrollRight(target.scrollLeft < maxScroll - 20);
            }}
          >
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

            {recentJobs.map((job, i) => (
              <motion.div
                key={`${job.title}-${i}`}
                className={`group relative flex-shrink-0 overflow-hidden cursor-pointer border border-zinc-900 bg-zinc-900
                  ${job.orientation === 'vertical'
                    ? 'w-[60vw] sm:w-[45vw] md:w-[280px] lg:w-[320px] aspect-[3/4]'
                    : 'w-[85vw] sm:w-[60vw] md:w-[500px] lg:w-[560px] aspect-[4/3]'}
                `}
                onClick={() => { setSelectedJob(job); setActiveImage(job.image); }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <NextImage
                    src={job.image}
                    alt={job.alt}
                    fill
                    sizes="(max-width: 768px) 85vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={i < 4}
                  />
                </div>

                {/* Always-visible subtle gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Border */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-blue-500/50 transition-colors duration-300" />

                {/* Content - always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-blue-400">
                    <span className="text-xs font-bold uppercase tracking-widest">View Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block group-hover:text-blue-500 transition-colors">{job.meta}</span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-tight mb-2">{job.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews - Dark Google Themed Section */}
      <section id="proof" className="relative py-24 overflow-hidden" style={{ borderTop: `4px solid ${accent}`, borderBottom: `4px solid ${accent}` }}>
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(/images/reviews-electrical.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'none' }} />

        <div className={`${shellClass} relative z-10`}>
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <GoogleLogo className="h-5 w-5" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-white font-bold ml-1.5 pt-0.5">{ratingText}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Customer Reviews</h2>
            <p className="text-slate-400 text-lg max-w-2xl">See what your neighbors in {config.city} are saying about our work.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.testimonials.slice(0, 6).map((testimonial, idx) => (
              <div key={`${testimonial.name}-${idx}`} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-xl shadow-2xl border-t-4 hover:-translate-y-1 transition-transform duration-300 border-x border-b border-white/5 relative group flex flex-col h-full" style={{ borderTopColor: idx % 2 === 0 ? '#4285F4' : '#34A853' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg overflow-hidden shrink-0" style={{ backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][idx % 5] }}>
                      {testimonial.photo ? (
                        testimonial.name.charAt(0)
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{testimonial.name}</div>
                      <div className="text-xs text-white/60 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                        Verified Customer
                      </div>
                    </div>
                  </div>
                  <GoogleLogo className="h-5 w-5 opacity-80" />
                </div>
                <div className="flex gap-1 mb-3 relative z-10">
                  {[0, 1, 2, 3, 4].map(i => (
                    <Star key={i} className="h-4 w-4 drop-shadow-sm text-[#FBBC05] fill-[#FBBC05]" />
                  ))}
                  <span className="text-xs text-white/50 ml-2 mt-0.5 font-medium tracking-wide">{testimonial.date}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-6 font-medium relative z-10 line-clamp-4">"{testimonial.quote}"</p>

                {testimonial.highlight && (
                  <div className="mt-auto pt-4 border-t border-white/10 relative z-10">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wide bg-gradient-to-r from-white/10 to-transparent px-2 py-1.5 rounded border border-white/5 inline-block">
                      {testimonial.highlight}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>



          <div className="mt-8 text-center">
            <a href="https://share.google/j3pa3bHXHYwVYPQdN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-lg font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg">
              <GoogleLogo className="h-5 w-5" />
              Read all reviews on Google
            </a>
          </div>
        </div>
      </section >

      {/* Process - Minimalist Clean */}
      < section className="py-24 relative bg-[#09090b]" >
        <div className={shellClass}>
          {/* Header - Minimal */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Our Process
            </h2>
            <p className="text-lg font-medium text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Precision planning. Expert execution. Zero mess left behind.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3 relative">
            {/* Subtle Connector Line (Behind) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-zinc-800 z-0" />

            {steps.map((step, index) => {
              const Icon = [ClipboardList, Hammer, Check][index % 3];
              return (
                <div key={index} className="group relative z-10 flex flex-col h-full">
                  {/* Step Marker */}
                  <div className="flex justify-center mb-8">
                    <div className="relative flex items-center justify-center h-24 w-24 bg-[#09090b] border-4 border-zinc-800 rounded-full z-10 transition-colors duration-300 group-hover:border-blue-600">
                      <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700">
                        <span className="text-2xl font-black text-white">{index + 1}</span>
                      </div>

                      {/* Icon Bubble (Absolute) */}
                      <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-[#09090b]">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 text-center transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900 flex-1 flex flex-col justify-center rounded-lg">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-4 group-hover:text-blue-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400 font-medium">
                      {step.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section >

      {/* FAQ */}
      < section id="faq" className="py-16 scroll-mt-20" style={{ borderTop: `3px solid ${t.border}`, backgroundColor: t.surfaceBg }}>
        <div className={shellClass}>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedJob && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJob(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-7xl w-full max-h-[90vh] flex flex-col md:flex-row bg-zinc-900 overflow-hidden shadow-2xl border border-zinc-800"
                >
                  {/* Image Section */}
                  <div className="relative w-full md:w-2/3 h-[50vh] md:h-auto bg-black">
                    <NextImage
                      src={selectedJob.image}
                      alt={selectedJob.alt}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/3 p-8 flex flex-col bg-zinc-900">
                    <div className="flex items-center justify-between mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-black uppercase tracking-widest">
                        Project Details
                      </div>
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="p-2 text-zinc-500 hover:text-white transition-colors"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <h3 className="text-3xl font-black text-white uppercase mb-4 leading-tight">
                      {selectedJob.title}
                    </h3>

                    <div className="space-y-6 mb-8">
                      <div>
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Location</div>
                        <div className="text-white font-medium">{selectedJob.meta}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Scope</div>
                        <div className="text-zinc-300 leading-relaxed">
                          {selectedJob.result}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-zinc-800">
                      <button
                        onClick={scrollToQuote}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                      >
                        Request Similar Quote
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:items-start">
            <div className="md:sticky md:top-24">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>FAQ</p>
              <h2 className="text-2xl font-bold md:text-3xl" style={{ color: t.textPrimary }}>FAQ</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: t.textMuted }}>Still have questions? Call us directly.</p>
              <a href={`tel:${cleanPhone}`} className="mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]" style={{ backgroundColor: accent, boxShadow: `0 4px 12px ${accent}30` }}><Phone className="h-4 w-4" />{config.phone}</a>
            </div>
            <div className="space-y-3">
              {config.faqs.map((faq, i) => (
                <details key={faq.q} className="group rounded-xl transition-all open:shadow-md" style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}` }} open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-semibold transition-colors" style={{ color: t.textPrimary }}>
                    {faq.q}
                    <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-open:rotate-45" style={{ backgroundColor: `${accent}15`, color: accent }}><span className="text-base leading-none font-medium">+</span></span>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section id="home-cta" className="py-16 border-t-3" style={{ borderColor: accent, backgroundColor: accent }}>
        <div className={`${shellClass} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <div>
            <p className="text-4xl font-black uppercase tracking-tight md:text-5xl text-white">Get Your Free Quote</p>
            <p className="mt-4 text-xl font-bold text-white">Free Estimate • Honest Pricing • Expert Residential Service</p>
            <p className="mt-2 text-base font-medium text-white/90">Serving {config.city} and surrounding areas</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-shrink-0">
            <button type="button" className="rounded px-8 py-4 text-base font-black shadow-xl uppercase tracking-wide transition-all hover:scale-105" style={{ backgroundColor: 'white', color: accent }} onClick={scrollToQuote}>{config.ctaPrimary}</button>
            <a href={`tel:${cleanPhone}`} className="inline-flex items-center justify-center gap-2 rounded px-8 py-4 text-base font-black uppercase tracking-wide transition-all hover:bg-white/10" style={{ border: `3px solid white`, color: 'white' }}><Phone className="h-5 w-5" />{config.phone}</a>
          </div>
        </div>
      </section >

      <Footer businessName={config.businessName} phone={config.phone} cleanPhone={cleanPhone} accentColor={accent} />

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-3 rounded p-3 shadow-2xl" style={{ backgroundColor: t.cardBg, border: `3px solid ${accent}` }}>
          <a href={`tel:${cleanPhone}`} className="flex flex-1 items-center justify-center gap-2 rounded px-3 py-3 text-sm font-black uppercase tracking-wide transition-all" style={{ border: `2px solid ${t.border}`, color: t.textPrimary }}><Phone className="h-4 w-4" />Call</a>
          <button type="button" className="flex-1 rounded px-3 py-3 text-sm font-black text-white uppercase tracking-wide shadow-lg transition-all" style={{ backgroundColor: accent }} onClick={scrollToQuote}>Request a Quote</button>
        </div>
      </div>



    </div >
  );
}
