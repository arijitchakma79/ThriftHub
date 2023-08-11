import React from 'react';
import { addIncome } from '../services/income'; // Corrected import

const saveData = async () => {
    const incomeData = {
        title: 'trying to save 2',
        amount: 100,
        date: '2021-10-10',
        category: 'salary',
        description: 'trying to save'
    };

    addIncome(incomeData);
};

const Try_Income = () => {
    return (
        <div>
            <button onClick={saveData}>Save Income</button>
        </div>
    );
};

export default Try_Income;
