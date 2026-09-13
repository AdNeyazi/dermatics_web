const TABS = [
  { id: 'premium', label: 'Premium' },
  { id: 'ultra', label: 'Ultra Premium' },
  { id: 'super', label: 'Super Ultra Premium Luxury' },
];

export default function CategorySwitcher({ activeTab, onChange }) {
  return (
    <div className="hero-switcher-wrapper">
      <div className="category-pills-container">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`category-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
