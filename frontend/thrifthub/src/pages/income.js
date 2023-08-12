import React from 'react';
import IncomeForm from "../components/forms/income-form";
import DisplayData from '../components/displayData';
import { useAuth } from '../hooks/auth';

const Income = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const userId = user ? user.id : null;

    return (
        <div className="bg-gray-900 text-white h-screen flex">
            <div className="w-1/3 bg-gray-800 p-8">
                <h1 className="text-3xl font-semibold mb-4">Income Box</h1>
                <IncomeForm user_id={userId} />
            </div>
            <div>
                <DisplayData/>
            </div>
        </div>
    );
}

export default Income;
