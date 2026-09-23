import { X, Check } from 'lucide-react';
import { VehicleConfiguration, BASE_PRICE } from '@/src/types/vehicle';

interface CompareModalProps {
  currentConfig: VehicleConfiguration;
  onClose: () => void;
  onSelectConfig: (configPartial: Partial<VehicleConfiguration>) => void;
}

export default function CompareModal({ currentConfig, onClose }: CompareModalProps) {
  const currentTotal =
    BASE_PRICE +
    currentConfig.wheels.priceDelta +
    currentConfig.interior.priceDelta +
    currentConfig.powertrain.priceDelta;

  const currentRange = currentConfig.powertrain.rangeKm + currentConfig.wheels.rangeDeltaKm;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              SPECIFICATION COMPARISON
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-0.5">
              Compare Configurations
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-3 px-4 text-neutral-400 font-medium">Specification</th>
                <th className="py-3 px-4 text-white font-semibold bg-neutral-800/40 rounded-t-lg">
                  Your Custom Spec
                </th>
                <th className="py-3 px-4 text-neutral-300 font-medium">
                  Standard Grand Tour
                </th>
                <th className="py-3 px-4 text-neutral-300 font-medium">
                  Apex Tri-Motor Track
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">Powertrain</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 font-sans">
                  {currentConfig.powertrain.name}
                </td>
                <td className="py-3 px-4 text-neutral-300 font-sans">Dual Motor AWD</td>
                <td className="py-3 px-4 text-neutral-300 font-sans">Apex Tri-Motor AWD</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">0–100 km/h</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 tabular-nums">
                  {currentConfig.powertrain.zeroToHundred} sec
                </td>
                <td className="py-3 px-4 text-neutral-300 tabular-nums">3.8 sec</td>
                <td className="py-3 px-4 text-amber-400 font-semibold tabular-nums">2.6 sec</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">Peak Output</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 tabular-nums">
                  {currentConfig.powertrain.powerKw} kW ({currentConfig.powertrain.horsepower} hp)
                </td>
                <td className="py-3 px-4 text-neutral-300 tabular-nums">480 kW (650 hp)</td>
                <td className="py-3 px-4 text-neutral-300 tabular-nums">620 kW (840 hp)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">WLTP Range</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 tabular-nums">
                  {currentRange} km
                </td>
                <td className="py-3 px-4 text-emerald-400 tabular-nums">610 km</td>
                <td className="py-3 px-4 text-neutral-300 tabular-nums">565 km</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">Top Speed</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 tabular-nums">
                  {currentConfig.powertrain.topSpeedKmH} km/h
                </td>
                <td className="py-3 px-4 text-neutral-300 tabular-nums">250 km/h</td>
                <td className="py-3 px-4 text-neutral-300 tabular-nums">290 km/h</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">Selected Wheels</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 font-sans">
                  {currentConfig.wheels.name}
                </td>
                <td className="py-3 px-4 text-neutral-300 font-sans">Aero 19"</td>
                <td className="py-3 px-4 text-neutral-300 font-sans">Performance 21"</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-neutral-400">Cabin Upholstery</td>
                <td className="py-3 px-4 text-white font-semibold bg-neutral-800/40 font-sans">
                  {currentConfig.interior.name}
                </td>
                <td className="py-3 px-4 text-neutral-300 font-sans">Obsidian Bio-Leather</td>
                <td className="py-3 px-4 text-neutral-300 font-sans">Cognac Perforated</td>
              </tr>
              <tr className="border-t-2 border-neutral-700">
                <td className="py-4 px-4 font-sans text-neutral-300 font-semibold">Total Base Price</td>
                <td className="py-4 px-4 text-white font-bold text-base bg-neutral-800/40 tabular-nums">
                  ${currentTotal.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-neutral-300 text-sm tabular-nums">$89,500</td>
                <td className="py-4 px-4 text-neutral-300 text-sm tabular-nums">$112,200</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
