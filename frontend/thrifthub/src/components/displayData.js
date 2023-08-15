import React, { useEffect } from 'react';
import { getData } from "../services/income";
import { useAuth } from '../hooks/auth';
import { useIncome } from '../context/incomeContext';
import Box from './data_box';

const DisplayData = () => {
    const { state, dispatch } = useIncome();
    const { user, isLoading } = useAuth();

    const userId = user ? user.id : null;

    const filterUserData = (array) => {
        return array.filter(item => item.user_id === userId);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                const filteredData = filterUserData(data);
                const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
                dispatch({ type: 'UPDATE_INCOME', payload: sortedData });
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        if (!isLoading) {
            fetchData();
        }
    }, [dispatch, isLoading]);

    const { incomeData } = state;
    const incomeDataSorted = incomeData.sort((a, b) => new Date(b.date) - new Date(a.date));
    

    return (
        <div>
            <Box data={incomeDataSorted} />
        </div>
    );
};

export default DisplayData;
