import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">Last updated: March 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using QuickToolkits, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Use License</h2>
          <p className="text-gray-700 mb-4">
            QuickToolkits grants you a personal, non-transferable license to use our tools for lawful purposes only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            The tools are provided "as is". QuickToolkits makes no warranties regarding the accuracy or reliability of the tools.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Questions</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
