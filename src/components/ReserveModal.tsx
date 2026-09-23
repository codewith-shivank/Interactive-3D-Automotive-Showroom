import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Calendar, MapPin, User, Mail, Phone } from 'lucide-react';
import { VehicleConfiguration, BASE_PRICE } from '@/src/types/vehicle';

interface ReserveModalProps {
  config: VehicleConfiguration;
  onClose: () => void;
}

export default function ReserveModal({ config, onClose }: ReserveModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('North America');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalPrice =
    BASE_PRICE +
    config.wheels.priceDelta +
    config.interior.priceDelta +
    config.powertrain.priceDelta;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }
    setErrorMsg(null);
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              PRODUCTION ALLOCATION
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-0.5">
              {submitted ? 'Allocation Confirmed' : 'Reserve Aurelis X1'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <CheckCircle className="w-14 h-14 text-emerald-400" />

            <div>
              <h4 className="text-xl font-bold text-white font-display">
                Allocation Slot Secured
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Thank you, <span className="text-white font-medium">{fullName}</span>. Your custom
                Aurelis X1 allocation request has been registered in the Aurelis private registry.
              </p>
            </div>

            <div className="w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2 mt-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Reservation Reference</span>
                <span className="font-mono text-white font-semibold">AUR-2026-X1-84920</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Selected Specification</span>
                <span className="text-neutral-200">
                  {config.color.name} · {config.wheels.name} · {config.interior.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Powertrain</span>
                <span className="text-neutral-200">{config.powertrain.name}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2">
                <span className="text-neutral-300 font-medium">Estimated Build Price</span>
                <span className="font-mono text-white font-bold">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 max-w-sm">
              An Aurelis Client Concierge will contact you via {email} within 24 business hours to
              review your bespoke tailoring preferences.
            </p>

            <button
              onClick={onClose}
              className="mt-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          /* Form Entry State */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Quick Build Summary Snippet */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-400 block">Configured Vehicle</span>
                <span className="font-semibold text-white">
                  Aurelis X1 ({config.color.name}, {config.wheels.name})
                </span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block">Est. Total</span>
                <span className="font-mono font-bold text-white">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="E.g. Shivank Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="concierge@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Delivery Region</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                    >
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="Middle East">Middle East</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <span>
                Demonstration allocation: No payment processed. Your contact information is used
                solely to simulate consultation workflow.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer font-medium"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
