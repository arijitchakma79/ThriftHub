import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { getData } from '../../services/income';
import { getExpenseData } from '../../services/expense';
import { useAuth } from '../../hooks/auth';
import { useIncome } from '../../context/incomeContext';
import { useExpense } from '../../context/expenseContext';
import { Chart as ChartJS, CategoryScale, LineElement, PointElement, LinearScale, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const maxAmount = (array) => {
  const amountArray = array.map(item => item.amount);
  return Math.max(...amountArray);
}

const minAmount = (array) => {
  const amountArray = array.map(item => item.amount);
  return Math.min(...amountArray);
}

const prepareChartData = (data, label, backgroundColor, borderColor) => {
  const sortedData = data.sort((a, b) => a.date.localeCompare(b.date));
  const labels = sortedData.map((entry) => entry.date.slice(0, 10));
  const amounts = sortedData.map((entry) => entry.amount);

  return {
    labels: labels,
    datasets: [
      {
        label: label,
        data: amounts,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'yellow',
        pointHoverBorderColor: 'green',
        pointHoverBorderWidth: 2,
        pointStyle: 'rectRounded',
        tension:0.5
      },
    ],
  };
};

const IncomeExpenseChart = () => {
  const { user, isLoading } = useAuth();
  const { state: incomeState, dispatch: incomeDispatch } = useIncome();
  const { state: expenseState, dispatch: expenseDispatch } = useExpense();

  const userId = user ? user.id : null;

  const filterUserData = (array) => {
    return array.filter((item) => item.user_id === userId);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const incomeData = await getData();
        const expenseData = await getExpenseData();
        const filteredIncomeData = filterUserData(incomeData);
        const filteredExpenseData = filterUserData(expenseData);
        incomeDispatch({ type: 'UPDATE_INCOME', payload: filteredIncomeData });
        expenseDispatch({ type: 'UPDATE_EXPENSE', payload: filteredExpenseData });
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    if (!isLoading) {
      fetchAllData();
    }
  }, [incomeDispatch, expenseDispatch, isLoading]);

  const { incomeData } = incomeState;
  const { expenseData } = expenseState;
  const MIN_AMOUNT_INCOME = minAmount(incomeData);
  const MAX_AMOUNT_INCOME = maxAmount(incomeData);
  const MIN_AMOUNT_EXPENSE = minAmount(expenseData);
  const MAX_AMOUNT_EXPENSE = maxAmount(expenseData);
  const TICK_STEP_SIZE = 100;

  const chartBackgroundColor = 'rgba(255, 255, 255, 0.1)';
  const incomeLineColor = 'rgba(255, 99, 132, 1)';
  const expenseLineColor = 'rgba(54, 162, 235, 1)';

  const incomeTrendData = prepareChartData(
    incomeData,
    'Income Trends',
    chartBackgroundColor,
    incomeLineColor
  );

  const expenseTrendData = prepareChartData(
    expenseData,
    'Expense Trends',
    chartBackgroundColor,
    expenseLineColor
  );

  const chartOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set the label color to white
        },
        grid: {
          color: 'white', // Set the grid color to white
        },
      },
      y: {
        min: MIN_AMOUNT_INCOME,
        max: MAX_AMOUNT_INCOME,
        ticks: {
          stepSize: TICK_STEP_SIZE,
          color: 'white', // Set the label color to white
        },
        grid: {
          color: 'white', // Set the grid color to white
        },
      },
    },
  };
  
  const expenseOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set the label color to white
        },
        grid: {
          color: 'white', // Set the grid color to white
        },
      },
      y: {
        min: MIN_AMOUNT_EXPENSE,
        max: MAX_AMOUNT_EXPENSE,
        ticks: {
          stepSize: TICK_STEP_SIZE,
          color: 'white', // Set the label color to white
        },
        grid: {
          color: 'white', // Set the grid color to white
        },
      },
    },
  };

  return (
    <div className='bg-gray-900 px-20 shadow-lg  text-white'>
    <Line data={incomeTrendData} options={chartOptions} />
    <br/>
    <br/>
    <Line data={expenseTrendData} options={expenseOptions} />      
    </div>
  );
};

export default IncomeExpenseChart;


