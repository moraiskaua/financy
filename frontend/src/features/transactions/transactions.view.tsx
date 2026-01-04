import { useState } from 'react';
import type { CreateTransactionInput } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { cn } from '@/utils/cn';
import type { useTransactionsPageModel } from './use-transactions-page.model';

type TransactionsViewProps = ReturnType<typeof useTransactionsPageModel>;

export function TransactionsView({
  transactions,
  categories,
  isLoading,
  error,
  createTransaction,
  deleteTransaction,
}: TransactionsViewProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !categoryId) return;

    const input: CreateTransactionInput = {
      description,
      amount: parseFloat(amount),
      type,
      categoryId,
    };
    
    const success = await createTransaction(input);
    if (success) {
      setDescription('');
      setAmount('');
      setCategoryId('');
      setType('EXPENSE');
    }
  };

  const typeOptions = [
    { value: 'EXPENSE', label: 'Expense' },
    { value: 'INCOME', label: 'Income' },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Transactions</h1>

      {error && (
        <div className="bg-red-50 text-danger p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">New Transaction</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            className="col-span-1 lg:col-span-2"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            step="0.01"
          />
          <Select
            options={typeOptions}
            value={type}
            onChange={(val) => setType(val)}
            disabled={isLoading}
            placeholder="Type"
          />
          <Select
            options={categoryOptions}
            value={categoryId}
            onChange={(val) => setCategoryId(val)}
            disabled={isLoading}
            placeholder="Category"
          />
          <Button type="submit" disabled={isLoading || !description || !amount || !categoryId} className="lg:col-span-5">
            {isLoading ? 'Creating...' : 'Add Transaction'}
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{transaction.description}</h3>
                  <span className="text-sm text-gray-500">{transaction.category?.name}</span>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "font-bold block",
                    transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(parseInt(transaction.createdAt)).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-4 pl-4 border-l border-gray-100">
              <Button
                onClick={() => deleteTransaction(transaction.id)}
                variant="danger"
                size="sm"
                disabled={isLoading}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        
        {transactions.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-8">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}
