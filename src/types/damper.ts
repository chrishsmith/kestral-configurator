export interface DamperConfig {
  // Basic Information
  sequence: number;
  tag: string;
  type: 'control' | 'fire' | 'smoke' | 'industrial';
  application: 'hvac' | 'volume-control' | 'isolation' | 'balancing' | 'throttling';
  
  // Dimensions
  width: number;
  height: number;
  depth: number;
  flangeConfiguration: 'none' | 'single' | 'double';
  frameType: 'hat-channel' | 'flat' | 'angle';

  // Performance
  systemPressure: number;
  temperature: number;
  airVelocity: number;
  leakageClass: 'I' | 'II' | 'III';

  // Construction
  frameMaterial: 'galvanized' | 'stainless-304' | 'stainless-316' | 'aluminum';
  bladeMaterial: 'galvanized' | 'stainless-304' | 'stainless-316' | 'aluminum';
  bladeType: 'airfoil' | 'triple-v' | 'double-skin';
  sealMaterial: 'tpe-epdm' | 'silicone' | 'stainless';
  
  // Actuator Configuration
  actuatorType: 'electric' | 'pneumatic' | 'manual';
  actuatorVoltage: '24V' | '120V' | '230V';
  controlSignal: 'on-off' | 'floating' | 'proportional' | '4-20ma';
  failPosition: 'last' | 'closed' | 'open';

  // Installation
  mountingOrientation: 'vertical' | 'horizontal';
  ductworkConnection: 'rectangular' | 'round' | 'flanged' | 'slip-in';
  installationLocation: 'indoor' | 'outdoor';
  bladeOrientation: 'parallel' | 'opposed';
  specialEnvironment?: 'high-temp' | 'corrosive' | 'clean-room' | 'explosion-proof' | '';

  // Accessories
  accessories: string[];
} 