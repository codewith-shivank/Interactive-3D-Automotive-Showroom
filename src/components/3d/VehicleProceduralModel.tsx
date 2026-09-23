import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VehicleColor, WheelOption, InteriorOption } from '@/src/types/vehicle';

interface VehicleProceduralModelProps {
  color: VehicleColor;
  wheels: WheelOption;
  interior: InteriorOption;
  isDriving?: boolean;
}

export default function VehicleProceduralModel({
  color,
  wheels,
  interior,
  isDriving = false,
}: VehicleProceduralModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Rotate wheels when driving preview
  useFrame((_, delta) => {
    if (isDriving) {
      wheelsRef.current.forEach((wheel) => {
        if (wheel) {
          wheel.rotation.x += delta * 5;
        }
      });
    }
  });

  // Calculate material colors
  const bodyColor = new THREE.Color(color.hex);
  const interiorColor = new THREE.Color(interior.hex);

  // Wheel configuration
  const wheelScale = wheels.id === 'performance-21' ? 1.05 : wheels.id === 'sport-20' ? 1.0 : 0.96;
  const rimFinishColor =
    wheels.id === 'performance-21'
      ? '#3b322a' // Dark bronze
      : wheels.id === 'sport-20'
      ? '#262626' // Matt titanium
      : '#404040'; // Machined bi-tone

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* ================= BODY SHELL ================= */}
      {/* Main lower fuselage / chassis base */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.88, 0.34, 4.38]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={color.metalness}
          roughness={color.roughness}
          clearcoat={color.clearcoat}
          clearcoatRoughness={0.08}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Tapered Front Hood */}
      <mesh position={[0, 0.54, 1.2]} rotation={[-0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.76, 0.22, 1.8]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={color.metalness}
          roughness={color.roughness}
          clearcoat={color.clearcoat}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Aerodynamic Front Nose Cone */}
      <mesh position={[0, 0.38, 2.16]} castShadow receiveShadow>
        <boxGeometry args={[1.72, 0.22, 0.44]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={color.metalness}
          roughness={color.roughness}
          clearcoat={color.clearcoat}
        />
      </mesh>

      {/* Front Splitter (Carbon Fiber) */}
      <mesh position={[0, 0.22, 2.22]} castShadow>
        <boxGeometry args={[1.84, 0.05, 0.38]} />
        <meshStandardMaterial color="#121214" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Flared Front Fenders / Wheel Arches */}
      <mesh position={[-0.94, 0.48, 1.34]} castShadow receiveShadow>
        <boxGeometry args={[0.16, 0.36, 1.1]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.94, 0.48, 1.34]} castShadow receiveShadow>
        <boxGeometry args={[0.16, 0.36, 1.1]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>

      {/* Flared Rear Haunches / Fenders */}
      <mesh position={[-0.96, 0.52, -1.26]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.42, 1.2]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.96, 0.52, -1.26]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.42, 1.2]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>

      {/* Muscular Rear Deck & Ducktail Lip */}
      <mesh position={[0, 0.62, -1.72]} rotation={[0.06, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.74, 0.24, 0.95]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>

      {/* Integrated Rear Aerodynamic Ducktail Spoiler */}
      <mesh position={[0, 0.74, -2.14]} rotation={[-0.14, 0, 0]} castShadow>
        <boxGeometry args={[1.68, 0.06, 0.24]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>

      {/* Rear Diffuser with Aero Fins */}
      <mesh position={[0, 0.24, -2.1]} castShadow>
        <boxGeometry args={[1.82, 0.14, 0.36]} />
        <meshStandardMaterial color="#111215" roughness={0.5} metalness={0.6} />
      </mesh>
      {[-0.5, -0.2, 0.2, 0.5].map((xOffset, i) => (
        <mesh key={i} position={[xOffset, 0.21, -2.15]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.02, 0.16, 0.32]} />
          <meshStandardMaterial color="#0d0e10" roughness={0.3} />
        </mesh>
      ))}

      {/* Carbon Fiber Side Aero Skirts */}
      <mesh position={[-0.96, 0.24, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 2.5]} />
        <meshStandardMaterial color="#121316" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0.96, 0.24, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 2.5]} />
        <meshStandardMaterial color="#121316" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ================= COCKPIT / GREENHOUSE ================= */}
      {/* Curved Aerodynamic Cabin Roof / Glass Canopy */}
      <mesh position={[0, 0.86, -0.12]} castShadow receiveShadow>
        <boxGeometry args={[1.44, 0.44, 2.05]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.05}
          metalness={0.1}
          transmission={0.85}
          ior={1.52}
          thickness={0.4}
          specularIntensity={1.0}
        />
      </mesh>

      {/* Sloping Windshield Angle */}
      <mesh position={[0, 0.74, 0.72]} rotation={[-0.52, 0, 0]} castShadow>
        <boxGeometry args={[1.42, 0.04, 0.94]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.02}
          metalness={0.1}
          transmission={0.88}
          ior={1.5}
        />
      </mesh>

      {/* Fastback Rear Windshield */}
      <mesh position={[0, 0.73, -0.96]} rotation={[0.48, 0, 0]} castShadow>
        <boxGeometry args={[1.38, 0.04, 0.98]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.02}
          metalness={0.1}
          transmission={0.88}
          ior={1.5}
        />
      </mesh>

      {/* A-Pillars, B-Pillars, C-Pillars (Roof frame) */}
      <mesh position={[0, 1.08, -0.22]} castShadow>
        <boxGeometry args={[1.28, 0.04, 1.3]} />
        <meshPhysicalMaterial color={bodyColor} metalness={color.metalness} roughness={color.roughness} clearcoat={1.0} />
      </mesh>

      {/* ================= INTERIOR (VISIBLE THROUGH GLASS) ================= */}
      <group position={[0, 0.52, -0.05]}>
        {/* Minimalist Curved Dashboard */}
        <mesh position={[0, 0.16, 0.62]}>
          <boxGeometry args={[1.32, 0.18, 0.32]} />
          <meshStandardMaterial color={interiorColor} roughness={0.5} />
        </mesh>
        {/* Curved Floating Micro-OLED Screen */}
        <mesh position={[0, 0.25, 0.54]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.96, 0.12, 0.03]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Driver Yoke Steering Column */}
        <mesh position={[-0.34, 0.2, 0.38]} rotation={[-0.3, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 24]} />
          <meshStandardMaterial color="#1a1a1e" roughness={0.4} />
        </mesh>
        {/* Center Console with Wireless Bridge */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.26, 0.22, 1.1]} />
          <meshStandardMaterial color="#1c1d22" roughness={0.4} />
        </mesh>
        {/* Front Sport Bucket Seats */}
        {[-0.35, 0.35].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0, 0]}>
            {/* Seat bottom cushion */}
            <mesh position={[0, 0.05, 0.08]}>
              <boxGeometry args={[0.42, 0.14, 0.44]} />
              <meshStandardMaterial color={interiorColor} roughness={0.6} />
            </mesh>
            {/* Seat sculpted backrest */}
            <mesh position={[0, 0.28, -0.12]} rotation={[0.16, 0, 0]}>
              <boxGeometry args={[0.4, 0.46, 0.14]} />
              <meshStandardMaterial color={interiorColor} roughness={0.6} />
            </mesh>
            {/* Integrated headrest */}
            <mesh position={[0, 0.54, -0.18]}>
              <boxGeometry args={[0.24, 0.16, 0.12]} />
              <meshStandardMaterial color={interiorColor} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= LIGHTING SYSTEMS ================= */}
      {/* Full-width Signature Aurelis Front Laser Lightbar */}
      <mesh position={[0, 0.44, 2.21]}>
        <boxGeometry args={[1.62, 0.03, 0.04]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e0f2fe"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      {/* Front Accent Headlight Projector Clusters */}
      <mesh position={[-0.72, 0.43, 2.19]}>
        <boxGeometry args={[0.16, 0.06, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#bae6fd" emissiveIntensity={3.0} />
      </mesh>
      <mesh position={[0.72, 0.43, 2.19]}>
        <boxGeometry args={[0.16, 0.06, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#bae6fd" emissiveIntensity={3.0} />
      </mesh>

      {/* Continuous Rear Blade LED Taillight */}
      <mesh position={[0, 0.68, -2.18]}>
        <boxGeometry args={[1.68, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#ff1e38"
          emissive="#ff1e38"
          emissiveIntensity={3.5}
          toneMapped={false}
        />
      </mesh>
      {/* Rear Aurelis Light Wordmark Silhouette */}
      <mesh position={[0, 0.58, -2.19]}>
        <boxGeometry args={[0.32, 0.02, 0.02]} />
        <meshStandardMaterial color="#ff4d5e" emissive="#ff3344" emissiveIntensity={2.0} />
      </mesh>

      {/* Side Mirror Video Pods (Digital Aero Cams) */}
      <mesh position={[-0.96, 0.68, 0.52]} castShadow>
        <boxGeometry args={[0.18, 0.05, 0.12]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.96, 0.68, 0.52]} castShadow>
        <boxGeometry args={[0.18, 0.05, 0.12]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ================= WHEEL ASSEMBLIES ================= */}
      {/* 4 Wheels: Front-Left, Front-Right, Rear-Left, Rear-Right */}
      {[
        { pos: [-0.94, 0.36, 1.4] as [number, number, number], isLeft: true, isFront: true, index: 0 },
        { pos: [0.94, 0.36, 1.4] as [number, number, number], isLeft: false, isFront: true, index: 1 },
        { pos: [-0.96, 0.38, -1.36] as [number, number, number], isLeft: true, isFront: false, index: 2 },
        { pos: [0.96, 0.38, -1.36] as [number, number, number], isLeft: false, isFront: false, index: 3 },
      ].map(({ pos, isLeft, isFront, index }) => (
        <group
          key={index}
          position={pos}
          ref={(el) => {
            if (el) wheelsRef.current[index] = el;
          }}
          scale={[wheelScale, wheelScale, wheelScale]}
        >
          {/* Outer Rubber Performance Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.24, 32]} />
            <meshStandardMaterial color="#121214" roughness={0.85} metalness={0.1} />
          </mesh>

          {/* Wheel Rim Core */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeft ? -0.02 : 0.02, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.23, 24]} />
            <meshStandardMaterial color={rimFinishColor} metalness={0.9} roughness={0.22} />
          </mesh>

          {/* Wheel Spokes / Aero Face Styling */}
          {wheels.id === 'aero-19' ? (
            /* Aero disc cover with machined cooling slots */
            <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeft ? -0.11 : 0.11, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.03, 16]} />
              <meshStandardMaterial color="#2d3036" metalness={0.85} roughness={0.3} />
            </mesh>
          ) : wheels.id === 'sport-20' ? (
            /* Dual 5-spoke lightweight structure */
            <group position={[isLeft ? -0.11 : 0.11, 0, 0]}>
              {[0, 72, 144, 216, 288].map((deg) => (
                <mesh
                  key={deg}
                  rotation={[0, 0, (deg * Math.PI) / 180]}
                >
                  <boxGeometry args={[0.04, 0.44, 0.03]} />
                  <meshStandardMaterial color="#474c55" metalness={0.92} roughness={0.18} />
                </mesh>
              ))}
            </group>
          ) : (
            /* Performance 21" multi-blade forged turbine */
            <group position={[isLeft ? -0.11 : 0.11, 0, 0]}>
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                <mesh
                  key={deg}
                  rotation={[0, 0, (deg * Math.PI) / 180 + 0.1]}
                >
                  <boxGeometry args={[0.025, 0.46, 0.025]} />
                  <meshStandardMaterial color="#846648" metalness={0.95} roughness={0.15} />
                </mesh>
              ))}
            </group>
          )}

          {/* Ventilated Brake Disc Rotor (Visible behind spokes) */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeft ? 0.02 : -0.02, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
            <meshStandardMaterial color="#888c94" metalness={0.95} roughness={0.3} />
          </mesh>

          {/* Aurelis Monobloc Performance Brake Caliper */}
          <mesh
            position={[isLeft ? 0.03 : -0.03, isFront ? 0.14 : 0.12, 0.04]}
            rotation={[0, 0, 0.3]}
          >
            <boxGeometry args={[0.06, 0.14, 0.08]} />
            <meshStandardMaterial
              color={wheels.id === 'performance-21' ? '#ea580c' : '#c026d3'}
              metalness={0.8}
              roughness={0.25}
            />
          </mesh>

          {/* Center Aurelis Hub Cap with Precision Crest */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeft ? -0.13 : 0.13, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
            <meshStandardMaterial color="#17171a" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* ================= STUDIO CONTACT SHADOW PLANE ================= */}
      {/* Soft ground occlusion shadow beneath car */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 4.8]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.65} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 5.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  );
}
