import React from 'react';
import IncomeForm from "../components/forms/income-form";
import Try_Income from '../components/try-income';
import DisplayData from '../components/displayData';

const Income = () => {
    return (
        <div className="bg-gray-900 text-white h-screen flex">
            <div className="w-1/3 bg-gray-800 p-8">
                {/* Content for the Income Box */}
                <h1 className="text-3xl font-semibold mb-4">Income Box</h1>
                {/*<IncomeForm /> */}
                <Try_Income />
            </div>
            <div>
                <DisplayData/>
            </div>
        </div>
    );
}

export default Income;
