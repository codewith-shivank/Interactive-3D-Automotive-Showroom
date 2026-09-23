import { useState, useEffect } from 'react';
import { Gauge, Zap, Flame, ShieldAlert, Activity, ArrowRight } from 'lucide-react';

interface DriveMode {
  id: string;
  name: string;
  description: string;
  zeroToHundred: number;
  powerKw: number;
  topSpeed: number;
  frontRearSplit: string;
  suspension: string;
  regenBraking: string;
}

const DRIVE_MODES: DriveMode[] = [
  {
    id: 'comfort',
    name: 'Comfort Grand Tour',
    description: 'Supple dual-chamber air suspension, linear power delivery, relaxed regenerative coasting.',
    zeroToHundred: 4.6,
    powerKw: 360,
    topSpeed: 210,
    frontRearSplit: '50 : 50',
    suspension: 'Adaptive Comfort',
    regenBraking: 'Low / Smooth Coast',
  },
  {
    id: 'sport',
    name: 'Sport Dynamic',
    description: 'Sharpened steering ratio, stiffened damping, proactive torque vectoring on corner entry.',
    zeroToHundred: 4.1,
    powerKw: 420,
    topSpeed: 235,
    frontRearSplit: '40 : 60 (Rear Bias)',
    suspension: 'Firm Damped',
    regenBraking: 'Medium Dynamic',
  },
  {
    id: 'track-apex',
    name: 'Track Apex',
    description: 'Maximum 480 kW unlocked, aggressive 30:70 rear torque vectoring, race thermal cooling.',
    zeroToHundred: 3.8,
    powerKw: 480,
    topSpeed: 250,
    frontRearSplit: '30 : 70 (Track Bias)',
    suspension: 'Rigid Race Setup',
    regenBraking: 'High / One-Pedal Precision',
  },
  {
    id: 'range-endurance',
    name: 'Range Endurance',
    description: 'Disengages front induction motor during steady highway cruising to achieve maximal 610 km efficiency.',
    zeroToHundred: 5.4,
    powerKw: 280,
    topSpeed: 180,
    frontRearSplit: '10 : 90 (Eco Cruise)',
    suspension: 'Aerodynamic Lowered',
    regenBraking: 'Maximum Energy Harvest',
  },
];

export default function PerformanceSection() {
  const [selectedMode, setSelectedMode] = useState<DriveMode>(DRIVE_MODES[2]); // Default: Track Apex (3.8s)

  return (
    <section id="performance" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-900 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase font-medium mb-3">
              <span>DUAL AXIAL-FLUX POWERTRAIN</span>
              <span aria-hidden="true">·</span>
              <span>DYNAMIC CHASSIS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display">
              Uncompromising Velocity.
            </h2>
          </div>

          <p className="text-xs md:text-sm text-neutral-400 max-w-md text-balance">
            Two permanent magnet axial-flux motors deliver instantaneous torque with sub-millisecond
            all-wheel traction regulation across every road surface.
          </p>
        </div>

        {/* 5 Core Required Metrics (High Impact Display) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {/* Metric 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">0–100 km/h</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-white tabular-nums tracking-tight">
                {selectedMode.zeroToHundred}
              </span>
              <span className="text-sm font-normal text-neutral-400">sec</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-2">Instant launch control</span>
          </div>

          {/* Metric 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">WLTP Range</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-white tabular-nums tracking-tight">
                610
              </span>
              <span className="text-sm font-normal text-neutral-400">km</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-2">102 kWh structural pack</span>
          </div>

          {/* Metric 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">Peak Power</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-white tabular-nums tracking-tight">
                {selectedMode.powerKw}
              </span>
              <span className="text-sm font-normal text-neutral-400">kW</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-2">650 hp combined output</span>
          </div>

          {/* Metric 4 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">Drivetrain</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                AWD
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-2">Electronic torque vectoring</span>
          </div>

          {/* Metric 5 */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col col-span-2 md:col-span-1">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">Top Speed</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-white tabular-nums tracking-tight">
                {selectedMode.topSpeed}
              </span>
              <span className="text-sm font-normal text-neutral-400">km/h</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-2">Electronically governed</span>
          </div>
        </div>

        {/* Interactive Dynamic Drive Mode Matrix */}
        <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                INTERACTIVE DRIVE MODE MATRIX
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-1">
                Calibrate Chassis & Powertrain Response
              </h3>
            </div>
            <span className="text-xs text-neutral-400">Select mode to simulate live dynamics</span>
          </div>

          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
            {DRIVE_MODES.map((mode) => {
              const isSelected = selectedMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-800 border-white/80 shadow-md ring-1 ring-white/20'
                      : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <span className="text-sm font-semibold text-white block">{mode.name}</span>
                  <span className="text-xs font-mono text-neutral-400 mt-1 block">
                    {mode.zeroToHundred}s · {mode.powerKw} kW
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Mode Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850">
              <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                Torque Distribution
              </span>
              <span className="text-base font-semibold font-mono text-white block">
                {selectedMode.frontRearSplit}
              </span>
              <p className="text-neutral-400 mt-2 leading-relaxed">
                Active electronic differential independently modulates slip across all 4 wheels every 10 milliseconds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850">
              <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                Air Suspension Valving
              </span>
              <span className="text-base font-semibold text-white block">
                {selectedMode.suspension}
              </span>
              <p className="text-neutral-400 mt-2 leading-relaxed">
                Dual-chamber air suspension continuously scans road topology using forward stereo LiDAR cameras.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850">
              <span className="text-neutral-400 uppercase tracking-wider block mb-1">
                Regenerative Recovery
              </span>
              <span className="text-base font-semibold text-white block">
                {selectedMode.regenBraking}
              </span>
              <p className="text-neutral-400 mt-2 leading-relaxed">
                Recovers up to 260 kW of kinetic deceleration back into the 800V battery cells during braking.
              </p>
            </div>
          </div>

          {/* Concept Demo Notice */}
          <div className="mt-6 pt-4 border-t border-neutral-850 text-center text-xs text-neutral-400">
            Fictional concept performance parameters simulated for product demonstration purposes.
          </div>
        </div>
      </div>
    </section>
  );
}
