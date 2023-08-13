import React, { useEffect } from 'react';
import { getData } from "../../services/income";
import Chart from "./chart";
import { useAuth } from '../../hooks/auth';
import { useIncome } from '../../context/incomeContext';

const IncomeChart = () => {
  const { state, dispatch } = useIncome();
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
        const filteredData = filterUserData(data);
        dispatch({ type: 'UPDATE_INCOME', payload: filteredData });
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [dispatch, isLoading]);

  const { incomeData } = state;

  return (
    <div>
      <Chart incomeData={incomeData} />
    </div>
  );
};

export default IncomeChart;
