import React, { useState } from 'react';
import { DamperConfig } from '../types/damper';
import './ConfigurationForm.css';

interface ConfigurationFormProps {
  config: DamperConfig;
  onConfigChange: (newConfig: DamperConfig) => void;
}

interface FieldOption {
  value: string;
  label: string;
  description?: string;
  additionalFields?: string[];
}

interface FieldDescription {
  title: string;
  description: string;
  considerations?: string[];
  applications?: string[];
  options?: FieldOption[];
  inputType?: 'text' | 'number';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  calculated?: boolean;
}

const fieldDescriptions: Record<string, FieldDescription> = {
  type: {
    title: "Damper Type",
    description: "Select the primary type of damper needed for your application.",
    considerations: [
      "Control dampers are used for modulating airflow",
      "Fire/Smoke dampers are required for fire-rated barriers",
      "Industrial dampers are built for harsh environments",
      "Backdraft dampers prevent reverse airflow"
    ],
    options: [
      { value: "control", label: "Control Damper", description: "For precise airflow modulation" },
      { value: "fire-smoke", label: "Fire/Smoke Damper", description: "For fire-rated barriers" },
      { value: "industrial", label: "Industrial Damper", description: "For harsh environments" },
      { value: "backdraft", label: "Backdraft Damper", description: "For reverse airflow prevention" }
    ]
  },
  application: {
    title: "Application",
    description: "Specify the intended use for your damper.",
    options: [
      { 
        value: "volume-control", 
        label: "Volume Control",
        description: "Used to regulate airflow volume in HVAC systems, allowing precise adjustment of air distribution."
      },
      { 
        value: "isolation", 
        label: "Isolation",
        description: "Provides complete shutoff of air flow when needed, often used in system maintenance or emergency situations."
      },
      { 
        value: "balancing", 
        label: "Balancing",
        description: "Used to balance air flow between different branches of a duct system, ensuring proper distribution."
      },
      { 
        value: "throttling", 
        label: "Throttling",
        description: "Controls air flow rate by creating a variable pressure drop, often used in process control applications."
      },
      { 
        value: "face-bypass", 
        label: "Face & Bypass",
        description: "Allows air to either pass through or bypass a heat exchanger, providing temperature control without affecting flow rate."
      }
    ]
  },
  dimensions: {
    title: "Basic Dimensions",
    description: "Specify the nominal duct opening dimensions for your damper.",
    considerations: [
      "Width & Height range: 6\" to 120\"",
      "Depth based on model selection",
      "Multiple sections may be required for larger sizes"
    ]
  },
  flangeConfiguration: {
    title: "Flange Configuration",
    description: "Select the flange type for mounting.",
    considerations: [
      "Standard flangeless design suitable for slip-in installation",
      "Single flange provides mounting surface on one side",
      "Double flange offers maximum mounting stability"
    ],
    options: [
      { 
        value: "none", 
        label: "No Flange",
        description: "Standard design for slip-in installation into existing ductwork"
      },
      { 
        value: "single", 
        label: "Single Flange",
        description: "One-sided mounting flange for face-mounting to ductwork or wall openings"
      },
      { 
        value: "double", 
        label: "Double Flange",
        description: "Two-sided mounting flanges for maximum stability and easier installation"
      }
    ]
  },
  frameType: {
    title: "Frame Type",
    description: "Select the frame construction type.",
    options: [
      { 
        value: "hat-channel", 
        label: "Hat Channel",
        description: "Provides maximum rigidity and strength. Ideal for large dampers and high-pressure applications."
      },
      { 
        value: "flat", 
        label: "Flat",
        description: "Space-saving design, suitable for retrofit applications where space is limited."
      },
      { 
        value: "angle", 
        label: "Angle",
        description: "Versatile mounting options, good for both flange and slip-in installations."
      }
    ]
  },
  frameMaterial: {
    title: "Frame Material",
    description: "Select the frame material based on your environment.",
    options: [
      { 
        value: "galvanized", 
        label: "Galvanized Steel (standard)",
        description: "Cost-effective, suitable for most indoor HVAC applications. Good corrosion resistance."
      },
      { 
        value: "stainless-304", 
        label: "304 Stainless Steel",
        description: "Excellent corrosion resistance, ideal for humid or mildly corrosive environments."
      },
      { 
        value: "stainless-316", 
        label: "316 Stainless Steel",
        description: "Superior corrosion resistance, best for coastal or chemical environments."
      },
      { 
        value: "aluminum", 
        label: "Aluminum",
        description: "Lightweight, naturally corrosion resistant, ideal for marine or weight-sensitive applications."
      }
    ]
  },
  bladeMaterial: {
    title: "Blade Material",
    description: "Select the blade material based on application requirements.",
    options: [
      { 
        value: "galvanized", 
        label: "Galvanized Steel",
        description: "Standard choice, good balance of strength and cost. Suitable for most applications."
      },
      { 
        value: "aluminum", 
        label: "Aluminum",
        description: "Lightweight, corrosion resistant. Good for marine environments and lower pressure applications."
      },
      { 
        value: "stainless", 
        label: "Stainless Steel",
        description: "Maximum durability and corrosion resistance. Ideal for harsh environments."
      }
    ]
  },
  bladeType: {
    title: "Blade Type",
    description: "Select the blade configuration for optimal performance.",
    options: [
      { 
        value: "airfoil", 
        label: "Airfoil",
        description: "Lowest pressure drop, highest efficiency. Ideal for high-velocity systems."
      },
      { 
        value: "triple-v", 
        label: "Triple-V",
        description: "Good performance at lower cost. Suitable for standard applications."
      },
      { 
        value: "double-skin", 
        label: "Double-Skin",
        description: "Enhanced rigidity and strength. Good for high-pressure systems."
      }
    ]
  },
  sealMaterial: {
    title: "Seal Material",
    description: "Select the seal material based on temperature and application.",
    options: [
      { 
        value: "tpe-epdm", 
        label: "TPE/EPDM",
        description: "Standard seal material, good for temperatures up to 250°F. Excellent durability."
      },
      { 
        value: "silicone", 
        label: "Silicone",
        description: "High temperature applications up to 400°F. Good chemical resistance."
      },
      { 
        value: "stainless", 
        label: "Stainless Steel",
        description: "Maximum temperature resistance up to 600°F. Metal-to-metal sealing."
      }
    ]
  },
  actuatorType: {
    title: "Actuator Type",
    description: "Select the primary actuation method.",
    options: [
      { 
        value: "electric", 
        label: "Electric",
        description: "Most common type. Precise control with various voltage and signal options.",
        additionalFields: ["actuatorVoltage", "controlSignal", "failPosition", "springReturn", "actuatorBrand"]
      },
      { 
        value: "pneumatic", 
        label: "Pneumatic (80-120 PSI)",
        description: "Air-powered operation. Suitable for hazardous areas.",
        additionalFields: ["failPosition", "springReturn"]
      },
      { 
        value: "manual", 
        label: "Manual Quadrant",
        description: "Simple hand operation. Cost-effective for infrequent adjustment.",
        additionalFields: []
      }
    ]
  },
  actuatorBrand: {
    title: "Actuator Brand",
    description: "Select preferred actuator manufacturer.",
    options: [
      { value: "belimo", label: "Belimo" },
      { value: "honeywell", label: "Honeywell" },
      { value: "johnson", label: "Johnson Controls" },
      { value: "siemens", label: "Siemens" }
    ]
  },
  springReturn: {
    title: "Spring Return",
    description: "Select if spring return is required.",
    considerations: [
      "Spring return provides fail-safe operation during power loss",
      "Non-spring return maintains last position, suitable for non-critical applications",
      "Consider higher torque requirements with spring return",
      "Spring return increases actuator cost and size"
    ],
    options: [
      { 
        value: "yes", 
        label: "Yes - Fail-Safe Operation",
        description: "Automatically returns to safe position during power loss, essential for critical applications"
      },
      { 
        value: "no", 
        label: "No - Remain in Place",
        description: "Maintains last position during power loss, suitable for standard applications with manual override"
      }
    ]
  },
  torqueCalculated: {
    title: "Required Torque",
    description: "Calculated based on damper size and application",
    calculated: true,
    unit: "in-lbs"
  },
  systemPressure: {
    title: "System Pressure",
    description: "Specify the system pressure in inches water gauge (w.g.)",
    considerations: [
      "Maximum pressure: 10\" w.g.",
      "Enter the maximum expected system pressure",
      "Consider safety factor in selection"
    ],
    inputType: "number",
    min: 0,
    max: 10,
    step: 0.1,
    unit: "in. w.g."
  },
  temperature: {
    title: "Temperature Range",
    description: "Select the operating temperature range required.",
    options: [
      { value: "standard", label: "Standard (-40°F to 250°F)", description: "Suitable for most HVAC applications" },
      { value: "medium", label: "Medium (up to 400°F)", description: "For higher temperature applications" },
      { value: "high", label: "High (up to 600°F)", description: "For industrial high-temperature use" }
    ]
  },
  airVelocity: {
    title: "Air Velocity",
    description: "Enter the design air velocity in feet per minute (fpm)",
    considerations: [
      "Maximum velocity: 4000 fpm",
      "Higher velocities may require special construction",
      "Consider noise criteria in selection"
    ],
    inputType: "number",
    min: 0,
    max: 4000,
    step: 50,
    unit: "fpm"
  },
  leakageClass: {
    title: "Leakage Class",
    description: "Select the required leakage class per AMCA Standard 511.",
    options: [
      { 
        value: "I", 
        label: "Class I", 
        description: "Maximum leakage: 4 CFM/sq.ft at 1\" w.g. Suitable for high-performance applications."
      },
      { 
        value: "II", 
        label: "Class II", 
        description: "Maximum leakage: 10 CFM/sq.ft at 1\" w.g. Standard for most commercial applications."
      },
      { 
        value: "III", 
        label: "Class III", 
        description: "Maximum leakage: 40 CFM/sq.ft at 1\" w.g. Basic level for general use."
      }
    ]
  },
  actuatorVoltage: {
    title: "Actuator Voltage",
    description: "Select the required voltage for the actuator.",
    considerations: [
      "24V is most common for building automation systems",
      "120V and 230V options available for direct line voltage",
      "Consider available power supply at installation location",
      "Verify compatibility with control system"
    ],
    options: [
      { 
        value: "24V", 
        label: "24V",
        description: "Standard low voltage option, commonly used with building automation systems"
      },
      { 
        value: "120V", 
        label: "120V",
        description: "Line voltage option for direct power connection in North America"
      },
      { 
        value: "230V", 
        label: "230V",
        description: "Line voltage option for international installations"
      }
    ]
  },
  controlSignal: {
    title: "Control Signal",
    description: "Select the control signal type for the actuator.",
    considerations: [
      "On/Off is simplest but provides basic control",
      "Floating point offers incremental positioning",
      "Proportional control provides precise modulation",
      "Verify compatibility with building automation system"
    ],
    options: [
      { 
        value: "on-off", 
        label: "On/Off",
        description: "Basic two-position control for simple open/close operations"
      },
      { 
        value: "floating", 
        label: "Floating Point",
        description: "Three-wire control for incremental positioning"
      },
      { 
        value: "proportional", 
        label: "Proportional (2-10V, 4-20mA)",
        description: "Precise modulation control with feedback capability"
      }
    ]
  },
  failPosition: {
    title: "Fail Position",
    description: "Select the damper position on power failure.",
    considerations: [
      "Fail-open may be required for ventilation",
      "Fail-closed often used for isolation",
      "Last position can maintain system balance",
      "Consider safety requirements and building codes"
    ],
    options: [
      { 
        value: "open", 
        label: "Open",
        description: "Damper moves to fully open position on power failure, ensuring continued airflow"
      },
      { 
        value: "closed", 
        label: "Closed",
        description: "Damper moves to fully closed position on power failure, providing isolation"
      },
      { 
        value: "last", 
        label: "Last Position",
        description: "Damper remains in its last position on power failure, maintaining system balance"
      }
    ]
  },
  mountingOrientation: {
    title: "Mounting Orientation",
    description: "Select the mounting orientation for optimal performance.",
    considerations: [
      "Vertical mounting is standard for most installations",
      "Horizontal mounting may require additional support",
      "Consider access requirements for maintenance",
      "Actuator position may affect orientation choice"
    ],
    options: [
      { 
        value: "vertical", 
        label: "Vertical",
        description: "Blades oriented vertically, standard for most installations with vertical airflow"
      },
      { 
        value: "horizontal", 
        label: "Horizontal",
        description: "Blades oriented horizontally, used in horizontal duct runs with specific space requirements"
      }
    ]
  },
  ductworkConnection: {
    title: "Ductwork Connection",
    description: "Select the ductwork connection type.",
    considerations: [
      "Rectangular connections are standard for most HVAC applications",
      "Round transitions require additional space for proper installation",
      "Flanged connections provide better air leakage control",
      "Slip-in design allows for easier installation in retrofit applications"
    ],
    options: [
      { 
        value: "rectangular", 
        label: "Rectangular",
        description: "Standard rectangular connection for typical HVAC installations"
      },
      { 
        value: "round", 
        label: "Round Transitions",
        description: "Includes round-to-rectangular transitions for connecting to round ductwork"
      },
      { 
        value: "flanged", 
        label: "Flanged",
        description: "Includes mounting flanges for bolt-on installation and better sealing"
      },
      { 
        value: "slip-in", 
        label: "Slip-In",
        description: "Designed for insertion into existing ductwork, ideal for retrofits"
      }
    ]
  },
  installationLocation: {
    title: "Installation Location",
    description: "Select the installation environment.",
    considerations: [
      "Indoor installations have standard environmental requirements",
      "Outdoor installations need weather protection",
      "Consider temperature extremes and humidity levels",
      "Special coatings may be required for harsh environments"
    ],
    options: [
      { 
        value: "indoor", 
        label: "Indoor",
        description: "Standard indoor HVAC installation with controlled environment"
      },
      { 
        value: "outdoor", 
        label: "Outdoor (with weather cover)",
        description: "Includes weather protection for outdoor installation, with additional sealing and corrosion resistance"
      }
    ]
  },
  accessories: {
    title: "Accessories",
    description: "Select additional features for your damper.",
    considerations: [
      "Position indicators provide visual feedback of blade position",
      "Limit switches enable integration with building automation",
      "Jackshafting allows synchronized operation of multiple dampers",
      "Manual override ensures operation during power loss",
      "Weather covers protect actuators in outdoor installations"
    ],
    options: [
      { 
        value: "position-indicator", 
        label: "Position Indication",
        description: "Visual indicator showing damper blade position (open/closed/partial)"
      },
      { 
        value: "limit-switches", 
        label: "Limit Switches",
        description: "Electrical switches that signal fully open/closed positions to control systems"
      },
      { 
        value: "jackshafting", 
        label: "Jackshafting",
        description: "Mechanical linkage system for operating multiple dampers simultaneously"
      },
      { 
        value: "manual-override", 
        label: "Manual Override",
        description: "Allows manual operation of damper when power is unavailable"
      },
      { 
        value: "weather-cover", 
        label: "Weather Cover",
        description: "Protective housing for outdoor installations to shield actuator and linkage"
      },
      { 
        value: "transitions", 
        label: "Transitions",
        description: "Custom inlet/outlet transitions for connecting to different duct sizes/shapes"
      },
      { 
        value: "flange-kits", 
        label: "Flange Kits",
        description: "Field-installable flanges for mounting flexibility"
      },
      { 
        value: "seal-kits", 
        label: "Seal Kits",
        description: "Additional sealing materials for enhanced leakage performance"
      },
      { 
        value: "extended-shaft", 
        label: "Extended Shaft",
        description: "Longer actuator shaft for special mounting requirements"
      },
      { 
        value: "protective-coating", 
        label: "Protective Coatings",
        description: "Special coatings for corrosion resistance in harsh environments"
      }
    ]
  }
};

export function ConfigurationForm({ config, onConfigChange }: ConfigurationFormProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (field: keyof DamperConfig, value: any) => {
    if (field === 'accessories') {
      // Handle accessories as an array of selected values
      const currentAccessories = config.accessories || [];
      const updatedAccessories = currentAccessories.includes(value)
        ? currentAccessories.filter(item => item !== value)
        : [...currentAccessories, value];
      
      onConfigChange({
        ...config,
        accessories: updatedAccessories
      });
    } else {
      onConfigChange({
        ...config,
        [field]: value
      });
    }
  };

  const renderTooltip = (field: string) => {
    const desc = fieldDescriptions[field];
    if (!desc || field !== activeTooltip) return null;

    return (
      <div className="tooltip" ref={(el) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const windowWidth = window.innerWidth;
          
          // Check if tooltip would extend beyond bottom of window
          const shouldShowAbove = rect.bottom > windowHeight;
          el.classList.toggle('tooltip-above', shouldShowAbove);
          
          // Check if tooltip would extend beyond right of window
          const shouldShowLeft = rect.right > windowWidth;
          el.classList.toggle('tooltip-left', shouldShowLeft);
        }
      }}>
        <h4>{desc.title}</h4>
        <p>{desc.description}</p>
        {desc.considerations && desc.considerations.length > 0 && (
          <>
            <h5>Key Considerations</h5>
            <ul>
              {desc.considerations.map((item, index) => (
                <li key={`consideration-${index}`}>{item}</li>
              ))}
            </ul>
          </>
        )}
        {desc.options && desc.options.length > 0 && (
          <>
            <h5>Available Options</h5>
            <ul>
              {desc.options.map((option, index) => (
                <li key={`option-${index}`}>
                  <strong>{option.label}</strong>
                  {option.description && <div>{option.description}</div>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  const renderField = (field: string, fieldDesc: FieldDescription) => {
    if (field === 'dimensions') {
      return (
        <div className="dimensions-section">
          <div className="dimension-field">
            <div className="dimension-label">
              Nominal Width (W)
              <div className="dimension-hint">Horizontal duct dimension</div>
            </div>
            <div className="dimension-input">
              <input
                type="number"
                min="6"
                max="120"
                step="0.125"
                value={config.width}
                onChange={(e) => handleChange('width', Number(e.target.value))}
              />
              <span className="dimension-unit">inches</span>
            </div>
          </div>
          <div className="dimension-field">
            <div className="dimension-label">
              Nominal Height (H)
              <div className="dimension-hint">Vertical duct dimension</div>
            </div>
            <div className="dimension-input">
              <input
                type="number"
                min="6"
                max="120"
                step="0.125"
                value={config.height}
                onChange={(e) => handleChange('height', Number(e.target.value))}
              />
              <span className="dimension-unit">inches</span>
            </div>
          </div>
          <div className="dimension-field">
            <div className="dimension-label">
              Frame Depth (D)
              <div className="dimension-hint">Along airflow direction</div>
            </div>
            <div className="dimension-input">
              <input
                type="number"
                min="4"
                max="24"
                step="0.125"
                value={config.depth}
                onChange={(e) => handleChange('depth', Number(e.target.value))}
              />
              <span className="dimension-unit">inches</span>
            </div>
          </div>
        </div>
      );
    }

    if (field === 'accessories') {
      return (
        <div className="accessories-grid">
          {fieldDesc.options?.map(option => (
            <div 
              key={option.value} 
              className={`checkbox-label ${config.accessories?.includes(option.value) ? 'selected' : ''}`}
              onClick={() => handleChange('accessories', option.value)}
            >
              <span>{option.label}</span>
              {option.description && (
                <div 
                  className="option-description"
                  ref={(el) => {
                    if (el) {
                      const rect = el.getBoundingClientRect();
                      const windowHeight = window.innerHeight;
                      const shouldShowAbove = rect.bottom > windowHeight;
                      el.classList.toggle('tooltip-above', shouldShowAbove);
                    }
                  }}
                >
                  {option.description}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (fieldDesc.inputType === 'number') {
      return (
        <div className="numeric-input">
          <input
            type="number"
            min={fieldDesc.min}
            max={fieldDesc.max}
            step={fieldDesc.step}
            value={config[field as keyof DamperConfig] || ''}
            onChange={(e) => handleChange(field as keyof DamperConfig, Number(e.target.value))}
          />
          {fieldDesc.unit && <span className="input-unit">{fieldDesc.unit}</span>}
        </div>
      );
    }

    // Handle dynamic actuator fields
    if (field === 'actuatorType') {
      const selectedType = config.actuatorType;
      const selectedOption = fieldDesc.options?.find(opt => opt.value === selectedType);
      
      return (
        <div className="actuator-section">
          <select
            value={selectedType || ''}
            onChange={(e) => handleChange('actuatorType', e.target.value)}
          >
            <option value="">Select {fieldDesc.title}</option>
            {fieldDesc.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedOption?.description && (
            <div className="option-description">{selectedOption.description}</div>
          )}
        </div>
      );
    }

    return (
      <div className="select-field">
        <select
          value={config[field as keyof DamperConfig] || ''}
          onChange={(e) => handleChange(field as keyof DamperConfig, e.target.value)}
        >
          <option value="">Select {fieldDesc.title}</option>
          {fieldDesc.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {config[field as keyof DamperConfig] && fieldDesc.options?.find(
          opt => opt.value === config[field as keyof DamperConfig]
        )?.description && (
          <div className="option-description">
            {fieldDesc.options.find(
              opt => opt.value === config[field as keyof DamperConfig]
            )?.description}
          </div>
        )}
      </div>
    );
  };

  const renderStep = (stepNumber: number, title: string, fields: string[]) => {
    if (currentStep !== stepNumber) return null;

    return (
      <section className="form-section">
        <h3>
          <span className="step-indicator">Step {stepNumber}:</span>
          {title}
        </h3>
        <div className="form-grid">
          {fields.map(field => {
            const fieldDesc = fieldDescriptions[field];
            return (
              <div className="form-field" key={field}>
                <label
                  onMouseEnter={() => setActiveTooltip(field)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {fieldDesc.title}
                  {renderField(field, fieldDesc)}
                  {renderTooltip(field)}
                </label>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="configuration-form">
      <div className="form-header">
        <h2>Online Product Assisted Selection</h2>
        <p className="subtitle">Complete each step to customize your damper specifications</p>
      </div>

      <div className="form-sections">
        {renderStep(1, "Basic Requirements", ['type', 'application'])}
        {renderStep(2, "Dimensions & Basic Construction", ['dimensions', 'frameType', 'frameMaterial'])}
        {renderStep(3, "Performance Requirements", ['systemPressure', 'temperature', 'airVelocity', 'leakageClass'])}
        {renderStep(4, "Blade Configuration", ['bladeMaterial', 'bladeType', 'sealMaterial'])}
        {renderStep(5, "Actuator Configuration", ['actuatorType', 'actuatorBrand', 'actuatorVoltage', 'controlSignal', 'springReturn', 'failPosition'])}
        {renderStep(6, "Mounting & Installation", ['mountingOrientation', 'ductworkConnection', 'installationLocation', 'flangeConfiguration'])}
        {renderStep(7, "Accessories", ['accessories'])}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button onClick={() => setCurrentStep(currentStep - 1)}>
              Previous Step
            </button>
          )}
          {currentStep < 7 && (
            <button onClick={() => setCurrentStep(currentStep + 1)}>
              Next Step
            </button>
          )}
          {currentStep === 7 && (
            <button className="submit-button">
              Review Configuration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfigurationForm; 