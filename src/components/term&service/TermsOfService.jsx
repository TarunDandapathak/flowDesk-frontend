 import React from 'react';
import './TermsOfService.css';

export default function TermsOfService() {
  const companyName = "FlowDesk";
  const websiteName = "FlowDesk";
  const websiteUrl = "https://yourdomain.com";
  const contactEmail = "tarundandapathak@gmail.com";
  const lastUpdated = "August 28, 2026";

  return (
    <div className="terms-wrapper">
      <div className="terms-card">
        {/* Header */}
        <header className="terms-header">
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-updated">
            Last Updated: <span className="updated-date">{lastUpdated}</span>
          </p>
        </header>

        {/* Content Body */}
        <div className="terms-body">
          {/* Agreement to Terms */}
          <section>
            <p>
              Welcome to <strong>{websiteName}</strong>. These Terms of Service ("Terms") govern your access to and use of our website, applications, and productivity tools available at{" "}
              <a href={websiteUrl} className="terms-link">
                {websiteUrl}
              </a>.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="terms-section-title">1. User Accounts & Security</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the credentials you use to access your account.
            </p>
            
            <div className="terms-highlight-box">
              <div className="highlight-item">
                <h3>Account Responsibility</h3>
                <p>
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </div>

              <div className="highlight-item">
                <h3>Account Termination</h3>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or abusive behavior.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="terms-section-title">2. Acceptable Use Policy</h2>
            <p style={{ marginBottom: '0.75rem' }}>
              You agree not to engage in any of the following prohibited activities while using our Service:
            </p>
            <ul className="terms-list">
              <li>Attempting to bypass security mechanisms or probe vulnerabilities of our servers.</li>
              <li>Automating requests using scripts or bots to spam timer endpoints or study logs.</li>
              <li>Attempting to reverse engineer or decompile any portion of the application code.</li>
              <li>Using the Service for any unlawful purpose or to violate local or international regulations.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="terms-section-title">3. Intellectual Property</h2>
            <p>
              The Service and its original content, features, branding, and functionality are and will remain the exclusive property of <strong>{companyName}</strong> and its licensors. Our trademarks and design elements may not be used in connection with any product or service without prior written consent.
            </p>
          </section>

          {/* User Data & Study Logs */}
          <section>
            <h2 className="terms-section-title">4. User Content & Productivity Data</h2>
            <p>
              You retain ownership of any timer logs, study data, or notes you generate while using the app. By submitting data to our Service, you grant us a non-exclusive license to host, store, and display this data solely for the purpose of delivering the app's functionalities to you.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="terms-section-title">5. Limitation of Liability</h2>
            <p>
              In no event shall <strong>{companyName}</strong>, its directors, or employees be liable for any indirect, incidental, or consequential damages resulting from your access to or inability to access the Service, or any lost data resulting from technical failures.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="terms-section-title">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of material changes by updating the "Last Updated" date at the top of this page.
            </p>
          </section>

          {/* Contact Box */}
          <section className="contact-box">
            <h2 className="terms-section-title" style={{ fontSize: '1.15rem' }}>7. Contact Us</h2>
            <p style={{ fontSize: '0.875rem' }}>
              If you have any questions regarding these Terms of Service, please reach out to us:
            </p>
            <div className="contact-info">
              <div>{companyName}</div>
              <div>
                Email: <a href={`mailto:${contactEmail}`} className="terms-link">{contactEmail}</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}