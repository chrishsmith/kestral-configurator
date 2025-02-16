import React, { useState } from 'react';
import { ReactComponent as Logo } from './assets/logo.svg';
import DamperViewer from './components/DamperViewer';
import { ConfigurationForm } from './components/ConfigurationForm';
import { DamperConfig } from './types/damper';
import './App.css';

function App() {
  const [config, setConfig] = useState<DamperConfig>({
    type: 'control',
    application: 'hvac',
    width: 24,
    height: 24,
    depth: 8,
    flangeConfiguration: 'none',
    frameType: 'hat-channel',
    systemPressure: 1.0,
    temperature: 70,
    airVelocity: 1500,
    leakageClass: 'II',
    frameMaterial: 'galvanized',
    bladeMaterial: 'galvanized',
    bladeType: 'airfoil',
    sealMaterial: 'tpe-epdm',
    actuatorType: 'electric',
    actuatorVoltage: '24V',
    controlSignal: 'on-off',
    failPosition: 'closed',
    mountingOrientation: 'vertical',
    ductworkConnection: 'rectangular',
    installationLocation: 'indoor',
    bladeOrientation: 'parallel',
    accessories: []
  });

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <h1>Online Product Assisted Selection</h1>
      </header>
      <main>
        <div className="content-layout">
          <div className="config-panel">
            <ConfigurationForm 
              config={config}
              onConfigChange={setConfig}
            />
          </div>
          <div className="viewer-panel">
            <DamperViewer
              width={config.width}
              height={config.height}
              depth={config.depth}
              type={config.type}
              frameType={config.frameType as 'hat-channel' | 'flat' | 'angle'}
              frameMaterial={config.frameMaterial}
              bladeMaterial={config.bladeMaterial}
              bladeOrientation={config.bladeOrientation}
              linkageType="internal"
              accessories={{
                positionIndicator: config.accessories.includes('position-indicator'),
                fusibleLink: config.accessories.includes('fusible-link')
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 