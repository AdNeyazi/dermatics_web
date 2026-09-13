export default function CategorySwitcher({ categories, activeTab, onChange }) {
  return (
    <div className="hero-switcher-wrapper">
      <div className="category-pills-container">
        {categories.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            className={`category-btn${activeTab === tab.slug ? ' active' : ''}`}
            onClick={() => onChange(tab.slug)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
