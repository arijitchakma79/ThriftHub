import { useEffect } from 'react';
import { getData } from "../services/income";
import { useAuth } from '../hooks/auth';
import { useIncome } from '../context/incomeContext';
import Box from './data_box';

const DisplayData = () => {
    const {state, dispatch} = useIncome()
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
                //get data from the database and save the object data into data object
                const data = await getData();
                console.log("Fetch income data", data);
                console.log(userId)
                console.log(user)
                const filteredData = filterUserData(data); //filter the data so that it only shows user specified data
                dispatch({type:'UPDATE_INCOME', payload: filteredData}); //dispatch the action needed to update the global state
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        if (!isLoading) {
            fetchData();
        }
    }, [dispatch, isLoading]); // Only re-run the effect if isLoading/dispatch changes
      
    const {incomeData} = state;
    return (
        <div>
            <h2>All income data</h2>
            <Box data={incomeData}/>
        </div>
    );
};

export default DisplayData;
