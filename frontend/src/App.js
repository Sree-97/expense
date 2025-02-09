import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch expenses from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = { description, amount: parseFloat(amount) };

    // Send data to backend
    axios.post('http://localhost:5000/api/expenses', newExpense)
      .then(response => {
        setExpenses([...expenses, response.data]);
        setDescription('');
        setAmount('');
      })
      .catch(error => console.error('Error adding expense:', error));
  };

  // Handle delete expense
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/expenses/${id}`)
      .then(() => {
        setExpenses(expenses.filter(expense => expense.id !== id));
      })
      .catch(error => console.error('Error deleting expense:', error));
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense description"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <button type="submit" className="add-btn">Add Expense</button>
      </form>

      <h2>Expenses List</h2>
      <ul className="expense-list">
        {expenses.map(expense => (
          <li key={expense.id} className="expense-item">
            <span>{expense.description} - ${expense.amount}</span>
            <button className="delete-btn" onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
