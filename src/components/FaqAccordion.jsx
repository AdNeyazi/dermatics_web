import { useState } from 'react';

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="faq-item" key={faq.id ?? faq.title}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {faq.title}
              <span>{isOpen ? '\u2212' : '+'}</span>
            </button>
            <div
              className="faq-answer"
              style={{ maxHeight: isOpen ? '300px' : '0px' }}
            >
              <p>{faq.body}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
