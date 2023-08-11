import React, { useEffect, useState } from 'react';
import { getData } from "../services/income";


const DisplayData = () => {
    const [incomeData, setIncomeData] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const data = await getData(); // Call the getData function from your income service
                console.log("Fetch income data", data);
                setIncomeData(data);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2>All income data</h2>
            <ul>
                {incomeData.map((income)=> (
                    <li key={income._id}>
                        <strong>{income.title} - {income.amount}</strong>
                    </li>
                ))

                }
            </ul>
        </div>
    )

}

export default DisplayData;