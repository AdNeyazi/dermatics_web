import { useEffect, useState } from 'react';
import CategorySwitcher from './components/CategorySwitcher';
import ProductGrid from './components/ProductGrid';
import BespokeSection from './components/BespokeSection';
import LoginModal from './components/LoginModal';
import { fetchCatalog, fetchCurrentUser, setStoredToken } from './api/client';
import './dermatics.css';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { categories: loaded } = await fetchCatalog();
        if (cancelled) return;
        setCategories(loaded);
        setActiveTab((current) => current ?? loaded[0]?.slug ?? null);
      } catch (err) {
        if (!cancelled) setCatalogError(err.message || 'Could not load catalog');
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const current = await fetchCurrentUser();
        if (!cancelled) setUser(current);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAuthSuccess = (authenticatedUser, token) => {
    setStoredToken(token);
    setUser(authenticatedUser);
  };

  const handleSignOut = () => {
    setStoredToken(null);
    setUser(null);
  };

  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'Account';
  const activeCategory = categories.find((category) => category.slug === activeTab);

  return (
    <>
      <div className="ambient-glow"></div>

      <header>
        <a href="#" className="brand-logo">DERMATICS</a>
        <div className="header-contact">
          {!authLoading && (
            user ? (
              <div className="header-auth">
                <span className="header-user">
                  Hello, {displayName}
                  {user.admin && <span className="role-badge role-badge--admin">Admin</span>}
                </span>
                <button type="button" className="btn-login" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <button type="button" className="btn-login" onClick={() => setLoginOpen(true)}>
                Login
              </button>
            )
          )}
          <a href="tel:+919876543210" className="btn-contact">
            Book Appointment: +91 98765 43210
          </a>
        </div>
      </header>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {catalogLoading && (
        <p className="catalog-status" role="status">
          Loading collection…
        </p>
      )}

      {catalogError && (
        <p className="catalog-status catalog-status--error" role="alert">
          {catalogError}. Start the Rails API and run <code>bin/rails db:seed</code>.
        </p>
      )}

      {!catalogLoading && !catalogError && categories.length > 0 && (
        <>
          <CategorySwitcher
            categories={categories}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <main className="content-viewport">
            {categories.map((category) => (
              <div
                key={category.slug}
                className={`tab-view${activeTab === category.slug ? ' active-view' : ''}`}
              >
                {activeTab === category.slug && category.layout === 'product_grid' && (
                  <ProductGrid
                    heading={category.heading}
                    description={category.description}
                    products={category.products ?? []}
                  />
                )}
                {activeTab === category.slug && category.layout === 'bespoke' && (
                  <BespokeSection contentBlocks={category.content_blocks ?? []} />
                )}
              </div>
            ))}
          </main>
        </>
      )}

      {!catalogLoading && !catalogError && activeCategory && categories.length === 0 && (
        <p className="catalog-status">No categories published yet.</p>
      )}

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
