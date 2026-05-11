import React from 'react';
import { useDocumentGeneratorStore } from '@/store/useDocumentGeneratorStore';
import { Trash2, Plus } from 'lucide-react';
import { InputField } from '../Form/InputField';

export function ItemizedPricingTable() {
  const { draft, updateItem, addItem, removeItem, updateField, calculateTotal } = useDocumentGeneratorStore();
  const { subtotal, taxAmount, finalTotal } = calculateTotal();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-1/3">
          <label className="text-sm font-medium text-gray-700 block mb-1">Currency</label>
          <select 
            value={draft.currency} 
            onChange={(e) => updateField('currency', e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5a32fa] focus:border-transparent"
          >
            <option value="IDR">IDR (Rp)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700 w-1/2">Item Description</th>
              <th className="px-4 py-3 font-medium text-gray-700 w-24">Qty</th>
              <th className="px-4 py-3 font-medium text-gray-700">Unit Price</th>
              <th className="px-4 py-3 font-medium text-gray-700 text-right">Total</th>
              <th className="px-4 py-3 font-medium text-gray-700 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {draft.items.map((item, index) => (
              <tr key={item.id} className="bg-white">
                <td className="p-2">
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="e.g. Frontend Development"
                    className="w-full px-3 py-1.5 border border-transparent hover:border-gray-200 focus:border-[#5a32fa] focus:ring-1 focus:ring-[#5a32fa] rounded-md transition-all outline-none"
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="number" 
                    min="1"
                    value={item.quantity} 
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-transparent hover:border-gray-200 focus:border-[#5a32fa] focus:ring-1 focus:ring-[#5a32fa] rounded-md transition-all outline-none"
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="number" 
                    min="0"
                    value={item.price} 
                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-transparent hover:border-gray-200 focus:border-[#5a32fa] focus:ring-1 focus:ring-[#5a32fa] rounded-md transition-all outline-none"
                  />
                </td>
                <td className="p-4 text-right font-medium text-gray-700">
                  {(item.quantity * item.price).toLocaleString()}
                </td>
                <td className="p-2 text-center">
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="bg-gray-50/50 p-3 border-t border-gray-100 flex justify-between items-center">
          <button 
            type="button" 
            onClick={addItem}
            className="text-sm text-[#5a32fa] hover:text-[#4b27d4] font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-[#5a32fa]/5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <div className="w-1/2 space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{draft.currency} {subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Discount</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">-</span>
              <input 
                type="number" 
                value={draft.discountAmount}
                onChange={(e) => updateField('discountAmount', parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-1 border border-gray-200 rounded text-right focus:outline-none focus:border-[#5a32fa]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Tax Rate (%)</span>
            </div>
            <input 
              type="number" 
              value={draft.taxRate}
              onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-200 rounded text-right focus:outline-none focus:border-[#5a32fa]"
            />
          </div>

          <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="text-lg">{draft.currency} {finalTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
