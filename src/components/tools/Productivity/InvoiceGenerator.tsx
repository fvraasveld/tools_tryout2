import React, { useState } from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

const InvoiceGenerator: React.FC = () => {
  const [companyName, setCompanyName] = useState('Your Company');
  const [clientName, setClientName] = useState('Client Name');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Service/Product', quantity: 1, rate: 100 }
  ]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const total = calculateTotal();

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Your Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border-2 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white border-2 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Invoice Items</h3>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            + Add Item
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-center">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                className="col-span-5 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                className="col-span-2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                className="col-span-2 p-2 border rounded"
              />
              <div className="col-span-2 font-bold">${(item.quantity * item.rate).toFixed(2)}</div>
              <button
                onClick={() => removeItem(index)}
                className="col-span-1 text-red-600 hover:text-red-800"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t-2">
          <div className="text-right">
            <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 rounded-lg p-8 print:hidden">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
          <div className="text-xl">{invoiceNumber}</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <div className="font-bold mb-1">From:</div>
            <div className="text-lg">{companyName}</div>
          </div>
          <div>
            <div className="font-bold mb-1">To:</div>
            <div className="text-lg">{clientName}</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="font-bold">Date: {new Date(date).toLocaleDateString()}</div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-2">Description</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Rate</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">{item.description}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">${item.rate.toFixed(2)}</td>
                <td className="text-right py-2">${(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <div className="text-3xl font-bold">Total: ${total.toFixed(2)}</div>
        </div>

        <button
          onClick={printInvoice}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
