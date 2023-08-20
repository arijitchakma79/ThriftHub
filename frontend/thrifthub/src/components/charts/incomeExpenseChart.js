import React, {useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {getData } from '../../services/income'
import {getExpenseData } from '../../services/expense'
import {useAuth} from '../../hooks/auth'
import { useIncome } from '../../context/incomeContext';
import { useExpense } from '../../context/expenseContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

const IncomeExpenseChart = () => {
    const { user, isLoading } = useAuth();
    const { state: incomeState, dispatch: incomeDispatch } = useIncome();
    const { state: expenseState, dispatch: expenseDispatch } = useExpense();
  
    const userId = user ? user.id : null;
  
    const filterUserData = (array) => {
      return array.filter((item) => item.user_id === userId);
    };

    const sortedAmounts = (array1, array2) => {
      const sortedAmountArray = [];
      for (let i = 0; i<array1.length; i++) {
          for (let j = 0; j<array2.length; j++) {
            if (array2[j].date == array1[i]){
              sortedAmountArray.push(array2[j].amount)
            }
          }        
      }
      return sortedAmountArray;
    }
  
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
    console.log("Income Data:", incomeData)
    const { expenseData } = expenseState;
    console.log("Expense Data:", expenseData)

    //preparing data for line graph
    const allIncomeDates = (incomeData.map((date)=> date.date)).sort()
    const allExpenseDates = (expenseData.map((date)=> date.date)).sort()
    console.log(allIncomeDates)
    console.log(allExpenseDates)
    const sortedIncomeAmounts = sortedAmounts(allIncomeDates, incomeData)
    const sortedExpenseAmounts = sortedAmounts(allExpenseDates, expenseData)
    console.log(sortedIncomeAmounts)
    console.log(sortedExpenseAmounts)
    const incomeTrendData = {
      labels: allIncomeDates.map((date) => date.slice(0,10)),
      datasets: [
        {
          label: "Income Trends",
          data: sortedIncomeAmounts,
          backgroundColor:'red',
          pointBorderColor:'aqua',
          fill:true,
          tension:0.4,
          borderColor:'blue',
          borderWidth:2,
          pointRadius:5,
          pointHoverRadius:10,
          pointHoverBackgroundColor:'yellow',
          pointHoverBorderColor:'green',
          pointHoverBorderWidth:2,
          pointStyle:'rectRounded'

        }
      ]
    }

    const incomeOptions = {
      plugins: {
        legend: true
      },
      scales: {
        y:{
          min:0,
          max:200
        }
      }
    }

    const expenseTrendData = {
      labels: allExpenseDates.map((date) => date.slice(0,10)),
      datasets: [
        {
          label: "Expense Trends",
          data: sortedExpenseAmounts,
          backgroundColor:'red',
          pointBorderColor:'aqua',
          fill:true,
          tension:0.4,
          borderColor:'blue',
          borderWidth:2,
          pointRadius:5,
          pointHoverRadius:10,
          pointHoverBackgroundColor:'yellow',
          pointHoverBorderColor:'green',
          pointHoverBorderWidth:2,
          pointStyle:'rectRounded'

        }
      ]
    }
    
    const expenseOptions = {
      plugins: {
        legend: true
      },
      scales: {
        y:{
          min:0,
          max:200
        }
      }
    }
  
    return (
      <div>
        <Line data={incomeTrendData} options={incomeOptions}/>
        <Line data = {expenseTrendData} options= {expenseOptions}/>
      </div>
    );
  };
  
  export default IncomeExpenseChart