import React, { useEffect } from 'react';
import CustomPieChart from './chart';
import { getData } from '../../services/income';
import { useAuth } from '../../hooks/auth';
import { useIncome } from '../../context/incomeContext';

const IncomeChart = () => {
  const { state, dispatch } = useIncome();
  const { user, isLoading } = useAuth();

  const filterUserData = (array) => {
    const userId = user ? user.id : null;
    return array.filter((item) => item.user_id === userId);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const filteredData = filterUserData(data);
        dispatch({ type: 'UPDATE_INCOME', payload: filteredData });
      } catch (error) {
        console.log('Error fetching and parsing data', error);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [dispatch, isLoading]);

  const { incomeData } = state;

  // Check if there is no income data
  if (incomeData.length === 0) {
    return (
      <div>
        <p>Add income to view the chart.</p>
      </div>
    );
  }

  const { categoryAmounts, uniqueCategories } = getCategoryAmounts(incomeData);

  const chartData = {
    labels: Array.from(uniqueCategories),
    datasets: [
      {
        data: Object.values(categoryAmounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div style={{ maxWidth: '280px' }}>
      <CustomPieChart data={chartData} />
    </div>
  );
};

export default IncomeChart;
