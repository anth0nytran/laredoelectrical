'use client';

import { useState } from 'react';
import { MapPin, Clock, ChevronDown } from 'lucide-react';

interface FooterProps {
    businessName: string;
    phone: string;
    cleanPhone: string;
    accentColor: string;
}

interface ServiceCategory {
    title: string;
    items: string[];
}

const serviceCategories: ServiceCategory[] = [
    {
        title: 'Residential Service & Repair',
        items: ['Premium Emergency Service', 'Preventative Maintenance Contracts', 'Panel Upgrades'],
    },
    {
        title: 'Generator Services',
        items: ['Whole-Home Generator Installation', 'Backup Power Systems', 'Generator Maintenance'],
    },
    {
        title: 'Commercial Electrical',
        items: ['Office & Retail Wiring', 'Lighting Retrofits', 'Electrical Code Compliance'],
    },
];

function ServiceDropdown({ category, accentColor }: { category: ServiceCategory; accentColor: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-zinc-800 last:border-b-0">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left text-sm font-bold text-zinc-300 hover:text-white transition-colors group"
            >
                <span>{category.title}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 group-hover:text-white transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                <ul className="space-y-2 pl-4">
                    {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-zinc-500">
                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }}></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function Footer({ businessName, phone, cleanPhone, accentColor }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-zinc-950 text-white border-t border-zinc-800 pt-20 pb-10 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-3 md:grid-cols-2 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <img
                            src="/images/reallaredo.svg"
                            alt={businessName}
                            className="h-14 w-auto brightness-0 invert object-contain object-left"
                        />
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-medium">
                            Houston homeowners trust us for fast, honestly-priced electrical service — from emergency repairs to full panel upgrades.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Licensed & Insured
                        </div>
                    </div>

                    {/* Services Dropdowns */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-3">
                            <span className="w-6 h-[2px]" style={{ backgroundColor: accentColor }}></span>
                            Our Services
                        </h4>
                        <div>
                            {serviceCategories.map((category, idx) => (
                                <ServiceDropdown key={idx} category={category} accentColor={accentColor} />
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-3">
                            <span className="w-6 h-[2px]" style={{ backgroundColor: accentColor }}></span>
                            Contact Us
                        </h4>
                        <ul className="space-y-6">
                            <li>
                                <a href={`tel:${cleanPhone}`} className="group block">
                                    <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1 group-hover:text-emerald-400 transition-colors">24/7 Emergency Service</span>
                                    <span className="text-2xl font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                                        {phone}
                                    </span>
                                </a>
                            </li>
                            <li className="space-y-3">
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <MapPin className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                                    <span>Houston, Katy, Sugar Land, Richmond, The Woodlands & Cypress</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <Clock className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                                    <span>Mon-Fri: 8am - 5pm | Sat: 8am - 12pm</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold text-zinc-600 uppercase tracking-widest">
                    <p>&copy; {currentYear} {businessName}. All Rights Reserved.</p>
                    <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        Site by QuickLaunchWeb
                    </a>
                </div>
            </div>
        </footer>
    );
}

