import { useState } from 'react';
import {
  Check,
  Share2,
  Copy,
  RotateCcw,
  Sliders,
  Sparkles,
  ArrowUpRight,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';
import VehicleViewer from './3d/VehicleViewer';
import {
  VehicleColor,
  WheelOption,
  InteriorOption,
  PowertrainOption,
  EXTERIOR_COLORS,
  WHEEL_OPTIONS,
  INTERIOR_OPTIONS,
  POWERTRAIN_OPTIONS,
  BASE_PRICE,
} from '@/src/types/vehicle';

interface ConfiguratorSectionProps {
  selectedColor: VehicleColor;
  onSelectColor: (c: VehicleColor) => void;
  selectedWheels: WheelOption;
  onSelectWheels: (w: WheelOption) => void;
  selectedInterior: InteriorOption;
  onSelectInterior: (i: InteriorOption) => void;
  selectedPowertrain: PowertrainOption;
  onSelectPowertrain: (p: PowertrainOption) => void;
  onOpenCompare: () => void;
  onOpenReserve: () => void;
  onOpenTestDrive?: () => void;
}

type TabType = 'exterior' | 'wheels' | 'interior' | 'powertrain';

export default function ConfiguratorSection({
  selectedColor,
  onSelectColor,
  selectedWheels,
  onSelectWheels,
  selectedInterior,
  onSelectInterior,
  selectedPowertrain,
  onSelectPowertrain,
  onOpenCompare,
  onOpenReserve,
  onOpenTestDrive,
}: ConfiguratorSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('exterior');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Total price computation
  const totalPrice =
    BASE_PRICE +
    selectedWheels.priceDelta +
    selectedInterior.priceDelta +
    selectedPowertrain.priceDelta;

  // Range adjusted for wheel aerodynamic resistance
  const adjustedRange = selectedPowertrain.rangeKm + selectedWheels.rangeDeltaKm;

  const handleShare = () => {
    const configData = `${selectedColor.name} | ${selectedWheels.name} | ${selectedInterior.name} | ${selectedPowertrain.name}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Aurelis X1 Custom Spec: ${configData} - Total: $${totalPrice.toLocaleString()}`
      );
    }
    setToastMessage('Configuration copied to clipboard');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReset = () => {
    onSelectColor(EXTERIOR_COLORS[0]);
    onSelectWheels(WHEEL_OPTIONS[0]);
    onSelectInterior(INTERIOR_OPTIONS[0]);
    onSelectPowertrain(POWERTRAIN_OPTIONS[0]);
    setToastMessage('Reset to factory specification');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <section id="configure" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-900 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-2">
              STUDIO CONFIGURATOR
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
              Build Your Aurelis X1
            </h2>
          </div>

          {/* Quick utility actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Build</span>
            </button>
          </div>
        </div>

        {/* Main Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Vehicle Stage */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <VehicleViewer
              color={selectedColor}
              wheels={selectedWheels}
              interior={selectedInterior}
              heightClass="h-[380px] sm:h-[480px] md:h-[560px]"
              showControlsOverlay={true}
              interactive={true}
            />

            {/* Quick Live Spec Strip underneath viewer */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <div>
                <span className="text-xs text-neutral-400">Est. Range</span>
                <p className="text-lg font-semibold text-white font-mono tabular-nums">
                  {adjustedRange} <span className="text-xs font-normal text-neutral-400">km</span>
                </p>
              </div>
              <div>
                <span className="text-xs text-neutral-400">Acceleration</span>
                <p className="text-lg font-semibold text-white font-mono tabular-nums">
                  {selectedPowertrain.zeroToHundred}{' '}
                  <span className="text-xs font-normal text-neutral-400">sec</span>
                </p>
              </div>
              <div>
                <span className="text-xs text-neutral-400">Peak Output</span>
                <p className="text-lg font-semibold text-white font-mono tabular-nums">
                  {selectedPowertrain.powerKw}{' '}
                  <span className="text-xs font-normal text-neutral-400">kW</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configuration Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Step Tabs / Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
              <button
                onClick={() => setActiveTab('exterior')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'exterior'
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setActiveTab('wheels')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'wheels'
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Wheels
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'interior'
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Interior
              </button>
              <button
                onClick={() => setActiveTab('powertrain')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'powertrain'
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Powertrain
              </button>
            </div>

            {/* Tab 1: Exterior Colors */}
            {activeTab === 'exterior' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                    Select Finish
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">{selectedColor.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {EXTERIOR_COLORS.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => onSelectColor(color)}
                        className={`flex flex-col items-center gap-2.5 p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-neutral-900 border-white/80 shadow-md ring-1 ring-white/30'
                            : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-full border-2 border-neutral-700 shadow-inner relative flex items-center justify-center transition-transform hover:scale-105"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                        </div>
                        <span className="text-xs font-medium text-neutral-200 text-center leading-tight">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 text-xs text-neutral-400">
                  <p className="text-neutral-200 font-medium mb-0.5">{selectedColor.name}</p>
                  <p>{selectedColor.description}</p>
                </div>
              </div>
            )}

            {/* Tab 2: Wheel Options */}
            {activeTab === 'wheels' && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase mb-1">
                  Wheel & Tire Assemblies
                </span>

                {WHEEL_OPTIONS.map((wheel) => {
                  const isSelected = selectedWheels.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      onClick={() => onSelectWheels(wheel)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 border-white/80 shadow-md ring-1 ring-white/30'
                          : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{wheel.name}</span>
                          {wheel.priceDelta === 0 && (
                            <span className="text-[10px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded font-mono">
                              Included
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-400 mt-0.5">{wheel.finish}</span>
                        <span className="text-[11px] text-neutral-500 mt-1 max-w-xs">
                          {wheel.description}
                        </span>
                      </div>

                      <div className="flex flex-col items-end shrink-0 pl-3">
                        <span className="text-xs font-mono font-medium text-white">
                          {wheel.priceDelta === 0 ? '$0' : `+$${wheel.priceDelta.toLocaleString()}`}
                        </span>
                        <span
                          className={`text-[11px] font-mono mt-0.5 ${
                            wheel.rangeDeltaKm < 0 ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {wheel.rangeDeltaKm === 0 ? '±0 km' : `${wheel.rangeDeltaKm} km`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab 3: Interior Themes */}
            {activeTab === 'interior' && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase mb-1">
                  Cabin Environment & Upholstery
                </span>

                {INTERIOR_OPTIONS.map((interior) => {
                  const isSelected = selectedInterior.id === interior.id;
                  return (
                    <button
                      key={interior.id}
                      onClick={() => onSelectInterior(interior)}
                      className={`flex items-start justify-between p-4 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 border-white/80 shadow-md ring-1 ring-white/30'
                          : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border border-neutral-700 mt-0.5 shrink-0 shadow-inner"
                          style={{ backgroundColor: interior.hex }}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white">{interior.name}</span>
                          <span className="text-xs text-neutral-400 mt-0.5">
                            {interior.material}
                          </span>
                          <span className="text-[11px] text-neutral-500 mt-1 max-w-xs">
                            {interior.description}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 pl-3">
                        <span className="text-xs font-mono font-medium text-white">
                          {interior.priceDelta === 0
                            ? 'Included'
                            : `+$${interior.priceDelta.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab 4: Powertrain & Drive */}
            {activeTab === 'powertrain' && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase mb-1">
                  Powertrain Architecture
                </span>

                {POWERTRAIN_OPTIONS.map((power) => {
                  const isSelected = selectedPowertrain.id === power.id;
                  return (
                    <button
                      key={power.id}
                      onClick={() => onSelectPowertrain(power)}
                      className={`flex flex-col p-4 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 border-white/80 shadow-md ring-1 ring-white/30'
                          : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-semibold text-white">{power.name}</span>
                        <span className="text-xs font-mono font-medium text-white">
                          {power.priceDelta === 0
                            ? 'Included'
                            : `+$${power.priceDelta.toLocaleString()}`}
                        </span>
                      </div>

                      <span className="text-xs text-neutral-400 mt-1">{power.drivetrain}</span>

                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-800/60 text-xs">
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase">Power</span>
                          <p className="font-mono font-medium text-white">{power.powerKw} kW ({power.horsepower} hp)</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase">0–100 km/h</span>
                          <p className="font-mono font-medium text-white">{power.zeroToHundred}s</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase">Top Speed</span>
                          <p className="font-mono font-medium text-white">{power.topSpeedKmH} km/h</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Real-Time Configuration Summary Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  CONFIGURATION SUMMARY
                </span>
                <span className="text-xs text-neutral-400">Concept Demo</span>
              </div>

              <div className="flex flex-col gap-2 text-xs border-y border-neutral-800/80 py-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Model</span>
                  <span className="font-medium text-white">Aurelis X1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Exterior Finish</span>
                  <span className="font-medium text-white">{selectedColor.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Wheels</span>
                  <span className="font-medium text-white">{selectedWheels.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Interior Theme</span>
                  <span className="font-medium text-white">{selectedInterior.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Estimated Range</span>
                  <span className="font-mono font-medium text-white">{adjustedRange} km (WLTP)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Production Window</span>
                  <span className="font-medium text-neutral-300">Q4 2026 Allocation</span>
                </div>
              </div>

              {/* Pricing & CTA Buttons */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xs text-neutral-400">Starting Price</span>
                  <p className="text-2xl font-bold font-mono text-white tabular-nums">
                    ${totalPrice.toLocaleString()}
                  </p>
                </div>
                <span className="text-[11px] text-neutral-500">Excl. taxes & destination</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-1">
                <button
                  onClick={onOpenReserve}
                  className="flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer text-center whitespace-nowrap shadow-md shadow-white/5"
                >
                  Reserve Allocation
                </button>
                {onOpenTestDrive && (
                  <button
                    onClick={onOpenTestDrive}
                    className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer text-center whitespace-nowrap border border-neutral-700"
                  >
                    Book Test Drive
                  </button>
                )}
                <button
                  onClick={onOpenCompare}
                  className="py-3 px-3 text-xs font-semibold tracking-wider uppercase text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer text-center whitespace-nowrap border border-neutral-800"
                >
                  Compare
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-lg border border-neutral-700 shadow-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
