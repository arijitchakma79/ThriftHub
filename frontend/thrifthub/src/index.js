import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { IncomeProvider } from './context/incomeContext';
import { ExpenseProvider } from './context/expenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <IncomeProvider>
  <ExpenseProvider>
    <App />
  </ExpenseProvider>
  </IncomeProvider>
  </React.StrictMode>
);

