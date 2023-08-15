import React, { useEffect } from "react";
import { getExpenseData} from "../../services/expense";
import { useExpense} from '../../context/expenseContext';
import { useAuth } from "../../hooks/auth";

const TotalExpense = () => {
    const { state, dispatch } = useExpense();
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
                let data = await getExpenseData();
                const filterData = filterUserData(data);
                dispatch({ type: 'UPDATE_EXPENSE', payload: filterData });
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        if (!isLoading) {
            fetchData();
        }
    }, [dispatch, isLoading]);

    const { expenseData } = state;
    const totalExpenseofUser = calculateTotalIncome(expenseData);

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Expense</h2>
            <div className="text-2xl font-bold text-red-600">
                ${totalExpenseofUser.toFixed(2)} 
            </div>
        </div>
    );
};

export default TotalExpense;
