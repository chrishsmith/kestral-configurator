import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
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
  
  // Calculate number of blades
  const bladeSpacing = 6; // 6" spacing
  const frameOffset = 4; // 2" from each edge
  const bladeCount = Math.max(2, Math.floor((height - frameOffset) / bladeSpacing));
  
  // Calculate blade angle
  const getBladeAngle = (index: number) => {
    const baseAngle = type === 'Backdraft Damper' ? Math.PI / 6 : Math.PI / 4;
    return bladeOrientation === 'opposed' && index % 2 === 1 ? -baseAngle : baseAngle;
  };

  return (
    <group>
      {/* Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color="#E8E8E8"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Blades */}
      {Array.from({ length: bladeCount }).map((_, index) => {
        const yPos = (index * bladeSpacing) - (height / 2) + (bladeSpacing + 2);
        
        return (
          <group 
            key={index}
            position={[0, yPos, 0]}
            rotation={[0, 0, getBladeAngle(index)]}
          >
            {/* Main blade body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width - 1.5, 0.375, depth - 1]} />
              <meshStandardMaterial 
                color="#E8E8E8"
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            
            {/* Leading edge */}
            <mesh 
              castShadow 
              receiveShadow 
              position={[-(width - 1.5)/2, 0, 0]} 
              rotation={[Math.PI/2, 0, 0]}
            >
              <cylinderGeometry args={[0.1875, 0.1875, depth - 1, 16]} />
              <meshStandardMaterial 
                color="#E8E8E8"
                metalness={0.7}
                roughness={0.3}
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
            <meshStandardMaterial color="#666666" metalness={0.8} />
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
      <ambientLight intensity={0.4} />
      <directionalLight
        intensity={0.8}
        position={[20, 20, 20]}
        castShadow
      />
      <pointLight intensity={0.4} position={[-20, 10, -20]} />
      <pointLight intensity={0.3} position={[0, -15, 0]} />
      
      <DamperModel {...props} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={20}
        maxDistance={150}
      />
      
      <gridHelper args={[100, 100]} position={[0, -10, 0]} />
    </Canvas>
  );
}

export default DamperViewer; 