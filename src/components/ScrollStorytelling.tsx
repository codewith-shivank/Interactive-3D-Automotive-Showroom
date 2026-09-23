import { useState } from 'react';
import VehicleViewer from './3d/VehicleViewer';
import { VehicleColor, WheelOption, InteriorOption, CameraViewPreset } from '@/src/types/vehicle';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface StoryChapter {
  id: string;
  step: string;
  title: string;
  kicker: string;
  description: string;
  cameraPreset: CameraViewPreset;
  specs: { label: string; value: string }[];
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'aero-silhouette',
    step: '01',
    kicker: 'AERODYNAMICS',
    title: 'Precision Airflow Sculpture',
    description:
      'The X1 silhouette was sculpted inside an acoustic wind tunnel to minimize parasitic drag. Active cooling louvers in the lower front fascia open only when extreme track cooling is commanded, keeping laminar airflow undisturbed during cruising.',
    cameraPreset: 'side',
    specs: [
      { label: 'Aerodynamic Drag', value: '0.208 Cd' },
      { label: 'Frontal Area', value: '2.18 m²' },
    ],
  },
  {
    id: 'structural-pack',
    step: '02',
    kicker: 'STRUCTURAL CELL INTEGRATION',
    title: 'Underbody 800V Architecture',
    description:
      'The 102 kWh battery pack forms the structural foundation of the vehicle chassis, lowering the center of gravity to just 460 mm from the pavement. Extruded aluminum side members safeguard against lateral impact intrusions.',
    cameraPreset: 'top',
    specs: [
      { label: 'Usable Capacity', value: '102 kWh' },
      { label: 'Center of Gravity', value: '460 mm' },
    ],
  },
  {
    id: 'rear-torque-vectoring',
    step: '03',
    kicker: 'DYNAMIC TRACTION',
    title: 'Dual Motor Torque Vectoring',
    description:
      'With dedicated axial-flux permanent magnet synchronous motors on both axles, the Aurelis electronic control unit dynamically routes up to 850 Nm of torque in milliseconds to eliminate understeer on sharp corner apexes.',
    cameraPreset: 'rear-three-quarter',
    specs: [
      { label: 'Combined Torque', value: '850 Nm' },
      { label: 'Response Latency', value: '<10 ms' },
    ],
  },
  {
    id: 'command-cockpit',
    step: '04',
    kicker: 'HUMAN-MACHINE SYNCHRONIZATION',
    title: 'Intuitive Driver Cockpit',
    description:
      'Framed by acoustic double-pane glass and bio-leather ergonomics, the driver sits inside a cocoon of minimal distractions. Vital telemetry floats on an ambient curved OLED display directly within peripheral vision.',
    cameraPreset: 'front-three-quarter',
    specs: [
      { label: 'Display Resolution', value: '5K Micro-OLED' },
      { label: 'Acoustic Index', value: '38 dB Ambient' },
    ],
  },
];

interface ScrollStorytellingProps {
  color: VehicleColor;
  wheels: WheelOption;
  interior: InteriorOption;
}

export default function ScrollStorytelling({
  color,
  wheels,
  interior,
}: ScrollStorytellingProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const currentChapter = CHAPTERS[currentChapterIndex];

  const handlePrev = () => {
    setCurrentChapterIndex((prev) => (prev > 0 ? prev - 1 : CHAPTERS.length - 1));
  };

  const handleNext = () => {
    setCurrentChapterIndex((prev) => (prev < CHAPTERS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-900 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-400 uppercase font-medium mb-3">
              <span>CINEMATIC WALKTHROUGH</span>
              <span aria-hidden="true">·</span>
              <span>ENGINEERING REVEALED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
              Anatomy of the Aurelis X1
            </h2>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 mr-2">
              CHAPTER {currentChapter.step} OF 0{CHAPTERS.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous chapter"
              className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next chapter"
              className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Story Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Stage Choreographed to Current Chapter */}
          <div className="lg:col-span-7">
            <VehicleViewer
              color={color}
              wheels={wheels}
              interior={interior}
              heightClass="h-[380px] sm:h-[460px] md:h-[520px]"
              initialPreset={currentChapter.cameraPreset}
              showControlsOverlay={true}
              interactive={true}
            />
          </div>

          {/* Right Column: Chapter Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 min-h-[460px]">
            <div>
              {/* Stepper indicators */}
              <div className="flex items-center gap-1.5 mb-6">
                {CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => setCurrentChapterIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentChapterIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Jump to chapter ${ch.step}`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                {currentChapter.kicker}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2 mb-4">
                {currentChapter.title}
              </h3>

              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {currentChapter.description}
              </p>
            </div>

            {/* Chapter Metrics */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 gap-4">
              {currentChapter.specs.map((spec, i) => (
                <div key={i}>
                  <span className="text-xs text-neutral-400 block">{spec.label}</span>
                  <span className="text-xl font-bold font-mono text-white mt-0.5 block">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
