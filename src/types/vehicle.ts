export interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  description: string;
}

export interface WheelOption {
  id: string;
  name: string;
  sizeInch: number;
  finish: string;
  priceDelta: number;
  rangeDeltaKm: number;
  description: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  material: string;
  priceDelta: number;
  description: string;
}

export interface PowertrainOption {
  id: string;
  name: string;
  powerKw: number;
  horsepower: number;
  zeroToHundred: number;
  topSpeedKmH: number;
  rangeKm: number;
  priceDelta: number;
  drivetrain: string;
}

export interface VehicleConfiguration {
  color: VehicleColor;
  wheels: WheelOption;
  interior: InteriorOption;
  powertrain: PowertrainOption;
}

export type CameraViewPreset = 'front-three-quarter' | 'side' | 'rear-three-quarter' | 'top' | 'front';
export type LightingPreset = 'studio-dark' | 'twilight' | 'pure-daylight';

export const EXTERIOR_COLORS: VehicleColor[] = [
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    hex: '#0d0e10',
    roughness: 0.15,
    metalness: 0.92,
    clearcoat: 1.0,
    description: 'Deep mirror-reflective mineral black with ultra-fine crystalline flake.',
  },
  {
    id: 'glacier-white',
    name: 'Glacier White',
    hex: '#e2e5e9',
    roughness: 0.22,
    metalness: 0.82,
    clearcoat: 0.95,
    description: 'Multi-layer pearl white with cool titanium undertones.',
  },
  {
    id: 'titanium-silver',
    name: 'Titanium Silver',
    hex: '#6b7280',
    roughness: 0.18,
    metalness: 0.95,
    clearcoat: 1.0,
    description: 'Liquid metallic silver highlighting sculpted aerodynamic surfaces.',
  },
  {
    id: 'deep-burgundy',
    name: 'Deep Burgundy',
    hex: '#4a0e17',
    roughness: 0.25,
    metalness: 0.88,
    clearcoat: 1.0,
    description: 'Rich dark garnet with intense crimson depth under direct light.',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    hex: '#0e2b1d',
    roughness: 0.24,
    metalness: 0.85,
    clearcoat: 1.0,
    description: 'Understated British racing metallic heritage green with emerald sparkle.',
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    hex: '#0b1d3a',
    roughness: 0.18,
    metalness: 0.92,
    clearcoat: 1.0,
    description: 'Dark celestial navy metallic evoking deep stratospheric flight.',
  },
];

export const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'aero-19',
    name: 'Aero 19"',
    sizeInch: 19,
    finish: 'Bi-tone Machined Graphite',
    priceDelta: 0,
    rangeDeltaKm: 0,
    description: 'Engineered aerodynamic discs delivering maximum range efficiency and reduced turbulence.',
  },
  {
    id: 'sport-20',
    name: 'Sport 20"',
    sizeInch: 20,
    finish: 'Forged Titanium Matt',
    priceDelta: 2400,
    rangeDeltaKm: -15,
    description: 'Lightweight forged dual 5-spoke design with high-performance summer compound.',
  },
  {
    id: 'performance-21',
    name: 'Performance 21"',
    sizeInch: 21,
    finish: 'Diamond Cut Dark Bronze',
    priceDelta: 4200,
    rangeDeltaKm: -30,
    description: 'Aggressive ultra-light turbine forged wheels paired with staggered track-focused rubber.',
  },
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    hex: '#141416',
    secondaryHex: '#222328',
    material: 'Micro-perforated bio-leather with matte carbon fiber',
    priceDelta: 0,
    description: 'Monochromatic black technical cabin with precision dark anodized aluminum accents.',
  },
  {
    id: 'ivory',
    name: 'Ivory',
    hex: '#dedad2',
    secondaryHex: '#8b8a87',
    material: 'Full-grain sustainable semi-aniline leather',
    priceDelta: 1800,
    description: 'Airy, architectural light aesthetic complemented by bleached ash wood veneer.',
  },
  {
    id: 'cognac',
    name: 'Cognac',
    hex: '#783d19',
    secondaryHex: '#2b1b11',
    material: 'Hand-burnished heritage saddle leather',
    priceDelta: 2200,
    description: 'Warm grand-touring character enriched with open-pore smoked walnut trim.',
  },
];

export const POWERTRAIN_OPTIONS: PowertrainOption[] = [
  {
    id: 'dual-motor-awd',
    name: 'Dual Motor Performance AWD',
    powerKw: 480,
    horsepower: 650,
    zeroToHundred: 3.8,
    topSpeedKmH: 250,
    rangeKm: 610,
    priceDelta: 0,
    drivetrain: 'All-Wheel Drive (Dual Permanent Magnet Synchronous)',
  },
  {
    id: 'apex-tri-motor',
    name: 'Apex Tri-Motor Track Edition',
    powerKw: 620,
    horsepower: 840,
    zeroToHundred: 2.6,
    topSpeedKmH: 290,
    rangeKm: 565,
    priceDelta: 18500,
    drivetrain: 'Vectoring All-Wheel Drive (1 Front, 2 Rear Axial-Flux Motors)',
  },
];

export const BASE_PRICE = 89500;
