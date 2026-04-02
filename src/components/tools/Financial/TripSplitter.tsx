import React, { useState } from 'react';

type Expense = { description: string; amount: string; paidBy: string; splitWith: string[] };

const TripSplitter: React.FC = () => {
  const [people, setPeople] = useState<string[]>(['Alice', 'Bob', 'Carol']);
  const [newPerson, setNewPerson] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({ description: '', amount: '', paidBy: '', splitWith: [] });

  const addPerson = () => {
    const name = newPerson.trim();
    if (name && !people.includes(name)) { setPeople([...people, name]); setNewPerson(''); }
  };
  const removePerson = (p: string) => setPeople(people.filter(x => x !== p));

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy || newExpense.splitWith.length === 0) return;
    setExpenses([...expenses, newExpense]);
    setNewExpense({ description: '', amount: '', paidBy: '', splitWith: [] });
  };
  const removeExpense = (i: number) => setExpenses(expenses.filter((_, j) => j !== i));

  const toggleSplit = (person: string) => {
    const sw = newExpense.splitWith.includes(person)
      ? newExpense.splitWith.filter(p => p !== person)
      : [...newExpense.splitWith, person];
    setNewExpense({ ...newExpense, splitWith: sw });
  };

  // Calculate balances
  const balances: Record<string, number> = {};
  people.forEach(p => { balances[p] = 0; });
  expenses.forEach(e => {
    const amt = parseFloat(e.amount) || 0;
    const share = amt / e.splitWith.length;
    balances[e.paidBy] = (balances[e.paidBy] || 0) + amt;
    e.splitWith.forEach(p => { balances[p] = (balances[p] || 0) - share; });
  });

  // Settlement
  const settlements: { from: string; to: string; amount: number }[] = [];
  const debtors = people.filter(p => balances[p] < -0.01).map(p => ({ name: p, amount: -balances[p] }));
  const creditors = people.filter(p => balances[p] > 0.01).map(p => ({ name: p, amount: balances[p] }));
  const d = debtors.map(x => ({ ...x }));
  const cr = creditors.map(x => ({ ...x }));
  let di = 0, ci = 0;
  while (di < d.length && ci < cr.length) {
    const amt = Math.min(d[di].amount, cr[ci].amount);
    settlements.push({ from: d[di].name, to: cr[ci].name, amount: amt });
    d[di].amount -= amt; cr[ci].amount -= amt;
    if (d[di].amount < 0.01) di++;
    if (cr[ci].amount < 0.01) ci++;
  }

  const total = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Trip Cost Splitter</h2>
        <p className="text-dark-600">Split shared expenses fairly among a group of people.</p>
      </div>

      {/* People */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-dark-700">People in the Group</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {people.map(p => (
            <span key={p} className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700">
              {p}
              <button onClick={() => removePerson(p)} className="text-primary-400 hover:text-primary-700 ml-1">✕</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newPerson}
            onChange={e => setNewPerson(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPerson()}
            placeholder="Add person..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button onClick={addPerson} className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600">Add</button>
        </div>
      </div>

      {/* Add Expense */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
        <p className="text-sm font-semibold text-dark-700">Add Expense</p>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={newExpense.description}
            onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
            placeholder="Description (e.g. Dinner)"
            className="px-3 py-2 border border-gray-300 rounded-xl text-sm"
          />
          <input
            type="number"
            value={newExpense.amount}
            onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
            placeholder="Amount ($)"
            className="px-3 py-2 border border-gray-300 rounded-xl text-sm"
          />
        </div>
        <select
          value={newExpense.paidBy}
          onChange={e => setNewExpense({ ...newExpense, paidBy: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
        >
          <option value="">Who paid?</option>
          {people.map(p => <option key={p}>{p}</option>)}
        </select>
        <div>
          <p className="text-xs font-semibold text-dark-600 mb-1">Split between:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setNewExpense({ ...newExpense, splitWith: [...people] })} className="px-3 py-1 bg-gray-200 text-dark-600 rounded-lg text-xs font-semibold hover:bg-gray-300">All</button>
            {people.map(p => (
              <button
                key={p}
                onClick={() => toggleSplit(p)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${newExpense.splitWith.includes(p) ? 'bg-primary-500 text-white' : 'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}
              >{p}</button>
            ))}
          </div>
        </div>
        <button onClick={addExpense} className="w-full py-2 bg-primary-500 text-white rounded-xl font-semibold text-sm hover:bg-primary-600 transition-colors">Add Expense</button>
      </div>

      {/* Expense List */}
      {expenses.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-dark-700">Expenses ({expenses.length}) — Total: ${total.toFixed(2)}</p>
          {expenses.map((e, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-3 bg-white rounded-xl border border-gray-200">
              <div>
                <span className="font-medium text-dark-800 text-sm">{e.description}</span>
                <span className="text-xs text-dark-500 ml-2">paid by {e.paidBy} · split {e.splitWith.length} ways</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-dark-700">${parseFloat(e.amount).toFixed(2)}</span>
                <button onClick={() => removeExpense(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settlements */}
      {expenses.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-sm font-semibold text-dark-700">Who Owes What</span>
          </div>
          <div className="p-4 space-y-2">
            {settlements.length === 0
              ? <p className="text-sm text-dark-500 text-center py-2">Everyone is even!</p>
              : settlements.map((s, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-dark-700"><span className="font-semibold text-red-600">{s.from}</span> → <span className="font-semibold text-green-600">{s.to}</span></span>
                  <span className="font-bold text-dark-800">${s.amount.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Add everyone in the group</li>
          <li>Log each expense with who paid and who it should be split between</li>
          <li>See a clear summary of who owes what to settle up</li>
        </ol>
      </div>
    </div>
  );
};

export default TripSplitter;
