import { useState } from 'react';
import CategorySwitcher from './components/CategorySwitcher';
import ProductGrid from './components/ProductGrid';
import BespokeSection from './components/BespokeSection';
import { productsByTier } from './data/products';
import './dermatics.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('premium');

  return (
    <>
      <div className="ambient-glow"></div>

      <header>
        <a href="#" className="brand-logo">DERMATICS</a>
        <div className="header-contact">
          <a href="tel:+919876543210" className="btn-contact">
            Book Appointment: +91 98765 43210
          </a>
        </div>
      </header>

      <CategorySwitcher activeTab={activeTab} onChange={setActiveTab} />

      <main className="content-viewport">
        <div className={`tab-view${activeTab === 'premium' ? ' active-view' : ''}`}>
          {activeTab === 'premium' && (
            <ProductGrid
              heading="The Universal Essentials"
              description="Expertly formulated with pure bio-actives for all skin types. Timeless protection and radiant balance."
              products={productsByTier.premium}
            />
          )}
        </div>

        <div className={`tab-view${activeTab === 'ultra' ? ' active-view' : ''}`}>
          {activeTab === 'ultra' && (
            <ProductGrid
              heading="Precision Longevity"
              description="Targeted regenerative solutions crafted exclusively for cellular aging, structural laxity, and complex dermal needs."
              products={productsByTier.ultra}
            />
          )}
        </div>

        <div className={`tab-view${activeTab === 'super' ? ' active-view' : ''}`}>
          {activeTab === 'super' && <BespokeSection />}
        </div>
      </main>

      <footer>
        <div className="footer-cta">
          <h3>Ready For Your Bespoke Formulation?</h3>
          <p style={{ color: '#999', marginBottom: '25px' }}>
            Book your private diagnostic consultation with our dermatology board today.
          </p>
          <a
            href="tel:+919876543210"
            className="btn-contact"
            style={{ fontSize: '1rem', padding: '14px 38px' }}
          >
            Call Consultation Desk: +91 98765 43210
          </a>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          &copy; 2026 DERMATICS SKINCARE LABS. ALL RIGHTS RESERVED. HAUTE COUTURE DERMATOLOGY.
        </p>
      </footer>
    </>
  );
}
