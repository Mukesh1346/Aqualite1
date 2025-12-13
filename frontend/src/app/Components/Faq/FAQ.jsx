import React from "react";
import styles from "./faq.css";

const faqData = [
  {
    question: "What types of Aqualite Mattres do you offer?",
    answer:
      "We offer a wide range of Aqualite Mattres including sofas, beds, dining tables, chairs, wardrobes, and more for homes and offices.",
  },
  {
    question: "Do you offer custom Aqualite Mattres designs?",
    answer:
      "Yes, we provide custom Aqualite Mattres options based on your requirements. You can contact our team to discuss your ideas.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 5-10 business days depending on your location and the type of Aqualite Mattres ordered.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 7 days of delivery if the product is damaged or defective. Please refer to our return policy page for more details.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes, we provide free installation services for selected Aqualite Mattres items. Our delivery team will handle the setup.",
  },
];

const FAQ = () => {
  return (
    <div className={`container  faqSection`}>
      <h2 className="toptrandheading text-center">Frequently Asked Questions</h2>
      <div className={`accordion accordionCustom`} id="faqAccordion">
        {faqData.map((item, index) => (
          <div className={`accordion-item accordionItem`} key={index}>
            <h2 className="accordion-header" id={`faq${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""} accordionButton`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? "" : ""}`}
              aria-labelledby={`faq${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className={`accordion-body accordionBody`}>
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
