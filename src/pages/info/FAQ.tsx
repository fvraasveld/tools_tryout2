import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is QuickToolkits really free?',
      a: 'Yes! All basic tools are 100% free forever. We display ads to keep the service free.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'No account required! Jump right in and start using tools immediately.'
    },
    {
      q: 'Is my data safe?',
      a: 'Absolutely! Most tools store data locally in your browser. Your data never leaves your device.'
    },
    {
      q: 'Do the tools work offline?',
      a: 'Many tools work offline once loaded, especially those that process data locally.'
    },
    {
      q: 'Can I use on mobile?',
      a: 'Yes! Our website works great on all devices - phones, tablets, and desktops.'
    },
    {
      q: 'How do I remove ads?',
      a: 'You can remove all ads for $2.99/month. This helps support development of new tools!'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
            >
              <span className="font-semibold text-lg">{faq.q}</span>
              <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
