const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let expenses = [
  { id: 1, description: "Coffee", amount: 5 },
  { id: 2, description: "Groceries", amount: 50 },
];

// Get all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// Add a new expense
app.post('/api/expenses', (req, res) => {
  const { description, amount } = req.body;
  const newExpense = {
    id: expenses.length + 1,
    description,
    amount,
  };
  expenses.push(newExpense);
  res.json(newExpense);
});

// Delete an expense
app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(expense => expense.id !== parseInt(id));
  res.json({ message: 'Expense deleted' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
