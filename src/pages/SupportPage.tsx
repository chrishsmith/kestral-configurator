import React from 'react';
import Header from '../components/Navigation/Header';
import './SupportPage.css';

const SupportPage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="support-content">
        <section className="hero-section">
          <h1>Technical Support</h1>
          <p className="subtitle">
            We're here to help you with your HVAC damper configuration needs
          </p>
        </section>

        <section className="contact-options">
          <div className="contact-card primary">
            <h2>Contact Support</h2>
            <p>Our technical support team is available Monday through Friday, 8:00 AM - 5:00 PM MST</p>
            <div className="contact-details">
              <div className="contact-item">
                <h3>Email</h3>
                <a href="mailto:support@kestralsystems.com">support@kestralsystems.com</a>
              </div>
              <div className="contact-item">
                <h3>Phone</h3>
                <a href="tel:+18005551234">1-800-555-1234</a>
              </div>
              <div className="contact-item">
                <h3>Response Time</h3>
                <p>Within 24 business hours</p>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h3>Product Selection</h3>
              <ul>
                <li>
                  <h4>How do I select the right damper for my application?</h4>
                  <p>Use our Online Product Assisted Selection (OPAS) tool to configure the perfect damper based on your specific requirements.</p>
                </li>
                <li>
                  <h4>What information do I need for ordering?</h4>
                  <p>Basic dimensions, application type, and system specifications. Our configuration tool will guide you through all required parameters.</p>
                </li>
              </ul>
            </div>
            <div className="faq-card">
              <h3>Technical Specifications</h3>
              <ul>
                <li>
                  <h4>What are your standard size ranges?</h4>
                  <p>Our dampers are available in sizes from 6" to 120" in both width and height, with custom sizes available upon request.</p>
                </li>
                <li>
                  <h4>What actuator types do you support?</h4>
                  <p>We support electric (24V, 120V, 230V), pneumatic, and manual actuators from major manufacturers.</p>
                </li>
              </ul>
            </div>
            <div className="faq-card">
              <h3>Ordering & Delivery</h3>
              <ul>
                <li>
                  <h4>What is your standard delivery time?</h4>
                  <p>Standard delivery is less than 2 weeks from order confirmation for most configurations.</p>
                </li>
                <li>
                  <h4>Do you offer rush orders?</h4>
                  <p>Yes, contact our support team for expedited manufacturing and shipping options.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resources-section">
          <h2>Support Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Technical Documentation</h3>
              <ul>
                <li>Product specifications</li>
                <li>Installation manuals</li>
                <li>CAD drawings</li>
                <li>Performance data</li>
              </ul>
              <a href="/docs" className="resource-link">View Documentation</a>
            </div>
            <div className="resource-card">
              <h3>Training Resources</h3>
              <ul>
                <li>Product selection guides</li>
                <li>Installation videos</li>
                <li>Maintenance guides</li>
                <li>Best practices</li>
              </ul>
              <a href="/training" className="resource-link">Access Training</a>
            </div>
            <div className="resource-card">
              <h3>Warranty Information</h3>
              <ul>
                <li>5-year warranty details</li>
                <li>Registration process</li>
                <li>Coverage terms</li>
                <li>Claim procedures</li>
              </ul>
              <a href="/warranty" className="resource-link">View Warranty Info</a>
            </div>
          </div>
        </section>

        <section className="support-cta">
          <h2>Need Additional Help?</h2>
          <p>
            Our technical support team is ready to assist you with any questions or concerns.
            Contact us for personalized assistance with your specific needs.
          </p>
          <a href="mailto:support@kestralsystems.com" className="cta-button">
            Email Support Team
          </a>
        </section>
      </main>
    </div>
  );
};

export default SupportPage; 