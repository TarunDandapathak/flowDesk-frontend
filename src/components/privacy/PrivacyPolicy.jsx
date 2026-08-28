import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const companyName = "Flowdesk";
  const websiteName = "Flowdesk";
  const websiteUrl = "https://yourdomain.com";
  const contactEmail = "tarundandapathak@gmail.com";
  const lastUpdated = "August 28, 2026";

  return (
    <div className="privacy-wrapper">
      <div className="privacy-card">
        {/* Header */}
        <header className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-updated">
            Last Updated: <span className="updated-date">{lastUpdated}</span>
          </p>
        </header>

        {/* Content Body */}
        <div className="privacy-body">
          {/* Introduction */}
          <section>
            <p>
              Welcome to <strong>{websiteName}</strong> ("we," "our," or "us"). We are committed to protecting your personal privacy and providing a safe online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at{" "}
              <a href={websiteUrl} className="privacy-link">
                {websiteUrl}
              </a>{" "}
              or use our services.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="privacy-section-title">1. Information We Collect</h2>
            <p>
              We collect information about you in a variety of ways depending on how you interact with our website:
            </p>
            
            <div className="privacy-highlight-box">
              <div className="highlight-item">
                <h3>Personal Data</h3>
                <p>
                  Personally identifiable information, such as your name, email address, and demographic information that you voluntarily give to us when registering or contacting us.
                </p>
              </div>

              <div className="highlight-item">
                <h3>Derivative & Device Data</h3>
                <p>
                  Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages viewed.
                </p>
              </div>

              <div className="highlight-item">
                <h3>Usage & Timer Data</h3>
                <p>
                  Application activity, study duration, completed session logs, and preference settings saved to your user account.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="privacy-section-title">2. How We Use Your Information</h2>
            <p style={{ marginBottom: '0.75rem' }}>
              Having accurate information permits us to provide you with a smooth, efficient, and customized experience. We may use information collected via the Site to:
            </p>
            <ul className="privacy-list">
              <li>Create and manage your user account.</li>
              <li>Track and display your personalized study logs and stats.</li>
              <li>Deliver administrative updates, security alerts, and support notifications.</li>
              <li>Monitor and analyze usage and trends to improve user experience.</li>
              <li>Prevent fraudulent transactions and protect against unauthorized site activity.</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="privacy-section-title">3. Cookies and Local Storage</h2>
            <p>
              We may use cookies, web beacons, tracking pixels, and local browser storage (such as <code className="inline-code">localStorage</code>) to help customize the Site and improve your experience. Most browsers are set to accept cookies by default. You can choose to remove or reject cookies in your browser settings.
            </p>
          </section>

          {/* Sharing Data */}
          <section>
            <h2 className="privacy-section-title">4. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with third parties that perform services for us or on our behalf, including hosting providers and analytics services.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="privacy-section-title">5. Security of Your Data</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
            </p>
          </section>

          {/* Contact Us */}
          <section className="contact-box">
            <h2 className="privacy-section-title" style={{ fontSize: '1.15rem' }}>6. Contact Us</h2>
            <p style={{ fontSize: '0.875rem' }}>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="contact-info">
              <div>{companyName}</div>
              <div>
                Email: <a href={`mailto:${contactEmail}`} className="privacy-link">{contactEmail}</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}