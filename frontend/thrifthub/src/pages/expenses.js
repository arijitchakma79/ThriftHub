import React from 'react';
import ExpenseForm from "../components/forms/expense-form";
import DisplayExpenseData from '../components/displayExpense';
import { useAuth } from '../hooks/auth';

const Expenses = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const userId = user ? user.id : null;

    return (
        <div className="bg-gray-900 text-white h-screen flex">
            <div className="w-1/3 bg-gray-800 p-8">
                <h1 className="text-3xl font-semibold mb-4">Expense Box</h1>
                <ExpenseForm user_id={userId} />
            </div>
            <div>
                <DisplayExpenseData/>
            </div>
        </div>
    );
}

export default Expenses;
