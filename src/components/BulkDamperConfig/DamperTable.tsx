import React, { useState, useEffect } from 'react';
import { DamperConfig } from '../../types/damper';
import DamperViewer from '../DamperViewer';
import './DamperTable.css';

interface DamperTableProps {
  dampers: DamperConfig[];
  onDampersChange: (dampers: DamperConfig[]) => void;
}

interface HeaderTooltip {
  title: string;
  description?: string;
  considerations?: string[];
  options?: string[];
  range?: string;
}

const headerTooltips: Record<string, HeaderTooltip> = {
  tag: {
    title: 'Tag/ID',
    description: 'A unique identifier for the damper in your system. This helps track and reference specific units during installation and maintenance.',
    considerations: [
      'Must be unique within your order',
      'Consider using location-based naming (e.g., FLOOR1-AHU2-D1)',
      'Include system references when applicable',
      'Avoid special characters that might cause confusion'
    ]
  },
  width: {
    title: 'Damper Width',
    description: 'The horizontal measurement of the damper frame from side to side.',
    considerations: [
      'Must account for ductwork dimensions',
      'Available in 1/8 inch (0.125") increments',
      'Allow for proper sealing and mounting clearance',
      'Multiple sections may be required for larger openings'
    ],
    options: ['Adjustable in 0.125" increments'],
    range: '6.000 inches to 120.000 inches'
  },
  height: {
    title: 'Damper Height',
    description: 'The vertical measurement of the damper frame from top to bottom.',
    considerations: [
      'Must account for ductwork dimensions',
      'Available in 1/8 inch (0.125") increments',
      'Verify installation clearance',
      'Multiple sections may be required for larger openings'
    ],
    options: ['Adjustable in 0.125" increments'],
    range: '6.000 inches to 120.000 inches'
  },
  depth: {
    title: 'Frame Depth',
    description: 'The total depth of the damper frame from front to back, affecting installation space requirements and mounting options.',
    considerations: [
      'Consider available space in ductwork',
      'Available in 1/8 inch (0.125") increments',
      'Affects actuator mounting options',
      'Consider access for maintenance'
    ],
    options: ['Adjustable in 0.125" increments'],
    range: '4.000 inches to 24.000 inches standard'
  },
  type: {
    title: 'Damper Type',
    description: 'The primary classification of the damper based on its intended function and certification requirements.',
    considerations: [
      'Building code requirements',
      'System requirements',
      'Safety considerations',
      'Performance needs'
    ],
    options: [
      'Control: Standard HVAC applications',
      'Fire: UL 555 rated for fire protection',
      'Smoke: UL 555S rated for smoke control',
      'Industrial: Heavy-duty process control'
    ]
  },
  application: {
    title: 'Application',
    description: 'The specific use case and function of the damper within your system.',
    considerations: [
      'System requirements',
      'Operating conditions',
      'Control precision needs',
      'Maintenance accessibility'
    ],
    options: [
      'HVAC: General air handling and distribution',
      'Volume Control: Precise airflow regulation',
      'Isolation: System separation and shutdown',
      'Balancing: System equilibrium maintenance',
      'Face & Bypass: Temperature control'
    ]
  },
  frameType: {
    title: 'Frame Type',
    description: 'The structural profile of the damper frame, affecting installation method and overall performance.',
    considerations: [
      'Installation requirements',
      'Strength and rigidity needs',
      'Space constraints',
      'Sealing requirements'
    ],
    options: [
      'Hat Channel: Standard profile with excellent rigidity',
      'Flat: Minimal depth for space-constrained installations',
      'Angle: Enhanced rigidity for larger sizes'
    ]
  },
  frameMaterial: {
    title: 'Frame Material',
    description: 'The material used in the construction of the damper frame, selected based on environmental conditions and performance requirements.',
    considerations: [
      'Environmental conditions',
      'Temperature range',
      'Chemical exposure',
      'Cost considerations'
    ],
    options: [
      'Galvanized Steel: Standard indoor use',
      '304 Stainless Steel: Corrosion resistant',
      '316 Stainless Steel: High corrosion resistance',
      'Aluminum: Lightweight, corrosion resistant'
    ]
  },
  flangeConfiguration: {
    title: 'Flange Configuration',
    description: 'The type of mounting flanges on the damper frame, determining how it connects to the ductwork.',
    considerations: [
      'Ductwork connection type',
      'Installation method',
      'Sealing requirements',
      'Accessibility needs'
    ],
    options: [
      'None: Standard frame for slip-in mounting',
      'Single: One-sided flange for specific mounting needs',
      'Double: Both sides flanged for bolted connections'
    ]
  },
  bladeType: {
    title: 'Blade Type',
    description: 'The profile and construction of the damper blades, affecting aerodynamic performance and strength.',
    considerations: [
      'Air velocity requirements',
      'Pressure drop considerations',
      'Noise requirements',
      'Strength needs'
    ],
    options: [
      'Airfoil: Optimal aerodynamics, lowest pressure drop',
      'Triple-V: Good strength-to-performance ratio',
      'Double-Skin: Maximum rigidity for industrial applications'
    ]
  },
  bladeMaterial: {
    title: 'Blade Material',
    description: 'The material used in the construction of the damper blades, selected based on environmental conditions and performance requirements.',
    considerations: [
      'Operating environment',
      'Temperature exposure',
      'Chemical resistance needs',
      'Weight considerations'
    ],
    options: [
      'Galvanized Steel: Standard indoor use',
      '304 Stainless Steel: Corrosion resistant',
      '316 Stainless Steel: High corrosion resistance',
      'Aluminum: Lightweight option'
    ]
  },
  bladeOrientation: {
    title: 'Blade Orientation',
    description: 'The configuration of blade movement and positioning within the frame.',
    considerations: [
      'Airflow pattern requirements',
      'Space constraints',
      'Control characteristics',
      'System requirements'
    ],
    options: [
      'Parallel: All blades rotate in same direction',
      'Opposed: Alternate blades rotate in opposite directions'
    ]
  },
  systemPressure: {
    title: 'System Pressure',
    description: 'The maximum pressure differential the damper is designed to handle.',
    considerations: [
      'System operating pressure',
      'Safety factor requirements',
      'Blade and frame strength',
      'Actuator torque requirements'
    ],
    range: 'Up to 10 inches w.g. (water gauge) standard'
  },
  temperature: {
    title: 'Operating Temperature',
    description: 'The temperature range in which the damper is designed to operate effectively.',
    considerations: [
      'System operating temperature',
      'Material limitations',
      'Seal material compatibility',
      'Safety requirements'
    ],
    range: '-40°F to 250°F standard range'
  },
  airVelocity: {
    title: 'Air Velocity',
    description: 'The maximum air speed the damper is designed to handle effectively.',
    considerations: [
      'System design velocity',
      'Noise requirements',
      'Pressure drop considerations',
      'Blade stability'
    ],
    range: 'Up to 4000 feet per minute (fpm) standard'
  },
  leakageClass: {
    title: 'Leakage Class',
    description: 'The AMCA certified leakage rating of the damper, indicating its sealing effectiveness.',
    considerations: [
      'System requirements',
      'Energy efficiency needs',
      'Cost considerations',
      'Maintenance requirements'
    ],
    options: [
      'Class I: Ultra-low leakage for critical applications',
      'Class II: Low leakage for standard applications',
      'Class III: Standard leakage for basic applications'
    ]
  },
  actuatorType: {
    title: 'Actuator Type',
    description: 'The method of damper operation and control.',
    considerations: [
      'Control system compatibility',
      'Power availability',
      'Torque requirements',
      'Speed of operation needs'
    ],
    options: [
      'Electric: Most common, various voltage options',
      'Pneumatic: For compressed air systems',
      'Manual: Hand quadrant operation'
    ]
  },
  actuatorVoltage: {
    title: 'Actuator Voltage',
    description: 'The required power supply voltage for electric actuators.',
    considerations: [
      'Available power supply',
      'Control system compatibility',
      'Safety requirements',
      'Local electrical codes'
    ],
    options: [
      '24V: Standard low voltage option',
      '120V: Common line voltage option',
      '230V: High voltage option'
    ]
  },
  controlSignal: {
    title: 'Control Signal',
    description: 'The type of control input used to operate the actuator.',
    considerations: [
      'Building automation system compatibility',
      'Control precision requirements',
      'Existing infrastructure',
      'Future upgrade possibilities'
    ],
    options: [
      'On/Off: Simple two-position control',
      'Floating Point: Three-wire control',
      '2-10V: Proportional control',
      '4-20mA: Industrial standard'
    ]
  },
  failPosition: {
    title: 'Fail Position',
    description: 'The position the damper blades will move to upon loss of power or control signal.',
    considerations: [
      'Safety requirements',
      'System design specifications',
      'Emergency protocols',
      'Critical process requirements'
    ],
    options: [
      'Last Position: Remains where it was',
      'Closed: Fails to closed position',
      'Open: Fails to open position'
    ]
  },
  mountingOrientation: {
    title: 'Mounting Orientation',
    description: 'The installed position of the damper relative to the airflow.',
    considerations: [
      'Installation space constraints',
      'Actuator accessibility',
      'Maintenance access',
      'Airflow direction'
    ],
    options: [
      'Vertical: Blades operate vertically',
      'Horizontal: Blades operate horizontally'
    ]
  },
  ductworkConnection: {
    title: 'Ductwork Connection',
    description: 'The method of connecting the damper to the air distribution system.',
    considerations: [
      'Existing ductwork type',
      'Installation requirements',
      'Sealing needs',
      'Maintenance access'
    ],
    options: [
      'Rectangular: Standard duct connection',
      'Round: With round transitions',
      'Flanged: Bolt-on installation',
      'Slip-In: Simple slide-in mounting'
    ]
  },
  installationLocation: {
    title: 'Installation Location',
    description: 'The environmental conditions where the damper will be installed.',
    considerations: [
      'Weather exposure',
      'Temperature extremes',
      'Humidity levels',
      'Corrosive conditions'
    ],
    options: [
      'Indoor: Standard protected environment',
      'Outdoor: Weather-resistant construction required'
    ]
  },
  sealMaterial: {
    title: 'Seal Material',
    description: 'The material used for blade and frame seals to prevent air leakage.',
    considerations: [
      'Temperature requirements',
      'Chemical resistance needs',
      'Leakage requirements',
      'Life cycle expectations'
    ],
    options: [
      'TPE/EPDM: Standard use up to 250°F',
      'Silicone: High temperature applications',
      'Stainless Steel: Extreme conditions'
    ]
  },
  accessories: {
    title: 'Accessories',
    description: 'Additional components and features to enhance damper functionality and monitoring.',
    considerations: [
      'System requirements',
      'Monitoring needs',
      'Safety protocols',
      'Maintenance requirements'
    ],
    options: [
      'Position Indicator: Visual blade position status',
      'Limit Switches: Electronic position feedback',
      'Jackshafting: Multi-section synchronized operation',
      'Manual Override: Emergency manual operation',
      'Weather Cover: Outdoor actuator protection',
      'Extended Shaft: Remote mounting of actuator',
      'Seal Kits: Enhanced leakage performance'
    ]
  }
};

const defaultDamper: DamperConfig = {
  sequence: 0,
  tag: '',
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
};

interface PreviewPopupProps {
  damper: DamperConfig;
  position: { top: number; left: number };
  onClose: () => void;
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ damper, position, onClose }) => {
  const title = damper.tag || `#${damper.sequence}`;
  
  return (
    <div 
      className="preview-popup"
      style={{
        top: position.top,
        left: position.left
      }}
    >
      <div className="preview-header">
        <h3>{title}</h3>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
      <div className="preview-content">
        <DamperViewer
          width={damper.width}
          height={damper.height}
          depth={damper.depth}
          type={damper.type}
          frameType={damper.frameType as 'hat-channel' | 'flat' | 'angle'}
          frameMaterial={damper.frameMaterial}
          bladeMaterial={damper.bladeMaterial}
          bladeOrientation={damper.bladeOrientation}
          linkageType="internal"
          accessories={{
            positionIndicator: damper.accessories.includes('position-indicator'),
            fusibleLink: damper.accessories.includes('fusible-link')
          }}
        />
      </div>
    </div>
  );
};

const DamperTable: React.FC<DamperTableProps> = ({ dampers, onDampersChange }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
  const [selectedDamper, setSelectedDamper] = useState<number | null>(null);

  const addRow = () => {
    const newSequence = dampers.length + 1;
    onDampersChange([
      ...dampers, 
      { 
        ...defaultDamper,
        sequence: newSequence,
        tag: ''
      }
    ]);
  };

  const removeSelectedRows = () => {
    const newDampers = dampers.filter((_, index) => !selectedRows.includes(index));
    onDampersChange(newDampers);
    setSelectedRows([]);
  };

  const duplicateSelectedRows = () => {
    const newDampers = [...dampers];
    selectedRows.forEach(rowIndex => {
      newDampers.push({ ...dampers[rowIndex] });
    });
    onDampersChange(newDampers);
  };

  const handleRowSelect = (index: number) => {
    setSelectedRows(prev => {
      const newSelection = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [index]; // Only allow single selection for preview
      
      // Always update preview position when selecting a row
      const row = document.querySelector(`tr[data-index="${index}"]`);
      if (row) {
        const rect = row.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        setPreviewPosition({
          top: Math.max(rect.top, 10), // Ensure it doesn't go above viewport
          left: Math.min(rect.right + 20, windowWidth - 420) // 400px width + 20px margin
        });
        setSelectedDamper(index);
      }
      
      return newSelection;
    });
  };

  const updateDamper = (index: number, field: keyof DamperConfig, value: any) => {
    const newDampers = [...dampers];
    newDampers[index] = {
      ...newDampers[index],
      [field]: value
    };
    onDampersChange(newDampers);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(dampers.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleTooltipEnter = (event: React.MouseEvent, key: string) => {
    const headerElement = event.currentTarget as HTMLElement;
    const rect = headerElement.getBoundingClientRect();
    const tooltipWidth = 300; // Width of tooltip from CSS
    
    let left = rect.left + (rect.width - tooltipWidth) / 2;
    // Ensure tooltip doesn't go off screen
    left = Math.max(20, Math.min(left, window.innerWidth - tooltipWidth - 20));
    
    setTooltipPosition({
      top: rect.bottom + 8,
      left: left
    });
    setActiveTooltip(key);
  };

  const handleTooltipLeave = () => {
    setActiveTooltip(null);
  };

  const renderHeaderTooltip = (key: string) => {
    const tooltip = headerTooltips[key];
    if (!tooltip) return null;

    const isActive = activeTooltip === key;
    
    return (
      <div 
        className="header-tooltip"
        style={{
          ...tooltipPosition,
          visibility: isActive ? 'visible' : 'hidden',
          opacity: isActive ? 1 : 0
        }}
      >
        <h4>{tooltip.title}</h4>
        <div className="tooltip-section">
          <p>{tooltip.description}</p>
        </div>
        {tooltip.range && (
          <div className="tooltip-section">
            <h5>Range</h5>
            <div className="range-info">{tooltip.range}</div>
          </div>
        )}
        {tooltip.considerations && (
          <div className="tooltip-section">
            <h5>Key Considerations</h5>
            <ul>
              {tooltip.considerations.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {tooltip.options && (
          <div className="tooltip-section">
            <h5>Available Options</h5>
            <ul>
              {tooltip.options.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderHeader = (key: string, label: string, unit?: string) => (
    <div 
      className="header-content"
      onMouseEnter={(e) => handleTooltipEnter(e, key)}
      onMouseLeave={handleTooltipLeave}
    >
      <span>{label}</span>
      {unit && <span className="unit">({unit})</span>}
      {renderHeaderTooltip(key)}
    </div>
  );

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.preview-popup') && !target.closest('tr[data-index]')) {
        setSelectedDamper(null);
        setSelectedRows([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update preview position when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (selectedDamper !== null) {
        const row = document.querySelector(`tr[data-index="${selectedDamper}"]`);
        if (row) {
          const rect = row.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          setPreviewPosition({
            top: Math.max(rect.top, 10),
            left: Math.min(rect.right + 20, windowWidth - 420)
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedDamper]);

  // Update preview position when table is scrolled
  useEffect(() => {
    const tableContainer = document.querySelector('.table-container');
    if (!tableContainer) return;

    const handleScroll = () => {
      if (selectedDamper !== null) {
        const row = document.querySelector(`tr[data-index="${selectedDamper}"]`);
        if (row) {
          const rect = row.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          setPreviewPosition({
            top: Math.max(rect.top, 10),
            left: Math.min(rect.right + 20, windowWidth - 420)
          });
        }
      }
    };

    tableContainer.addEventListener('scroll', handleScroll);
    return () => tableContainer.removeEventListener('scroll', handleScroll);
  }, [selectedDamper]);

  return (
    <div className="damper-table">
      <div className="table-toolbar">
        <button onClick={addRow}>Add Damper</button>
        <button 
          onClick={removeSelectedRows}
          disabled={selectedRows.length === 0}
        >
          Remove Selected
        </button>
        <button 
          onClick={duplicateSelectedRows}
          disabled={selectedRows.length === 0}
        >
          Duplicate Selected
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="select-column">
                <div className="header-content">
                  <span>Select</span>
                  <button 
                    className="select-all-button"
                    onClick={handleSelectAll}
                    title={selectAll ? "Deselect All" : "Select All"}
                  >
                    {selectAll ? "(None)" : "(All)"}
                  </button>
                </div>
              </th>
              <th className="sequence-column">{renderHeader('sequence', '#')}</th>
              <th className="tag-column">{renderHeader('tag', 'Tag/ID')}</th>
              <th className="numeric-column">{renderHeader('width', 'Width', 'in')}</th>
              <th className="numeric-column">{renderHeader('height', 'Height', 'in')}</th>
              <th className="numeric-column">{renderHeader('depth', 'Depth', 'in')}</th>
              <th>{renderHeader('type', 'Type')}</th>
              <th>{renderHeader('application', 'Application')}</th>
              <th>{renderHeader('frameType', 'Frame Type')}</th>
              <th>{renderHeader('frameMaterial', 'Frame Material')}</th>
              <th>{renderHeader('flangeConfiguration', 'Flange Config')}</th>
              <th>{renderHeader('bladeType', 'Blade Type')}</th>
              <th>{renderHeader('bladeMaterial', 'Blade Material')}</th>
              <th>{renderHeader('bladeOrientation', 'Blade Orient.')}</th>
              <th className="numeric-column">{renderHeader('systemPressure', 'Pressure', 'w.g.')}</th>
              <th className="numeric-column">{renderHeader('temperature', 'Temperature', '°F')}</th>
              <th className="numeric-column">{renderHeader('airVelocity', 'Air Velocity', 'fpm')}</th>
              <th>{renderHeader('leakageClass', 'Leakage Class')}</th>
              <th>{renderHeader('actuatorType', 'Actuator Type')}</th>
              <th>{renderHeader('actuatorVoltage', 'Voltage')}</th>
              <th>{renderHeader('controlSignal', 'Control Signal')}</th>
              <th>{renderHeader('failPosition', 'Fail Position')}</th>
              <th>{renderHeader('mountingOrientation', 'Mount Orient.')}</th>
              <th>{renderHeader('ductworkConnection', 'Duct Connect.')}</th>
              <th>{renderHeader('installationLocation', 'Location')}</th>
              <th>{renderHeader('sealMaterial', 'Seal Material')}</th>
              <th className="accessories-column">{renderHeader('accessories', 'Accessories')}</th>
            </tr>
          </thead>
          <tbody>
            {dampers.map((damper, index) => (
              <tr 
                key={index} 
                className={selectedRows.includes(index) ? 'selected' : ''}
                data-index={index}
                onClick={() => handleRowSelect(index)}
              >
                <td className="select-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={(e) => {
                      e.stopPropagation(); // Prevent row click when clicking checkbox
                      handleRowSelect(index);
                    }}
                  />
                </td>
                <td className="sequence-column">
                  {damper.sequence}
                </td>
                <td>
                  <input
                    type="text"
                    value={damper.tag}
                    onChange={(e) => updateDamper(index, 'tag', e.target.value)}
                    placeholder="Enter Tag/ID"
                    className="tag-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={damper.width}
                    onChange={(e) => updateDamper(index, 'width', Number(e.target.value))}
                    min={6}
                    max={120}
                    step={0.125}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={damper.height}
                    onChange={(e) => updateDamper(index, 'height', Number(e.target.value))}
                    min={6}
                    max={120}
                    step={0.125}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={damper.depth}
                    onChange={(e) => updateDamper(index, 'depth', Number(e.target.value))}
                    min={4}
                    max={24}
                    step={0.125}
                  />
                </td>
                <td>
                  <select
                    value={damper.type}
                    onChange={(e) => updateDamper(index, 'type', e.target.value)}
                  >
                    <option value="control">Control</option>
                    <option value="fire">Fire</option>
                    <option value="smoke">Smoke</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.application}
                    onChange={(e) => updateDamper(index, 'application', e.target.value)}
                  >
                    <option value="hvac">HVAC</option>
                    <option value="volume-control">Volume Control</option>
                    <option value="isolation">Isolation</option>
                    <option value="balancing">Balancing</option>
                    <option value="throttling">Throttling</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.frameType}
                    onChange={(e) => updateDamper(index, 'frameType', e.target.value)}
                  >
                    <option value="hat-channel">Hat Channel</option>
                    <option value="flat">Flat</option>
                    <option value="angle">Angle</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.frameMaterial}
                    onChange={(e) => updateDamper(index, 'frameMaterial', e.target.value)}
                  >
                    <option value="galvanized">Galvanized</option>
                    <option value="stainless-304">304 SS</option>
                    <option value="stainless-316">316 SS</option>
                    <option value="aluminum">Aluminum</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.flangeConfiguration}
                    onChange={(e) => updateDamper(index, 'flangeConfiguration', e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.bladeType}
                    onChange={(e) => updateDamper(index, 'bladeType', e.target.value)}
                  >
                    <option value="airfoil">Airfoil</option>
                    <option value="triple-v">Triple-V</option>
                    <option value="double-skin">Double-Skin</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.bladeMaterial}
                    onChange={(e) => updateDamper(index, 'bladeMaterial', e.target.value)}
                  >
                    <option value="galvanized">Galvanized</option>
                    <option value="stainless-304">304 SS</option>
                    <option value="stainless-316">316 SS</option>
                    <option value="aluminum">Aluminum</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.bladeOrientation}
                    onChange={(e) => updateDamper(index, 'bladeOrientation', e.target.value)}
                  >
                    <option value="parallel">Parallel</option>
                    <option value="opposed">Opposed</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={damper.systemPressure}
                    onChange={(e) => updateDamper(index, 'systemPressure', Number(e.target.value))}
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={damper.temperature}
                    onChange={(e) => updateDamper(index, 'temperature', Number(e.target.value))}
                    min={-40}
                    max={250}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={damper.airVelocity}
                    onChange={(e) => updateDamper(index, 'airVelocity', Number(e.target.value))}
                    min={0}
                    max={4000}
                    step={100}
                  />
                </td>
                <td>
                  <select
                    value={damper.leakageClass}
                    onChange={(e) => updateDamper(index, 'leakageClass', e.target.value)}
                  >
                    <option value="I">Class I</option>
                    <option value="II">Class II</option>
                    <option value="III">Class III</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.actuatorType}
                    onChange={(e) => updateDamper(index, 'actuatorType', e.target.value)}
                  >
                    <option value="electric">Electric</option>
                    <option value="pneumatic">Pneumatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.actuatorVoltage}
                    onChange={(e) => updateDamper(index, 'actuatorVoltage', e.target.value)}
                  >
                    <option value="24V">24V</option>
                    <option value="120V">120V</option>
                    <option value="230V">230V</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.controlSignal}
                    onChange={(e) => updateDamper(index, 'controlSignal', e.target.value)}
                  >
                    <option value="on-off">On/Off</option>
                    <option value="floating">Floating</option>
                    <option value="proportional">2-10V</option>
                    <option value="4-20ma">4-20mA</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.failPosition}
                    onChange={(e) => updateDamper(index, 'failPosition', e.target.value)}
                  >
                    <option value="last">Last Position</option>
                    <option value="closed">Closed</option>
                    <option value="open">Open</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.mountingOrientation}
                    onChange={(e) => updateDamper(index, 'mountingOrientation', e.target.value)}
                  >
                    <option value="vertical">Vertical</option>
                    <option value="horizontal">Horizontal</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.ductworkConnection}
                    onChange={(e) => updateDamper(index, 'ductworkConnection', e.target.value)}
                  >
                    <option value="rectangular">Rectangular</option>
                    <option value="round">Round</option>
                    <option value="flanged">Flanged</option>
                    <option value="slip-in">Slip-In</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.installationLocation}
                    onChange={(e) => updateDamper(index, 'installationLocation', e.target.value)}
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </td>
                <td>
                  <select
                    value={damper.sealMaterial}
                    onChange={(e) => updateDamper(index, 'sealMaterial', e.target.value)}
                  >
                    <option value="tpe-epdm">TPE/EPDM</option>
                    <option value="silicone">Silicone</option>
                    <option value="stainless">Stainless</option>
                  </select>
                </td>
                <td>
                  <select
                    multiple
                    value={damper.accessories}
                    onClick={(e) => {
                      const target = e.target as HTMLOptionElement;
                      if (target.tagName === 'OPTION') {
                        const value = target.value;
                        const newAccessories = damper.accessories.includes(value)
                          ? damper.accessories.filter(item => item !== value)
                          : [...damper.accessories, value];
                        updateDamper(index, 'accessories', newAccessories);
                      }
                    }}
                    onChange={() => {}} // Prevent default selection behavior
                  >
                    <option value="position-indicator">Position Indicator</option>
                    <option value="limit-switches">Limit Switches</option>
                    <option value="jackshaft">Jackshafting</option>
                    <option value="manual-override">Manual Override</option>
                    <option value="weather-cover">Weather Cover</option>
                    <option value="extended-shaft">Extended Shaft</option>
                    <option value="seal-kit">Seal Kit</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedDamper !== null && dampers[selectedDamper] && (
        <PreviewPopup
          damper={dampers[selectedDamper]}
          position={previewPosition}
          onClose={() => {
            setSelectedDamper(null);
            setSelectedRows([]);
          }}
        />
      )}
    </div>
  );
};

export default DamperTable; 