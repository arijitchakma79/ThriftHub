import React, { useEffect } from "react";
import { getData } from "../../services/income";
import { useIncome } from "../../context/incomeContext";
import { useAuth } from "../../hooks/auth";

const TotalIncome = () => {
    const { state, dispatch } = useIncome();
    const { user, isLoading } = useAuth();

    const userId = user ? user.id : null;

    const filterUserData = (array) => {
        return array.filter(item => item.user_id === userId);
    };

    const calculateTotalIncome = (array) => {
        let totalIncome = 0;

        for (let i = 0; i < array.length; i++) {
            totalIncome += array[i].amount;
        }

        return totalIncome;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getData();
                const filterData = filterUserData(data);
                dispatch({ type: 'UPDATE_INCOME', payload: filterData });
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        if (!isLoading) {
            fetchData();
        }
    }, [dispatch, isLoading]);

    const { incomeData } = state;
    const totalIncomeofUser = calculateTotalIncome(incomeData);

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Income</h2>
            <div className="text-2xl font-bold text-green-600">
                ${totalIncomeofUser.toFixed(2)} 
            </div>
        </div>
    );
};

export default TotalIncome;
