import { useState } from 'react';
import { Wind, Lightbulb, Shield, Layers, Eye, Sparkles } from 'lucide-react';

interface DesignPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  spec: string;
  specLabel: string;
}

const DESIGN_PILLARS: DesignPillar[] = [
  {
    id: 'aerodynamics',
    number: '01',
    title: 'Aerodynamic Silhouette',
    subtitle: 'Calculated Airflow Management',
    description:
      'Form strictly dictated by thermodynamic and aerodynamic efficiency. A teardrop cabin canopy gently tapers into a sculpted ducktail, achieving a class-leading drag coefficient of 0.208 Cd.',
    spec: '0.208 Cd',
    specLabel: 'Drag Coefficient',
  },
  {
    id: 'lighting',
    number: '02',
    title: 'Adaptive Laser Lighting',
    subtitle: 'Continuous Luminescence Architecture',
    description:
      'Ultra-thin horizontal micro-mirror LED matrix headlights cast precision-steered illumination up to 600 meters ahead, paired with an unbroken rear aerodynamic blade taillight.',
    spec: '600 m',
    specLabel: 'Illumination Range',
  },
  {
    id: 'body',
    number: '03',
    title: 'Sculpted Monocoque Body',
    subtitle: 'Aluminum & Structural Carbon Composite',
    description:
      'Hot-formed aerospace aluminum stampings fused with structural recycled carbon-fiber elements deliver unprecedented torsional stiffness without compounding vehicle mass.',
    spec: '42,000 Nm/deg',
    specLabel: 'Torsional Rigidity',
  },
  {
    id: 'doors',
    number: '04',
    title: 'Flush Door Architecture',
    subtitle: 'Acoustic Precision Sealing',
    description:
      'Ultrasonic capacitive proximity handles remain seamlessly flush with the body panels until driver approach. Frameless acoustic double-glazed glass creates a serene, library-quiet sanctuary.',
    spec: '<58 dBA',
    specLabel: 'Cabin Noise at 120 km/h',
  },
  {
    id: 'surfaces',
    number: '05',
    title: 'Minimal Surface Language',
    subtitle: 'Zero Ornamental Distraction',
    description:
      'Every crease and panel radius serves a functional aerodynamic purpose. No faux vents, no fake plastic trims, no unearned ornamentation—pure automotive mathematical sculpture.',
    spec: '100%',
    specLabel: 'Functional Surfaces',
  },
];

export default function DesignSection() {
  const [activePillar, setActivePillar] = useState<DesignPillar>(DESIGN_PILLARS[0]);

  return (
    <section id="design" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase font-medium mb-3">
            <span>AESTHETIC ARCHITECTURE</span>
            <span aria-hidden="true">·</span>
            <span>FORM & FUNCTION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display text-balance">
            Designed with Purpose.
          </h2>

          <p className="mt-4 text-base md:text-lg text-neutral-400 font-light leading-relaxed">
            The Aurelis X1 strips away superfluous ornamentation in pursuit of mathematical purity.
            Every curve guides airflow, preserves energy, and establishes an unmistakable road presence.
          </p>
        </div>

        {/* Interactive Editorial Design Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Architectural Canvas / Blueprint */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 relative overflow-hidden min-h-[440px]">
            {/* Aerodynamic Airflow Vector Graphic Overlay */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="streamlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Wind tunnel streamlines */}
                <path d="M 0 120 C 200 120, 350 80, 600 80 S 800 140, 1000 140" fill="none" stroke="url(#streamlineGrad)" strokeWidth="1.5" />
                <path d="M 0 180 C 220 180, 400 130, 650 130 S 850 210, 1000 210" fill="none" stroke="url(#streamlineGrad)" strokeWidth="2" />
                <path d="M 0 240 C 250 240, 420 220, 700 220 S 900 280, 1000 280" fill="none" stroke="url(#streamlineGrad)" strokeWidth="1.5" />
                <path d="M 0 310 C 300 310, 450 330, 750 330 S 950 340, 1000 340" fill="none" stroke="url(#streamlineGrad)" strokeWidth="1" />
              </svg>
            </div>

            {/* Pillar Header Info */}
            <div className="z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-neutral-400">
                  PILLAR {activePillar.number} / 05
                </span>
                <span className="text-xs text-neutral-400 font-medium">Aurelis Aero Lab</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">
                {activePillar.title}
              </h3>
              <p className="text-xs tracking-wider uppercase text-neutral-400 mt-1">
                {activePillar.subtitle}
              </p>
            </div>

            {/* Stylized Silhouette Vector Representation */}
            <div className="my-8 z-10 flex items-center justify-center">
              <svg viewBox="0 0 700 220" className="w-full max-w-lg drop-shadow-xl">
                {/* Ground plane */}
                <line x1="20" y1="180" x2="680" y2="180" stroke="#262626" strokeWidth="1" />
                
                {/* Wheels */}
                <circle cx="160" cy="180" r="32" fill="#121214" stroke="#404040" strokeWidth="3" />
                <circle cx="160" cy="180" r="14" fill="#262626" />
                <circle cx="530" cy="180" r="32" fill="#121214" stroke="#404040" strokeWidth="3" />
                <circle cx="530" cy="180" r="14" fill="#262626" />

                {/* Car Silhouette Path */}
                <path
                  d="M 60 178 L 110 178 Q 130 145 160 145 Q 190 145 210 178 L 480 178 Q 500 145 530 145 Q 560 145 580 178 L 650 178 Q 665 174 660 160 Q 640 140 600 125 Q 530 110 440 90 Q 340 75 280 95 Q 210 120 140 140 L 70 155 Q 50 165 60 178 Z"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2.5"
                />

                {/* Glass Canopy Outline */}
                <path
                  d="M 235 125 Q 290 85 360 85 Q 430 85 490 125 Z"
                  fill="#0ea5e9"
                  fillOpacity="0.15"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />

                {/* Front & Rear Light Bars */}
                <line x1="60" y1="162" x2="78" y2="158" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <line x1="655" y1="152" x2="665" y2="158" stroke="#ff2244" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Spec readout bottom banner */}
            <div className="z-10 flex items-center justify-between pt-4 border-t border-neutral-800/80">
              <div>
                <span className="text-xs text-neutral-400">{activePillar.specLabel}</span>
                <p className="text-2xl font-bold font-mono text-white mt-0.5">
                  {activePillar.spec}
                </p>
              </div>
              <p className="text-xs text-neutral-400 max-w-xs text-right leading-relaxed">
                {activePillar.description}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive List of Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {DESIGN_PILLARS.map((pillar) => {
              const isActive = activePillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar)}
                  className={`flex items-start justify-between p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 border-white/80 shadow-md ring-1 ring-white/20'
                      : 'bg-neutral-900/30 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-semibold text-neutral-400 pt-0.5">
                      {pillar.number}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-white font-display">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  <div className="pl-3 shrink-0 pt-0.5">
                    <span className="text-xs font-mono font-medium text-neutral-300">
                      {pillar.spec}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
