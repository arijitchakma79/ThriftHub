import React from 'react';
import ExpenseForm from "../components/forms/expense-form";
import DisplayExpenseData from '../components/displayExpense';
import { useAuth } from '../hooks/auth';
import ExpenseChart from '../components/charts/expense_chart';
import TotalExpense from '../components/total/totalExpense';

const Expenses = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const userId = user ? user.id : null;

    return (
        <div className="bg-gray-900 text-white h-screen flex">
            <div className="w-2/5 bg-gray-900 p-4 overflow-y-auto flex justify-center items-center flex-col">
            <div className="my-4">
          <ExpenseChart />
        </div>
        <div className='my-4'>
        <ExpenseForm user_id={userId} />
        </div>
            </div>
            <div className="w-3/5 bg-gray-900 p-2 overflow-y-auto">
            <TotalExpense/>
                <DisplayExpenseData/>
            </div>
        </div>
    );
}

export default Expenses;
