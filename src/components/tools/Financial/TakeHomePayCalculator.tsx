import React, { useState } from 'react';

const TakeHomePayCalculator: React.FC = () => {
  const [salary, setSalary] = useState('');
  const [frequency, setFrequency] = useState<'annual'|'monthly'|'hourly'>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [filingStatus, setFilingStatus] = useState<'single'|'married'>('single');
  const [state401k, setState401k] = useState('5');
  const [healthInsurance, setHealthInsurance] = useState('200');

  const toAnnual = (v: number) => {
    if (frequency === 'annual') return v;
    if (frequency === 'monthly') return v * 12;
    return v * (parseFloat(hoursPerWeek) || 40) * 52;
  };

  const gross = toAnnual(parseFloat(salary) || 0);
  const k401 = gross * ((parseFloat(state401k) || 0) / 100);
  const healthAnnual = (parseFloat(healthInsurance) || 0) * 12;
  const taxableIncome = Math.max(0, gross - k401 - healthAnnual);

  // 2024 US Federal Tax Brackets (simplified)
  const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
  const agi = Math.max(0, taxableIncome - standardDeduction);

  let federalTax = 0;
  if (filingStatus === 'single') {
    if (agi > 609350) federalTax = 174238.25 + (agi - 609350) * 0.37;
    else if (agi > 243725) federalTax = 55374.25 + (agi - 243725) * 0.35;
    else if (agi > 191950) federalTax = 37104.25 + (agi - 191950) * 0.32;
    else if (agi > 100525) federalTax = 17168.50 + (agi - 100525) * 0.24;
    else if (agi > 47150) federalTax = 5426.00 + (agi - 47150) * 0.22;
    else if (agi > 11600) federalTax = 1160.00 + (agi - 11600) * 0.12;
    else federalTax = agi * 0.10;
  } else {
    if (agi > 731200) federalTax = 196669.50 + (agi - 731200) * 0.37;
    else if (agi > 487450) federalTax = 111357.00 + (agi - 487450) * 0.35;
    else if (agi > 383900) federalTax = 80087.00 + (agi - 383900) * 0.32;
    else if (agi > 201050) federalTax = 46357.00 + (agi - 201050) * 0.24;
    else if (agi > 94300) federalTax = 10294.00 + (agi - 94300) * 0.22;
    else if (agi > 23200) federalTax = 2320.00 + (agi - 23200) * 0.12;
    else federalTax = agi * 0.10;
  }

  const socialSecurity = Math.min(gross, 168600) * 0.062;
  const medicare = gross * 0.0145;
  const ficaTotal = socialSecurity + medicare;

  const totalDeductions = federalTax + ficaTotal + k401 + healthAnnual;
  const takeHome = gross - totalDeductions;
  const effectiveRate = gross > 0 ? (federalTax / gross) * 100 : 0;

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Take-Home Pay Calculator</h2>
        <p className="text-dark-600">Estimate your US net pay after federal tax, FICA, 401(k), and health insurance. For reference only — consult a tax professional for exact figures.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">Pay Frequency</label>
          <select value={frequency} onChange={e => setFrequency(e.target.value as any)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="annual">Annual Salary</option>
            <option value="monthly">Monthly Salary</option>
            <option value="hourly">Hourly Rate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">
            {frequency === 'annual' ? 'Annual Salary ($)' : frequency === 'monthly' ? 'Monthly Salary ($)' : 'Hourly Rate ($/hr)'}
          </label>
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder={frequency === 'annual' ? '75000' : frequency === 'monthly' ? '6250' : '36'} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/>
        </div>
        {frequency === 'hourly' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-dark-700">Hours per Week</label>
            <input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} placeholder="40" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/>
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">Filing Status</label>
          <select value={filingStatus} onChange={e => setFilingStatus(e.target.value as any)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">401(k) Contribution (%)</label>
          <input type="number" value={state401k} onChange={e => setState401k(e.target.value)} placeholder="5" min="0" max="100" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">Health Insurance Premium ($/mo)</label>
          <input type="number" value={healthInsurance} onChange={e => setHealthInsurance(e.target.value)} placeholder="200" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/>
        </div>
      </div>

      {gross > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <div className="text-xl font-bold text-dark-700">${fmt(gross)}</div>
              <div className="text-sm text-dark-600 mt-1">Gross Annual Pay</div>
            </div>
            <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">${fmt(takeHome)}</div>
              <div className="text-sm text-dark-600 mt-1">Annual Take-Home</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-white rounded-xl p-3 border border-gray-200">
              <div className="font-bold text-dark-700">${fmt(takeHome/12)}/mo</div>
              <div className="text-xs text-dark-500">Monthly</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200">
              <div className="font-bold text-dark-700">${fmt(takeHome/26)}/paycheck</div>
              <div className="text-xs text-dark-500">Bi-weekly</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200">
              <div className="font-bold text-dark-700">${fmt(takeHome/52)}/week</div>
              <div className="text-xs text-dark-500">Weekly</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-dark-700">Annual Deduction Breakdown</span>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: 'Federal Income Tax', amount: federalTax, sub: `Effective rate: ${effectiveRate.toFixed(1)}%` },
                { label: 'Social Security (6.2%)', amount: socialSecurity },
                { label: 'Medicare (1.45%)', amount: medicare },
                { label: `401(k) (${state401k}%)`, amount: k401 },
                { label: 'Health Insurance', amount: healthAnnual },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center px-4 py-3">
                  <div>
                    <span className="text-sm text-dark-700">{row.label}</span>
                    {row.sub && <div className="text-xs text-dark-400">{row.sub}</div>}
                  </div>
                  <span className="font-semibold text-red-600 text-sm">-${fmt(row.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-4 py-3 bg-green-50">
                <span className="text-sm font-bold text-dark-800">Take-Home Pay</span>
                <span className="font-bold text-green-600">${fmt(takeHome)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Select your pay frequency and enter your salary or hourly rate</li>
          <li>Choose your filing status and enter pre-tax deductions</li>
          <li>See your estimated take-home pay broken down by deduction</li>
          <li>Note: does not include state taxes — consult a tax professional for precise figures</li>
        </ol>
      </div>
    </div>
  );
};

export default TakeHomePayCalculator;
