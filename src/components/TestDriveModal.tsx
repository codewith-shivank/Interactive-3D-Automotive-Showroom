import { useState } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  Car,
  ChevronRight,
  Shield,
  Download,
  User,
  Mail,
  Phone,
  Compass,
  Sparkles,
} from 'lucide-react';
import { VehicleConfiguration } from '@/src/types/vehicle';

interface TestDriveModalProps {
  config: VehicleConfiguration;
  onClose: () => void;
}

interface LocationOption {
  id: string;
  name: string;
  city: string;
  address: string;
  type: string;
}

const LOCATIONS: LocationOption[] = [
  {
    id: 'nyc',
    name: 'Aurelis Pavilion Manhattan',
    city: 'New York, NY',
    address: '520 West 28th St, High Line District',
    type: 'Flagship Showroom & Urban Track',
  },
  {
    id: 'la',
    name: 'Aurelis Atelier Beverly Hills',
    city: 'Los Angeles, CA',
    address: '9400 Wilshire Blvd, Beverly Hills',
    type: 'Private Studio & Canyon Route',
  },
  {
    id: 'bay-area',
    name: 'Aurelis Innovation Hub',
    city: 'Palo Alto, CA',
    address: '3200 Hanover St, Stanford Research Park',
    type: 'Autonomous Pilot Proving Loop',
  },
  {
    id: 'london',
    name: 'Aurelis Design Studio Mayfair',
    city: 'London, UK',
    address: '14 Berkeley Square, Mayfair',
    type: 'Urban Sanctuary & Country Route',
  },
  {
    id: 'germany',
    name: 'Aurelis Proving Grounds',
    city: 'Stuttgart, Germany',
    address: 'Aurelis Circuit Way 1, Weissach',
    type: 'High-Speed Banked Circuit',
  },
];

interface TimeSlot {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  status: 'available' | 'few' | 'popular';
}

const TIME_SLOTS: TimeSlot[] = [
  { id: 't1', time: '09:30 AM', period: 'Morning', status: 'available' },
  { id: 't2', time: '11:00 AM', period: 'Morning', status: 'few' },
  { id: 't3', time: '01:30 PM', period: 'Afternoon', status: 'available' },
  { id: 't4', time: '03:00 PM', period: 'Afternoon', status: 'popular' },
  { id: 't5', time: '04:30 PM', period: 'Afternoon', status: 'few' },
  { id: 't6', time: '06:00 PM', period: 'Evening', status: 'available' },
];

export default function TestDriveModal({ config, onClose }: TestDriveModalProps) {
  // Generate selectable dates for next 10 days
  const today = new Date();
  const availableDates = Array.from({ length: 10 }).map((_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() + index + 1);
    return {
      dateObj: d,
      isoDate: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const [selectedLocation, setSelectedLocation] = useState<LocationOption>(LOCATIONS[0]);
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].isoDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[1].id);
  const [experienceType, setExperienceType] = useState<'track' | 'highway' | 'concierge'>('track');

  // Contact info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseAgreed, setLicenseAgreed] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Submission status
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const activeSlotObj = TIME_SLOTS.find((s) => s.id === selectedTimeSlot) || TIME_SLOTS[0];
  const activeDateObj = availableDates.find((d) => d.isoDate === selectedDate) || availableDates[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setValidationError('Please complete your name, email, and contact phone number.');
      return;
    }
    if (!licenseAgreed) {
      setValidationError('Please verify that you hold a valid unrestricted driver’s license (min. 21 years of age).');
      return;
    }

    setValidationError(null);
    const randomCode = `AUR-DRIVE-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomCode);
    setConfirmed(true);
  };

  // Generate downloadable iCalendar (.ics) file
  const downloadCalendarInvite = () => {
    const startIso = `${selectedDate.replace(/-/g, '')}T${activeSlotObj.time.replace(/[:\s]/g, '')}00`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aurelis Motors//Test Drive Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Aurelis X1 Test Drive Appointment - ${selectedLocation.name}`,
      `DESCRIPTION:Private appointment with configured Aurelis X1 (${config.color.name}, ${config.wheels.name}, ${config.powertrain.name}). Reference: ${bookingRef}`,
      `LOCATION:${selectedLocation.name}, ${selectedLocation.address}, ${selectedLocation.city}`,
      `DTSTART:${startIso}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aurelis-test-drive-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              EXPERIENCE APPOINTMENT
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-0.5">
              {confirmed ? 'Test Drive Scheduled' : 'Book a Test Drive'}
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

        {confirmed ? (
          /* Confirmation Screen */
          <div className="flex flex-col items-center text-center py-4 gap-5">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 drop-shadow-md" />

            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                CONFIRMATION {bookingRef}
              </span>
              <h4 className="text-2xl font-bold text-white font-display">
                You're Scheduled to Drive the Aurelis X1
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                A personal appointment has been reserved for <span className="text-white font-medium">{fullName}</span>.
                Your configured vehicle will be pre-conditioned and fully charged upon arrival.
              </p>
            </div>

            {/* Appointment Details Card */}
            <div className="w-full p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-neutral-700 shadow-sm"
                    style={{ backgroundColor: config.color.hex }}
                  />
                  <span className="font-semibold text-white">
                    Aurelis X1 · {config.color.name}
                  </span>
                </div>
                <span className="text-neutral-400 font-mono">{config.powertrain.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <CalendarIcon className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Date & Time</span>
                    <span className="font-medium text-white">
                      {activeDateObj.dayName}, {activeDateObj.monthName} {activeDateObj.dayNumber}, 2026 at {activeSlotObj.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Experience Location</span>
                    <span className="font-medium text-white">{selectedLocation.name}</span>
                    <span className="text-neutral-400 block text-[11px]">{selectedLocation.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Experience Program: <strong className="text-white capitalize">{experienceType} Evaluation</strong></span>
                <span>Assigned Host: Marcus Vance (Lead Pro Specialist)</span>
              </div>
            </div>

            {/* Arrival Notice */}
            <p className="text-[11px] text-neutral-400 max-w-md leading-relaxed">
              Please arrive 15 minutes prior to your slot. Bring your valid physical driver’s license.
              Private showroom valet parking and complimentary barista service will be ready for you.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <button
                onClick={downloadCalendarInvite}
                className="flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={() => setConfirmed(false)}
                className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Modify Booking
              </button>
              <button
                onClick={onClose}
                className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Entry Steps */
          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
            {/* 1. Vehicle Being Tested Context Strip */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                  style={{ backgroundColor: config.color.hex }}
                />
                <div>
                  <span className="text-neutral-400 block text-[11px]">Selected Test Vehicle</span>
                  <span className="font-semibold text-white">
                    Aurelis X1 · {config.color.name} ({config.wheels.name})
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[11px]">Powertrain</span>
                <span className="font-mono text-white font-medium">
                  {config.powertrain.powerKw} kW ({config.powertrain.zeroToHundred}s 0-100)
                </span>
              </div>
            </div>

            {/* 2. Experience Type Toggle */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                1. Select Driving Experience
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'track',
                    label: 'Track Dynamics',
                    desc: 'Closed-course launch control & handling',
                  },
                  {
                    id: 'highway',
                    label: 'Highway Pilot',
                    desc: 'Autonomous assist & acoustic cruising',
                  },
                  {
                    id: 'concierge',
                    label: 'VIP Concierge',
                    desc: 'Bespoke test drive at your residence',
                  },
                ].map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setExperienceType(exp.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      experienceType === exp.id
                        ? 'bg-neutral-800 border-white/80 shadow-md ring-1 ring-white/20'
                        : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-semibold text-white block">{exp.label}</span>
                    <span className="text-[11px] text-neutral-400 block mt-1 leading-snug">
                      {exp.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Experience Center Location */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                2. Experience Center Location
              </label>
              <div className="relative">
                <select
                  value={selectedLocation.id}
                  onChange={(e) => {
                    const loc = LOCATIONS.find((l) => l.id === e.target.value);
                    if (loc) setSelectedLocation(loc);
                  }}
                  className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-neutral-500 cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} — {loc.city} ({loc.type})
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[11px] text-neutral-400">
                Facility address: {selectedLocation.address}, {selectedLocation.city}
              </p>
            </div>

            {/* 4. Interactive Date Selector */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                  3. Select Appointment Date
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {activeDateObj.dayName}, {activeDateObj.monthName} {activeDateObj.dayNumber}
                </span>
              </div>

              {/* Horizontal Scrollable Date Picker */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.isoDate;
                  return (
                    <button
                      key={item.isoDate}
                      type="button"
                      onClick={() => setSelectedDate(item.isoDate)}
                      className={`flex flex-col items-center justify-center min-w-[62px] py-2.5 px-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-white text-neutral-950 border-white shadow-md font-semibold'
                          : 'bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <span className={`text-[10px] uppercase tracking-wider ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        {item.dayName}
                      </span>
                      <span className="text-base font-mono font-bold mt-0.5">
                        {item.dayNumber}
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        {item.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Time Slot Grid */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                4. Select Time Window
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.id)}
                      className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-white/80 text-white font-semibold shadow-xs ring-1 ring-white/20'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-mono block">{slot.time}</span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">
                        {slot.status === 'popular' ? 'Popular' : slot.status === 'few' ? '2 slots' : 'Open'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Driver Information */}
            <div className="flex flex-col gap-3 pt-2 border-t border-neutral-800">
              <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                5. Driver Credentials
              </span>

              {validationError && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-xs text-red-200">
                  {validationError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Full Legal Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Shivank Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="driver@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>
              </div>

              {/* License Checkbox */}
              <label className="flex items-start gap-2.5 mt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={licenseAgreed}
                  onChange={(e) => setLicenseAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-700 bg-neutral-950 text-white focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-neutral-300">
                  I certify that I am at least 21 years of age and hold an active, valid, unrestricted driver's license.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                Confirm Test Drive
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
