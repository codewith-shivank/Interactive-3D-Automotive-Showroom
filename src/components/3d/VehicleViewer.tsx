import { Suspense, useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {
  RotateCcw,
  Sun,
  Eye,
  Maximize2,
  Minimize2,
  Sparkles,
  AlertCircle,
  Play,
  Pause,
} from 'lucide-react';
import VehicleProceduralModel from './VehicleProceduralModel';
import {
  VehicleColor,
  WheelOption,
  InteriorOption,
  CameraViewPreset,
  LightingPreset,
} from '@/src/types/vehicle';

// Error Boundary for WebGL/Canvas issues
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Canvas Error Boundary Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Camera choreography controller
interface CameraControllerProps {
  preset: CameraViewPreset;
  autoRotate: boolean;
}

function CameraController({ preset }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(4.2, 1.8, 4.6));

  useEffect(() => {
    switch (preset) {
      case 'front-three-quarter':
        targetPos.current.set(4.2, 1.8, 4.4);
        break;
      case 'side':
        targetPos.current.set(5.8, 1.2, 0);
        break;
      case 'rear-three-quarter':
        targetPos.current.set(-4.0, 1.8, -4.2);
        break;
      case 'top':
        targetPos.current.set(0.1, 7.2, 0.1);
        break;
      case 'front':
        targetPos.current.set(0, 1.4, 5.8);
        break;
    }
  }, [preset]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.05);
  });

  return null;
}

// Studio Lighting Rig Component
function StudioLighting({ lightingPreset }: { lightingPreset: LightingPreset }) {
  if (lightingPreset === 'twilight') {
    return (
      <>
        <ambientLight intensity={0.4} color="#1e1b4b" />
        <directionalLight
          position={[6, 3, 5]}
          intensity={1.8}
          color="#f97316"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-6, 4, -5]} intensity={1.2} color="#0284c7" />
        <spotLight position={[0, 7, 0]} intensity={1.5} color="#fed7aa" angle={0.6} penumbra={0.8} />
      </>
    );
  }

  if (lightingPreset === 'pure-daylight') {
    return (
      <>
        <ambientLight intensity={0.8} color="#f8fafc" />
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 4, -4]} intensity={1.0} color="#cbd5e1" />
        <spotLight position={[0, 9, 0]} intensity={1.8} color="#ffffff" angle={0.8} penumbra={0.6} />
      </>
    );
  }

  // Default: Studio Dark (Cinematic & moody)
  return (
    <>
      <ambientLight intensity={0.3} color="#0f172a" />
      {/* Key warm studio spot */}
      <spotLight
        position={[4, 5, 4]}
        intensity={2.4}
        angle={0.65}
        penumbra={0.8}
        color="#fef08a"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Cool fill light */}
      <directionalLight position={[-5, 3, -3]} intensity={1.4} color="#38bdf8" />
      {/* Sharp rim light for silhouette */}
      <directionalLight position={[0, 4, -6]} intensity={2.0} color="#e0f2fe" />
      {/* Overhead showroom LED glow */}
      <rectAreaLight position={[0, 5, 0]} width={4} height={7} intensity={2.5} color="#ffffff" />
    </>
  );
}

// Studio Floor Component
function StudioFloor() {
  return (
    <group position={[0, 0, 0]}>
      {/* Studio Floor Mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#090a0d"
          roughness={0.4}
          metalness={0.6}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Circular Showroom Platform Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <ringGeometry args={[3.4, 3.44, 64]} />
        <meshBasicMaterial color="#26262b" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <ringGeometry args={[4.8, 4.82, 64]} />
        <meshBasicMaterial color="#1c1d22" transparent opacity={0.4} />
      </mesh>

      {/* Realistic contact shadows */}
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.85}
        scale={10}
        blur={1.8}
        far={3.5}
        resolution={512}
        color="#000000"
      />
    </group>
  );
}

export interface VehicleViewerProps {
  color: VehicleColor;
  wheels: WheelOption;
  interior: InteriorOption;
  heightClass?: string;
  showControlsOverlay?: boolean;
  interactive?: boolean;
  initialPreset?: CameraViewPreset;
  onSelectPreset?: (preset: CameraViewPreset) => void;
  className?: string;
  isDriving?: boolean;
}

export default function VehicleViewer({
  color,
  wheels,
  interior,
  heightClass = 'h-[480px] md:h-[620px] lg:h-[700px]',
  showControlsOverlay = true,
  interactive = true,
  initialPreset = 'front-three-quarter',
  className = '',
  isDriving = false,
}: VehicleViewerProps) {
  const [cameraPreset, setCameraPreset] = useState<CameraViewPreset>(initialPreset);
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio-dark');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setAutoRotate(false);
    }
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setAutoRotate(false);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const handleUserOrbit = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  const resetCamera = () => {
    setCameraPreset('front-three-quarter');
  };

  // Fallback 2D view if WebGL is unavailable
  const fallbackUI = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/90 text-neutral-300 p-8 border border-neutral-800">
      <AlertCircle className="w-8 h-8 text-neutral-400 mb-3" />
      <h3 className="text-base font-semibold text-white tracking-wide">3D Viewport Offline</h3>
      <p className="text-xs text-neutral-400 text-center max-w-sm mt-1">
        Hardware graphics acceleration unavailable. You can still customize options and explore
        specifications below.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner"
          style={{ backgroundColor: color.hex }}
        />
        <div className="text-left text-xs">
          <p className="font-medium text-white">{color.name}</p>
          <p className="text-neutral-400">{wheels.name} · {interior.name}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800/80 select-none ${className}`}
    >
      {/* Subtle Studio Radial Atmosphere Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(38,40,50,0.45)_0%,rgba(8,9,10,0.98)_75%)]" />

      {/* 3D WebGL Canvas */}
      <CanvasErrorBoundary fallback={fallbackUI}>
        <Canvas
          shadows
          camera={{ position: [4.2, 1.8, 4.4], fov: 42, near: 0.1, far: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
          onPointerDown={handleUserOrbit}
        >
          <color attach="background" args={['#08090a']} />
          <fog attach="fog" args={['#08090a', 12, 32]} />

          <StudioLighting lightingPreset={lightingPreset} />

          <Suspense fallback={null}>
            <group position={[0, 0, 0]}>
              <VehicleProceduralModel
                color={color}
                wheels={wheels}
                interior={interior}
                isDriving={isDriving}
              />
            </group>
            <StudioFloor />
          </Suspense>

          <CameraController preset={cameraPreset} autoRotate={autoRotate} />

          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3.5}
              maxDistance={9.5}
              minPolarAngle={Math.PI / 4.2}
              maxPolarAngle={Math.PI / 2.05} // Prevent camera clipping below floor
              autoRotate={autoRotate && !prefersReducedMotion}
              autoRotateSpeed={0.8}
              dampingFactor={0.06}
              enableDamping={true}
            />
          )}
        </Canvas>
      </CanvasErrorBoundary>

      {/* Top Left: Active Finish Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-xs">
        <span
          className="w-3.5 h-3.5 rounded-full border border-neutral-700 shadow-sm transition-colors duration-300"
          style={{ backgroundColor: color.hex }}
          aria-hidden="true"
        />
        <span className="text-neutral-300 font-medium">{color.name}</span>
        <span className="text-neutral-600">/</span>
        <span className="text-neutral-400">{wheels.name}</span>
      </div>

      {/* Top Right: Lighting Preset & Fullscreen */}
      {showControlsOverlay && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
          {/* Lighting Mode Selector */}
          <div className="flex items-center bg-neutral-900/80 backdrop-blur-md p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setLightingPreset('studio-dark')}
              title="Studio Dark Lighting"
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                lightingPreset === 'studio-dark'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => setLightingPreset('twilight')}
              title="Twilight Horizon Lighting"
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                lightingPreset === 'twilight'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Twilight
            </button>
            <button
              onClick={() => setLightingPreset('pure-daylight')}
              title="Daylight Lighting"
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                lightingPreset === 'pure-daylight'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Daylight
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 bg-neutral-900/80 backdrop-blur-md rounded-lg border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Bottom Center: Camera View Presets */}
      {showControlsOverlay && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 max-w-[94%] overflow-x-auto p-1 bg-neutral-900/85 backdrop-blur-md rounded-lg border border-neutral-800">
          <button
            onClick={() => setCameraPreset('front-three-quarter')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              cameraPreset === 'front-three-quarter'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3/4 Front
          </button>
          <button
            onClick={() => setCameraPreset('side')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              cameraPreset === 'side'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setCameraPreset('rear-three-quarter')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              cameraPreset === 'rear-three-quarter'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3/4 Rear
          </button>
          <button
            onClick={() => setCameraPreset('top')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              cameraPreset === 'top'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Aero Top
          </button>
          <button
            onClick={() => setCameraPreset('front')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              cameraPreset === 'front'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Fascia
          </button>
        </div>
      )}

      {/* Bottom Right: Orbit Hint & Auto-Rotate Toggle */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Pause Rotation' : 'Resume Auto Rotation'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900/80 backdrop-blur-md rounded-lg border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors"
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5 text-neutral-400" /> : <Play className="w-3.5 h-3.5 text-neutral-400" />}
          <span>{autoRotate ? 'Rotation Active' : 'Orbit Paused'}</span>
        </button>

        <button
          onClick={resetCamera}
          title="Reset Camera View"
          className="p-1.5 bg-neutral-900/80 backdrop-blur-md rounded-lg border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Orbit Interaction Helper Toast (Fades after user touches/drags) */}
      {!hasInteracted && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-xs text-neutral-400 bg-neutral-950/70 backdrop-blur-xs px-3 py-1 rounded-md border border-neutral-800/60 animate-pulse">
          Click and drag to rotate · Scroll to zoom
        </div>
      )}
    </div>
  );
}
