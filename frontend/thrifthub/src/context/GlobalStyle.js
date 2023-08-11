import React, { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [income, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [errors, setErrors] = useState(null);

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income).catch((error) => {
            setErrors(error.response.data.message);
        });
    }

    return (
        <GlobalContext.Provider value={{
            addIncome
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

