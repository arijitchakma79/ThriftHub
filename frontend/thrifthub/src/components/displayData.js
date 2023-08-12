import React, { useEffect, useState } from 'react';
import { getData } from "../services/income";
import { useAuth } from '../hooks/auth';

const DisplayData = () => {
    const [incomeData, setIncomeData] = useState([]);
    const { user, isLoading } = useAuth();
    
    const userId = user ? user.id : null;

    const filterUserData = (array) => {
        const newData = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i].user_id === userId) {
                newData.push(array[i]);
            }
        }
        
        return newData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                console.log("Fetch income data", data);
                const filteredData = filterUserData(data);
                setIncomeData(filteredData);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        if (!isLoading) {
            fetchData();
        }
    }, [isLoading]); // Only re-run the effect if isLoading changes

    return (
        <div>
            <h2>All income data</h2>
            <ul>
                {incomeData.map((income) => (
                    <li key={income._id}>
                        <strong>{income.title} - {income.amount}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayData;
