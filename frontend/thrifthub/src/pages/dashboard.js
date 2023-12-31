import React from 'react';
import IncomeExpenseChart from '../../src/components/charts/incomeExpenseChart';
import TotalBalance from '../components/total/totalBalance';
import RecentTransaction from '../components/recent_transactions';

const DashBoard = () => {
  return (
    <div className="bg-gray-900 text-white h-full flex">
      <div className="flex-grow-0 w-3/5">
        <IncomeExpenseChart />
        <TotalBalance />
      </div>
      <div className="flex-grow-0 w-2/5">
      <h2 className="text-xl font-semibold text-white mb-4 px-8 py-4">Recent Transactions</h2>
        <RecentTransaction />
        </div>
    </div>
  );
};

export default DashBoard;
