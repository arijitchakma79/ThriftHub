import React, { useEffect } from "react";
import CustomPieChart from "./chart";
import { getExpenseData } from "../../services/expense";
import { useAuth } from "../../hooks/auth";
import { useExpense } from "../../context/expenseContext";

const ExpenseChart = () => {
    // Access the expense state and dispatch function from the context
    const { state, dispatch } = useExpense();

    // Get the authenticated user and loading status from the auth context
    const { user, isLoading } = useAuth();

    // Filter function to filter data by user_id
    const filterUserData = (array) => {
        const userId = user ? user.id : null;
        return array.filter((item) => item.user_id === userId);
    };

    // Calculate category amounts and unique categories
    const getCategoryAmounts = (array) => {
        const categoryAmounts = {};
        const uniqueCategories = new Set();

        for (let i = 0; i < array.length; i++) {
            const category = array[i].category;
            const amount = array[i].amount;

            if (categoryAmounts[category]) {
                categoryAmounts[category] += amount;
            } else {
                categoryAmounts[category] = amount;
                uniqueCategories.add(category);
            }
        }
        return { categoryAmounts, uniqueCategories };
    };

    // Fetch data and update context on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getExpenseData();
                const filteredData = filterUserData(data);
                dispatch({ type: 'UPDATE_EXPENSE', payload: filteredData });
            } catch (error) {
                console.log('Error fetching and parsing data', error);
            }
        };

        if (!isLoading) {
            fetchData();
        }
    }, [dispatch, isLoading]);

    // Destructure expenseData from the state
    const { expenseData } = state;

    // Display message if there is no expense data
    if (expenseData.length === 0) {
        return (
            <div>
                <p>Add expense to view the chart</p>
            </div>
        );
    }

    // Calculate chart data for rendering
    const { categoryAmounts, uniqueCategories } = getCategoryAmounts(expenseData);

    const chartData = {
        labels: Array.from(uniqueCategories),
        datasets: [
            {
                data: Object.values(categoryAmounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
            }
        ]
    };

    // Render the CustomPieChart with the calculated chart data
    return (
        <div style={{ maxWidth: '280px' }}>
            <CustomPieChart data={chartData} />
        </div>
    );
};

export default ExpenseChart;
