import React, { useState } from 'react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const generate = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  React.useEffect(() => {
    generate();
  }, [length, options]);

  const getStrength = () => {
    if (length < 8) return { text: 'Weak', color: 'text-red-600 bg-red-50' };
    if (length < 12) return { text: 'Medium', color: 'text-orange-600 bg-orange-50' };
    if (length < 16) return { text: 'Strong', color: 'text-green-600 bg-green-50' };
    return { text: 'Very Strong', color: 'text-blue-600 bg-blue-50' };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Generated Password</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 p-4 border rounded-lg bg-gray-50 font-mono text-lg"
          />
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Copy
          </button>
        </div>
        <div className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${strength.color}`}>
          {strength.text}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Length: {length}</label>
        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Uppercase (A-Z)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Lowercase (a-z)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Numbers (0-9)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
            className="w-4 h-4"
          />
          <span>Symbols (!@#$%)</span>
        </label>
      </div>

      <button onClick={generate} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
        Generate New Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
