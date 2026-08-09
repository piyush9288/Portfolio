import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// React Atom Component (Frontend)
const ReactAtom = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group position={position} scale={scale} ref={groupRef}>
      {/* Center nucleus */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Electron orbits */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (Math.PI / 3) * i]}>
          <torusGeometry args={[0.8, 0.03, 16, 100]} />
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Floating electrons */}
      {[0, 1, 2].map((i) => (
        <group key={`electron-${i}`} rotation={[Math.PI / 2, 0, (Math.PI / 3) * i]}>
          <mesh position={[0.8, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Database Component (Storage)
const DatabaseNode = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle vertical pulsing
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.rotation.y -= 0.01;
    }
  });

  return (
    <group position={position} scale={scale} ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, (i - 1) * 0.4, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.35, 32]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#059669" 
            emissiveIntensity={0.4} 
            roughness={0.2} 
            metalness={0.8} 
            transparent 
            opacity={0.85} 
          />
          {/* Glowing rim */}
          <mesh position={[0, 0.18, 0]}>
             <torusGeometry args={[0.6, 0.02, 16, 64]} />
             <meshBasicMaterial color="#34d399" />
          </mesh>
        </mesh>
      ))}
    </group>
  );
};

// Server Component (Backend)
const ServerNode = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 + (Math.PI / 4);
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={position} scale={scale} ref={groupRef}>
      {/* Main Server Chassis */}
      <mesh>
        <boxGeometry args={[1, 1.4, 1]} />
        <meshStandardMaterial color="#312e81" emissive="#1e1b4b" emissiveIntensity={0.5} roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </mesh>
      {/* Inner Glowing Core */}
      <mesh>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.8} />
      </mesh>
      {/* Server Racks/Lines */}
      {[-0.4, 0, 0.4].map((y) => (
        <mesh key={y} position={[0, y, 0.51]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color="#a5b4fc" />
        </mesh>
      ))}
    </group>
  );
};

// Abstract Network/API Connections
const NetworkRing = () => {
  const groupRef = useRef<THREE.Group>(null);
  const dataPackets = useRef<THREE.Group[]>([]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    
    // Animate data packets orbiting
    dataPackets.current.forEach((packet, i) => {
      if (packet) {
        const speed = i % 2 === 0 ? 1 : -1.5;
        const radius = i % 2 === 0 ? 3.5 : 2.5;
        const offset = i * (Math.PI / 2);
        
        packet.position.x = Math.cos(time * speed + offset) * radius;
        packet.position.z = Math.sin(time * speed + offset) * radius;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Outer Orbit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.48, 3.52, 64]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner Orbit */}
      <mesh rotation={[Math.PI / 2.1, 0, 0]}>
        <ringGeometry args={[2.48, 2.52, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting Data Packets */}
      {[0, 1, 2, 3].map((i) => (
        <group key={`packet-${i}`} ref={(el) => { if (el) dataPackets.current[i] = el; }}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#61dafb" : "#34d399"} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Background ambient data particles
const DataParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 1500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [particlesCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
};

export const Scene = () => {
  const mainGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;

  useFrame((state) => {
    if (mainGroupRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle overall float
      mainGroupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
      
      // Mouse Parallax for interactivity
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 8;
      
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(mainGroupRef.current.rotation.x, mouseY, 0.05);
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, mouseX, 0.05);
    }
  });

  return (
    <>
      <DataParticles />
      
      <group ref={mainGroupRef} position={[isMobile ? 0 : 3.5, 0, 0]} scale={isMobile ? 0.55 : 1}>
        <NetworkRing />
        
        {/* Tech Stack Layout */}
        {/* Frontend - Top Center */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
          <ReactAtom position={[0, 1.6, 0]} scale={1.1} />
        </Float>
        
        {/* Backend - Bottom Left */}
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <ServerNode position={[-1.8, -0.8, 1]} scale={1} />
        </Float>
        
        {/* Database - Bottom Right */}
        <Float speed={2.2} rotationIntensity={0.2} floatIntensity={1}>
          <DatabaseNode position={[1.8, -0.6, -0.5]} scale={1.1} />
        </Float>
        
        {/* Connecting Beams (Abstract Representation of Data Flow) */}
        <mesh position={[-0.9, 0.4, 0.5]} rotation={[0, 0, -0.8]}>
          <cylinderGeometry args={[0.01, 0.01, 2.5]} />
          <meshBasicMaterial color="#a5b4fc" transparent opacity={0.3} />
        </mesh>
        
        <mesh position={[0.9, 0.5, -0.25]} rotation={[0.2, 0, 0.7]}>
          <cylinderGeometry args={[0.01, 0.01, 2.8]} />
          <meshBasicMaterial color="#61dafb" transparent opacity={0.3} />
        </mesh>
        
        <mesh position={[0, -0.7, 0.25]} rotation={[1.57, 1.2, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 3.8]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Lighting setup to enhance materials */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#06b6d4" />
      <directionalLight position={[-5, -10, -5]} intensity={1} color="#8b5cf6" />
      
      {/* Inner core light connecting the stack */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffffff" distance={6} />
    </>
  );
};
