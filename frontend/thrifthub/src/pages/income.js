import React from 'react';
import IncomeForm from '../components/forms/income-form';
import DisplayData from '../components/displayData';
import { useAuth } from '../hooks/auth';
import IncomeChart from '../components/charts/income_chart';
import TotalIncome from '../components/total/totalIncome';

const Income = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userId = user ? user.id : null;

  return (
    <div className="bg-gray-900 text-white h-screen flex">
      <div className="w-2/5 bg-gray-900 p-4 overflow-y-auto flex justify-center items-center flex-col">
        <div className="my-4">
          <IncomeChart />
        </div>
        <div className="my-4">
          <IncomeForm user_id={userId} />
        </div>
      </div>
      <div className="w-3/5 bg-gray-900 p-2 overflow-y-auto">
      <TotalIncome/>
        <DisplayData />
      </div>
    </div>
  );
}

export default Income;
