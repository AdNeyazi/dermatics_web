import FaqAccordion from './FaqAccordion';

const PROCESS_STEPS = [
  {
    title: 'Book Dermatologist Consultation',
    text: 'Schedule your one-on-one comprehensive dermal diagnostic with our senior dermatologists to map your skin metrics.',
  },
  {
    title: 'Scientific Board Review',
    text: 'Your dermatologist discusses your skin concerns directly with our Chief Scientist & Cosmetic Chemist to decide molecular targets.',
  },
  {
    title: 'Custom Compounding & Approval',
    text: 'Our Cosmetic Chemist compounds the bespoke batch, which is stringently approved by our Chief Scientist before refrigerated doorstep delivery.',
  },
  {
    title: 'Home Delivery & Evaluation',
    text: 'You test the batch at home. We actively record your skin feel, hydration curves, and molecular affinity.',
  },
];

const TEAM = [
  {
    name: 'Elena Von Berg',
    role: 'Founder & Visionary',
    bio: 'Pioneering holistic luxury and bespoke diagnostic aesthetics for over 18 years.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Dr. Julian Vance, MD',
    role: 'Chief Dermatologist',
    bio: 'Clinical specialist in skin barrier immunology and customized epidermal treatments.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Dr. Aris Thorne',
    role: 'Lead Cosmetic Chemist',
    bio: 'Specialist in biomimetic peptide synthesis and bespoke clean-carrier delivery matrices.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Prof. Marcus Sterling',
    role: 'Chief Scientist',
    bio: 'Directs final batch validation, dermatological safety metrics, and longevity stability.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
];

export default function BespokeSection() {
  return (
    <>
      <div className="sup-hero">
        <h1>MY SKIN MY FORMULATION</h1>
        <h4>Customise Skin Care Solution For Skin Lovers</h4>
      </div>

      <div className="article-block">
        <h2>What is My Skin My Formulation?</h2>
        <p>
          <strong>My Skin My Formulation</strong> is Dermatics' bespoke haute-skincare program. We completely discard off-the-shelf, mass-manufactured formulas. Instead, our state-of-the-art laboratory engineers a single, proprietary bottle compounded exclusively for your dermal biology, epigenetic factors, and environment. It is individualized clinical luxury in its purest expression.
        </p>
      </div>

      <div className="article-block">
        <h2>Why My Skin My Formulation?</h2>
        <p>
          No two genetic codes or dermal microbiomes are identical. Generic skincare forced into standardized molds often causes paradoxical congestion, irritation, or superficial results. <strong>My Skin My Formulation</strong> is built on deep diagnostic precision: zero redundant fillers, zero allergen risks, and therapeutic concentrations calibrated exclusively to solve your distinct concerns.
        </p>
      </div>

      <section className="process-section">
        <div className="process-header">
          <h2>How It Works</h2>
          <p>An uncompromising 4-step diagnostic and scientific cycle.</p>
        </div>
        <div className="process-diagram">
          {PROCESS_STEPS.map((step, index) => (
            <div className="process-card" key={step.title}>
              <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="feedback-loop-banner">
          <div className="loop-icon">&#8635;</div>
          <div className="loop-content">
            <h4>The Infinite Perfection Guarantee</h4>
            <p>
              Agar testing period ke dauran aapko rashes, itching, burning ya mild discomfort mehsoos hota hai—hamare Cosmetic Chemist aur Chief Scientist feedback ke aadhar par formula ko turant re-engineer karenge aur new iteration aapke ghar deliver karenge. Jab tak formula aapki skin ke sath 100% harmonious fit na baithe, tab tak formulation process complete nahi maana jayega.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>The Master Minds</h2>
        <div className="team-grid">
          {TEAM.map((member) => (
            <div className="team-member" key={member.name}>
              <div className="member-img">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqAccordion />
    </>
  );
}
