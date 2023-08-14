import React from "react";
import DeleteButton from "./deleteExpense";

const ExpenseBox = ({ data }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-md w-90">
      <h2 className="text-xl font-semibold text-white mb-4">All Expenses List</h2>
      <ul className="space-y-4">
        {data.map((expense) => (
          <li key={expense.id} className="bg-gray-800 p-4 rounded-lg relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white mb-2">{expense.title}</h3>
              <DeleteButton id={expense._id} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-green-400 text-lg">${expense.amount.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">{expense.date.substring(0, 10)}</p>
            </div>
            <p className="text-gray-300">{expense.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseBox;
