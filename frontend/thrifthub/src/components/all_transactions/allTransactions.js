import React, { useEffect } from "react";
import { getExpenseData } from "../../services/expense";
import { getData } from "../../services/income";
import { useIncome } from "../../context/incomeContext";
import { useExpense } from "../../context/expenseContext";
import { useAuth } from "../../hooks/auth";
import RecentTransactionBox from "../recentTransactionBox";

const AllTransaction = () => {
  const { state: expenseState, dispatch: expenseDispatch } = useExpense();
  const { user: authUser, isLoading: authIsLoading } = useAuth();

  const { state: incomeState, dispatch: incomeDispatch } = useIncome();

  const userId = authUser ? authUser.id : null;

  const filterUserData = (array) => {
    return array.filter(item => item.user_id === userId);
  };

  const getAllTransaction = (array1, array2) => {
    const allTransactionsArray = array1.concat(array2);
    const sortedTransactions = allTransactionsArray.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return sortedTransactions|| [];
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

  const allTransactions = getAllTransaction(incomeData, expenseData); // Fixed function call
  console.log('All Transactions:', allTransactions);

  return (
    <div>
      <RecentTransactionBox data={allTransactions} />
    </div>
  );
}

export default AllTransaction;
