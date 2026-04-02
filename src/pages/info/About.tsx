import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About QuickToolkits</h1>
      
      <div className="space-y-6 text-lg">
        <p>
          QuickToolkits is your one-stop destination for free online tools, calculators, 
          converters, and productivity utilities.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p>
          We provide fast, reliable, and easy-to-use online tools for everyone. Whether 
          you're a developer, student, business professional, or just someone looking to 
          get things done quickly, we have the tools you need.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Why QuickToolkits?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>100% Free - All basic tools completely free forever</li>
          <li>No Registration Required - Start using tools immediately</li>
          <li>Privacy First - Your data stays on your device</li>
          <li>Fast & Reliable - Lightning-fast tools</li>
          <li>Mobile Friendly - Works on all devices</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Support Us</h2>
        <p>
          QuickToolkits is ad-supported to keep all tools free. Consider removing ads 
          for just $2.99/month to support development.
        </p>
      </div>
    </div>
  );
};

export default About;
