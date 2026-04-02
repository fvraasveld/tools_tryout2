import React, { useState } from 'react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
    };
  };

  const age = calculateAge();

  const getNextBirthday = () => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      date: nextBirthday.toLocaleDateString(),
      daysUntil,
    };
  };

  const nextBirthday = getNextBirthday();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Calculate Age On</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
      </div>

      {age && (
        <>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8 text-center">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {age.years}
            </div>
            <div className="text-2xl font-semibold text-gray-700">
              {age.years === 1 ? 'Year' : 'Years'} Old
            </div>
            <div className="text-lg text-gray-600 mt-2">
              {age.months} {age.months === 1 ? 'Month' : 'Months'}, {age.days} {age.days === 1 ? 'Day' : 'Days'}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border-2 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-800">{age.totalMonths}</div>
              <div className="text-sm text-gray-600 mt-1">Total Months</div>
            </div>
            <div className="bg-white border-2 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-800">{age.totalWeeks}</div>
              <div className="text-sm text-gray-600 mt-1">Total Weeks</div>
            </div>
            <div className="bg-white border-2 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-800">{age.totalDays}</div>
              <div className="text-sm text-gray-600 mt-1">Total Days</div>
            </div>
          </div>

          {nextBirthday && (
            <div className="bg-gradient-to-br from-pink-50 to-orange-50 border-2 border-pink-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">🎂 Next Birthday</h3>
              <div className="text-xl font-semibold">{nextBirthday.date}</div>
              <div className="text-gray-600 mt-1">
                {nextBirthday.daysUntil === 0 ? "It's today! 🎉" : `${nextBirthday.daysUntil} days to go`}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AgeCalculator;
