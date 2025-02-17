import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="home-content">
        <div className="hero-section">
          <h1>Kestral Systems Damper Configuration</h1>
          <p className="subtitle">
            Design and configure custom dampers with our interactive tools
          </p>
        </div>

        <div className="configuration-options">
          <div className="option-card">
            <div className="card-content">
              <div className="card-header">
                <h2>Single Damper Configuration</h2>
              </div>
              <p>Configure individual dampers with precision using our interactive 3D viewer. Perfect for detailed, custom specifications.</p>
              <ul className="feature-list">
                <li>Real-time 3D visualization</li>
                <li>Step-by-step guided configuration</li>
                <li>Detailed technical specifications</li>
                <li>Instant performance calculations</li>
              </ul>
              <Link to="/configure" className="cta-button">
                Configure Single Damper
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="option-card">
            <div className="card-content">
              <div className="card-header">
                <h2>Bulk Order Configuration</h2>
              </div>
              <p>Efficiently configure multiple dampers using our spreadsheet interface. Ideal for large projects and batch orders.</p>
              <ul className="feature-list">
                <li>Spreadsheet-style interface</li>
                <li>Batch edit capabilities</li>
                <li>Import/Export functionality</li>
                <li>Quick duplicate and modify</li>
              </ul>
              <Link to="/bulk-order" className="cta-button">
                Start Bulk Order
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>Why Choose Kestral?</h3>
            <ul>
              <li>Industry-leading quality and precision</li>
              <li>Comprehensive technical support</li>
              <li>Custom solutions for any application</li>
              <li>Fast turnaround times</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Need Help?</h3>
            <p>Our technical team is here to assist you with your damper configuration needs.</p>
            <div className="contact-options">
              <Link to="/support" className="support-link">Visit Support Center</Link>
              <Link to="/contact" className="contact-link">Contact Sales Team</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 