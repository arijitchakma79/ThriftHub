import React from "react";

const Box = ({ data }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-md w-90">
      <h2 className="text-xl font-semibold text-white mb-4">Income List</h2>
      <ul className="space-y-4">
        {data.map((income) => (
          <li key={income.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">{income.title}</h3>
            <div className="flex justify-between items-center">
              <p className="text-green-400 text-lg">${income.amount.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">{income.date.substring(0, 10)}</p>
            </div>
            <p className="text-gray-300">{income.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Box;