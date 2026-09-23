import { useState } from 'react';
import { Cpu, Wifi, BatteryCharging, ShieldAlert, ChevronRight, Check } from 'lucide-react';

interface TechFeature {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  details: string[];
  metric: string;
  metricLabel: string;
}

const TECH_FEATURES: TechFeature[] = [
  {
    id: 'intelligent-drive',
    title: 'Intelligent Drive',
    shortDescription: 'Adaptive driving assistance and intelligent vehicle systems.',
    category: 'Neural Highway Autonomy',
    details: [
      'Dual redundant centralized compute running at 500 TOPS',
      'Solid-state roofline LiDAR with 250m long-range object classification',
      'Predictive highway pilot with continuous lane centering & overtaking',
      'Over-the-air neural model refinement via fleet edge learning',
    ],
    metric: '500 TOPS',
    metricLabel: 'Centralized Compute Throughput',
  },
  {
    id: 'connected-cockpit',
    title: 'Connected Cockpit',
    shortDescription: 'A connected digital experience built around the driver.',
    category: 'Human-Centered Ergonomics',
    details: [
      '38-inch curved 5K micro-OLED panoramic driver display',
      'Spatial acoustic zones with active active road-noise cancellation',
      'Biometric driver recognition with individualized posture presets',
      'Zero-latency haptic glass interface with physical tactile feedback',
    ],
    metric: '38-inch',
    metricLabel: 'Curved 5K Micro-OLED Horizon',
  },
  {
    id: 'smart-energy',
    title: 'Smart Energy',
    shortDescription: 'Intelligent energy management and charging optimization.',
    category: '800V Silicon Carbide Platform',
    details: [
      '350 kW DC ultra-fast charging: 10% to 80% charge in 18 minutes',
      'Bidirectional Vehicle-to-Home (V2H) and Vehicle-to-Grid (V2G) capability',
      'Octovalve thermal heat pump operating efficiently down to -25°C',
      'Cell-to-pack structural battery housing optimizing volumetric density',
    ],
    metric: '18 min',
    metricLabel: '10% to 80% High-Power Charge',
  },
  {
    id: 'advanced-safety',
    title: 'Advanced Safety',
    shortDescription: 'Driver assistance and safety-focused technology.',
    category: 'Active Structural Defense',
    details: [
      'Hot-stamped boron steel and carbon-fiber occupant safety cell',
      '360-degree radar perimeter barrier with pre-collision suspension lift',
      'Multi-axis steer-by-wire with dual hardware fallback actuators',
      'Automatic emergency evasive steering with pedestrian path prediction',
    ],
    metric: '360°',
    metricLabel: 'Surround Sensor Shielding',
  },
];

export default function TechnologySection() {
  const [selectedTech, setSelectedTech] = useState<TechFeature | null>(null);

  return (
    <section id="technology" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase font-medium mb-3">
            <span>INTELLIGENT SYSTEMS</span>
            <span aria-hidden="true">·</span>
            <span>NEXT-GENERATION PLATFORM</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display text-balance">
            Engineered for Tomorrow.
          </h2>

          <p className="mt-4 text-base md:text-lg text-neutral-400 font-light leading-relaxed">
            The Aurelis technological stack bridges physical vehicle dynamics with machine
            intelligence, delivering effortless control and heightened driver awareness.
          </p>
        </div>

        {/* 4 Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_FEATURES.map((tech) => (
            <div
              key={tech.id}
              className="group p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-400 tracking-wider">
                    {tech.category}
                  </span>
                  <span className="text-xs font-mono text-white font-medium">{tech.metric}</span>
                </div>

                <h3 className="text-2xl font-bold text-white font-display group-hover:text-white transition-colors">
                  {tech.title}
                </h3>

                <p className="text-sm text-neutral-400 mt-2 font-light leading-relaxed">
                  {tech.shortDescription}
                </p>

                {/* Specific feature list */}
                <ul className="mt-6 space-y-2.5 pt-6 border-t border-neutral-800/60">
                  {tech.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs text-neutral-400">{tech.metricLabel}</span>
                <button
                  onClick={() => setSelectedTech(tech)}
                  className="text-xs font-medium text-white hover:text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Technical details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal Dialog */}
      {selectedTech && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 tracking-wider block">
                  {selectedTech.category}
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                  {selectedTech.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTech(null)}
                aria-label="Close dialog"
                className="text-neutral-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {selectedTech.shortDescription} Developed in-house at Aurelis Engineering Labs to
              harmonize machine intelligence with analog driving intuition.
            </p>

            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase block">
                Platform Architecture
              </span>
              {selectedTech.details.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-200">{d}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTech(null)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
