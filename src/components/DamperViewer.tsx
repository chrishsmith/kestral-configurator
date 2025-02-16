import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface DamperViewerProps {
  width: number;
  height: number;
  depth: number;
  type: string;
  frameType: 'hat-channel' | 'flat' | 'angle';
  frameMaterial: string;
  bladeMaterial: string;
  bladeOrientation: 'parallel' | 'opposed';
  linkageType: 'external' | 'internal' | 'none';
  accessories?: {
    positionIndicator?: boolean;
    fusibleLink?: boolean;
  };
}

function createBladeShape() {
  const shape = new THREE.Shape();
  
  // Starting from the top left of the blade profile
  shape.moveTo(-3, 0.75);  // Top edge start
  shape.lineTo(3, 0.75);   // Top edge
  
  // Right side profile
  shape.lineTo(3, 0.5);    // Upper right corner
  shape.lineTo(2.5, 0.25); // Right upper taper
  shape.lineTo(2.5, -0.25);// Right middle straight
  shape.lineTo(3, -0.5);   // Right lower taper
  shape.lineTo(3, -0.75);  // Bottom right corner
  
  // Bottom edge
  shape.lineTo(-3, -0.75); // Bottom edge
  
  // Left side profile (mirror of right side)
  shape.lineTo(-3, -0.5);  // Left lower corner
  shape.lineTo(-2.5, -0.25);// Left lower taper
  shape.lineTo(-2.5, 0.25);// Left middle straight
  shape.lineTo(-3, 0.5);   // Left upper taper
  shape.lineTo(-3, 0.75);  // Back to start

  return shape;
}

function DamperModel({ 
  width = 24, 
  height = 24, 
  depth = 8,
  type = 'Control Damper',
  frameType = 'hat-channel',
  frameMaterial = 'aluminum',
  bladeMaterial = 'aluminum',
  bladeOrientation = 'parallel',
  linkageType = 'internal',
  accessories = {}
}: DamperViewerProps) {
  
  // Calculate number of blades based on 6" spacing
  const bladeSpacing = 6; // 6" spacing between blades
  const frameThickness = 2; // 2" frame thickness
  const availableHeight = height - (frameThickness * 2);
  const bladeCount = Math.max(1, Math.floor(availableHeight / bladeSpacing));
  
  // Create blade shape
  const bladeShape = createBladeShape();
  const extrudeSettings = {
    steps: 1,
    depth: width - (frameThickness * 2), // Blade spans between frame
    bevelEnabled: false,
  };

  return (
    <group position={[0, height/2, 0]}>
      {/* Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color="#BBBBBB"
          metalness={0.4}
          roughness={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Blades */}
      {Array.from({ length: bladeCount }).map((_, index) => {
        const yPos = (index * bladeSpacing) - (height / 2) + frameThickness + (bladeSpacing / 2);
        const angle = type === 'Backdraft Damper' ? Math.PI / 6 : Math.PI / 4;
        const rotation = bladeOrientation === 'opposed' && index % 2 === 1 ? -angle : angle;
        
        return (
          <group 
            key={index}
            position={[0, yPos, -depth/2 + frameThickness]}
            rotation={[Math.PI/2, 0, rotation]}
          >
            <mesh castShadow receiveShadow>
              <extrudeGeometry 
                args={[bladeShape, extrudeSettings]} 
              />
              <meshStandardMaterial 
                color="#999999"
                metalness={0.5}
                roughness={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Linkage */}
      {linkageType === 'external' && (
        <group position={[width/2 + 0.5, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, height - 2, 0.5]} />
            <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function DamperViewer(props: DamperViewerProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [50, 30, 50], fov: 35 }}
      style={{ background: '#f0f0f0' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight
        intensity={1.2}
        position={[20, 20, 20]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight intensity={0.6} position={[-20, 10, -20]} />
      <pointLight intensity={0.5} position={[0, -15, 0]} />
      
      <DamperModel {...props} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={20}
        maxDistance={150}
      />
      
      <gridHelper args={[100, 20]} position={[0, 0, 0]} />
    </Canvas>
  );
}

export default DamperViewer; 