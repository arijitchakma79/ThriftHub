import { useEffect } from "react";
import { getExpenseData } from "../services/expense";
import { useAuth } from '../hooks/auth';
import { useExpense } from "../context/expenseContext";
import ExpenseBox from "./expenseBox";


const DisplayExpenseData = ()=>{
    const {state, dispatch} = useExpense();
    const { user, isLoading} = useAuth();

    const userId = user ? user.id : null;

    const filtereUserData = (array) => {
        
        const newData = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i].user_id === userId) {
                newData.push(array[i]);
            }
        }
        return newData;
    };

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const data = await getExpenseData();
                console.log("Fetch income data",data);
                const filteredData = filtereUserData(data);
                const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
                dispatch({type:'UPDATE_EXPENSE', payload: sortedData});
            }catch(error){
                console.log('Error fetching expense data', error);
            }
        }

        if (!isLoading){
            fetchData();
        }
    }, [dispatch, isLoading]);

    const {expenseData} = state;
    const expenseDataSorted = expenseData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return (
        <div>
         <ExpenseBox data={expenseDataSorted} />
        </div>
    )
}

export default DisplayExpenseData;