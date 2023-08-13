import { useEffect } from "react";
import { getExpenseData } from "../services/expense";
import { useAuth } from '../hooks/auth';
import { useExpense } from "../context/expenseContext";


const DisplayExpenseData = ()=>{
    const {state, dispatch} = useExpense();
    const {user, isLoading} = useAuth;

    const userId = user? user.id : null;

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
                dispatch({type:'UPDATE_EXPENSE', payload: filteredData});
            }catch(error){
                console.log('Error fetching expense data', error);
            }
        }

        if (!isLoading){
            fetchData();
        }
    }, [dispatch, isLoading]);

    const {expenseData} = state;
    
    return (
        <div>
            <h2>
                All expense data
            </h2>
            <ul>
                {expenseData.map((expense)=>{
                    <li key ={expense.id}>
                        <strong>{expense.title} - {expense.amount}</strong>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default DisplayExpenseData;