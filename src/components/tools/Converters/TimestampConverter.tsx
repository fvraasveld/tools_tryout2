import React, { useState, useEffect } from 'react';

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const date = new Date(timestamp * 1000);
    setDateString(date.toISOString().slice(0, 16));
  }, [timestamp]);

  const timestampToDate = (ts: number) => {
    const date = new Date(ts * 1000);
    return {
      local: date.toLocaleString(),
      utc: date.toUTCString(),
      iso: date.toISOString(),
    };
  };

  const dateToTimestamp = (dateStr: string) => {
    return Math.floor(new Date(dateStr).getTime() / 1000);
  };

  const convertedDate = timestampToDate(timestamp);

  const setNow = () => {
    setTimestamp(Math.floor(Date.now() / 1000));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateString(e.target.value);
    const ts = dateToTimestamp(e.target.value);
    if (!isNaN(ts)) {
      setTimestamp(ts);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={setNow}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Use Current Time
      </button>

      <div>
        <label className="block text-sm font-semibold mb-2">Unix Timestamp (seconds)</label>
        <input
          type="number"
          value={timestamp}
          onChange={(e) => setTimestamp(parseInt(e.target.value) || 0)}
          className="w-full p-3 border-2 rounded-lg font-mono text-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Date & Time</label>
        <input
          type="datetime-local"
          value={dateString}
          onChange={handleDateChange}
          className="w-full p-3 border-2 rounded-lg"
        />
      </div>

      <div className="bg-white border-2 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold">Converted Values</h3>
        
        <div>
          <div className="text-sm font-semibold text-gray-600 mb-1">Local Time</div>
          <div className="p-3 bg-gray-50 border rounded font-mono">{convertedDate.local}</div>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-600 mb-1">UTC Time</div>
          <div className="p-3 bg-gray-50 border rounded font-mono">{convertedDate.utc}</div>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-600 mb-1">ISO 8601</div>
          <div className="p-3 bg-gray-50 border rounded font-mono">{convertedDate.iso}</div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;
