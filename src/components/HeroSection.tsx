import { ArrowRight, Compass, ShieldCheck, Zap } from 'lucide-react';
import VehicleViewer from './3d/VehicleViewer';
import { VehicleColor, WheelOption, InteriorOption } from '@/src/types/vehicle';

interface HeroSectionProps {
  color: VehicleColor;
  wheels: WheelOption;
  interior: InteriorOption;
  onExplore: () => void;
  onConfigure: () => void;
  onBookTestDrive?: () => void;
}

export default function HeroSection({
  color,
  wheels,
  interior,
  onExplore,
  onConfigure,
  onBookTestDrive,
}: HeroSectionProps) {
  return (
    <section
      id="overview"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-neutral-950"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10 flex flex-col items-center text-center mt-6 md:mt-10">
        {/* Brand Kicker */}
        <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase font-medium mb-3">
          <span>AURELIS MOTORS</span>
          <span aria-hidden="true">·</span>
          <span>CONCEPT VALIDATED</span>
        </div>

        {/* Model Title & Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display uppercase">
          AURELIS X1
        </h1>

        <p className="mt-3 text-lg md:text-xl font-light tracking-wide text-neutral-300 max-w-2xl text-balance">
          Engineering Motion. Designed for Tomorrow.
        </p>

        <p className="mt-2 text-xs md:text-sm text-neutral-400 max-w-xl text-balance">
          An intelligent electric performance vehicle designed around precision, efficiency, and human-centered technology.
        </p>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onConfigure}
            className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-lg shadow-white/5"
          >
            <span>Configure Vehicle</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {onBookTestDrive && (
            <button
              onClick={onBookTestDrive}
              className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <span>Book Test Drive</span>
            </button>
          )}
          <button
            onClick={onExplore}
            className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-900/50 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-neutral-400" />
            <span>Explore X1</span>
          </button>
        </div>
      </div>

      {/* 3D Interactive Vehicle Stage */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-6 z-10">
        <VehicleViewer
          color={color}
          wheels={wheels}
          interior={interior}
          heightClass="h-[360px] sm:h-[460px] md:h-[540px] lg:h-[600px]"
          showControlsOverlay={true}
          interactive={true}
        />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-neutral-900">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 tracking-wider uppercase">0–100 km/h</span>
            <span className="text-2xl md:text-3xl font-semibold text-white font-mono tabular-nums mt-0.5">
              3.8 <span className="text-sm font-normal text-neutral-400">sec</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 tracking-wider uppercase">WLTP Range</span>
            <span className="text-2xl md:text-3xl font-semibold text-white font-mono tabular-nums mt-0.5">
              610 <span className="text-sm font-normal text-neutral-400">km</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 tracking-wider uppercase">Peak Output</span>
            <span className="text-2xl md:text-3xl font-semibold text-white font-mono tabular-nums mt-0.5">
              480 <span className="text-sm font-normal text-neutral-400">kW</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 tracking-wider uppercase">Drivetrain</span>
            <span className="text-2xl md:text-3xl font-semibold text-white mt-0.5 tracking-tight">
              Dual AWD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
