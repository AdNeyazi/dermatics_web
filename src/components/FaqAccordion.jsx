import { useState } from 'react';

const FAQS = [
  {
    question: 'What happens if my skin feels itchy or reactive?',
    answer:
      'Aapko bilkul chinta karne ki zarurat nahi hai. Feedback prapt hote hi hamari scientific team formula ko recalibrate karegi aur bina kisi extra charge ke modified formulation aapke pate par deliver karegi jab tak result perfect na ho.',
  },
  {
    question: 'How long does the consultation and custom formulation take?',
    answer:
      'Dermatologist consultation ke baad 48 se 72 ghante ke andar formula compound kiya jata hai aur cryogenic cold-chain packaging ke zariye home deliver hota hai.',
  },
  {
    question: 'Can I reorder my personalized formula later?',
    answer:
      'Ji haan, aapka final approved formulation code hamari private scientific archive mein save rehta hai, jise aap single-click par dobara order kar sakte hain.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="faq-item" key={faq.question}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {faq.question}
              <span>{isOpen ? '\u2212' : '+'}</span>
            </button>
            <div
              className="faq-answer"
              style={{ maxHeight: isOpen ? '300px' : '0px' }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
