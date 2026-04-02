import React, { useState } from 'react';

interface IncomeSource { id: number; name: string; amount: string; }
interface Vault { id: number; name: string; emoji: string; percent: string; editable: boolean; }

const DEFAULT_VAULTS: Vault[] = [
  { id: 1,  name: 'Rent / Mortgage',     emoji: '🏠', percent: '30', editable: true },
  { id: 2,  name: 'Groceries',           emoji: '🛒', percent: '10', editable: true },
  { id: 3,  name: 'Bills & Utilities',   emoji: '💡', percent: '8',  editable: true },
  { id: 4,  name: 'Transport',           emoji: '🚗', percent: '7',  editable: true },
  { id: 5,  name: 'Emergency Fund',      emoji: '🚨', percent: '5',  editable: true },
  { id: 6,  name: 'Savings',             emoji: '🏦', percent: '10', editable: true },
  { id: 7,  name: 'Investments',         emoji: '📈', percent: '5',  editable: true },
  { id: 8,  name: 'Health',              emoji: '🏥', percent: '5',  editable: true },
  { id: 9,  name: 'Entertainment',       emoji: '🎬', percent: '5',  editable: true },
  { id: 10, name: 'Vacation',            emoji: '✈️', percent: '5',  editable: true },
  { id: 11, name: 'Clothing',            emoji: '👕', percent: '3',  editable: true },
  { id: 12, name: 'Gifts & Giving',      emoji: '🎁', percent: '3',  editable: true },
  { id: 13, name: 'Education / Tuition', emoji: '🎓', percent: '2',  editable: true },
  { id: 14, name: 'Miscellaneous',       emoji: '📦', percent: '2',  editable: true },
]; // Total: 100%

const VAULT_EMOJIS = ['🏠','🛒','💡','🚗','🏦','📈','🏥','🎬','🎁','✈️','👕','📦','🍕','☕','📚','💊','🐶','🎓','🔧','💻','🎮','🏋️'];

const BudgetPlanner: React.FC = () => {
  const [sources, setSources] = useState<IncomeSource[]>([{ id: 1, name: 'Salary', amount: '' }]);
  const [vaults, setVaults] = useState<Vault[]>(DEFAULT_VAULTS);
  const [newVaultName, setNewVaultName] = useState('');
  const [showAddVault, setShowAddVault] = useState(false);
  const [savedBudget, setSavedBudget] = useState<{sources: IncomeSource[]; vaults: Vault[]} | null>(() => {
    try { return JSON.parse(localStorage.getItem('qt-budget-v1') || 'null'); } catch { return null; }
  });
  const [budgetSaved, setBudgetSaved] = useState(false);

  // Income
  const addSource = () => setSources(s => [...s, { id: Date.now(), name: '', amount: '' }]);
  const removeSource = (id: number) => setSources(s => s.filter(x => x.id !== id));
  const updateSource = (id: number, k: keyof IncomeSource, v: string) =>
    setSources(s => s.map(x => x.id === id ? { ...x, [k]: v } : x));

  const totalIncome = sources.reduce((s, x) => s + (parseFloat(x.amount) || 0), 0);

  // Vaults
  const updateVault = (id: number, k: keyof Vault, v: string) =>
    setVaults(vs => vs.map(v2 => v2.id === id ? { ...v2, [k]: v } : v2));
  const removeVault = (id: number) => setVaults(vs => vs.filter(v => v.id !== id));
  const addVault = () => {
    if (!newVaultName.trim()) return;
    setVaults(vs => [...vs, { id: Date.now(), name: newVaultName.trim(), emoji: '📦', percent: '0', editable: true }]);
    setNewVaultName('');
    setShowAddVault(false);
  };

  const totalPercent = vaults.reduce((s, v) => s + (parseFloat(v.percent) || 0), 0);
  const remaining = totalIncome - vaults.reduce((s, v) => s + (totalIncome * (parseFloat(v.percent) || 0) / 100), 0);
  const isOver = totalPercent > 100;

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const saveBudget = () => {
    const data = { sources, vaults };
    localStorage.setItem('qt-budget-v1', JSON.stringify(data));
    setSavedBudget(data);
    setBudgetSaved(true);
    setTimeout(() => setBudgetSaved(false), 2000);
  };

  const loadBudget = () => {
    if (!savedBudget) return;
    setSources(savedBudget.sources);
    setVaults(savedBudget.vaults);
  };

  const resetBudget = () => {
    if (!confirm('Reset to default vaults?')) return;
    setSources([{ id: 1, name: 'Salary', amount: '' }]);
    setVaults(DEFAULT_VAULTS);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Budget Planner</h2>
        <p className="text-dark-600">Add your income sources, then allocate percentages to spending vaults. Edit any vault name, emoji, or percentage.</p>
      </div>

      {/* ── Save / Load / Reset ── */}
      <div className="flex gap-2">
        <button onClick={saveBudget} className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600">
          {budgetSaved ? '✓ Saved!' : '💾 Save Budget'}
        </button>
        {savedBudget && <button onClick={loadBudget} className="px-4 py-2 bg-gray-100 text-dark-700 rounded-xl text-sm font-semibold hover:bg-gray-200">↩ Restore Saved</button>}
        <button onClick={resetBudget} className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-sm hover:bg-gray-200">Reset</button>
      </div>

      {/* ── Income Sources ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-dark-800">💰 Income Sources</h3>
          <button onClick={addSource} className="text-xs px-3 py-1.5 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">+ Add</button>
        </div>
        {sources.map(src => (
          <div key={src.id} className="flex gap-2 items-center">
            <input value={src.name} onChange={e => updateSource(src.id,'name',e.target.value)}
              placeholder="Source name (e.g. Salary)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={src.amount} onChange={e => updateSource(src.id,'amount',e.target.value)}
                placeholder="0"
                className="w-32 pl-7 pr-3 py-2 border border-gray-300 rounded-xl text-sm" />
            </div>
            {sources.length > 1 && <button onClick={() => removeSource(src.id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50">✕</button>}
          </div>
        ))}
        {totalIncome > 0 && (
          <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-dark-700">Total Monthly Income</span>
            <span className="text-xl font-bold text-primary-600">${fmt(totalIncome)}</span>
          </div>
        )}
      </div>

      {/* ── Allocation Status Bar ── */}
      {totalIncome > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-dark-700">Allocation</span>
            <span className={`font-bold ${isOver ? 'text-red-600' : totalPercent === 100 ? 'text-green-600' : 'text-orange-500'}`}>
              {totalPercent.toFixed(1)}% allocated {isOver ? '⚠️ over 100%' : totalPercent === 100 ? '✓ perfect' : `(${(100 - totalPercent).toFixed(1)}% unallocated)`}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-primary-500'}`}
              style={{ width: `${Math.min(100, totalPercent)}%` }} />
          </div>
        </div>
      )}

      {/* ── Vaults ── */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-dark-800">Spending Vaults</h3>
          <button onClick={() => setShowAddVault(!showAddVault)} className="text-xs px-3 py-1.5 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">+ New Vault</button>
        </div>

        {showAddVault && (
          <div className="flex gap-2 p-3 bg-primary-50 rounded-xl border border-primary-100">
            <input value={newVaultName} onChange={e => setNewVaultName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addVault()}
              placeholder="Vault name (e.g. Dog Food)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            <button onClick={addVault} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold">Add</button>
            <button onClick={() => setShowAddVault(false)} className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Cancel</button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {vaults.map(vault => {
            const pct = parseFloat(vault.percent) || 0;
            const amount = totalIncome * pct / 100;
            return (
              <div key={vault.id} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 group">
                {/* Emoji picker */}
                <div className="relative shrink-0">
                  <select value={vault.emoji} onChange={e => updateVault(vault.id,'emoji',e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
                    {VAULT_EMOJIS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-lg cursor-pointer select-none">{vault.emoji}</div>
                </div>

                {/* Name */}
                <input value={vault.name} onChange={e => updateVault(vault.id,'name',e.target.value)}
                  className="flex-1 text-sm font-semibold text-dark-800 bg-transparent border-0 focus:outline-none focus:bg-gray-50 rounded px-1 min-w-0" />

                {/* Percent input */}
                <div className="flex items-center gap-1 shrink-0">
                  <input type="number" value={vault.percent} onChange={e => updateVault(vault.id,'percent',e.target.value)}
                    min="0" max="100" step="0.5"
                    className="w-14 text-right px-2 py-1 border border-gray-200 rounded-lg text-sm font-bold text-primary-600 focus:ring-1 focus:ring-primary-400" />
                  <span className="text-xs text-gray-400">%</span>
                </div>

                {/* Dollar amount */}
                {totalIncome > 0 && (
                  <div className="text-right shrink-0 w-20">
                    <div className="text-sm font-bold text-dark-800">${amount < 1000 ? fmt(amount) : `${(amount/1000).toFixed(1)}k`}</div>
                  </div>
                )}

                <button onClick={() => removeVault(vault.id)} className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">✕</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Summary ── */}
      {totalIncome > 0 && (
        <div className={`rounded-2xl p-5 border ${Math.abs(remaining) < 0.01 ? 'bg-green-50 border-green-200' : remaining < 0 ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-dark-800">{remaining < 0 ? '⚠️ Over budget by' : remaining < 0.01 ? '✓ Perfectly balanced' : '💡 Unallocated'}</span>
            <span className={`text-xl font-bold ${remaining < 0 ? 'text-red-600' : remaining < 0.01 ? 'text-green-600' : 'text-orange-500'}`}>
              {remaining < 0 ? `-$${fmt(-remaining)}` : `$${fmt(remaining)}`}
            </span>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter all your monthly income sources</li>
          <li>Set a percentage for each spending vault — they automatically calculate dollar amounts</li>
          <li>Add, remove, or rename any vault to match your life</li>
          <li>Aim for 100% allocated — any leftover is unallocated spending money</li>
        </ol>
      </div>
    </div>
  );
};

export default BudgetPlanner;
