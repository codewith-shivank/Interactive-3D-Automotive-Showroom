import { useState } from 'react';
import { Eye, Layers, Compass, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  angle: string;
  description: string;
  accentColor: string;
  type: 'exterior' | 'interior' | 'engineering';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'studio-front',
    title: 'Frontal Fascia & Laser DRL',
    category: 'Exterior Architecture',
    angle: 'Direct Front Elevation',
    description: 'Continuous horizontal lightbar with micro-projector LED headlights and functional cooling channels.',
    accentColor: '#38bdf8',
    type: 'exterior',
  },
  {
    id: 'studio-profile',
    title: 'Laminar Aerodynamic Flow',
    category: 'Aerodynamics',
    angle: 'Side Silhouette Elevation',
    description: 'Fastback roofline with 0.208 Cd drag coefficient and flush ultrasonic door actuators.',
    accentColor: '#818cf8',
    type: 'exterior',
  },
  {
    id: 'cockpit-oled',
    title: 'Curved 5K Micro-OLED Cockpit',
    category: 'Interior Sanctuary',
    angle: 'Driver Perspective',
    description: 'Floating digital horizon display with bio-leather ergonomics and ambient haptic controls.',
    accentColor: '#f59e0b',
    type: 'interior',
  },
  {
    id: 'chassis-skateboard',
    title: '800V Structural Battery Platform',
    category: 'Engineering Architecture',
    angle: 'Underbody Cross Section',
    description: '102 kWh cell-to-pack structural battery with dual permanent magnet axial-flux motors.',
    accentColor: '#10b981',
    type: 'engineering',
  },
  {
    id: 'rear-blade',
    title: 'Continuous Rear Light Blade',
    category: 'Exterior Architecture',
    angle: 'Rear Three-Quarter Deck',
    description: 'Sculpted ducktail spoiler with integrated continuous LED blade and quad underbody aero fins.',
    accentColor: '#ef4444',
    type: 'exterior',
  },
  {
    id: 'wheel-forged',
    title: 'Turbine Forged Performance Alloys',
    category: 'Chassis Engineering',
    angle: 'Wheel Assembly Macro',
    description: 'Lightweight forged turbine design paired with ventilated carbon-ceramic brake discs.',
    accentColor: '#d97706',
    type: 'engineering',
  },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.type === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-900 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase font-medium mb-3">
              <span>VISUAL ARCHIVE</span>
              <span aria-hidden="true">·</span>
              <span>EDITORIAL SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
              Design in Every Detail
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Angles
            </button>
            <button
              onClick={() => setActiveFilter('exterior')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'exterior'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Exterior
            </button>
            <button
              onClick={() => setActiveFilter('interior')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'interior'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Interior
            </button>
            <button
              onClick={() => setActiveFilter('engineering')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'engineering'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Engineering
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl bg-neutral-900/40 border border-neutral-800 overflow-hidden hover:border-neutral-700 hover:bg-neutral-900/70 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Visual Presentation Area (Clean architectural geometric SVG artwork) */}
              <div className="relative h-56 w-full bg-neutral-950 flex items-center justify-center p-6 border-b border-neutral-800/80 overflow-hidden">
                {/* Background Ambient Radial Glow */}
                <div
                  className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${item.accentColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Thematic Automotive Blueprint SVG based on item */}
                {item.id === 'studio-front' && (
                  <svg viewBox="0 0 320 160" className="w-48 text-neutral-300">
                    <path d="M 60 110 L 80 85 L 120 75 L 200 75 L 240 85 L 260 110 L 250 125 L 70 125 Z" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    {/* Continuous Front DRL Lightbar */}
                    <line x1="80" y1="92" x2="240" y2="92" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                    <line x1="85" y1="102" x2="115" y2="102" stroke="#ffffff" strokeWidth="2" />
                    <line x1="205" y1="102" x2="235" y2="102" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="160" cy="92" r="3" fill="#ffffff" />
                  </svg>
                )}

                {item.id === 'studio-profile' && (
                  <svg viewBox="0 0 320 160" className="w-56 text-neutral-300">
                    <line x1="20" y1="120" x2="300" y2="120" stroke="#262626" strokeWidth="1" />
                    <circle cx="80" cy="120" r="18" fill="#121214" stroke="#818cf8" strokeWidth="2" />
                    <circle cx="240" cy="120" r="18" fill="#121214" stroke="#818cf8" strokeWidth="2" />
                    <path d="M 30 118 Q 70 95 120 75 Q 180 60 250 95 Q 285 105 295 118" fill="none" stroke="#ffffff" strokeWidth="2" />
                    <path d="M 115 80 Q 155 68 205 78" fill="none" stroke="#818cf8" strokeWidth="1.5" />
                  </svg>
                )}

                {item.id === 'cockpit-oled' && (
                  <svg viewBox="0 0 320 160" className="w-52 text-neutral-300">
                    {/* Curved wide screen */}
                    <path d="M 40 75 Q 160 65 280 75 L 275 100 Q 160 90 45 100 Z" fill="#172554" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="160" cy="125" r="22" fill="none" stroke="#404040" strokeWidth="3" />
                  </svg>
                )}

                {item.id === 'chassis-skateboard' && (
                  <svg viewBox="0 0 320 160" className="w-52 text-neutral-300">
                    <rect x="50" y="70" width="220" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    {/* Battery cell matrix modules */}
                    {[65, 95, 125, 155, 185, 215, 245].map((x, i) => (
                      <rect key={i} x={x} y="76" width="18" height="28" rx="2" fill="#047857" opacity="0.8" />
                    ))}
                  </svg>
                )}

                {item.id === 'rear-blade' && (
                  <svg viewBox="0 0 320 160" className="w-52 text-neutral-300">
                    <path d="M 50 95 Q 160 85 270 95" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <line x1="120" y1="115" x2="120" y2="135" stroke="#404040" strokeWidth="2" />
                    <line x1="145" y1="115" x2="145" y2="135" stroke="#404040" strokeWidth="2" />
                    <line x1="175" y1="115" x2="175" y2="135" stroke="#404040" strokeWidth="2" />
                    <line x1="200" y1="115" x2="200" y2="135" stroke="#404040" strokeWidth="2" />
                  </svg>
                )}

                {item.id === 'wheel-forged' && (
                  <svg viewBox="0 0 320 160" className="w-40 text-neutral-300">
                    <circle cx="160" cy="80" r="45" fill="#121214" stroke="#d97706" strokeWidth="3" />
                    <circle cx="160" cy="80" r="32" fill="none" stroke="#78716c" strokeWidth="1" strokeDasharray="4 2" />
                    <rect x="180" y="65" width="16" height="26" rx="3" fill="#ea580c" />
                    <circle cx="160" cy="80" r="10" fill="#292524" />
                  </svg>
                )}

                <div className="absolute top-3 right-3 text-[11px] font-mono text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800">
                  {item.angle}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white font-display group-hover:text-neutral-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                  <span>Inspect specifications</span>
                  <Eye className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Modal Preview */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 tracking-wider block">
                  {selectedItem.category} · {selectedItem.angle}
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close dialog"
                className="text-neutral-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {selectedItem.description} Every component is engineered to aircraft tolerance tolerances,
              undergoing 1,000+ hours of physical validation across frozen sub-arctic proving grounds and
              high-speed banked test circuits.
            </p>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Archival Reference</span>
              <span className="font-mono text-neutral-200">AURELIS-SPEC-{selectedItem.id.toUpperCase()}</span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
