"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Do you provide free estimates?",
      answer:
        "Yes! We offer completely free estimates for all our services. We'll assess your project and provide a detailed quote with no obligation.",
    },
    {
      question: "How quickly can you start a project?",
      answer:
        "We offer same-day estimates and can often start projects within 1-2 business days depending on availability and project complexity.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely. Turner Ventures AZ is fully licensed and insured for all demolition and removal services. We maintain all required permits and certifications.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We primarily serve Gilbert, Phoenix, Chandler, Tempe, Mesa, Scottsdale, and surrounding areas in the Phoenix metro. Contact us to discuss your specific location.",
    },
    {
      question: "How do you handle waste disposal?",
      answer:
        "We handle all waste disposal responsibly, following local regulations. Materials are recycled or disposed of at appropriate facilities.",
    },
    {
      question: "Can you work around my schedule?",
      answer:
        "Yes, we're flexible with scheduling. We can arrange early morning, evening, or weekend appointments to accommodate your needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, check, credit cards, and bank transfers. Payment terms can be discussed during your estimate consultation.",
    },
    {
      question: "Do you offer any guarantees?",
      answer:
        "We guarantee professional workmanship and customer satisfaction. If you're not satisfied, we'll work to make it right.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-muted-light">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted">Find answers to common questions about our services and process.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border-2 border-border overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted-light transition-colors"
              >
                <h3 className="text-lg font-bold text-foreground text-left">{faq.question}</h3>
                <ChevronDown
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t-2 border-border bg-muted-light">
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-primary text-white p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-6">Contact us directly and we'll be happy to help.</p>
          <a
            href="tel:+1234567890"
            className="inline-block bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent-dark transition-colors"
          >
            Call (480) 555-0123
          </a>
        </div>
      </div>
    </section>
  )
}
