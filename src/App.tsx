/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ScrollStorytelling from './components/ScrollStorytelling';
import ConfiguratorSection from './components/ConfiguratorSection';
import DesignSection from './components/DesignSection';
import PerformanceSection from './components/PerformanceSection';
import TechnologySection from './components/TechnologySection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import CompareModal from './components/CompareModal';
import ReserveModal from './components/ReserveModal';
import TestDriveModal from './components/TestDriveModal';
import {
  VehicleColor,
  WheelOption,
  InteriorOption,
  PowertrainOption,
  VehicleConfiguration,
  EXTERIOR_COLORS,
  WHEEL_OPTIONS,
  INTERIOR_OPTIONS,
  POWERTRAIN_OPTIONS,
} from './types/vehicle';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(EXTERIOR_COLORS[0]);
  const [selectedWheels, setSelectedWheels] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [selectedInterior, setSelectedInterior] = useState<InteriorOption>(INTERIOR_OPTIONS[0]);
  const [selectedPowertrain, setSelectedPowertrain] = useState<PowertrainOption>(POWERTRAIN_OPTIONS[0]);

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  const currentConfig: VehicleConfiguration = {
    color: selectedColor,
    wheels: selectedWheels,
    interior: selectedInterior,
    powertrain: selectedPowertrain,
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-neutral-100 selection:text-neutral-950">
      {/* Top Navigation */}
      <Navigation
        onOpenConfigure={() => scrollToSection('#configure')}
        onOpenTestDrive={() => setIsTestDriveOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          color={selectedColor}
          wheels={selectedWheels}
          interior={selectedInterior}
          onExplore={() => scrollToSection('#design')}
          onConfigure={() => scrollToSection('#configure')}
          onBookTestDrive={() => setIsTestDriveOpen(true)}
        />

        {/* 2. Cinematic Storytelling / Walkthrough */}
        <ScrollStorytelling
          color={selectedColor}
          wheels={selectedWheels}
          interior={selectedInterior}
        />

        {/* 3. Interactive Studio Configurator */}
        <ConfiguratorSection
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          selectedWheels={selectedWheels}
          onSelectWheels={setSelectedWheels}
          selectedInterior={selectedInterior}
          onSelectInterior={setSelectedInterior}
          selectedPowertrain={selectedPowertrain}
          onSelectPowertrain={setSelectedPowertrain}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenReserve={() => setIsReserveOpen(true)}
          onOpenTestDrive={() => setIsTestDriveOpen(true)}
        />

        {/* 4. Exterior Design Philosophy Section */}
        <DesignSection />

        {/* 5. High-Impact Performance Section */}
        <PerformanceSection />

        {/* 6. Technology Architecture Section */}
        <TechnologySection />

        {/* 7. Curated Visual Archive / Gallery */}
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Compare Modal */}
      {isCompareOpen && (
        <CompareModal
          currentConfig={currentConfig}
          onClose={() => setIsCompareOpen(false)}
          onSelectConfig={(partial) => {
            if (partial.color) setSelectedColor(partial.color);
            if (partial.wheels) setSelectedWheels(partial.wheels);
            if (partial.interior) setSelectedInterior(partial.interior);
            if (partial.powertrain) setSelectedPowertrain(partial.powertrain);
          }}
        />
      )}

      {/* Reserve Consultation Modal */}
      {isReserveOpen && (
        <ReserveModal
          config={currentConfig}
          onClose={() => setIsReserveOpen(false)}
        />
      )}

      {/* Book a Test Drive Modal */}
      {isTestDriveOpen && (
        <TestDriveModal
          config={currentConfig}
          onClose={() => setIsTestDriveOpen(false)}
        />
      )}
    </div>
  );
}
