import React, { useEffect } from "react";
import { getExpenseData } from "../../services/expense";
import { useExpense } from '../../context/expenseContext';
import { useAuth } from "../../hooks/auth";
import { getData } from "../../services/income";
import { useIncome } from "../../context/incomeContext";

const TotalBalance = () => {
  const { state: expenseState, dispatch: expenseDispatch } = useExpense();
  const { user: authUser, isLoading: authIsLoading } = useAuth();

  const { state: incomeState, dispatch: incomeDispatch } = useIncome();

  const userId = authUser ? authUser.id : null;

  const filterUserData = (array) => {
    return array.filter(item => item.user_id === userId);
  };

  const calculateTotalAmount = (array) => {
    let totalAmount = 0;

    for (let i = 0; i < array.length; i++) {
      totalAmount += array[i].amount;
    }

    return totalAmount;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseData = await getExpenseData();
        const filteredExpenseData = filterUserData(expenseData);
        expenseDispatch({ type: 'UPDATE_EXPENSE', payload: filteredExpenseData });

        const incomeData = await getData();
        const filteredIncomeData = filterUserData(incomeData);
        incomeDispatch({ type: 'UPDATE_INCOME', payload: filteredIncomeData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!authIsLoading) {
      fetchData();
    }
  }, [expenseDispatch, incomeDispatch, authIsLoading]);

  const { expenseData } = expenseState;
  const { incomeData } = incomeState;
  const totalIncome = calculateTotalAmount(incomeData);
  const totalExpense = calculateTotalAmount(expenseData);
  const totalAmount = totalIncome - totalExpense;

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg text-white">
      <div className="flex">
        <div className="bg-blue-400 p-2 rounded-lg text-white mr-2 flex-grow-0 w-1/2">
          <h3 className="text-sm font-semibold">Total Income</h3>
          <div className="text-lg font-bold">${totalIncome.toFixed(2)}</div>
        </div>
        <div className="bg-red-400 p-2 rounded-lg text-white ml-2 flex-grow-0 w-1/2">
          <h3 className="text-sm font-semibold">Total Expense</h3>
          <div className="text-lg font-bold">${totalExpense.toFixed(2)}</div>
        </div>
      </div>
      <div className="bg-green-400 p-2 rounded-lg text-white mt-4 flex-grow-0 w-full">
        <h3 className="text-sm font-semibold">Total Amount</h3>
        <div className="text-lg font-bold">${totalAmount.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default TotalBalance;
