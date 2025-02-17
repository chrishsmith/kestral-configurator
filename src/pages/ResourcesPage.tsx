import React from 'react';
import Header from '../components/Navigation/Header';
import './ResourcesPage.css';

const ResourcesPage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="resources-content">
        <section className="hero-section">
          <h1>Resources</h1>
          <p className="subtitle">
            Access technical documentation, specifications, and educational materials
          </p>
        </section>

        <section className="technical-docs">
          <h2>Technical Documentation</h2>
          <div className="docs-grid">
            <div className="doc-card">
              <h3>Product Specifications</h3>
              <ul>
                <li>
                  <a href="/docs/control-dampers">Control Damper Specifications</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/fire-smoke-dampers">Fire & Smoke Damper Guide</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/industrial-dampers">Industrial Damper Manual</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/backdraft-dampers">Backdraft Damper Details</a>
                  <span className="file-type">PDF</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Installation Guides</h3>
              <ul>
                <li>
                  <a href="/docs/installation/general">General Installation Guide</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/installation/actuator">Actuator Mounting Instructions</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/installation/linkage">Linkage Assembly Guide</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/installation/maintenance">Maintenance Schedule</a>
                  <span className="file-type">PDF</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Performance Data</h3>
              <ul>
                <li>
                  <a href="/docs/performance/pressure-drop">Pressure Drop Charts</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/performance/leakage">Leakage Classifications</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/performance/velocity">Air Velocity Limits</a>
                  <span className="file-type">PDF</span>
                </li>
                <li>
                  <a href="/docs/performance/sound">Sound Data</a>
                  <span className="file-type">PDF</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cad-drawings">
          <h2>CAD Resources</h2>
          <div className="cad-grid">
            <div className="doc-card">
              <h3>2D CAD Drawings</h3>
              <ul>
                <li>
                  <a href="/cad/control-dampers-2d">Control Damper Details</a>
                  <span className="file-type">DWG</span>
                </li>
                <li>
                  <a href="/cad/mounting-2d">Mounting Details</a>
                  <span className="file-type">DWG</span>
                </li>
                <li>
                  <a href="/cad/actuator-2d">Actuator Configurations</a>
                  <span className="file-type">DWG</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>3D Models</h3>
              <ul>
                <li>
                  <a href="/cad/control-dampers-3d">Control Damper Models</a>
                  <span className="file-type">STEP</span>
                </li>
                <li>
                  <a href="/cad/actuator-3d">Actuator Assemblies</a>
                  <span className="file-type">STEP</span>
                </li>
                <li>
                  <a href="/cad/accessories-3d">Accessories & Components</a>
                  <span className="file-type">STEP</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Revit Content</h3>
              <ul>
                <li>
                  <a href="/cad/revit-families">Damper Families</a>
                  <span className="file-type">RFA</span>
                </li>
                <li>
                  <a href="/cad/revit-templates">Project Templates</a>
                  <span className="file-type">RVT</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="educational">
          <h2>Educational Resources</h2>
          <div className="education-grid">
            <div className="doc-card">
              <h3>Video Library</h3>
              <ul>
                <li>
                  <a href="/education/installation-videos">Installation Tutorials</a>
                  <span className="resource-type">Video Series</span>
                </li>
                <li>
                  <a href="/education/maintenance-videos">Maintenance Procedures</a>
                  <span className="resource-type">Video Series</span>
                </li>
                <li>
                  <a href="/education/troubleshooting">Troubleshooting Guide</a>
                  <span className="resource-type">Video Series</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Technical Articles</h3>
              <ul>
                <li>
                  <a href="/education/damper-selection">Damper Selection Guide</a>
                  <span className="resource-type">Article</span>
                </li>
                <li>
                  <a href="/education/energy-efficiency">Energy Efficiency Best Practices</a>
                  <span className="resource-type">Article</span>
                </li>
                <li>
                  <a href="/education/code-compliance">Code Compliance Overview</a>
                  <span className="resource-type">Article</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Webinars</h3>
              <ul>
                <li>
                  <a href="/education/webinars/product">Product Training Series</a>
                  <span className="resource-type">Webinar</span>
                </li>
                <li>
                  <a href="/education/webinars/applications">Application Engineering</a>
                  <span className="resource-type">Webinar</span>
                </li>
                <li>
                  <a href="/education/webinars/certification">Certification Programs</a>
                  <span className="resource-type">Webinar</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="tools-software">
          <h2>Tools & Software</h2>
          <div className="tools-grid">
            <div className="doc-card">
              <h3>Selection Software</h3>
              <ul>
                <li>
                  <a href="/tools/sizing">Damper Sizing Calculator</a>
                  <span className="tool-type">Web App</span>
                </li>
                <li>
                  <a href="/tools/pressure-drop">Pressure Drop Calculator</a>
                  <span className="tool-type">Web App</span>
                </li>
                <li>
                  <a href="/tools/energy-savings">Energy Savings Calculator</a>
                  <span className="tool-type">Web App</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Mobile Apps</h3>
              <ul>
                <li>
                  <a href="/tools/field-guide">Field Installation Guide</a>
                  <span className="tool-type">iOS/Android</span>
                </li>
                <li>
                  <a href="/tools/qr-specs">QR Code Specification Reader</a>
                  <span className="tool-type">iOS/Android</span>
                </li>
              </ul>
            </div>
            <div className="doc-card">
              <h3>Integration Tools</h3>
              <ul>
                <li>
                  <a href="/tools/api-docs">API Documentation</a>
                  <span className="tool-type">REST API</span>
                </li>
                <li>
                  <a href="/tools/bim">BIM Integration Guide</a>
                  <span className="tool-type">PDF</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resources-cta">
          <h2>Need Additional Resources?</h2>
          <p>
            Can't find what you're looking for? Our technical team is here to help you
            find the right documentation and resources for your project.
          </p>
          <a href="mailto:support@kestralsystems.com" className="cta-button">
            Request Resources
          </a>
        </section>
      </main>
    </div>
  );
};

export default ResourcesPage; 