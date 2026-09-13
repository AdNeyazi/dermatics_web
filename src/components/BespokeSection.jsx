import FaqAccordion from './FaqAccordion';

function renderRichText(text) {
  if (!text) return null;

  const parts = text.split(/(My Skin My Formulation)/g);
  return parts.map((part, index) =>
    part === 'My Skin My Formulation' ? <strong key={index}>{part}</strong> : part
  );
}

export default function BespokeSection({ contentBlocks = [] }) {
  const blocksByType = contentBlocks.reduce((acc, block) => {
    acc[block.block_type] = acc[block.block_type] || [];
    acc[block.block_type].push(block);
    return acc;
  }, {});

  const hero = blocksByType.hero?.[0];
  const articles = blocksByType.article ?? [];
  const processHeader = blocksByType.section_header?.find((b) => b.title === 'How It Works');
  const processSteps = blocksByType.process_step ?? [];
  const guarantee = blocksByType.guarantee?.[0];
  const teamMembers = blocksByType.team_member ?? [];
  const faqs = blocksByType.faq ?? [];

  return (
    <>
      {hero && (
        <div className="sup-hero">
          <h1>{hero.title}</h1>
          {hero.subtitle && <h4>{hero.subtitle}</h4>}
        </div>
      )}

      {articles.map((block) => (
        <div className="article-block" key={block.id}>
          <h2>{block.title}</h2>
          <p>{renderRichText(block.body)}</p>
        </div>
      ))}

      {(processHeader || processSteps.length > 0) && (
        <section className="process-section">
          {processHeader && (
            <div className="process-header">
              <h2>{processHeader.title}</h2>
              {processHeader.subtitle && <p>{processHeader.subtitle}</p>}
            </div>
          )}
          <div className="process-diagram">
            {processSteps.map((step, index) => (
              <div className="process-card" key={step.id}>
                <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>

          {guarantee && (
            <div className="feedback-loop-banner">
              <div className="loop-icon">&#8635;</div>
              <div className="loop-content">
                <h4>{guarantee.title}</h4>
                <p>{guarantee.body}</p>
              </div>
            </div>
          )}
        </section>
      )}

      {teamMembers.length > 0 && (
        <section className="team-section">
          <h2>The Master Minds</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div className="team-member" key={member.id}>
                <div className="member-img">
                  <img src={member.image} alt={member.title} />
                </div>
                <h3>{member.title}</h3>
                <span>{member.subtitle}</span>
                <p>{member.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && <FaqAccordion items={faqs} />}
    </>
  );
}
