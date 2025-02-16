export interface DamperConfig {
  // Basic Information
  type: string;
  application: string;
  
  // Dimensions
  width: number;
  height: number;
  depth: number;
  flangeConfiguration: 'none' | 'single' | 'double';
  frameType: string;

  // Performance
  systemPressure: number;
  temperature: number;
  airVelocity: number;
  leakageClass: 'I' | 'II' | 'III';

  // Construction
  frameMaterial: string;
  bladeMaterial: 'galvanized' | 'stainless' | 'aluminum';
  bladeType: string;
  sealMaterial: 'tpe-epdm' | 'silicone' | 'stainless';
  
  // Actuator Configuration
  actuatorType: string;
  actuatorVoltage?: '24V' | '120V' | '230V';
  controlSignal: 'on-off' | 'floating' | 'proportional';
  failPosition: 'open' | 'closed' | 'last';

  // Installation
  mountingOrientation: 'vertical' | 'horizontal';
  ductworkConnection: 'rectangular' | 'round' | 'flanged' | 'slip-in';
  installationLocation: 'indoor' | 'outdoor';
  bladeOrientation: 'parallel' | 'opposed';
  specialEnvironment?: 'high-temp' | 'corrosive' | 'clean-room' | 'explosion-proof' | '';

  // Accessories
  accessories: string[];
} 