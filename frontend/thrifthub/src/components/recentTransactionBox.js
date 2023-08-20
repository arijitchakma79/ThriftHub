import React from "react";
import DeleteButton from "./delete";

const RecentTransactionBox = ({ data }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-md w-90">
      <ul className="space-y-4">
        {data.map((income) => (
          <li key={income.id} className="bg-gray-800 p-4 rounded-lg relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white mb-2">{income.title}</h3>
              <DeleteButton id={income._id} />
            </div>
            <div className="flex justify-between items-center">
              <p className='text-green-400 text-lg'>${income.amount.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">{income.date.substring(0, 10)}</p>
            </div>
            <p className="text-gray-300">{income.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactionBox;