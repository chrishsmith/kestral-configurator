import React from 'react';
import Header from '../components/Navigation/Header';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="about-content">
        <section className="hero-section">
          <h1>About Kestral Systems</h1>
          <p className="subtitle">
            Innovating HVAC Control Solutions for the Modern Era
          </p>
        </section>

        <section className="company-overview">
          <h2>Who We Are</h2>
          <p>
            Based in Utah, Kestral Systems is a leading manufacturer of high-performance HVAC air control dampers, 
            serving the Mountain West and Desert Southwest region. We combine cutting-edge technology with 
            manufacturing excellence to deliver superior products with industry-leading turnaround times.
          </p>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h3>Innovation</h3>
              <p>State-of-the-art Online Product Assisted Selection (OPAS) system for seamless ordering</p>
            </div>
            <div className="highlight-card">
              <h3>Speed</h3>
              <p>Less than 2-week delivery through automated manufacturing workflow</p>
            </div>
            <div className="highlight-card">
              <h3>Quality</h3>
              <p>Industry-leading 5-year warranty on all products</p>
            </div>
          </div>
        </section>

        <section className="mission-values">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To develop and manufacture the most efficient and reliable air control dampers with 
              exceptional customer service and value, while maintaining our commitment to energy 
              efficiency and environmental responsibility.
            </p>
          </div>
          <div className="values">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Performance & Efficiency</h3>
                <p>Delivering the best in energy-saving and reliable products</p>
              </div>
              <div className="value-item">
                <h3>Customer Focus</h3>
                <p>Prioritizing customer satisfaction through exceptional service and support</p>
              </div>
              <div className="value-item">
                <h3>Integrity & Fairness</h3>
                <p>Maintaining ethical business practices and fair treatment of all stakeholders</p>
              </div>
              <div className="value-item">
                <h3>Employee Growth</h3>
                <p>Fostering a culture of learning and development for our team</p>
              </div>
            </div>
          </div>
        </section>

        <section className="expertise">
          <h2>Our Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h3>Products</h3>
              <ul>
                <li>High-performance HVAC control dampers</li>
                <li>Supply Air, Return Air, and Exhaust Air solutions</li>
                <li>Backdraft applications</li>
                <li>Smart and IoT-enabled damper systems</li>
              </ul>
            </div>
            <div className="expertise-card">
              <h3>Technology</h3>
              <ul>
                <li>Advanced online configuration tools</li>
                <li>Automated manufacturing processes</li>
                <li>Building Management System (BMS) integration</li>
                <li>Quality control automation</li>
              </ul>
            </div>
            <div className="expertise-card">
              <h3>Service</h3>
              <ul>
                <li>Comprehensive customer support</li>
                <li>Custom application assistance</li>
                <li>Technical training programs</li>
                <li>5-year product warranty</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="leadership">
          <h2>Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>Managing Partner</h3>
              <p className="role">Executive Leadership</p>
              <p className="experience">30+ years in HVAC Control and Automation</p>
            </div>
            <div className="team-member">
              <h3>Operations Manager</h3>
              <p className="role">Production & Quality Control</p>
              <p className="experience">15+ years in mechanical assembly design</p>
            </div>
            <div className="team-member">
              <h3>Chief Information Officer</h3>
              <p className="role">Technology & Systems</p>
              <p className="experience">25+ years in enterprise software development</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Connect With Us</h2>
          <p>
            Learn how Kestral Systems can help with your HVAC control needs through our innovative 
            solutions and industry-leading service.
          </p>
          <div className="contact-buttons">
            <a href="/contact" className="contact-button primary">Contact Sales</a>
            <a href="/support" className="contact-button secondary">Technical Support</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage; 