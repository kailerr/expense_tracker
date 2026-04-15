import React, { useState } from "react";

export default function ExpenseTracker({ user, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={onLogout}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Expense name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <button
        onClick={addExpense}
        className="w-full bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
      >
        Add Expense
      </button>

      <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {exp.title}: ${exp.amount.toFixed(2)}
            </span>
            <button
              onClick={() => deleteExpense(exp.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">
        Total: ${total.toFixed(2)}
      </h2>
    </div>
  );
}